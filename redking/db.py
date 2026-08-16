"""Minimal DB utility for Red King foundation.

Provides a convenience function to create an async SQLAlchemy engine from
DATABASE_URL environment variable. This module is intentionally tiny and
is used only by the /health endpoint for a non-invasive connectivity check.
"""
from __future__ import annotations
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine


def get_engine() -> AsyncEngine | None:
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        return None
    # The engine is created without any echo or pool preconfiguration; it's
    # used briefly for a connectivity check and disposed afterwards.
    return create_async_engine(database_url, echo=False)
