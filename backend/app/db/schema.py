"""TOFILL Database Schema
Schematics for objects in the database
"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

# pylint: disable=too-few-public-methods
class User(Base):
    """User model"""
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    first = Column(String, nullable=True)
    last = Column(String, nullable=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())
    failed_login_attempts = Column(Integer, default=0)
