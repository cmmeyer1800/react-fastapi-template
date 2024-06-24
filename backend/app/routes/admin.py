"""TOFILL"""
from fastapi import APIRouter, Depends

from app.models import User, UserCreate, UserUpdate
from app.core.settings import get_settings
from app.core.logging import get_logger
from app.db.schema import User as UserSchema
from app.deps.users import get_current_admin_user, UserManager, get_user_manager

settings = get_settings()
logger = get_logger(__name__)

router = APIRouter(prefix="/admin")


@router.get("/users", tags=["users"])
def get_users(page: int = 0, limit: int = 25,
              user_manager: UserManager = Depends(get_user_manager),
              user: UserSchema = Depends(get_current_admin_user)) -> list[User]:
    """Get all users
    
    Paginated API to get all users

    Query Parameters:
    - page (int): Page number, default 0
    - limit (int): Number of items per page, default 25
    
    Returns:
    - List[User]: List of users
    """
    return user_manager.get_users(page=page, limit=limit)


@router.post("/users", tags=["users"])
def create_user(user: UserCreate, user_manager: UserManager = Depends(get_user_manager),
                admin_user: UserSchema = Depends(get_current_admin_user)) -> User:
    """Create a user

    Parameters:
    - user (UserCreate): User data to create
    
    Returns:
    - User: Created user
    """
    return user_manager.create_user(user)


@router.patch("/users", tags=["users"])
def update_user(user_update: UserUpdate, user_manager: UserManager = Depends(get_user_manager),
                admin_user: UserSchema = Depends(get_current_admin_user)) -> User:
    """Update a user

    Parameters:
    - user (UserUpdate): User data to update
    
    Returns:
    - User: Updated user
    """
    return user_manager.update_user(user_update.email, user_update)


@router.delete("/users", tags=["users"])
def delete_user(email: str, user_manager: UserManager = Depends(get_user_manager),
                admin_user: UserSchema = Depends(get_current_admin_user)) -> User:
    """Delete a user

    Parameters:
    - email (str): User email to delete
    
    Returns:
    - User: Deleted user
    """
    return user_manager.delete_user(email)


logger.info("admin router initialized")
