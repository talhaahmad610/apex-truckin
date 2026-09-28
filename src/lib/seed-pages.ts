/**
 * Seed content for the page builder: the home page layout, the 7 builder pages that replace the
 * old hardcoded routes, and the shared lists (site-content). Read by scripts/seed-cms.ts.
 * `image` fields below hold a /public path string — the seed script resolves each one to a media
 * id via `ensureMedia` before writing.
 */

/** Wraps a plain string list as `{ text }` rows, matching every `textList()`-style array field. */
const rowsOf = (items: string[]) => items.map((text) => ({ text }));

/* ───────────────────────── shared content (site-content global) ───────────────────────── */

export const MARQUEE_ITEMS = ["Dry Van", "Flatbed", "Reefer", "Hotshot", "Step Deck", "Power Only", "Box Truck", "24/7 Dispatch", "Nationwide Coverage"];

export const STATS = [
  { value: 500, suffix: "+", label: "Loads Dispatched Monthly", decimals: 0 },
  { value: 48, suffix: " States", label: "Lower-48 Coverage", decimals: 0 },
  { value: 4.9, suffix: "★", label: "Carrier Rating", decimals: 1 },
  { value: 24, suffix: "/7", label: "Dispatch Support", decimals: 0 },
];

export const FULL_SERVICE = [
  { title: "Paperwork handled", body: "Rate confirmations, BOLs, PODs and broker setup packets handled on every load, plus invoicing and factoring submissions on Professional and Enterprise plans." },
  { title: "Broker negotiation", body: "We negotiate rates, detention and load terms with brokers on your behalf, and you approve every load before it's booked." },
  { title: "Problems solved", body: "Detention, layovers, TONU, cancellations and load issues — we deal with the broker so you keep driving." },
  { title: "Advance booking", body: "We plan and book your upcoming loads ahead whenever possible, so your truck isn't waiting on the board." },
  { title: "Backhaul planning", body: "We line up your next load before you deliver, to cut deadhead." },
  { title: "Smart load planning", body: "Local, regional and OTR freight matched to your truck, equipment, home time and preferred lanes." },
];

export const STEPS = [
  { title: "Connect", icon: "phone-call", body: "Tell us about your truck, equipment, home time and preferred lanes. Onboarding takes about 20 minutes — MC, W-9, COI and you're live." },
  { title: "Find", icon: "search", body: "We search DAT, Truckstop, and our private broker network for the highest-paying freight that fits your lanes and schedule." },
  { title: "Negotiate", icon: "handshake", body: "Our dispatchers work brokers hard for top rates, detention, and TONU terms — then send you the rate con to approve before we book." },
  { title: "Move", icon: "truck", body: "You haul. We handle check calls, paperwork, tracking updates, and invoicing or factoring submissions so you get paid fast." },
];

export const CARRIER_REQUIREMENTS = [
  "Active MC & USDOT number (new authorities welcome)",
  "Certificate of Insurance: $1M auto liability, $100K cargo",
  "Signed W-9",
  "Notice of Assignment if you use factoring",
  "ELD-compliant truck",
  "Safety rating not 'Unsatisfactory'",
];

/** feature → { starter, pro, ent } — mapped to real pricing-tier ids by seed-cms.ts. */
export const PRICING_COMPARISON: { feature: string; starter: boolean | string; pro: boolean | string; ent: boolean | string }[] = [
  { feature: "Load sourcing & negotiation", starter: true, pro: true, ent: true },
  { feature: "Rate confirmation handling", starter: true, pro: true, ent: true },
  { feature: "24/7 dispatch line", starter: true, pro: true, ent: true },
  { feature: "Broker setup packets", starter: true, pro: true, ent: true },
  { feature: "Trucks included", starter: "Up to 2", pro: "Unlimited", ent: "Unlimited" },
  { feature: "Priority load access", starter: false, pro: true, ent: true },
  { feature: "Weekly performance reports", starter: false, pro: true, ent: true },
  { feature: "Invoicing & factoring submissions", starter: false, pro: true, ent: true },
  { feature: "Dedicated dispatcher", starter: false, pro: false, ent: true },
  { feature: "Custom lane strategy", starter: false, pro: false, ent: true },
  { feature: "API access & TMS integration", starter: false, pro: false, ent: true },
  { feature: "White-label dispatch", starter: false, pro: false, ent: true },
];

