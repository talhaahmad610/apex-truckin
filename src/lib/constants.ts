import type { FAQ, NavLink, PricingTier, Service } from "@/types";

export const COMPANY = {
  name: "Apex Truckin",
  legalName: "Apex Truckin LLC",
  tagline: "Built to Haul. Built to Win.",
  subTagline:
    "Elite truck dispatch services for owner-operators and fleet carriers across the United States.",
  phone: "+1 (888) 000-0000",
  phoneHref: "tel:+18880000000",
  email: "dispatch@apextruckin.com",
  whatsapp: "https://wa.me/18880000000?text=Hi%20Apex%20Truckin%2C%20I%27d%20like%20to%20start%20dispatching.",
  address: {
    street: "2100 Commerce St, Suite 400",
    city: "Dallas",
    region: "TX",
    postal: "75201",
    country: "US",
  },
  hours: [
    { days: "Dispatch Desk", time: "24 / 7 / 365" },
    { days: "Onboarding (Mon–Fri)", time: "7:00 AM – 9:00 PM CT" },
    { days: "Billing (Mon–Fri)", time: "8:00 AM – 6:00 PM CT" },
  ],
  socials: {
    facebook: "https://facebook.com/apextruckin",
    instagram: "https://instagram.com/apextruckin",
    linkedin: "https://linkedin.com/company/apextruckin",
    x: "https://x.com/apextruckin",
  },
  founded: 2019,
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Carriers", href: "/carriers" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Seed source for the CMS "services" collection (see scripts/seed-cms.ts). */
export const SERVICES: Omit<Service, "comparison" | "metaTitle" | "metaDescription">[] = [
  {
    slug: "dry-van",
    name: "Dry Van",
    short: "Enclosed trailer freight — the most loads, all 48 states.",
    tagline: "The backbone of American freight.",
    description:
      "Dry van is the highest-volume equipment type in the U.S. — and the most competitive. We cut through the noise with lane planning that keeps you out of low-paying markets, stacks backhauls before you deliver, and targets shippers with fast loading times.",
    image: "/images/service-dry-van.webp",
    imageAlt: "Semi-truck pulling an enclosed dry van trailer on an interstate at dusk",
    included: [
      "Load sourcing across DAT, Truckstop and private broker boards",
      "Round-trip and multi-stop lane planning",
      "Rate negotiation including detention & layover terms",
      "Broker setup packets and credit checks",
      "Check calls, tracking links and POD handling",
    ],
    requirements: ["53' or 48' dry van trailer", "Active MC & DOT authority", "$100K cargo / $1M auto liability", "ELD compliant"],
    benefits: [
      { title: "Higher RPM", body: "We avoid dead markets and book outbound + backhaul together to protect your weekly average." },
      { title: "Less deadhead", body: "Loads are planned in chains so you're rarely running empty more than 75 miles." },
      { title: "Steady volume", body: "Dedicated and recurring lanes from our broker network keep your truck moving week to week." },
    ],
    avgRate: "$2.00 – $3.00 / mile",
    weeklyGross: "$7,500 – $8,500",
    typicalLoads: ["Consumer packaged goods", "Palletized retail freight", "Paper & packaging", "Non-perishable food & beverage"],
    faqs: [
      { q: "Can you find dry van loads that keep me regional?", a: "Yes. Tell us your home base and radius and we'll build weekly loops that get you home on your schedule." },
      { q: "Do you work with 48' trailers?", a: "We do. Fewer shippers accept 48', so we pre-qualify every load before quoting you." },
    ],
  },
  {
    slug: "flatbed",
    name: "Flatbed",
    short: "Open-deck freight for oversized and heavy loads.",
    tagline: "Heavy freight. Heavier paychecks.",
    description:
      "Flatbed pays a premium for skill — tarping, securement and permits. Our flatbed desk knows the steel, lumber and construction lanes, negotiates tarp pay and accessorials up front, and never sends you a load your equipment isn't rated for.",
    image: "/images/service-flatbed.webp",
    imageAlt: "Flatbed truck hauling strapped construction materials on a highway",
    included: [
      "Steel, lumber, building-materials and machinery freight",
      "Tarp pay and accessorial negotiation",
      "Oversize permit coordination",
      "Securement requirements verified before booking",
      "Weekend & seasonal lane planning",
    ],
    requirements: ["48' or 53' flatbed", "Straps, chains, binders & tarps (4'/6'/8')", "Active MC & DOT", "$100K cargo insurance"],
    benefits: [
      { title: "Premium rates", body: "Flatbed averages 10–25% more per mile than dry van when negotiated correctly." },
      { title: "Tarp pay secured", body: "We lock in tarp fees before the rate con is signed — no surprises at pickup." },
      { title: "Permit help", body: "We coordinate oversize permits and route surveys with your permit service." },
    ],
    avgRate: "$2.50 – $3.50 / mile",
    weeklyGross: "$9,000 – $11,000",
    typicalLoads: ["Steel coils & beams", "Lumber", "Building materials", "Machinery & equipment"],
    faqs: [
      { q: "Do you dispatch oversize loads?", a: "Yes, legal-width and oversize loads with permit coordination. Superloads are handled case-by-case." },
      { q: "Will you negotiate tarp pay?", a: "Always. Tarp pay is negotiated as its own line item on the rate confirmation." },
    ],
  },
  {
    slug: "reefer",
    name: "Reefer",
    short: "Temperature-controlled, food-grade freight with 24/7 monitoring.",
    tagline: "Cold chain. Hot rates.",
    description:
      "Reefer freight is time-sensitive and unforgiving. Our reefer desk books produce, protein and pharma lanes with realistic appointment times, confirms temps and pulp requirements in writing, and stays on the line through every check call.",
    image: "/images/service-reefer.webp",
    imageAlt: "Refrigerated reefer trailer truck at a cold-storage distribution center",
    included: [
      "Produce, protein, dairy & frozen freight",
      "Temperature and pre-cool requirements confirmed in writing",
      "Appointment scheduling & lumper coordination",
      "24/7 monitoring and after-hours support",
      "Claims-prevention documentation",
    ],
    requirements: ["53' reefer with working download capability", "Food-grade clean trailer", "Reefer breakdown coverage", "$100K+ cargo insurance"],
    benefits: [
      { title: "Seasonal premiums", body: "We position you for produce season surges in CA, AZ, TX, GA and FL." },
      { title: "Fewer claims", body: "Temps, pulps and seal numbers are documented at every stop." },
      { title: "Round-the-clock", body: "Reefer problems don't wait for business hours — neither do we." },
    ],
    avgRate: "$2.50 – $3.50 / mile",
    weeklyGross: "$8,000 – $11,000",
    typicalLoads: ["Fresh produce", "Frozen foods", "Meat & poultry", "Dairy & beverages"],
    faqs: [
      { q: "Do you handle multi-stop reefer loads?", a: "Yes. We confirm every stop's appointment and stop-off pay before booking." },
      { q: "What if my reefer unit fails mid-load?", a: "Call the dispatch line 24/7 — we coordinate with the broker, service providers and receiver immediately." },
    ],
  },
  {
    slug: "hotshot",
    name: "Hotshot",
    short: "Expedited, time-critical small loads on gooseneck trailers.",
    tagline: "When it has to be there yesterday.",
    description:
      "Hotshot is all about speed and weight management. We find expedited, partial and oilfield loads that fit your GVWR, pair loads to fill your deck, and chase the premium rates that make a one-ton and a 40' gooseneck profitable.",
    image: "/images/service-hotshot.webp",
    imageAlt: "Dually pickup truck towing a gooseneck flatbed trailer on an open road",
    included: [
      "Expedited, partial and LTL-style loads",
      "Load pairing to maximize deck space",
      "Weight & GVWR checks before booking",
      "Oilfield, agriculture & construction freight",
      "Same-day booking for urgent shipments",
    ],
    requirements: ["Class 3–5 truck with 30'–40' gooseneck", "Active MC & DOT", "Straps & chains", "CDL if GCWR over 26,001 lbs"],
    benefits: [
      { title: "Premium urgency pay", body: "Time-critical freight pays more — we make sure the rate reflects the rush." },
      { title: "Load pairing", body: "Two partials on one trip can beat a single full load on a per-mile basis." },
      { title: "Fast turns", body: "Short-notice loads keep your week full with fewer idle days." },
    ],
    avgRate: "$2.50 – $3.50 / mile",
    weeklyGross: "$7,000 – $10,000",
    typicalLoads: ["Machinery parts", "Oilfield equipment", "Vehicles", "Construction supplies"],
    faqs: [
      { q: "Do I need a CDL for hotshot?", a: "Only if your combined weight rating exceeds 26,001 lbs. We'll book within your license and weight limits." },
      { q: "Can you book partial loads?", a: "Yes — pairing partials is one of the best ways to raise hotshot revenue." },
    ],
  },
  {
    slug: "step-deck",
    name: "Step Deck",
    short: "Lowered decks for taller cargo and versatile heavy hauls.",
    tagline: "Taller freight. Fewer permits.",
    description:
      "Step deck opens freight that won't fit legal height on a flatbed. We target machinery, equipment and tall-load lanes where your deck earns a premium, and plan loading and ramps with shippers ahead of time.",
    image: "/images/service-step-deck.webp",
    imageAlt: "Step deck trailer hauling heavy equipment on a highway",
    included: [
      "Machinery, equipment & tall freight",
      "Height and weight verification before booking",
      "Ramp & loading coordination",
      "Permit coordination for oversize",
      "Accessorial & tarp negotiation",
    ],
    requirements: ["48' or 53' step deck", "Ramps preferred", "Securement & tarps", "$100K cargo insurance"],
    benefits: [
      { title: "Niche premiums", body: "Fewer trucks run step deck — shippers pay for the specialized capacity." },
      { title: "Legal height freight", body: "Haul 10' tall freight legally without oversize permits." },
      { title: "Versatility", body: "Book flatbed freight too when step deck lanes are slow." },
    ],
    avgRate: "$2.50 – $3.50 / mile",
    weeklyGross: "$7,000 – $11,000",
    typicalLoads: ["Construction machinery", "Tractors & ag equipment", "Industrial components", "Tall crated freight"],
    faqs: [
      { q: "Can you book flatbed freight on my step deck?", a: "Yes, many flatbed loads accept step deck. We'll mix both to keep you loaded." },
      { q: "Do you handle loads that require ramps?", a: "Yes, we filter and confirm ramp requirements with every shipper." },
    ],
  },
  {
    slug: "power-only",
    name: "Power Only",
    short: "Drop-and-hook freight — bring the tractor, skip the trailer.",
    tagline: "No trailer. No problem.",
    description:
      "Power only lets tractors haul pre-loaded trailers for shippers, brokers and big-box carriers. We set you up with power-only programs, book drop-and-hook freight with minimal wait times, and keep your truck moving without the cost of owning a trailer.",
    image: "/images/service-power-only.webp",
    imageAlt: "Semi tractor cab without trailer on a highway at golden hour",
    included: [
      "Power-only program setup & onboarding",
      "Drop-and-hook and pre-loaded trailer freight",
      "Trailer interchange agreement handling",
      "High-volume lane scheduling",
      "Trailer inspection documentation",
    ],
    requirements: ["Class 8 tractor", "Trailer interchange insurance", "Active MC & DOT", "ELD compliant"],
    benefits: [
      { title: "Lower overhead", body: "No trailer payment, no trailer maintenance — just miles." },
      { title: "Minimal wait times", body: "Drop-and-hook freight means less time sitting at docks." },
      { title: "High volume", body: "Power-only programs offer consistent, repeatable freight." },
    ],
    avgRate: "$2.00 – $3.00 / mile",
    weeklyGross: "$7,000 – $9,000",
    typicalLoads: ["Pre-loaded dry van trailers", "Retail & e-commerce", "Trailer repositioning", "Dedicated shuttle runs"],
    faqs: [
      { q: "What insurance do I need for power only?", a: "Trailer interchange coverage is required by most programs. We'll help you verify limits." },
      { q: "Is power only profitable for new authorities?", a: "It can be — lower costs and steady volume make it a strong starting point." },
    ],
  },
  {
    slug: "box-truck",
    name: "Box Truck",
    short: "Last-mile and regional straight-truck freight.",
    tagline: "Big-city freight, done right.",
    description:
      "Box truck freight lives in local and regional lanes — expedited, last-mile, and LTL-style loads. We know which brokers pay for liftgates and pallet jacks, and we build dense local routes that make a 26' truck profitable.",
    image: "/images/service-box-truck.webp",
    imageAlt: "White box truck making a regional delivery",
    included: [
      "Expedited, last-mile & regional freight",
      "Liftgate and pallet-jack accessorial pay",
      "Local route density planning",
      "Amazon Relay & broker load sourcing",
      "Appointment & delivery scheduling",
    ],
    requirements: ["16'–26' box truck", "Liftgate preferred", "Active MC & DOT (interstate)", "$100K cargo insurance"],
    benefits: [
      { title: "Home every night", body: "Most box truck lanes are regional — plan your week around home time." },
      { title: "Accessorial pay", body: "Liftgate, inside delivery and pallet jack fees negotiated upfront." },
      { title: "Low entry cost", body: "A great way to grow a small fleet before moving into Class 8." },
    ],
    avgRate: "$2.00 – $3.00 / mile",
    weeklyGross: "$6,000 – $9,000",
    typicalLoads: ["Furniture & appliances", "Retail replenishment", "Expedited LTL", "Trade show freight"],
    faqs: [
      { q: "Do you dispatch box trucks without a CDL?", a: "Yes — box trucks under 26,001 lbs GVWR don't require a CDL." },
      { q: "Can you get me loads without a liftgate?", a: "Yes, though liftgate-equipped trucks access more freight and better pay." },
    ],
  },
];

/** Seed source for the CMS "pricing-tiers" collection — no `id`, the database assigns one. */
export const PRICING: Omit<PricingTier, "id">[] = [
  {
    name: "Starter",
    price: "5%",
    unit: "per load dispatched",
    blurb: "For owner-operators who want a pro dispatcher without a monthly fee.",
    features: ["Load finding & negotiation", "Rate confirmation handling", "24/7 dispatch support", "Broker setup packets", "Up to 2 trucks"],
    cta: "Start with Starter",
  },
  {
    name: "Professional",
    price: "$300",
    unit: "per truck / month",
    blurb: "Flat, predictable pricing for growing carriers running hard.",
    features: [
      "Everything in Starter",
      "Priority load access",
      "Weekly performance reports",
      "Invoicing & factoring submissions",
      "Unlimited trucks",
    ],
    cta: "Go Professional",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "tailored to your fleet",
    blurb: "Dedicated dispatch team and integrations for serious fleets.",
    features: ["Dedicated dispatcher", "Custom lane preferences", "Fleet management", "API access", "White-label option"],
    cta: "Talk to Sales",
  },
];

export const PRICING_FAQS: FAQ[] = [
  { q: "Are there contracts or setup fees?", a: "No. Starter and Professional are month-to-month with no setup fees. Cancel anytime with 7 days' notice." },
  { q: "Is the 5% taken from the gross rate?", a: "Yes, 5% of the linehaul rate on each load we dispatch. Fuel surcharge and accessorials we negotiate are included in the gross." },
  { q: "Do you force dispatch?", a: "Never. Every load is sent to you for approval before we book it. You can turn down any load, any time." },
  { q: "How do I pay?", a: "We invoice weekly via ACH. Professional plans bill on the 1st of each month per active truck." },
  { q: "Do you work with new authorities?", a: "Yes. We help new MCs through broker setup and build relationships with brokers that accept new authorities." },
  { q: "What's the difference between Professional and Enterprise?", a: "Enterprise adds a dedicated dispatcher, custom lane strategy, fleet reporting, API access and white-label options for 10+ truck fleets." },
];

export const GENERAL_FAQS: FAQ[] = [
  { q: "How fast can I start?", a: "Most carriers are onboarded and booked on their first load within 24 hours of sending MC, W-9 and COI." },
  { q: "Do I have to take every load you find?", a: "No. You approve every load. We never force dispatch." },
  { q: "Which load boards do you use?", a: "DAT, Truckstop, 123Loadboard and our private broker network of 1,200+ partners." },
  { q: "What states do you cover?", a: "All lower 48 states, with cross-border coordination to Canada and Mexico handled case by case." },
];

export const TEAM = [
  { name: "Ryan Mitchell", role: "Founder & Head of Dispatch", image: "/images/team-1.webp", bio: "12 years running dry van and reefer before building Apex." },
  { name: "Alicia Moreno", role: "Director of Carrier Success", image: "/images/team-2.webp", bio: "Former broker who now fights for carriers on every rate." },
  { name: "Darnell Brooks", role: "Lead Flatbed Dispatcher", image: "/images/team-3.webp", bio: "Knows every steel mill and lumber yard lane in the South." },
  { name: "Priya Shah", role: "Operations & Billing Lead", image: "/images/team-4.webp", bio: "Makes sure invoices go out on time and carriers get paid fast." },
];
