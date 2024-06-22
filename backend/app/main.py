"""GMC Main
Main application creation logic

Author: Collin Meyer
Created: 2024-01-10 23:11
"""
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.routes import router as api_router
from app.core.settings import get_settings
from app.core.logging import get_logger
from app.db.utils import init as db_init
from app.db.db import engine
from app.db.schema import Base

settings = get_settings()
logger = get_logger(__name__)


def get_application() -> FastAPI:
    """FastAPI application factory"""

    application = FastAPI(
        title=settings.title,
        version=settings.version,
        docs_url=settings.docs_url,
        openapi_url=settings.openapi_url,
    )

    # Database Init
    Base.metadata.create_all(bind=engine, checkfirst=True)
    db_init()

    # Middleware Init
    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    logger.info("CORS middleware initialized")
    logger.debug("CORS hosts: %s", settings.cors_origins)

    # Router Init
    application.include_router(api_router)
    logger.info("API routers initialized")

    logger.info("Application initialized")

    return application


app = get_application()