/* ───────────────────────── home page layout ───────────────────────── */

export const HOME_LAYOUT = [
  {
    blockType: "flightHero",
    beats: [
      {
        railLabel: "Apex",
        eyebrow: "Dispatch desk live · 24/7",
        heading: "Apex",
        highlight: "Truckin",
        subheading: "Built to haul. Built to win.",
        body: "{{subTagline}} Higher-paying freight, fewer empty miles, and a dispatcher who picks up at 2 AM.",
        ctas: [
          { label: "Start Dispatching", href: "/contact", variant: "primary" },
          { label: "View Services", href: "/services", variant: "ghost" },
        ],
      },
      {
        railLabel: "24/7",
        eyebrow: "While you drive",
        heading: "We're already booking",
        highlight: "your next load.",
        body: "Your dispatcher plans loops, not one-offs — the backhaul is lined up before you deliver.",
        chips: [
          { icon: "clock-3", text: "Avg. booked in < 4 hrs" },
          { icon: "route", text: "< 10% deadhead" },
        ],
      },
      {
        railLabel: "Network",
        eyebrow: "Coast to coast",
        heading: "1,200+ brokers.",
        highlight: "One phone call.",
        body: "Private broker relationships and every major load board — working your lanes across all 48 states.",
        chips: [{ icon: "network", text: "DAT · Truckstop · Private network" }],
      },
      {
        railLabel: "Win",
        eyebrow: "Your truck. Your rules.",
        heading: "More miles.",
        highlight: "Better money.",
        body: "No forced dispatch. No contracts. You approve every load — we do the grinding.",
        ctas: [{ label: "Get My Free Lane Review", href: "/contact", variant: "primary" }],
      },
    ],
  },
  { blockType: "marquee", reverse: false },
  { blockType: "stats", label: "By the numbers", numbering: "counter", heading: "Proof on the", highlight: "odometer.", intro: "Real numbers from real carriers — loads booked, states covered and drivers who stay with us." },
  {
    blockType: "fullService",
    label: "Full-service dispatch",
    numbering: "dash",
    heading: "More than just",
    highlight: "load booking.",
    body: "You drive. We handle the rest — paperwork, broker negotiation, load problems and your next load, planned before you deliver.",
    cta: { label: "Our Story", href: "/about" },
    image: "/images/about-highway.webp",
    style: "split",
  },
  { blockType: "servicesTabs", label: "What we do", numbering: "counter", heading: "The right dispatch for", highlight: "the right haul." },
  { blockType: "howItWorks", label: "The process", numbering: "counter", heading: "Less chasing.", highlight: "More moving.", intro: "Four steps from first call to first load — most carriers are rolling within 24 hours." },
  {
    blockType: "coverageMap",
    label: "Local broker network",
    numbering: "dash",
    heading: "Local brokers.",
    highlight: "Direct shippers.",
    intro:
      "{{name}} connects owner-operators and fleets directly with local and regional freight brokers and shippers in 23 key states — not just the loads posted on DAT and Truckstop. Beyond these states, our dispatchers still find and book freight nationwide across all 48 contiguous states through DAT, Truckstop and our wider network of 1,200+ broker partners.",
    // `states` rows must be { text } objects, matching the "states" array field's own sub-field shape.
    regions: [
      { name: "West Coast", states: rowsOf(["California", "Oregon", "Washington", "Nevada", "Arizona"]) },
      { name: "Texas & South", states: rowsOf(["Texas", "Florida", "Louisiana", "Oklahoma", "Arkansas"]) },
      { name: "Midwest & Northeast", states: rowsOf(["Ohio", "Illinois", "Indiana", "Michigan", "Pennsylvania", "Missouri", "Wisconsin"]) },
      { name: "Southeast", states: rowsOf(["Georgia", "North Carolina", "South Carolina", "Tennessee", "Virginia", "Alabama"]) },
    ],
  },
  { blockType: "pricing", label: "Pricing", numbering: "counter", heading: "Straight rates.", highlight: "No surprises.", intro: "No contracts, no setup fees, no forced dispatch. Pick the plan that fits your fleet today — switch anytime." },
  { blockType: "blogPreview", label: "Insights", numbering: "counter", heading: "Latest dispatch", highlight: "insights.", cta: { label: "All Articles", href: "/blog" }, limit: 3 },
  { blockType: "testimonials", label: "Carrier voice", numbering: "counter", heading: "Real drivers.", highlight: "Real results." },
  { blockType: "ctaBanner", heading: "You drive.", highlight: "We handle the rest.", truck: true },
  {
    blockType: "contact",
    label: "Contact",
    numbering: "counter",
    heading: "Talk to a",
    highlight: "real dispatcher.",
    intro: "Tell us about your truck and lanes. We'll send back a free lane review with the rates you should be getting.",
    statusLine: "Dispatch desk online now",
    replyNote: "Avg. reply < 1 hr",
    style: "section",
  },
];

