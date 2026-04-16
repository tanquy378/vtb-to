# CLAUDE.md — vtb-to

This file provides guidance for AI assistants (and developers) working in this repository.

---

## Project Overview

**vtb-to** is a containerized deployment configuration for running [Langflow](https://github.com/langflow-ai/langflow) on [Railway.app](https://railway.app). Langflow is an open-source, low-code framework for building LLM-powered applications via a visual flow editor.

This repository does **not** contain application source code. It contains the infrastructure configuration needed to deploy Langflow as a hosted API backend.

### Current State

As of April 2026, all deployment files were removed from the repository (see git history). The repo holds only the `.git` directory. If you are restoring or rebuilding this project, refer to the **Historical Configuration** section below.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Runtime | Python 3.11-slim (Docker) |
| Framework | Langflow 1.0.18 |
| Deployment platform | Railway.app |
| Container | Docker |

---

## Historical Configuration

### `Dockerfile`

The project used a minimal Python 3.11 Docker image:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential curl git \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir langflow==1.0.18

# Composio components must be removed — they cause runtime errors
RUN find /usr/local/lib -type d -name "composio" -exec rm -rf {} + 2>/dev/null || true

ENV LANGFLOW_AUTO_LOGIN=false \
    LANGFLOW_LOG_LEVEL=info \
    LANGFLOW_WORKERS=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

EXPOSE $PORT

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:${PORT:-8080}/health || exit 1

CMD langflow run \
    --host 0.0.0.0 \
    --port ${PORT:-8080} \
    --backend-only
```

**Key decisions in the Dockerfile:**
- `--backend-only`: Langflow runs as an API only (no frontend UI). This reduces resource usage and is appropriate for programmatic use.
- Composio removal: Langflow 1.0.18 bundles composio integration files that cause import errors at runtime. They must be explicitly deleted after installation.
- `$PORT`: Railway.app injects the port via environment variable. The Dockerfile falls back to `8080` if unset.

### `railway.json`

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

### `.dockerignore`

```
__pycache__
*.pyc
*.pyo
.git
.gitignore
*.md
venv/
env/
.env.local
node_modules/
```

---

## Environment Variables

| Variable | Value | Purpose |
|---|---|---|
| `LANGFLOW_AUTO_LOGIN` | `false` | Require authentication; do not auto-login as admin |
| `LANGFLOW_LOG_LEVEL` | `info` | Standard log verbosity |
| `LANGFLOW_WORKERS` | `1` | Single Uvicorn worker (appropriate for Railway free tier) |
| `PYTHONDONTWRITEBYTECODE` | `1` | Suppress `.pyc` file generation in the container |
| `PYTHONUNBUFFERED` | `1` | Force stdout/stderr to be unbuffered (important for log streaming) |
| `PORT` | *(injected by Railway)* | Port the server listens on; defaults to `8080` |

---

## Architecture

```
Railway.app
  └── Docker container (Python 3.11-slim)
        └── Langflow 1.0.18 (backend-only mode)
              └── REST API  →  /health, /api/v1/...
```

- **Stateless**: No persistent volumes are configured. Flow definitions are stored in Langflow's default SQLite database inside the container (ephemeral). For production use, configure an external Postgres database via `LANGFLOW_DATABASE_URL`.
- **Single replica**: Configured with one replica and ON_FAILURE restart policy (max 3 retries).
- **Health check**: Railway and Docker use the `/health` endpoint to determine container readiness.

---

## Development Workflow

### Restoring the project

If you need to recreate deployment files from scratch:

1. Copy the Dockerfile from the **Historical Configuration** section above.
2. Copy `railway.json` and `.dockerignore` from the same section.
3. Commit all three files.
4. Connect the repository to Railway.app and deploy.

### Building locally

```bash
docker build -t vtb-to .
docker run -p 8080:8080 -e PORT=8080 vtb-to
```

Then verify: `curl http://localhost:8080/health`

### Upgrading Langflow

Change the version pin in the Dockerfile:
```dockerfile
RUN pip install --no-cache-dir langflow==<new-version>
```

Always verify the composio removal step still works after upgrades — the path may change with new Langflow versions.

---

## Known Issues & Gotchas

1. **Composio compatibility**: Langflow 1.0.18 ships with composio integration that throws `ImportError` at runtime. The `find ... -exec rm -rf` step in the Dockerfile removes those directories. If you upgrade Langflow, verify this is still necessary and that the path hasn't changed.

2. **Ephemeral storage**: The Railway deployment has no persistent volume. Flows saved in the Langflow UI will be lost on container restart. Use the Langflow API to export/import flows, or configure `LANGFLOW_DATABASE_URL` to point to a persistent Postgres instance.

3. **LANGFLOW_AUTO_LOGIN=false**: Without this, Langflow creates a default admin user automatically. With it disabled, you must manage users explicitly via the API or environment-based credentials.

4. **Port binding**: Always use `${PORT:-8080}` (not a hardcoded port) to remain compatible with Railway's dynamic port injection.

---

## Repository Conventions

- **No source code**: This is a deployment-only repo. Do not add application logic here.
- **No tests**: There is no test suite. The Docker HEALTHCHECK is the only runtime validation.
- **Commit style**: Single-purpose commits with short imperative messages (e.g., `Create Dockerfile`, `Update Langflow to 1.1.0`).
- **Branch naming**: Feature branches follow the pattern `claude/<description>-<id>` for AI-assisted changes.

---

## Useful Commands

| Task | Command |
|---|---|
| Build Docker image | `docker build -t vtb-to .` |
| Run container locally | `docker run -p 8080:8080 -e PORT=8080 vtb-to` |
| Check health | `curl http://localhost:8080/health` |
| View Langflow API docs | Open `http://localhost:8080/docs` in browser |
| View git history | `git log --oneline --all` |
