"""GMC Settings
Settings for the different environments of the application.
"""
from pathlib import Path
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


# pylint: disable=too-few-public-methods
class Settings(BaseSettings):
    """Development settings"""

    title: str = "TOFILL"
    version: str = "0.0.1"

    server_name: str = "http://localhost:8000"

    log_level: str = "DEBUG"
    log_file: Path = Path("./logs/gmc.log")

    cors_origins: list[str] = ["*"]

    api_prefix: str = "/api/v1"
    openapi_url: str = "/api/v1/openapi.json"
    docs_url: str = "/api/v1/docs"

    database_uri: str

    redis_uri: str = "redis://redis:6379"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_prefix="TOFILL_",
        case_sensitive=False,
    )


@lru_cache()
def get_settings() -> Settings:
    """Get settings"""
    return Settings()
