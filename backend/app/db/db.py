"""TOFILL Database Driver
Database nuts and bolts
"""
import time
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.settings import get_settings
from app.core.logging import get_logger

settings = get_settings()
logger = get_logger(__name__)


def connect_db(timeout: int = 30):
    """Connect to the database"""
    connected = False
    start = time.time()
    while not connected:
        try:
            connect_args = {"check_same_thread": False} if "sqlite" in settings.database_uri else {}
            engine = create_engine(settings.database_uri, connect_args=connect_args)
            SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
            connected = True
        except Exception as e:
            print(f"Error: {e}")
            if time.time() - start > timeout:
                raise TimeoutError(f"Database connection timeout after {timeout}") from e

    logger.info("Database connected")
    return SessionLocal, engine


SessionLocal, engine = connect_db()

# DB Dependency
def get_db():
    """Get a database connection"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
