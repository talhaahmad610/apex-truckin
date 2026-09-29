#!/bin/sh
# Dumps the local dev Postgres into snapshot/db.dump for `npm run snapshot:export`, EXCLUDING the
# data (not the schema) of every table that holds credentials, sessions, or visitor PII — this
# dump is committed to the repo and auto-restored onto a fresh production database
# (scripts/db-restore.sh), so it must never carry the dev admin's password hash, live session
# tokens, or lead/subscriber data. See src/lib/ensure-admin.ts for how the first admin gets
# created on a server instead. Run via `sh` (not directly from package.json on Windows — cmd.exe
# mangles the quoted --exclude-table-data patterns).
set -e
cd "$(dirname "$0")/.."

OUT=snapshot/db.dump
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

docker compose exec -T postgres pg_dump -U apex -Fc --no-owner --no-privileges \
  --exclude-table-data='users*' \
  --exclude-table-data='payload_preferences*' \
  --exclude-table-data='payload_locked_documents*' \
  --exclude-table-data='payload_jobs*' \
  --exclude-table-data='payload_kv' \
  --exclude-table-data='leads*' \
  --exclude-table-data='subscribers' \
  apex_truckin >"$TMP"

# Self-check: fail loudly instead of silently committing a dump that leaked sensitive rows.
# No local pg_restore on this machine — run the listing inside the same postgres container
# db-restore.sh uses, piping the dump in over stdin (pg_restore reads stdin when no file is given).
LISTING="$(docker compose exec -T postgres pg_restore -l <"$TMP")"
LEAKED="$(printf '%s\n' "$LISTING" | grep -E 'TABLE DATA public (users|leads|subscribers|payload_(jobs|kv|preferences|locked_documents))' || true)"
if [ -n "$LEAKED" ]; then
  echo "[db-export] refusing to write $OUT — sensitive TABLE DATA found in the dump:" >&2
  printf '%s\n' "$LEAKED" >&2
  exit 1
fi

mv "$TMP" "$OUT"
trap - EXIT
echo "[db-export] wrote $OUT (schema for all tables; data excluded for users/sessions/leads/subscribers/payload_jobs/payload_kv/payload_preferences/payload_locked_documents)"