/* ───────────────────────── builder pages ───────────────────────── */

const TIMELINE_PARAGRAPHS = [
  { text: "After twelve years running dry van and reefer, our founder was tired of dispatchers who booked cheap freight, forced loads and disappeared after 5 PM. So he built the dispatch service he always wanted: one that treats every truck like its own business." },
  { text: "Today {{name}} is a team of dispatchers, former brokers and billing specialists. We still work the same way — plan loops instead of one-offs, negotiate every accessorial, send every load for approval, and pick up the phone at any hour." },
];

const TIMELINE_MILESTONES = [
  { year: "2019", title: "One truck, one phone", body: "Founder Ryan Mitchell starts dispatching for three owner-operator friends out of a Dallas apartment." },
  { year: "2021", title: "24/7 desk goes live", body: "We add overnight dispatchers after too many 2 AM broker calls went to voicemail at other firms." },
  { year: "2023", title: "Flatbed & reefer desks", body: "Specialist desks launch for open-deck and temperature-controlled freight." },
  { year: "2025", title: "500+ loads a month", body: "Apex now dispatches for carriers in all 48 states with a 4.9★ average rating." },
];

const VALUES_CARDS = [
  { title: "Driver first", body: "Every decision starts with what's best for the person behind the wheel." },
  { title: "Radical transparency", body: "You see every rate, every broker, every fee. Always." },
  { title: "Relentless hustle", body: "We work the phones until we find freight worth hauling." },
  { title: "Earned trust", body: "We grow when you grow. Our retention is our scoreboard." },
];

