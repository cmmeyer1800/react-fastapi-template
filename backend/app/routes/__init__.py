from fastapi import APIRouter

from app.core.settings import get_settings

# from app.routes.TOFILL import router as TOFILL_router

settings = get_settings()

router = APIRouter(prefix=settings.api_prefix)
# router.include_router(TOFILL_router)
