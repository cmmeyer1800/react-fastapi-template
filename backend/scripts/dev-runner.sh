#! /usr/bin/env bash

alembic upgrade head

sleep 2

uvicorn app.main:app --host 0.0.0.0

sleep 2