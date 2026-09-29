#!/bin/sh
# Thin wrapper so every `docker compose` call for this app uses the same files/env, whether run
# via `npm run docker:*` or directly on a server that has no Node/npm installed at all.
#
#   sh scripts/compose.sh up -d --build          # server (no local MinIO)
#   sh scripts/compose.sh --profile minio up -d --build   # local dev (adds this repo's MinIO)
set -e
cd "$(dirname "$0")/.."

if [ ! -f .env.docker ]; then
  echo "Missing .env.docker — copy it first: cp .env.docker.example .env.docker" >&2
  exit 1
fi

exec docker compose --env-file .env.docker -f docker-compose.yml -f docker-compose.app.yml "$@"
