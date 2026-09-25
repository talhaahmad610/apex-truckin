# Apex Truckin — Claude Code Master Prompt

---

## THE PROMPT (copy everything below this line)

---

You are a world-class full-stack developer and UI/UX designer. Build me a **premium, production-ready trucking dispatch website** called **"Apex Truckin"** from scratch. This must be the most visually impressive, performant, and feature-complete trucking website ever built — beating every competitor. Use every skill, library, and technique at your disposal. Do NOT cut corners.

---

## TECH STACK (mandatory, no substitutions)

- **Framework:** Next.js 15 (App Router, TypeScript strict mode)
- **Styling:** Tailwind CSS v4 + custom CSS variables for design tokens
- **Database & Auth:** Supabase (PostgreSQL) — for blog posts, testimonials, contact form submissions, newsletter signups
- **3D / Animation:** Three.js + React Three Fiber + Drei for 3D truck scene; GSAP + ScrollTrigger for scroll-driven animations; Framer Motion for UI transitions; Lenis for smooth scroll
- **CMS / Blog:** Blog content stored in Supabase (table: `posts` with fields: id, title, slug, excerpt, content, cover_image_url, published_at, category, author, read_time, meta_description). Expose a full REST API via Next.js API routes so the blog is fully dynamic and CMS-managed (testable via Postman/any REST client). Also create seed data with 3 sample posts.
- **Icons:** Lucide React
- **Fonts:** Inter (body) + Barlow Condensed or similar bold condensed font (headings) loaded via `next/font`
- **Forms:** React Hook Form + Zod validation, submissions saved to Supabase
- **SEO:** Full metadata API, sitemap.xml, robots.txt, JSON-LD structured data, Open Graph tags on every page
- **Image optimization:** Next.js `<Image>` component everywhere, WebP format
- **Deployment-ready:** `.env.example` file, README with setup instructions

---

## DESIGN LANGUAGE (critical — study these patterns)

### Color Palette
```
Primary Background: #0a0a0f (near-black, deep space)
Secondary Background: #0f1117 (slightly lighter panels)
Card Background: #13151f (with subtle glassmorphism)
Primary Accent: #f5a623 (amber/gold — premium trucking feel)
Secondary Accent: #e85d04 (deep orange — energy/power)
Text Primary: #ffffff
Text Secondary: #a0aec0
Border: rgba(245, 166, 35, 0.15)
Gradient 1: linear-gradient(135deg, #f5a623, #e85d04)
Gradient 2: linear-gradient(180deg, #0a0a0f 0%, #1a1f35 100%)
```

