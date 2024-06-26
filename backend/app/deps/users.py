"""User Dependencies

Objects to be used as runtime dependencies for FastAPI endpoints

Dependecies:
    - get_user_manager: Returns a UserManager instance
"""
from fastapi import Depends
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.auth import (
    hash_pwd,
    verify_pwd,
    oauth2_scheme,
    decode_jwt_token,
    CRED_EXCEPTION,
)
from app.core.logging import get_logger
from app.core.settings import get_settings
from app.db.db import get_db
from app.db.schema import User as UserSchema
from app.models import User, UserCreate, UserUpdate
# from app.core.models.users import DBUser, UserRead, UserCreate, User, UserUpdate

logger = get_logger(__name__)
settings = get_settings()


class UserManager:
    """User Manager Dependency

    Performs user management operations, like CRUD
    """

    def __init__(self, session: Session):
        self.session: Session = session

    def get_users(self, page: int, limit: int) -> list[User]:
        """Get Users

        Returns:
            list[UserRead]: List of users
        """
        users = self.session.query(UserSchema).offset(page * limit).limit(limit).all()
        return [User.model_validate(user.__dict__) for user in users]

    def get_user(self, user_id: str) -> UserSchema | None:
        """Get User

        Args:
            user_id (str | None): User email

        Returns:
            DBUser: User, or None if user does not exist
                Not a UserRead object because it is used for internal operations
        """
        return self.session.query(UserSchema).filter(UserSchema.email == user_id).first()

    def create_user(self, user_data: UserCreate) -> User:
        """Create User

        Args:
            user_data (UserCreate): User data

        Returns:
            UserRead: Created user
        """
        user_data_d = user_data.model_dump()
        user_data_d["hashed_password"] = hash_pwd(user_data_d["password"])
        user_data_d.pop("password")
        db_user = UserSchema(**user_data_d)

        self.session.add(db_user)
        try:
            self.session.commit()
        except IntegrityError as error:
            logger.debug("User creation error: <%s>", str(error))
            raise ValueError("User with that email already exists") from error

        return User(**user_data_d)

    def delete_user(self, user_id: str):
        """Delete User

        Args:
            user_id (str): User email

        Returns:
            UserRead: Deleted user, or None if user does not exist
        """
        user = self.session.query(UserSchema).filter(UserSchema.email == user_id).first()
        if not user:
            logger.debug("User deletion for non-existant user: %s", user_id)
            return None

        self.session.delete(user)
        self.session.commit()

        return User(**user.__dict__)

    def update_user(self, user_id: str, user_data: UserUpdate):
        """Update User

        Args:
            user_id (str): User email
            user_data (UserUpdate): User data to update

        Returns:
            UserRead: Updated user, or None if user does not exist
        """
        user = self.session.query(UserSchema).filter(UserSchema.email == user_id).first()
        if not user:
            return None

        for key, value in user_data.model_dump().items():
            if value:
                setattr(user, key, value)
        new_user_ret = User(**user.__dict__)
    
        self.session.commit()

        return new_user_ret

    def authenticate_user(self, user_id: str, password: str):
        """Authenticate User

        Authenticate a user by checking the password

        Args:
            user_id (str): User email
            password (str): User password

        Returns:
            User | None: User if authenticated, None if not
        """
        user = self.get_user(user_id)
        if not user:
            return None
        if not verify_pwd(password, user.hashed_password):
            user.failed_login_attempts += 1
            self.session.commit()
            return None

        # user.logins += 1
        self.session.commit()

        return user


async def get_user_manager(session: Session = Depends(get_db)):
    """Get User Manager

    Get the user manager dependency
    """
    return UserManager(session)


def get_current_user(
    token=Depends(oauth2_scheme), user_manager: UserManager = Depends(get_user_manager)
):
    """Get Current User

    Get the current user from JWT authorization token
    """
    user_id = decode_jwt_token(token)

    user = user_manager.get_user(user_id)
    if not user or not user.is_active:
        raise CRED_EXCEPTION

    return user


def get_current_admin_user(current_user: UserSchema = Depends(get_current_user)) -> UserSchema:
    """Get Current Admin User

    Get the current user from JWT authorization token
    """
    if not current_user.is_superuser:
        raise CRED_EXCEPTION

    return current_user
