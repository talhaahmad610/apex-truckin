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

- **Database:** `pg_dump` the `apex_truckin` database (`docker compose exec postgres pg_dump -U apex apex_truckin > backup.sql`).
- **Media/hero footage:** mirror the MinIO bucket with the AWS CLI against `S3_ENDPOINT` — e.g.
  `aws --endpoint-url http://127.0.0.1:9000 s3 sync s3://apex-media ./media-backup`.

## Deployment outline

This isn't a serverless app (Payload's jobs queue and file processing need a long-running Node process) — the
natural target is a small VPS running the same Postgres + MinIO compose stack, plus the Next app built with
`next build` and run with `next start`. A few things differ from local dev:

- `NEXT_PUBLIC_SITE_URL` and `S3_PUBLIC_URL` point at real hostnames (the latter typically a `media.` subdomain
  behind a reverse proxy, with HTTPS).
- Set `INTERNAL_SITE_URL` if the app container can't reach its own public URL — the hero-footage job calls back into
  `/api/revalidate` after each clip finishes processing.
- Narrow `MINIO_API_CORS_ALLOW_ORIGIN` (in `docker-compose.yml`) from `*` down to the site's real origin.
- Install ffmpeg in the image the app runs in.
- Verify a sending domain with Resend before production emails go out.
- Every secret in `.env.example` needs a real, unique production value — the ones there are local throwaway
  credentials only.

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
  app/(frontend)/(marketing)/   the public site: /, blog(/[slug]), services/[slug], [...slug] (the page builder)
  app/(frontend)/layout.tsx     public-site-only root layout (fonts, smooth scroll, toaster)
  app/(payload)/                Payload's admin UI + /cms-api, its own root layout
  app/api/                      contact, newsletter, posts*, preview, revalidate
  app/sitemap.ts, robots.ts, llms.txt/   SEO, fed from the CMS
  components/3d/                FlightScrub, CssTruck, DepthLayers, ParallaxImage, TiltCard, SmoothScroll (Lenis)
  components/blocks/            page-builder block renderers + RenderBlocks (the block → component dispatcher)
  components/sections/          section components blocks render (also used by services/[slug], the blog)
  components/ui/                Button, Card, PricingCard, BlogCard, TestimonialCard, FAQAccordion, …
  lib/                          cms.ts (CMS reads), tokens.ts, seo.ts, footage.ts, s3.ts, schemas (Zod), usa-map
  payload/                      collections/, globals/, blocks/ (Payload config), hooks/, access/
  payload.config.ts
scripts/                        seed-cms.ts, process-footage.ts, process-images.mjs, ffmpeg-path.mjs
assets/                         raw/ (source hero video), raw-images/ (source photos) — gitignored, CREDITS.md tracked
docker-compose.yml              Postgres + MinIO for local dev
```

## Notes

Stock footage/photos are free-license (Pexels/Unsplash) — see `assets/CREDITS.md` and `assets/IMAGE_CREDITS.md` for
sources and licenses.
