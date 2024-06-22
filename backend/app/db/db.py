"""TOFILL Database Driver
Database nuts and bolts
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.settings import get_settings

settings = get_settings()

connect_args = {"check_same_thread": False} if "sqlite" in settings.database_uri else {}
engine = create_engine(settings.database_uri, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# DB Dependency
def get_db():
    """Get a database connection"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
