# Apex Truckin

Premium truck dispatch marketing site — Next.js 15 (App Router, TypeScript strict), Tailwind CSS v4, Supabase-backed blog/testimonials/forms, and a scroll-scrubbed cinematic hero built **without Three.js/React Three Fiber**.

## 3D, without WebGL

The brief called for a 3D truck hero. Instead of Three.js/R3F this build uses a **hybrid** approach:

- **Hero — scroll-scrubbed camera flight** (`src/components/3d/FlightScrub.tsx`): four pre-graded video clips are loaded as blobs and scrubbed by `currentTime` as you scroll (GSAP ScrollTrigger drives progress, not native video playback), crossfading at seams, with copy "beats" pinned over the footage. No WebGL, ~13 MB desktop / ~7 MB mobile for the whole chain. Falls back to a poster image, and further to a **procedural CSS 3D truck** (`CssTruck.tsx`, real `preserve-3d` boxes + spinning wheel discs) if video is unavailable or `prefers-reduced-motion` is set.
- **Everywhere else** — CSS `perspective`/`preserve-3d` + GSAP: tilt-on-hover cards (`TiltCard.tsx`), multi-plane parallax depth (`DepthLayers.tsx`, `ParallaxImage.tsx`), a pinned 3D process timeline (`HowItWorksSection.tsx`), and a hand-built SVG USA map with a scroll-drawn route (`CoverageMapSection.tsx`, `lib/usa-map.ts`).

Footage in `public/flight/` is generated from raw clips in `assets/raw/` via `npm run footage` (ffmpeg — trims, grades, encodes short-GOP scrub-friendly MP4s, extracts posters, writes `src/lib/flight-manifest.json`). Swap in new source clips (stock, Blender renders, AI-generated) and re-run the script; no code changes needed. See `assets/CREDITS.md` for the current clips' licenses.

## Tech stack

Next.js 15 · TypeScript (strict) · Tailwind CSS v4 · Supabase (Postgres) · GSAP + ScrollTrigger · Lenis (smooth scroll) · Framer Motion · React Hook Form + Zod · Lucide icons · `next/font` (Geist + Barlow Condensed).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase + BLOG_API_KEY, or leave as-is to run on seed data
npm run dev
```

The site runs fully **without Supabase configured** — API routes and pages fall back to the seed data in `src/lib/seed-data.ts` (3 posts, 5 testimonials). Configure Supabase to enable live CMS writes and the contact/newsletter forms.

### Supabase setup

1. Create a project, then run the migration: paste `supabase/migrations/001_initial.sql` into the SQL editor (or `supabase db push`).
2. Seed data: `npm run seed:sql` regenerates `supabase/seed.sql` from `src/lib/seed-data.ts` — paste it into the SQL editor.
3. Fill in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Project Settings → API.
   - `SUPABASE_SERVICE_ROLE_KEY` — server-only, powers the CMS write API. **Never** expose to the client.
   - `BLOG_API_KEY` — a random secret (`openssl rand -hex 32`) sent as the `x-api-key` header on write requests.

### Footage & images

```bash
npm run footage   # assets/raw/leg-N.mp4 → public/flight/{desktop,mobile}/*.mp4 + posters + manifest
npm run images    # assets/raw-images/*.jpg → public/images/*.webp (resized, graded)
```

Requires `ffmpeg` on PATH (or set `FFMPEG_BIN` to its folder). Windows: `winget install Gyan.FFmpeg`.

## Blog CMS API

REST API for the `posts` table, testable via Postman (`postman_collection.json` — import it, set `baseUrl` and `apiKey` collection variables).

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/posts` | — | List published posts. Query: `category`, `limit`, `offset` |
| GET | `/api/posts/featured` | — | Latest 3 posts (homepage) |
| GET | `/api/posts/[slug]` | — | Single post |
| POST | `/api/posts` | `x-api-key` | Create a post |
| PUT | `/api/posts/[slug]` | `x-api-key` | Partial update |
| DELETE | `/api/posts/[slug]` | `x-api-key` | Delete |
| GET | `/api/testimonials` | — | All testimonials |
| POST | `/api/contact` | — | Contact form → `contact_submissions` |
| POST | `/api/newsletter` | — | Newsletter signup → `newsletter_subscribers` |

All responses are `{ data, meta? }` on success or `{ error, details? }` on failure, with standard status codes (200/201/400/401/404/409/422/429/503).

## Project structure

```
src/
  app/(marketing)/     routes: /, services(/[slug]), about, blog(/[slug]), contact, pricing, carriers, privacy, terms
  app/api/             posts, posts/[slug], posts/featured, testimonials, contact, newsletter
  app/sitemap.ts, robots.ts, llms.txt/   SEO
  components/3d/       FlightScrub, CssTruck, DepthLayers, ParallaxImage, TiltCard, SmoothScroll (Lenis)
  components/sections/ homepage + inner-page sections
  components/ui/       Button, Card, PricingCard, BlogCard, TestimonialCard, FAQAccordion, …
  lib/                 constants, seed-data, api (Supabase + fallback), schemas (Zod), seo, gsap, usa-map
scripts/                process-footage.mjs, process-images.mjs, generate-seed.mts, ffmpeg-path.mjs
supabase/               migrations/001_initial.sql, seed.sql (generated)
assets/                 raw/ (source video), raw-images/ (source photos) — gitignored, CREDITS.md tracked
```

## Scripts

`dev` · `build` · `start` · `lint` · `typecheck` · `footage` · `images` · `seed:sql`

## Notes

- Stock footage/photos are free-license (Pexels/Unsplash) — see `assets/CREDITS.md` and `assets/IMAGE_CREDITS.md` for sources and licenses.
- Phone/email/address in `src/lib/constants.ts` are placeholders — update before launch.
