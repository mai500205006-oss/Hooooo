# Dockerfile for Red King foundation
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
WORKDIR /app

# Install minimal OS dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps (kept minimal for foundation)
RUN pip install --no-cache-dir fastapi uvicorn[standard] SQLAlchemy asyncpg alembic

# Copy package
COPY . /app

# Default command is to run the API; docker-compose can override to run worker
CMD ["uvicorn", "redking.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
