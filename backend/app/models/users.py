from pydantic import BaseModel


class User(BaseModel):
    """User model"""
    id: int
    username: str
    email: str
    full_name: str
    is_active: bool
    is_superuser: bool
    created_at: str
    updated_at: str
