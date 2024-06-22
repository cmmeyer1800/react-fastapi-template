from fastapi import APIRouter

from app.core.settings import get_settings
# from app.routes.TO_FILL import router as TO_FILL_router

settings = get_settings()

router = APIRouter(prefix=settings.api_prefix)
# router.include_router(TO_FILL_router)