### Design Principles (inspired by LeadSyft.com structure applied to trucking)
- **Dark, premium, cinematic** — like a high-end automotive brand website
- **Glassmorphism cards** with `backdrop-filter: blur(14px)` and subtle amber borders
- **Sticky navbar** with blur backdrop, transitions from transparent to solid on scroll
- **Section numbering** (01, 02, 03...) as eyebrow labels like LeadSyft
- **Bold condensed headlines** in ALL CAPS for power and authority (like routerightsolution.com)
- **Reveal animations** on scroll — elements fade+slide up with staggered delays
- **Horizontal marquee ticker** between sections (truck-related capabilities scrolling)
- **Metric/stat cards** with large bold numbers (like LeadSyft's 33.2M, 78% stats)
- **Full-width section images** with gradient overlays (like routerightsolution.com)
- **Timeline/step processes** with connecting lines (like routerightsolution.com's process section)
- **Tabbed service selector** — click service type → image + description updates (like routerightsolution.com's services section)
- **Rating/testimonial banner** — 4.9★ carrier satisfaction with CTA

---

## 3D EFFECTS (mandatory — this is the premium differentiator)

### Hero 3D Truck Scene
- Use React Three Fiber to render a **3D semi-truck** in the hero section
- Load a GLTF truck model (use a free CC0 model from Kenney.nl or generate a procedural low-poly truck using Three.js BoxGeometry parts if no model available)
- If no GLTF available, build a **procedural 3D truck** from Three.js primitives (cab box, trailer box, wheels as cylinders, lights as spheres) — this is acceptable and preferred for performance
- The truck should have:
  - Metallic/chrome materials with environment mapping
  - Subtle amber headlights (PointLight)
  - Rotating wheels animation (continuous slow rotation)
  - **Scroll-linked parallax** — as user scrolls down, truck moves/rotates slightly using ScrollTrigger
  - Atmospheric fog in the scene
  - Grid floor with amber lines (like a highway lane)
- The canvas sits behind the hero text content

### Scroll-Driven 3D Effects
- **Route map parallax**: USA map SVG with animated truck path line drawn on scroll using SVG stroke-dashoffset
- **Stats counter animation**: numbers count up when scrolled into view
- **Service cards**: subtle 3D tilt on mouse hover using CSS `perspective` + `rotateX/Y` transforms
- **Floating particles**: ambient gold/amber particles floating in hero background using Three.js Points

---

## PAGES & ROUTES (all must be fully built, not placeholder)

### `/` — Homepage
Sections (in order):
1. **Navbar** — sticky, glassmorphism, logo left, nav links center/right, "GET STARTED" CTA button with gradient, mobile hamburger
2. **Hero Section** — Full viewport height; 3D truck scene canvas background; large condensed headline "APEX TRUCKIN" + "BUILT TO HAUL. BUILT TO WIN."; subheadline; two CTAs ("START DISPATCHING →" and "VIEW SERVICES"); animated downward scroll indicator; floating particles; amber gradient glow orbs
3. **Marquee Ticker** — Scrolling strip: "DRY VAN ◈ FLATBED ◈ REEFER ◈ HOTSHOT ◈ STEP DECK ◈ POWER ONLY ◈ BOX TRUCK ◈ 24/7 DISPATCH ◈ NATIONWIDE COVERAGE ◈"
4. **Stats / Social Proof** — Dark section; 4 metric cards: "500+" Loads Dispatched Monthly, "48 States" Coverage, "4.9★" Carrier Rating, "24/7" Dispatch Support. Numbers animate (count up) on scroll into view.
5. **About / Trust Section** — Full-width background image (trucking highway) with dark overlay; two-column layout; headline "YOUR FREIGHT. OUR RESPONSIBILITY."; 3 pillar cards: RELIABLE (01), PROFESSIONAL (02), ACCOUNTABLE (03) with descriptions; reveal on scroll
6. **Services Section** — Eyebrow "02 / WHAT WE DO"; headline "THE RIGHT DISPATCH FOR THE RIGHT HAUL"; left column: vertical tab list of service types; right column: large image + description + CTA that updates when tab clicked. Services: Dry Van, Flatbed, Reefer, Hotshot, Step Deck, Power Only, Box Truck
7. **How It Works** — Eyebrow "03 / THE PROCESS"; headline "LESS CHASING. MORE MOVING."; 4-step horizontal timeline with connecting line: CONNECT → FIND → NEGOTIATE → MOVE; each step has number, title, description; reveal with stagger
8. **USA Coverage Map** — Animated SVG USA outline map; animated dashed path from West to East coast with glowing truck icon; text "FROM HERE. TO THERE." headline; coverage stats below map
9. **Pricing / Rates** — Eyebrow "04 / PRICING"; 3 pricing cards: Starter (5% per load), Professional (flat monthly), Enterprise (custom); each has features list with checkmarks; highlighted "MOST POPULAR" card; pulsing border animation on featured card
10. **Blog Preview** — Eyebrow "05 / INSIGHTS"; "LATEST DISPATCH INSIGHTS" headline; 3-column grid of latest 3 blog posts fetched from Supabase API; each card has cover image, date, title, excerpt, "Read More →"; hover scale + border highlight
11. **Testimonials Section** — Eyebrow "06 / CARRIER VOICE"; "REAL DRIVERS. REAL RESULTS." headline; 3-column masonry-style testimonial cards fetched from Supabase; star ratings; carrier name + truck type; rating summary banner at bottom "4.9★ Average Carrier Satisfaction"
12. **CTA Banner** — Full-width dark gradient section; "READY TO KEEP YOUR TRUCK MOVING?" headline; "START DISPATCHING →" button; subtle animated background
13. **Contact Section** — Two-column: left has contact details (phone, email, WhatsApp) + map embed placeholder; right has contact form (Name, Email, Phone, Equipment Type dropdown, Message); form validates with Zod, submits to Supabase, shows success toast
14. **Footer** — Full-width background image (truck at sunset with overlay); company name + tagline; nav links; social links (Facebook, Instagram, LinkedIn, WhatsApp); legal links (Privacy, Terms); copyright

### `/services` — Services Page
- Hero with headline "COMPREHENSIVE TRUCK DISPATCH SERVICES"
- Individual service cards for each haul type with expanded descriptions, what's included, equipment requirements
- Service comparison table
- CTA to contact

### `/services/[slug]` — Individual Service Dynamic Page
- Dynamic route for each service (dry-van, flatbed, reefer, hotshot, step-deck, power-only, box-truck)
- Full page for each service: hero, what we do, benefits, process, pricing, FAQ, CTA
- SEO metadata generated dynamically

### `/about` — About Page
- Company story section
- Mission & values
- Team section (placeholder cards)
- Why choose Apex Truckin
- Carrier network stats
- CTA

### `/blog` — Blog Listing Page
- Grid of all published blog posts from Supabase
- Category filter pills (All, Dispatch Tips, Industry News, Owner-Operator, Regulations)
- Search bar (client-side filter)
- Pagination (6 per page)
- Featured post hero card at top
- SEO metadata

### `/blog/[slug]` — Blog Post Dynamic Page
- Full article from Supabase by slug
- Cover image (full-width with overlay)
- Article metadata (date, author, read time, category)
- Rich text content rendered as HTML (from `content` field)
- Table of contents sidebar (desktop)
- Related posts at bottom (same category)
- Social share buttons
- SEO: dynamic metadata, JSON-LD Article schema

### `/contact` — Contact Page
- Full-page contact form
- Map embed area
- Contact methods (phone, email, WhatsApp button)
- Business hours
- Form submits to Supabase `contact_submissions` table

### `/pricing` — Pricing Page
- Detailed pricing tiers
- Features comparison table
- FAQ accordion
- CTA

### `/carriers` — For Carriers Page
- Targeting owner-operators and fleets
- Benefits of joining
- How dispatch works
- Requirements
- Signup/contact CTA

### `/privacy` and `/terms` — Legal Pages
- Full privacy policy and terms of service content

---

## SUPABASE DATABASE SCHEMA

Create SQL migration file at `supabase/migrations/001_initial.sql`:

```sql
-- Blog posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT, -- HTML content
  cover_image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  category TEXT DEFAULT 'General',
  author TEXT DEFAULT 'Apex Truckin Team',
  read_time INT DEFAULT 5,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_name TEXT NOT NULL,
  truck_type TEXT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  location TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  equipment_type TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access for posts and testimonials
CREATE POLICY "Public posts read" ON posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public testimonials read" ON testimonials FOR SELECT USING (true);
-- Allow inserts from anon for forms
CREATE POLICY "Public contact insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public newsletter insert" ON newsletter_subscribers FOR INSERT WITH CHECK (true);
```

---

## API ROUTES (Blog CMS — testable via Postman)

Build these Next.js API routes:

- `GET /api/posts` — List all published posts (supports `?category=`, `?limit=`, `?offset=`)
- `GET /api/posts/[slug]` — Single post by slug
- `GET /api/posts/featured` — Latest featured/recent 3 posts (for homepage)
- `POST /api/posts` — Create post (requires `x-api-key` header for auth)
- `PUT /api/posts/[slug]` — Update post (requires `x-api-key` header)
- `DELETE /api/posts/[slug]` — Delete post (requires `x-api-key` header)
- `GET /api/testimonials` — All testimonials
- `POST /api/contact` — Submit contact form (saves to Supabase)
- `POST /api/newsletter` — Subscribe to newsletter

Include a `postman_collection.json` at root with all API routes pre-configured for easy import.

---

## ANIMATIONS SPECIFICATION

### GSAP ScrollTrigger
```
- Hero text: fade in from bottom on load (stagger 0.1s)
- Section eyebrows: slide in from left on scroll
- Section headlines: reveal up on scroll  
- Stat cards: stagger in from bottom (0.1s delay each)
- Service tabs: smooth cross-fade when switching
- Timeline steps: fade in left-to-right with connecting line drawing
- Testimonial cards: stagger in from bottom
```

### Framer Motion
```
- Page transitions: fade between routes
- Mobile menu: slide down from top
- Pricing cards: scale up on hover
- Blog cards: scale 1.02 + border glow on hover
- Service tab content: AnimatePresence crossfade
- Toast notifications: slide in from right
```

### Three.js / R3F
```
- Hero: procedural truck + rotating wheels + ambient particles
- Scroll: truck moves/tilts on ScrollTrigger progress
- Mouse: subtle truck rotation on mouse move (parallax)
- Lights: amber point lights + directional light + ambient
```

### CSS Animations
```
- Marquee ticker: infinite horizontal scroll
- Pulsing border on featured pricing card
- Glowing dot animation on "LIVE" indicators
- Gradient border shimmer on CTA buttons
- Floating animation on stat cards (subtle up/down)
```

---

## COMPONENT ARCHITECTURE

```
src/
  app/
    (marketing)/
      layout.tsx          # Shared Navbar + Footer
      page.tsx            # Homepage
      services/
        page.tsx
        [slug]/page.tsx
      about/page.tsx
      blog/
        page.tsx
        [slug]/page.tsx
      contact/page.tsx
      pricing/page.tsx
      carriers/page.tsx
      privacy/page.tsx
      terms/page.tsx
    api/
      posts/
        route.ts
        [slug]/route.ts
        featured/route.ts
      testimonials/route.ts
      contact/route.ts
      newsletter/route.ts
  components/
    3d/
      TruckScene.tsx      # R3F canvas with procedural truck
      TruckMesh.tsx       # The actual truck 3D mesh
      Particles.tsx       # Floating ambient particles
      GridFloor.tsx       # Highway grid floor
    layout/
      Navbar.tsx
      Footer.tsx
      MobileMenu.tsx
    sections/
      HeroSection.tsx
      MarqueeTicker.tsx
      StatsSection.tsx
      AboutSection.tsx
      ServicesSection.tsx
      HowItWorksSection.tsx
      CoverageMapSection.tsx
      PricingSection.tsx
      BlogPreviewSection.tsx
      TestimonialsSection.tsx
      CTABannerSection.tsx
      ContactSection.tsx
    ui/
      Button.tsx
      Card.tsx
      Badge.tsx
      AnimatedCounter.tsx
      RevealWrapper.tsx   # Scroll reveal HOC
      SectionLabel.tsx    # "01 / SECTION NAME" eyebrow
      Toast.tsx
      BlogCard.tsx
      TestimonialCard.tsx
      PricingCard.tsx
      ServiceTab.tsx
      FAQAccordion.tsx
    forms/
      ContactForm.tsx
      NewsletterForm.tsx
  lib/
    supabase.ts           # Supabase client (browser + server)
    api.ts                # API helper functions
    utils.ts              # cn(), formatDate(), etc.
    constants.ts          # Services data, nav links, etc.
    schemas.ts            # Zod validation schemas
  hooks/
    useScrollProgress.ts
    useAnimatedCounter.ts
    useMouseParallax.ts
  types/
    index.ts              # Post, Testimonial, etc. TypeScript types
```

---

## CONTENT / COPY

### Company Info
- **Name:** Apex Truckin
- **Tagline:** "Built to Haul. Built to Win."
- **Sub-tagline:** "Elite truck dispatch services for owner-operators and fleet carriers across the United States."
- **Phone:** +1 (888) 000-0000
- **Email:** dispatch@apextruckin.com
- **WhatsApp:** Link to wa.me
- **Social:** Facebook, Instagram, LinkedIn, Twitter/X

### Services
1. **Dry Van** — Standard enclosed trailer freight; most common loads; 48-state coverage
2. **Flatbed** — Open trailer for oversized/heavy freight; specialized load securement
3. **Reefer** — Temperature-controlled freight; 24/7 monitoring; food-grade loads
4. **Hotshot** — Expedited small loads; gooseneck trailers; time-sensitive freight
5. **Step Deck** — Lowered deck for taller cargo; versatile haul capability
6. **Power Only** — Drop-and-hook; no trailer; high-volume carrier operations
7. **Box Truck** — Last-mile and regional freight; straight truck dispatch

### How It Works Steps
1. **CONNECT** — Tell us about your truck, preferred lanes, and operation
2. **FIND** — We search load boards and broker networks for the best paying freight
3. **NEGOTIATE** — Our dispatchers work brokers for top rates on your behalf
4. **MOVE** — You haul the load while we handle paperwork, tracking, and payments

### Pricing Tiers
- **Starter** — 5% per load dispatched; Load finding & negotiation; Rate confirmation; 24/7 support; Up to 2 trucks
- **Professional** — $300/truck/month flat; Everything in Starter; Priority load access; Weekly performance reports; Unlimited trucks
- **Enterprise** — Custom pricing; Dedicated dispatcher; Custom lane preferences; Fleet management; API access; White-label option

### Blog Seed Posts (create 3 realistic posts in Supabase seed):
1. "How to Find the Best Paying Loads as an Owner-Operator in 2025"
2. "Dry Van vs Flatbed: Which Haul Type Is Right for Your Trucking Business?"
3. "5 Signs You Need a Professional Truck Dispatcher (And How It Pays for Itself)"

### Testimonials Seed Data (create 5 in Supabase):
1. Marcus J., Dry Van owner-operator, Dallas TX — "Apex Truckin found me loads paying 30% more than I was getting on my own. I haven't touched a load board in 6 months."
2. Sandra K., Flatbed carrier, Atlanta GA — "Professional, responsive, and they actually negotiate. Best dispatchers I've ever worked with."
3. DeShawn W., Reefer, Chicago IL — "24/7 support is real. Called at 2am with a load issue and someone picked up immediately."
4. Carlos M., Hotshot, Phoenix AZ — "Went from 3 loads a week to 7. Apex keeps my truck rolling."
5. Jennifer T., Box Truck, Miami FL — "They handle everything — rate cons, broker setup, paperwork. I just drive."

---

## PERFORMANCE & QUALITY REQUIREMENTS

- **Lighthouse score:** Target 90+ Performance, 100 SEO, 100 Accessibility
- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, FID < 100ms
- **Lazy load** all images and the 3D scene (dynamic import with Suspense + skeleton)
- **Error boundaries** around 3D components (fallback to static hero if WebGL unavailable)
- **Loading states** everywhere (skeleton cards for blog/testimonials)
- **Mobile-first** responsive design (all sections work perfectly on 320px+)
- **Accessibility:** ARIA labels on all interactive elements, keyboard navigation, focus styles
- **TypeScript strict:** No `any` types, full type safety throughout

---

## ENVIRONMENT VARIABLES

Create `.env.example`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
BLOG_API_KEY=your_secret_key_for_cms_api
NEXT_PUBLIC_SITE_URL=https://apextruckin.com
```

---

## WHAT TO BUILD FIRST (priority order)

1. Project setup (Next.js 15, TypeScript, Tailwind, dependencies)
2. Design tokens (CSS variables, Tailwind config)
3. Supabase setup (client, types, migration SQL)
4. Layout (Navbar, Footer)
5. Homepage (all sections)
6. 3D truck scene (TruckScene component)
7. API routes (blog CRUD + contact + newsletter)
8. Blog pages (listing + dynamic post)
9. Remaining pages (services, about, contact, pricing, carriers, legal)
10. Seed data (posts + testimonials)
11. Postman collection
12. README + `.env.example`

---

## FINAL NOTES

- **Do not use placeholder "TODO" sections** — every page must be complete
- **Do not use lorem ipsum** — write real trucking industry copy
- **Use real animation values** — not instant, not too slow (0.3-0.8s typical)
- **The 3D truck is mandatory** — if WebGL fails, show a CSS/SVG animated truck as fallback
- **The blog API must work with Postman** — proper JSON responses, status codes, error handling
- **Make it beautiful** — this is a premium brand, every pixel matters
- **Mobile hamburger menu** must work with smooth animation
- **WhatsApp floating button** (bottom-right, green, like thetruckdispatch.com)
- Generate all files. Do not ask me for clarification — make the best decisions and build it.

Start building now. Begin with project initialization and work through the priority list.
