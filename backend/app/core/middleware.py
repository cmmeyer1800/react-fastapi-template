"""API Middleware Module"""
import time
from fastapi import Request, FastAPI

from app.core.logging import get_logger

logger = get_logger(__name__)


class PerformanceMiddleware():
    def __init__(self):
        self.start_time = time.time()
        self.request_count = 0
        self.moving_average = 0

    def add_request(self) -> None:
        self.request_count += 1

    def reset(self) -> None:
        self.start_time = time.time()
        self.request_count = 0

    def update_response_time(self, response_time: float) -> None:
        self.moving_average = self.moving_average + \
            ((response_time - self.moving_average) / self.request_count)

    @property
    def response_time(self) -> float:
        return self.moving_average

    @property
    def rps(self) -> float:
        return self.request_count / (time.time() - self.start_time)
    
    @property
    def uptime(self) -> float:
        return time.time() - self.start_time

perf_mid = PerformanceMiddleware()


def install_middleware(app: FastAPI) -> None:
    """Install middleware for the FastAPI application"""
    @app.middleware("http")
    async def add_process_time_header(request: Request, call_next):
        perf_mid.add_request()
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        perf_mid.update_response_time(process_time)
        return response

    logger.info("Custom Middleware installed")
