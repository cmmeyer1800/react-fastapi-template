"""Fastapp DB Functions"""
from sqlalchemy.exc import IntegrityError

from app.db.db import get_db
from app.db.schema import User as UserSchema
from app.core.settings import get_settings
from app.core.logging import get_logger
from app.core.auth import hash_pwd

settings = get_settings()
logger = get_logger(__name__)


def init():
    """Initialize the database"""
    db = next(get_db())
    logger.info("Initializing database")

    try:
        admin = UserSchema(
            email=settings.admin_email,
            hashed_password=hash_pwd(settings.admin_password),
            is_active=True,
            is_superuser=True,
        )
        db.add(admin)
        db.commit()
    except IntegrityError:
        logger.info("Admin user already exists")

    logger.info("Database initialized")
