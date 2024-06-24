from datetime import datetime
from typing import Optional
from enum import Enum

from pydantic import BaseModel


#pylint: disable=too-few-public-methods missing-class-docstring
class User(BaseModel):
    """User model"""
    email: str
    first: Optional[str] = None
    last: Optional[str] = None
    is_active: bool
    is_superuser: bool
    time_created: Optional[datetime] = None
    time_updated: Optional[datetime] = None


class UserCreate(BaseModel):
    """User create model"""
    email: str
    password: str
    first: str
    last: str
    is_superuser: bool = False
    is_active: bool = True


class UserUpdate(BaseModel):
    """User update model"""
    email: str
    password: str = None
    first: str = None
    last: str = None
    is_superuser: bool = None
    is_active: bool = None

class Grant(str, Enum):
    admin = "admin"
    user = "user"

class Token(BaseModel):
    access_token: str
    token_type: str
    grants: list[Grant]
