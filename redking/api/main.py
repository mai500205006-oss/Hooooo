# redking api entrypoint
from __future__ import annotations
import os
import asyncio
from fastapi import FastAPI
from pydantic import BaseModel

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.exc import SQLAlchemyError

app = FastAPI(title="Red King (foundation)")


@app.get("/health")
async def health():
    """Return basic health plus optional DB connectivity status.

    If DATABASE_URL is not set the endpoint will return {"status":"ok"}.
    If DATABASE_URL is set the endpoint will attempt a short async DB connect
    (no schema changes or migrations) and return db: "ok" or "unreachable".
    """
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        return {"status": "ok"}

    # lightweight DB connectivity check
    try:
        engine = create_async_engine(database_url, connect_args={}, echo=False)
        async with engine.connect() as conn:
            await conn.execute("SELECT 1")
        await engine.dispose()
        return {"status": "ok", "db": "ok"}
    except SQLAlchemyError as e:
        return {"status": "ok", "db": "unreachable", "reason": str(e)}
    except Exception as e:
        return {"status": "ok", "db": "unreachable", "reason": str(e)}
