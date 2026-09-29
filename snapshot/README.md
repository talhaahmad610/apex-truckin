# Content snapshot

A committed mirror of local content, so a fresh clone (anywhere — another machine, a server) can
restore it automatically instead of starting from a blank database.

- `db.dump` — a `pg_dump -Fc` (custom format) dump of the `apex_truckin` database.
- `media/` — a mirror of **every** object in the S3/MinIO bucket (CMS images today; once you upload
  hero footage through the admin, this also picks up the processed `flight/` clips and the private
  `raw/` originals, so "Reprocess" keeps working after a restore).
- `media.manifest.json` — each object's key, size, content type and cache-control header.

**Regenerate after any local content change** you want to carry over, then commit:

```bash
npm run snapshot:export
```

**Restore** happens automatically the first time `npm run docker:up` boots against an empty
database/bucket (see `scripts/db-restore.sh`, `scripts/snapshot.ts`, and `docker-compose.app.yml`'s
`db-restore`/`media-restore` services) — it's a no-op on every run after that. To restore by hand:

```bash
npm run snapshot:import
```

See the README's "Run it in Docker" section for the full picture.
