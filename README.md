# Red King (foundation)

Red King (foundation) - personal experimental remediation validation platform.

Scope
-----
This repository contains only the minimal foundation required to run the
personal experimental Red King system locally. It is NOT an enterprise or
production system. The current project purpose is to provide a single-user
local environment to implement and test a closed-loop remediation-validation
experiment.

What's included (foundation only)
---------------------------------
- Python package `redking` with a minimal FastAPI app providing `/health`.
- Placeholder worker (no job processing yet).
- Dockerfile and docker-compose.yml with Postgres, api, and worker services.
- Alembic scaffolding for future DB migrations.

Prerequisites
-------------
- Docker
- Docker Compose (v2 or compatible)
- Python 3.11 (for local development, optional)

Quickstart (local)
------------------
1. Copy the example env file and edit if needed:

   cp .env.example .env
   # edit .env and set POSTGRES_PASSWORD to a secure local value

2. Start the environment:

   docker compose up --build -d

3. Check services:

   docker compose ps

4. Health endpoint (API):

   curl -sS http://127.0.0.1:8000/health

   Expected response: {"status": "ok"}  (or {"status":"ok","db":"ok"} if DATABASE_URL points to a reachable database)

5. Stop the environment:

   docker compose down -v

Notes
-----
- No domain logic, adapters, or validation engine are implemented in this
  foundation commit. Those components will be added in later tasks.
- The legacy artifacts that previously existed in the repository were
  removed to keep the workspace focused on Red King foundation.