export const PAGES = [
  {
    slug: "about",
    title: "About",
    sitemapPriority: 0.7,
    changeFrequency: "monthly" as const,
    meta: {
      title: "About Apex Truckin — Dispatchers Who've Driven the Miles",
      description: "Founded in Dallas in 2019 by a former owner-operator, Apex Truckin dispatches 500+ loads a month for carriers across all 48 states. Meet the team and our values.",
    },
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "About Apex",
        heading: "Dispatchers who've",
        highlight: "driven the miles.",
        subtitle: "Founded in {{city}} in {{founded}}, {{name}} exists for one reason: to keep independent carriers loaded, paid and in control.",
        image: "/images/about-highway.webp",
        size: "default",
      },
      { blockType: "timeline", label: "Our story", numbering: "counter", heading: "Started in the cab.", highlight: "Built for carriers.", paragraphs: TIMELINE_PARAGRAPHS, milestones: TIMELINE_MILESTONES },
      { blockType: "values", label: "Mission & values", numbering: "counter", heading: "Our mission: make every independent carrier as profitable as the", highlight: "biggest fleets.", image: "/images/footer-sunset.webp", cards: VALUES_CARDS },
      { blockType: "team", label: "The team", numbering: "counter", heading: "The people", highlight: "on your line" },
      { blockType: "fullService", label: "Why Apex", numbering: "counter", heading: "Why carriers", highlight: "choose us", style: "compact", showStats: true },
      { blockType: "ctaBanner", heading: "Ready to keep your", highlight: "truck moving?", body: "Get a free lane review and your first load booked within 24 hours. No contracts. No forced dispatch.", truck: true },
    ],
  },
  {
    slug: "carriers",
    title: "Carriers",
    sitemapPriority: 0.8,
    changeFrequency: "monthly" as const,
    meta: {
      title: "For Carriers — Dispatch for Owner-Operators & Small Fleets",
      description: "Owner-operators and fleets: get higher-paying loads, less deadhead and 24/7 dispatch support. No forced dispatch, no contracts. See requirements and join Apex Truckin.",
    },
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "For owner-operators & fleets",
        heading: "Drive more.",
        highlight: "Earn more.",
        tail: "Stress less.",
        subtitle: "Join 150+ carriers who let Apex handle the load boards, the brokers and the paperwork — while they keep the wheels turning.",
        image: "/images/service-power-only.webp",
        cta: { label: "Join the Network", href: "/contact" },
        size: "default",
      },
      { blockType: "fullService", label: "What's included", numbering: "counter", heading: "More than just", highlight: "load booking", body: "Every Apex Truckin carrier gets the same six-part service, whether you run one truck or a growing fleet.", style: "cards" },
      { blockType: "steps", label: "How dispatch works", numbering: "counter", heading: "A week with", highlight: "Apex", style: "list" },
      {
        blockType: "requirements",
        label: "Requirements",
        numbering: "counter",
        heading: "What you'll need",
        highlight: "to start",
        intro: "Most carriers are onboarded in about 20 minutes. New authorities welcome — we'll help with broker setup.",
        cta: { label: "Start Onboarding", href: "/contact" },
      },
      { blockType: "testimonials", label: "Carrier voice", numbering: "counter", heading: "Real drivers.", highlight: "Real results." },
      { blockType: "faq", label: "FAQ", numbering: "none", heading: "Carrier questions", source: "group", group: "general" },
      { blockType: "ctaBanner", heading: "You drive.", highlight: "We handle the rest.", truck: false },
    ],
  },
  {
    slug: "pricing",
    title: "Pricing",
    sitemapPriority: 0.9,
    changeFrequency: "monthly" as const,
    meta: {
      title: "Truck Dispatch Pricing — 5% Per Load or $300/Truck Flat",
      description: "Transparent truck dispatch pricing: Starter at 5% per load, Professional at $300 per truck per month, or custom Enterprise plans. No contracts or setup fees.",
    },
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "Pricing",
        heading: "Pay for results.",
        highlight: "Not promises.",
        subtitle: "Simple, transparent dispatch pricing. No contracts, no setup fees, no forced dispatch — cancel anytime.",
        size: "short",
      },
      { blockType: "pricing", numbering: "none" },
      { blockType: "pricingCompare", label: "Compare plans", numbering: "none", heading: "Every feature,", highlight: "side by side" },
      { blockType: "faq", label: "FAQ", numbering: "none", heading: "Pricing questions", source: "group", group: "pricing" },
      { blockType: "ctaBanner", heading: "Ready to keep your", highlight: "truck moving?", body: "Get a free lane review and your first load booked within 24 hours. No contracts. No forced dispatch.", truck: true },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    sitemapPriority: 0.8,
    changeFrequency: "yearly" as const,
    meta: {
      title: "Contact Apex Truckin — 24/7 Truck Dispatch Support",
      description: "Talk to a truck dispatcher 24/7. Call {{phone}}, email {{email}} or message us on WhatsApp for a free lane review.",
    },
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "Contact",
        heading: "Let's get you",
        highlight: "loaded.",
        subtitle: "Send us your truck details and we'll come back with a free lane review — the rates, lanes and weekly gross you should be seeing.",
        size: "short",
      },
      { blockType: "contact", numbering: "none", formHeading: "Start dispatching", style: "page" },
      { blockType: "faq", label: "FAQ", numbering: "none", heading: "Before you call", source: "group", group: "general" },
    ],
  },
  {
    slug: "services",
    title: "Services",
    sitemapPriority: 0.9,
    changeFrequency: "monthly" as const,
    meta: {
      title: "Truck Dispatch Services — Dry Van, Flatbed, Reefer & More",
      description: "Comprehensive truck dispatch services for dry van, flatbed, reefer, hotshot, step deck, power only and box truck. Load sourcing, negotiation, paperwork and 24/7 support.",
    },
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "Services",
        heading: "Comprehensive truck",
        highlight: "dispatch services",
        subtitle: "Seven equipment types. One dispatch desk that knows the lanes, the brokers and the rates for every one of them.",
        image: "/images/service-dry-van.webp",
        cta: { label: "Get a Free Lane Review", href: "/contact" },
        size: "default",
      },
      { blockType: "marquee", reverse: false },
      { blockType: "servicesGrid" },
      { blockType: "servicesCompare", label: "Compare", numbering: "none", heading: "Side by", highlight: "side", emitCollectionLd: true },
      { blockType: "ctaBanner", heading: "Ready to keep your", highlight: "truck moving?", body: "Get a free lane review and your first load booked within 24 hours. No contracts. No forced dispatch.", truck: true },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    sitemapPriority: 0.2,
    changeFrequency: "yearly" as const,
    meta: { title: "Privacy Policy", description: "How Apex Truckin collects, uses and protects personal information from carriers, brokers and website visitors." },
    layout: [
      { blockType: "pageHero", eyebrow: "Privacy Policy", heading: "Privacy Policy", size: "legal", updated: "September 1, 2025" },
      { blockType: "richText", width: "820", content: null as unknown }, // filled by seed-cms.ts from PRIVACY_HTML
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    sitemapPriority: 0.2,
    changeFrequency: "yearly" as const,
    meta: { title: "Terms of Service", description: "The terms that govern use of the Apex Truckin website and truck dispatch services." },
    layout: [
      { blockType: "pageHero", eyebrow: "Terms of Service", heading: "Terms of Service", size: "legal", updated: "September 1, 2025" },
      { blockType: "richText", width: "820", content: null as unknown }, // filled by seed-cms.ts from TERMS_HTML
    ],
  },
];

