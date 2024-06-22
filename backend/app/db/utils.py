"""Fastapp DB Functions"""
from app.db.db import get_db
from app.core.settings import get_settings
from app.core.logging import get_logger

settings = get_settings()
logger = get_logger(__name__)


def init():
    """Initialize the database"""
    # db = next(get_db())

    logger.info("Database initialized (Note: Currently no init)")
