#!/bin/sh
# Restores snapshot/db.dump into an EMPTY database only — never touches one that already has
# content. Runs as a one-shot container (image: postgres:17-alpine, same image as the server
# itself, so pg_restore is always version-matched) before the app starts. See docker-compose.app.yml.
set -e

: "${DATABASE_URI:?DATABASE_URI is required}"
SNAPSHOT_FILE="/snapshot/db.dump"

already_initialized=$(psql "$DATABASE_URI" -tAc "SELECT to_regclass('public.payload_migrations') IS NOT NULL;")

if [ "$already_initialized" = "t" ]; then
  echo "[db-restore] database already initialized — skipping restore"
  exit 0
fi

if [ ! -f "$SNAPSHOT_FILE" ]; then
  echo "[db-restore] no $SNAPSHOT_FILE in the repo — nothing to restore (a fresh empty database; run 'npm run docker:seed' instead)"
  exit 0
fi

echo "[db-restore] restoring $SNAPSHOT_FILE ..."
pg_restore --no-owner --no-privileges --dbname "$DATABASE_URI" "$SNAPSHOT_FILE"
echo "[db-restore] done"
