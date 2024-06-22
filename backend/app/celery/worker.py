import time

from celery import Celery

from app.core.settings import get_settings

settings = get_settings()


celery = Celery(__name__)
celery.conf.broker_url = settings.redis_uri
celery.conf.result_backend = settings.redis_uri


# @celery.task(name="TOFILL")
# def TOFILL():
#     pass
