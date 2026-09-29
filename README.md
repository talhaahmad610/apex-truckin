# Apex Truckin

Truck dispatch marketing site — Next.js 16 (App Router, TypeScript strict), Tailwind CSS v4, and **Payload CMS 3**
embedded in the same app at `/admin`. Postgres + MinIO (S3-compatible storage) run locally via Docker; there is no
Supabase and no hardcoded content — services, pricing, FAQs, team, testimonials, blog, every page's layout, and even
the hero footage are all edited from the admin.

## 3D, without WebGL

The hero is a scroll-scrubbed camera flight, built **without Three.js/React Three Fiber**:

- **Hero** (`src/components/3d/FlightScrub.tsx`): a handful of pre-graded video clips are loaded as blobs and
  scrubbed by `currentTime` as you scroll (GSAP ScrollTrigger drives progress, not native video playback),
  crossfading at seams, with copy "beats" pinned over the footage. No WebGL. Falls back to a poster image, and
  further to a **procedural CSS 3D truck** (`CssTruck.tsx`, real `preserve-3d` boxes + spinning wheel discs) if video
  is unavailable or `prefers-reduced-motion` is set.
- **Everywhere else** — CSS `perspective`/`preserve-3d` + GSAP: tilt-on-hover cards (`TiltCard.tsx`), multi-plane
  parallax depth (`DepthLayers.tsx`, `ParallaxImage.tsx`), a pinned 3D process timeline (`HowItWorksSection.tsx`),
  and a hand-built SVG USA map with a scroll-drawn route (`CoverageMapSection.tsx`, `lib/usa-map.ts`).

