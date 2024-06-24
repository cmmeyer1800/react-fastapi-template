from fastapi import APIRouter

from app.core.settings import get_settings

from app.routes.admin import router as admin_router
from app.routes.auth import router as auth_router

settings = get_settings()

router = APIRouter(prefix=settings.api_prefix)
router.include_router(admin_router)
router.include_router(auth_router)
