FROM python:3.12-slim-bookworm

RUN apt-get update
RUN apt-get install -y curl

COPY . /app
WORKDIR /app

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

# HEALTHCHECK --interval=2s --timeout=30s --start-period=5s --retries=10 CMD curl --fail --silent http://localhost:8000/api/v1/docs || exit 1