/* ───────────────────────── legal copy (converted to Lexical by the seed script) ───────────────────────── */

export const PRIVACY_HTML = `
<p>This Privacy Policy explains how {{legalName}} (&ldquo;Apex Truckin,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses, shares and protects information when you visit apextruckin.com, contact us, or use our truck dispatch services.</p>

<h2>1. Information we collect</h2>
<h3>Information you provide</h3>
<ul>
<li><strong>Contact details</strong> — name, email address, phone number and company name submitted through our forms, email, phone or WhatsApp.</li>
<li><strong>Carrier information</strong> — MC and USDOT numbers, W-9, certificate of insurance, equipment type, preferred lanes and banking or factoring details needed to dispatch and invoice loads.</li>
<li><strong>Communications</strong> — messages, call notes and records of load approvals.</li>
</ul>
<h3>Information collected automatically</h3>
<ul>
<li>Device and browser type, IP address, pages viewed and referring URLs, collected through server logs and privacy-friendly analytics.</li>
<li>Cookies that are strictly necessary for the site to function. We do not use advertising cookies.</li>
</ul>

<h2>2. How we use information</h2>
<ul>
<li>To provide dispatch services: sourcing loads, negotiating rates, completing broker setup packets and submitting invoices.</li>
<li>To respond to inquiries and provide customer support.</li>
<li>To send newsletters or lane updates you've subscribed to (you can unsubscribe at any time).</li>
<li>To comply with legal obligations, enforce our terms and protect against fraud.</li>
<li>To improve our website and services.</li>
</ul>

<h2>3. How we share information</h2>
<p>We do not sell personal information. We share information only as needed to operate our services:</p>
<ul>
<li><strong>Freight brokers and shippers</strong> — carrier authority, insurance and contact details required to book loads on your behalf.</li>
<li><strong>Factoring companies</strong> — invoices and supporting documents, when you use factoring.</li>
<li><strong>Service providers</strong> — hosting, database and file-storage, email and communications providers bound by confidentiality obligations.</li>
<li><strong>Legal</strong> — when required by law, subpoena or to protect rights and safety.</li>
</ul>

<h2>4. Data retention</h2>
<p>We keep carrier and load records for as long as you use our services and for up to seven years afterward to meet tax and regulatory record-keeping requirements. Contact form submissions that don't become customers are deleted after 24 months.</p>

<h2>5. Security</h2>
<p>We use encryption in transit (TLS), access controls, row-level database security and least-privilege access for staff. No method of transmission is 100% secure, but we work hard to protect your information.</p>

<h2>6. Your rights</h2>
<p>Depending on where you live (including California under the CCPA/CPRA), you may have the right to access, correct, delete or obtain a copy of your personal information, and to opt out of certain processing. To make a request, email <a href="mailto:{{email}}">{{email}}</a>. We will verify and respond within 45 days.</p>

<h2>7. Children</h2>
<p>Our services are intended for businesses and are not directed to children under 16. We do not knowingly collect their information.</p>

<h2>8. Changes</h2>
<p>We may update this policy from time to time. Material changes will be posted on this page with an updated date.</p>

<h2>9. Contact</h2>
<p>{{legalName}}, {{street}}, {{city}}, {{region}} {{postal}} · <a href="mailto:{{email}}">{{email}}</a> · <a href="tel:{{phoneDigits}}">{{phone}}</a></p>
`;

