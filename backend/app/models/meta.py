from pydantic import BaseModel


class PerformanceMetrics(BaseModel):
    rps: float
    system_uptime: float
    average_response_time: float