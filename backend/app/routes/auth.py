"""TOFILL"""
from typing import Annotated

from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status

from app.models import Token, User
from app.core.settings import get_settings
from app.core.logging import get_logger
from app.core.auth import create_access_token
from app.deps.users import UserManager, get_user_manager, get_current_user

settings = get_settings()
logger = get_logger(__name__)

router = APIRouter()


@router.post("/token", tags=["auth"])
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    user_manager: UserManager = Depends(get_user_manager),
) -> Token:
    """Login for access token
    
    Get an access token for the user with the provided credentials

    Parameters:
    - form_data (OAuth2PasswordRequestForm): Form data containing username and password

    Returns:
    - Token: Access token
    """
    user = user_manager.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=settings.access_token_expire_minutes
    )
    grants = ["admin", "user"] if user.is_superuser else ["user"]
    return Token(access_token=access_token, token_type="bearer", grants=grants)


@router.get("/users/me", tags=["users"])
def my_account(user: User = Depends(get_current_user)) -> User:
    """Get current user
    
    Get the current user's account information

    Returns:
    - User: Current user's account information
    """
    return user


logger.info("auth router initialized")