The clips themselves are **admin-uploaded and processed server-side** — see [Hero footage](#hero-footage) below.

## Tech stack

Next.js 16 (App Router, Turbopack) · TypeScript (strict) · Tailwind CSS v4 · **Payload CMS 3** · PostgreSQL 17 ·
MinIO (S3-compatible storage) · GSAP + ScrollTrigger · Lenis (smooth scroll) · Framer Motion · React Hook Form + Zod
· Lucide icons · `next/font` (Geist + Barlow Condensed) · Resend (transactional email, optional).

## Local setup

1. Start **Docker Desktop**, then bring up Postgres + MinIO (a one-shot init container creates the bucket and its
   public-read policy):

   ```bash
   npm run infra:up
   ```

2. Copy the env file and fill in a couple of values:

   ```bash
   cp .env.example .env.local
   ```

   - `PAYLOAD_SECRET` — `openssl rand -hex 32`.
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — your first admin login, created by the seed below.
   - Everything else (`DATABASE_URI`, `S3_*`) already matches `docker-compose.yml`'s local throwaway credentials.
   - `RESEND_API_KEY` is optional locally — without it, emails are logged to the console instead of sent.
   - `FFMPEG_BIN` is optional — only needed if ffmpeg/ffprobe aren't already on `PATH` (see [Hero footage](#hero-footage)).

3. Install, migrate, seed, run:

   ```bash
   npm install
   npm run migrate   # applies the committed migrations in src/migrations/
   npm run seed       # creates the first admin user + today's content
   npm run dev
   ```

4. Open `http://localhost:3200` for the site, `http://localhost:3200/admin` to log in and edit it.

`npm run infra:down` stops Postgres/MinIO (data persists in Docker volumes between runs).

## Run it in Docker

The whole app — Next.js + Payload, ffmpeg baked in, no `node_modules` in the shipped image — also runs as a
multi-stage Docker image, with Postgres in its own container. This is the same path for local Docker use and for a
real server; only `.env.docker` differs between them.

**First time, local:**

```bash
cp .env.docker.example .env.docker
npm run infra:up      # this repo's own Postgres + MinIO (MinIO is local-dev-only, see below)
npm run docker:seed   # builds the tools image, migrates, seeds — first run only
npm run docker:up     # builds + starts the app
```

Open `http://localhost:3200`. `npm run docker:logs` tails the app; `npm run docker:down` stops everything.

**On a server:** MinIO/S3 is the lead dev's own endpoint, not this repo's — `.env.docker`'s `S3_*` values point at
it directly, and the app never starts or depends on this repo's `minio` service. There's no `npm` step at all:

```bash
git clone <this repo> && cd apex-truckin
cp .env.example .env.local && cp .env.docker.example .env.docker   # fill in real values
sh scripts/compose.sh up -d --build
```

No separate seed step: the committed snapshot restores your content automatically on first boot (below), and the
app creates its own first admin account at startup from `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD` in `.env.local` —
set a real password there (12+ characters, not the placeholder) before the first boot. `npm run seed` is a
*local-dev* convenience for a from-scratch database with no snapshot yet; running it against a server that already
has content would overwrite any edits made in the admin since the last export, so the server never runs it.

**Why no live database is needed to build the image:** `next build` normally pre-renders every CMS page, which
needs one — impossible from inside `docker build` (the build container can't reach a database that only exists
once the stack is running). Instead, the image builds with `SKIP_BUILD_STATIC_GENERATION=1`
(`src/lib/build-flags.ts`): CMS pages render on-demand at runtime instead (identical result, just not baked at
build time), and the running container applies pending migrations, seeds nothing on its own, and starts the jobs
queue itself the moment it boots (`src/instrumentation.ts`) — there's no separate `payload migrate` step to
remember on deploy.

**Your local content carries over automatically.** Whenever you change something locally you want to keep —
new services/pages/copy, an uploaded image, a processed hero clip — run:

```bash
npm run snapshot:export
```

and commit the result (`snapshot/db.dump` + `snapshot/media/` + its manifest — a few MB, all in the repo, nothing
external to keep track of). The **first** time `docker:up` runs against an empty database/bucket, it restores that
snapshot automatically (`db-restore` / `media-restore` in `docker-compose.app.yml`, via `scripts/db-restore.sh` /
`scripts/snapshot.ts`). Every run after that is a no-op, since it only ever restores into something empty; it never
overwrites existing content. This is what makes "the same database on the server" a `git push` + `docker:up`, not a
manual export/import someone has to remember to run.

**The dump never contains credentials or visitor data.** `npm run snapshot:export` (`scripts/db-export.sh`) excludes
the *data* of the `users`, `leads`, `subscribers`, and Payload's own internal `payload_preferences`/`payload_jobs`/
`payload_kv`/`payload_locked_documents` tables — only their (empty) schema ships, so the committed dump can never
leak a password hash, a session token, or a lead/subscriber's contact info. A restored server therefore starts with
zero users; its first admin is created automatically at boot from `SEED_ADMIN_EMAIL`/`SEED_ADMIN_PASSWORD` (see
`src/lib/ensure-admin.ts`), and Payload's normal "claim the first account" screen is disabled outright so nothing
else can create that first user.

**No ffmpeg to install, ever, anywhere** — `Dockerfile`'s final stage installs it inside the image itself
(`apk add ffmpeg`, ~70 MB), so a server only ever needs Docker.

## Editing the site

Everything below lives in `/admin`, grouped the same way in its sidebar:

- **Content**
  - **Site settings** — company name/legal name/founded year, phone/email/WhatsApp/address/hours, socials, the
    header/menu/WhatsApp button labels, rate & weekly-gross disclaimers, the main navigation, footer copy, and a
    **Scripts & tracking** tab for pasting analytics/Tag Manager/verification snippets (the site's security policy
    automatically allows exactly the domains a pasted snippet needs — no code change per tool).
  - **Shared content** — lists reused across more than one page (stats, the "full-service" items, steps, marquee
    items, carrier requirements, the pricing comparison table) plus the copy for the two page types that stay code
    (the blog index and service pages — see below).
  - **Services**, **Pricing plans**, **FAQs**, **Team**, **Testimonials**, **Hero footage** (below).
- **Pages** — **Home page** and **Pages** (the page builder: About, Carriers, Pricing, Contact, Services index,
  Privacy, Terms today, plus any new page you create). Both are built from reorderable, toggleable **blocks** —
  drag to reorder, untick to hide, add a new block, all without a deploy. Both support draft preview before
  publishing.
- **Blog** — **Blog posts** (rich text, drafts + scheduled publish, preview) and **Categories**.
- **CRM** — **Leads** (contact-form submissions; statuses New → Contacted → Qualified → Onboarded/Lost, follow-up
  dates, notes) and **Subscribers** (newsletter signups).
- **Settings** — **Users**, **Email notifications** (who gets a new-lead alert, the carrier auto-reply, and the
  contact-form success message).

### Hero footage

Upload a raw clip under **Hero footage** and it's encoded automatically: a background job validates it (rejects a
non-video file, one that's too long, or too high-resolution, with a clear error), encodes desktop/mobile variants
and posters with the same recipe every clip on the site uses, and publishes them once ready. The **previous** clip
keeps playing on the live site the entire time — a failed or in-progress encode never breaks the hero. Only one
clip encodes at a time, so uploading several in a row queues them rather than running ffmpeg concurrently.

ffmpeg/ffprobe must be reachable — either on `PATH`, or point `FFMPEG_BIN` (in `.env.local`) at the folder that
contains them. Windows: `winget install Gyan.FFmpeg`. If you'd rather batch-process clips from the filesystem
instead of uploading through the admin (e.g. for the very first clips on a fresh checkout), drop them in
`assets/raw/leg-N.mp4` and run:

```bash
npm run footage   # assets/raw/leg-N.mp4 → public/flight/{desktop,mobile}/*.mp4 + posters + manifest
npm run images    # assets/raw-images/*.jpg → public/images/*.webp (resized, graded)
```

`public/flight/*` and `src/lib/flight-manifest.json` are also the **fallback** the site falls back to if the CMS
has no ready clips (an empty database, or every uploaded clip failed to process) — the hero is never blank.

## Leads & notifications

A contact-form submission creates a **Lead** and, after the response is sent (so a slow email provider never delays
the visitor), emails everyone in **Email notifications → Send new-lead alerts to**, plus an optional auto-reply to
the carrier. Without `RESEND_API_KEY` set, both are logged to the console instead of sent — useful for local testing.
A newsletter signup creates or reactivates a **Subscriber**; a duplicate email is a no-op, not an error.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` / `build` / `start` | Next.js dev server / production build / production server |
| `npm run lint` / `typecheck` | ESLint / `tsc --noEmit` |
| `npm run infra:up` / `infra:down` | Start/stop the local Postgres + MinIO stack |
| `npm run migrate:create -- <name>` | Generate a migration from the current schema (stop the dev server first) |
| `npm run migrate` | Apply committed migrations |
| `npm run seed` | Seed today's content (idempotent — safe to re-run) and the first admin user |
| `npm run footage` | Batch-encode `assets/raw/*.mp4` → `public/flight/*` (see [Hero footage](#hero-footage)) |
| `npm run images` | Batch-encode `assets/raw-images/*.jpg` → `public/images/*.webp` |
| `npm run generate:types` | Regenerate `src/payload-types.ts` from the current collections/globals |
| `npm run generate:importmap` | Regenerate the admin panel's import map (after adding custom admin components) |
| `npm run payload` | Raw Payload CLI passthrough |
| `npm run snapshot:export` / `snapshot:import` | Mirror the database + bucket to/from `snapshot/` (see [Run it in Docker](#run-it-in-docker)) |
| `npm run docker:up` / `docker:down` / `docker:seed` / `docker:logs` | Build/run the app in Docker locally |

## Schema changes

Payload owns the database schema through committed migrations — there is no dev-mode auto-push, in dev or
production. After changing a collection/global/block:

```bash
# stop the dev server first — a running server holds a schema lock
npm run migrate:create -- a_short_name
npm run migrate
npm run generate:types
npm run seed          # if you added new fields with default values
```

**Troubleshooting:** if `payload migrate` ever hangs on an interactive prompt, a stray `dev`-mode row may have been
written to the `payload_migrations` table by an earlier, differently-configured run. Since `push: false` is set,
this shouldn't happen going forward — but if it does, delete that row from the table and re-run `migrate`.

## Backups

`npm run snapshot:export` (see [Run it in Docker](#run-it-in-docker)) is the one command that captures both the
database and the media bucket together, in the format the automatic restore expects — prefer it over ad hoc
one-off backups. The two halves it runs, if you ever need them separately:

- **Database:** `docker compose exec postgres pg_dump -U apex -Fc apex_truckin > backup.dump`.
- **Media/hero footage:** `npm run snapshot:export` writes `snapshot/media/` via the S3 API (works against any
  S3-compatible endpoint, not just this repo's MinIO); the AWS CLI's `s3 sync` is an equivalent one-liner if you
  just want a copy without the manifest: `aws --endpoint-url $S3_ENDPOINT s3 sync s3://apex-media ./media-backup`.

## Deployment outline

Not a serverless app — Payload's jobs queue and file processing need a long-running Node process — so the target
is a small VPS: Docker, this repo, and `sh scripts/compose.sh up -d --build` (see [Run it in Docker](#run-it-in-docker)
for the full first-run sequence). A few things differ from local dev:

- `NEXT_PUBLIC_SITE_URL` and `S3_PUBLIC_URL` in `.env.docker` point at real hostnames, with HTTPS. `S3_*` points at
  the lead dev's own S3-compatible endpoint — this repo's `minio` service is local-dev-only and is never started
  (no `--profile minio`) or depended on there.
- Set `INTERNAL_SITE_URL` only if the app container genuinely can't reach its own public URL — the hero-footage job
  calls back into `/api/revalidate` after each clip finishes; the default (the container's own loopback) covers the
  normal case.
- ffmpeg needs nothing done for it — it's baked into the image (`Dockerfile`), not installed on the server.
- Ask the lead dev to apply `infra/minio-bucket-policy.json` (substituting the real bucket name) on his endpoint, or
  let `npm run snapshot:import`/the automatic `media-restore` step attempt it — it warns rather than fails if the
  endpoint refuses.
- Verify a sending domain with Resend before production emails go out.
- Every secret in `.env.example`/`.env.docker.example` needs a real, unique production value — the ones there are
  local throwaway credentials only.
- Put a reverse proxy (Caddy/Nginx) in front of the app's published port for TLS.

## API

- **Public site routes:** `POST /api/contact`, `POST /api/newsletter` (validated, rate-limited, honeypot-protected).
- **Legacy blog write API:** `src/app/api/posts/*`, kept for existing integrations — `Authorization: users API-Key
  <key>` (a Payload user's API key) or the `x-api-key` header against `BLOG_API_KEY` as a transitional fallback.
- **Payload REST/GraphQL:** everything else is available at `/cms-api/*` (e.g. `GET /cms-api/services`), cookie- or
  API-key-authenticated per collection's access rules. `postman_collection.json` covers both the public routes and
  `/cms-api`.

## Project structure

```
src/
  app/(frontend)/(marketing)/   the public site: [[...slug]] (home + the page builder), blog(/[slug]), services/[slug]
  app/(frontend)/layout.tsx     public-site-only root layout (fonts, smooth scroll, toaster)
  app/(payload)/                Payload's admin UI + /cms-api, its own root layout
  app/api/                      contact, newsletter, posts*, preview, revalidate
  app/sitemap.ts, robots.ts, llms.txt/   SEO, fed from the CMS
  components/3d/                FlightScrub, CssTruck, DepthLayers, ParallaxImage, TiltCard, SmoothScroll (Lenis)
  components/blocks/            page-builder block renderers + RenderBlocks (the block → component dispatcher)
  components/sections/          section components blocks render (also used by services/[slug], the blog)
  components/ui/                Button, Card, PricingCard, BlogCard, TestimonialCard, FAQAccordion, …
  lib/                          cms.ts (CMS reads), tokens.ts, seo.ts, footage.ts, s3.ts, build-flags.ts, schemas (Zod)
  payload/                      collections/, globals/, blocks/ (Payload config), hooks/, jobs/, access/
  payload.config.ts
  instrumentation.ts             starts Payload (migrations, jobs cron) once at server boot
scripts/                        seed-cms.ts, snapshot.ts, process-footage.ts, process-images.mjs, db-restore.sh
assets/                         raw/ (source hero video), raw-images/ (source photos) — gitignored, CREDITS.md tracked
snapshot/                       committed db.dump + media/ mirror — restored automatically on a fresh deploy
Dockerfile, docker-compose.yml, docker-compose.app.yml   see "Run it in Docker"
```

## Notes

Stock footage/photos are free-license (Pexels/Unsplash) — see `assets/CREDITS.md` and `assets/IMAGE_CREDITS.md` for
sources and licenses.
