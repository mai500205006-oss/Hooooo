"""Placeholder worker for Red King foundation.

This worker is intentionally minimal: it runs an asyncio loop and listens
for SIGINT/SIGTERM to perform a clean shutdown. It does not implement any
job processing or queue logic — that will be added in a future task.
"""
from __future__ import annotations
import asyncio
import logging
import signal
import sys

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("redking.worker")

SHUTDOWN = False


def _handle_signal(signame: str) -> None:
    global SHUTDOWN
    log.info("received signal %s, beginning shutdown", signame)
    SHUTDOWN = True


async def _main_loop() -> None:
    log.info("redking worker placeholder starting up")
    try:
        while not SHUTDOWN:
            # Placeholder: in future this loop will claim jobs from Postgres.
            await asyncio.sleep(1)
    finally:
        log.info("redking worker shutting down")


def main() -> None:
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    for sig in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(sig, lambda s=sig: _handle_signal(s.name))

    try:
        loop.run_until_complete(_main_loop())
    except Exception:
        log.exception("worker crashed")
        raise
    finally:
        loop.close()


if __name__ == "__main__":
    main()
