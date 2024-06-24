from datetime import datetime, timedelta, timezone
from typing import Union

from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
import jwt

from app.core.settings import get_settings

settings = get_settings()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

CRED_EXCEPTION = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_pwd(plain_password: str, hashed_password: str):
    """Verify password against password hash
    
    Args:
        plain_password (str): Plain text password
        hashed_password (str): Hashed password
    
    Returns:
        bool: True if password is correct, False otherwise
    """
    return pwd_context.verify(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


def hash_pwd(password: str):
    """Hash password
    
    Args:
        password (str): Password to hash
    
    Returns:
        str: Hashed password
    """
    return pwd_context.hash(password.encode("utf-8"))


def create_access_token(data: dict, expires_delta: Union[timedelta, int, None] = None) -> str:
    """Create access token
    
    Args:
        data (dict): Data to encode
        expires_delta (Union[timedelta, int, None], optional): Expiry time delta

    Returns:
        str: Encoded JWT token
    """
    to_encode = data.copy()
    if expires_delta:
        if isinstance(expires_delta, int):
            expires_delta = timedelta(minutes=expires_delta)
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + \
            timedelta(minutes=settings.access_token_expire_minutes)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm='HS256')
    return encoded_jwt


def decode_jwt_token(token: str):
    """Decode JWT token
    
    Args:
        token (str): JWT token
    
    Returns:
        str: User ID (email)
    """
    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=['HS256']
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise CRED_EXCEPTION
        return user_id
    except InvalidTokenError as error:
        raise CRED_EXCEPTION from error
