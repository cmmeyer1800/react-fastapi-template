"""TOFILL"""
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models import User
from app.core.settings import get_settings
from app.core.logging import get_logger
from app.db.db import get_db
from app.db.schema import User as UserSchema

settings = get_settings()
logger = get_logger(__name__)

router = APIRouter(prefix="/admin")


#TODO: Add Validation For Admins Only
@router.get("/users", tags=["users"])
def get_users(page: int = 0, limit: int = 25, db: Session = Depends(get_db)) -> list[User]:
    """Get all users
    
    Paginated API to get all users

    Query Parameters:
    - page (int): Page number, default 0
    - limit (int): Number of items per page, default 25
    
    Returns:
    - List[User]: List of users
    """
    users = db.query(UserSchema).offset(page).limit(limit).all()
    return [User.model_validate(user) for user in users]


logger.info("TOFILL router initialized")
