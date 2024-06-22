"""TOFILL"""
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.settings import get_settings
from app.core.logging import get_logger
from app.db.db import get_db

settings = get_settings()
logger = get_logger(__name__)

router = APIRouter(prefix="/TOFILL")

@router.get("/")
def TO_FILL():
    """TOFILL"""
    pass

logger.info("TOFILL router initialized")