export const TERMS_HTML = `
<p>These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the apextruckin.com website and the truck dispatch services provided by {{legalName}} (&ldquo;Apex Truckin&rdquo;). By using our website or services you agree to these Terms.</p>

<h2>1. Our role</h2>
<p>Apex Truckin is a dispatch service acting as an agent for motor carriers. <strong>We are not a freight broker or a motor carrier</strong>, and we do not take possession of freight. The carrier remains solely responsible for the safe operation of its equipment, regulatory compliance, cargo care and delivery.</p>

<h2>2. Carrier responsibilities</h2>
<ul>
<li>Maintain active operating authority (MC/USDOT), required insurance and a safety rating that is not &ldquo;Unsatisfactory.&rdquo;</li>
<li>Provide accurate information about equipment, availability, lanes and hours of service.</li>
<li>Review and approve each rate confirmation before a load is booked. We never force dispatch.</li>
<li>Comply with all FMCSA, DOT and state regulations, including hours-of-service and ELD rules.</li>
</ul>

<h2>3. Fees and payment</h2>
<ul>
<li><strong>Starter:</strong> 5% of the gross linehaul rate for each load dispatched, invoiced weekly.</li>
<li><strong>Professional:</strong> $300 per active truck per month, billed on the 1st of each month.</li>
<li><strong>Enterprise:</strong> as set out in a separate written agreement.</li>
</ul>
<p>Fees are due within 7 days of invoice. Late balances may incur a 1.5% monthly charge. Fees are earned when a load is booked and are not contingent on broker payment unless otherwise agreed in writing.</p>

<h2>4. Term and cancellation</h2>
<p>Starter and Professional plans are month-to-month. Either party may cancel with 7 days' written notice. Fees for loads booked before cancellation remain payable.</p>

<h2>5. Authorization</h2>
<p>By enrolling, you authorize Apex Truckin to act on your behalf to search for loads, negotiate rates, sign rate confirmations you've approved and submit broker setup packets and invoices.</p>

<h2>6. Limitation of liability</h2>
<p>To the maximum extent permitted by law, Apex Truckin is not liable for cargo loss or damage, accidents, broker non-payment, detention, fines or indirect, incidental or consequential damages. Our total liability for any claim is limited to the fees you paid us in the 30 days before the event giving rise to the claim.</p>

<h2>7. Website use</h2>
<p>Content on this site is for general information only and is not legal, tax or financial advice. You may not scrape, copy or misuse the site, or attempt to access our systems without authorization.</p>

<h2>8. Governing law</h2>
<p>These Terms are governed by the laws of the State of Texas. Disputes will be resolved in the state or federal courts of Dallas County, Texas.</p>

<h2>9. Changes</h2>
<p>We may update these Terms. Continued use of our services after changes are posted means you accept the updated Terms.</p>

<h2>10. Contact</h2>
<p>Questions? Email <a href="mailto:{{email}}">{{email}}</a> or call <a href="tel:{{phoneDigits}}">{{phone}}</a>.</p>
`;
