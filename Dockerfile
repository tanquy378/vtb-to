FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Langflow WITHOUT composio components
RUN pip install --no-cache-dir langflow==1.0.18

# CRITICAL: Remove problematic composio folder after installation
RUN find /usr/local/lib -type d -name "composio" -exec rm -rf {} + 2>/dev/null || true

# Set environment
ENV LANGFLOW_AUTO_LOGIN=false \
    LANGFLOW_LOG_LEVEL=info \
    LANGFLOW_WORKERS=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

EXPOSE $PORT

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:${PORT:-8080}/health || exit 1

# Start command
CMD langflow run \
    --host 0.0.0.0 \
    --port ${PORT:-8080} \
    --backend-only
