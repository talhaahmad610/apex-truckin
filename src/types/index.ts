export type PostCategory =
  | "Dispatch Tips"
  | "Industry News"
  | "Owner-Operator"
  | "Regulations";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  cover_alt?: string | null;
  published_at: string;
  category: string;
  author: string;
  read_time: number;
  meta_title?: string | null;
  meta_description: string | null;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
}

export type PostInput = Omit<Post, "id" | "created_at"> & { id?: string };

export interface Testimonial {
  id: string;
  carrier_name: string;
  truck_type: string | null;
  rating: number;
  review_text: string;
  location: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface ContactSubmission {
  full_name: string;
  email: string;
  phone?: string | null;
  equipment_type?: string | null;
  message?: string | null;
}

export interface Service {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  included: string[];
  requirements: string[];
  benefits: { title: string; body: string }[];
  avgRate: string;
  weeklyGross: string;
  typicalLoads: string[];
  faqs: FAQ[];
  comparison: { cdl: "yes" | "no" | "depends"; tarpPay: boolean; permits: boolean; tempMonitoring: boolean; dropHook: boolean };
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  bio: string;
}

/** Company details, navigation and footer copy (Payload "Site settings" global). */
export interface SiteInfo {
  name: string;
  legalName: string;
  tagline: string;
  subTagline: string;
  founded: number;
  phone: string;
  phoneHref: string;
  email: string;
  whatsapp: string;
  address: { street: string; city: string; region: string; postal: string; country: string };
  hours: { days: string; time: string }[];
  /** `xHandle` is derived from the `x` profile URL, e.g. "https://x.com/apextruckin" → "@apextruckin" (empty if unparseable). */
  socials: { facebook: string; instagram: string; linkedin: string; x: string; xHandle: string };
  /** Whether to publish round-the-clock opening hours in Google's structured data. */
  open24x7: boolean;
  nav: NavLink[];
  headerCta: NavLink;
  menuCta: NavLink;
  whatsappTooltip: string;
  footer: { headline: string; highlight: string; newsletterLabel: string; bottomLine: string; legalLinks: NavLink[]; image: string | null };
  /** Rate & earnings qualifiers shown next to any per-mile rate or weekly-gross figure. */
  rateDisclaimer: string;
  grossDisclaimer: string;
  /** Admin-pasted head/footer scripts, parsed once when Site settings are read. */
  scripts: { head: HeadNode[]; bodyEnd: HeadNode[]; extraAllowedDomains: string; googleSiteVerification: string; bingSiteVerification: string };
}

/** A single element parsed out of an admin-pasted HTML snippet (see src/lib/head-html.ts). */
export type HeadNode =
  | { kind: "script"; id: string; src?: string; inline?: string; attrs: Record<string, string> }
  | { kind: "element"; tag: "meta" | "link" | "style"; attrs: Record<string, string>; text?: string }
  | { kind: "noscript"; html: string }
  | { kind: "raw"; html: string };

export interface FAQ {
  q: string;
  a: string;
}

export interface PricingTier {
  id: number;
  name: string;
  price: string;
  unit: string;
  blurb: string;
  features: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ApiError {
  error: string;
  details?: unknown;
}

/** Lists shown on more than one page — the Payload "Shared content" global. */
export interface SiteContentData {
  marqueeItems: string[];
  stats: { value: number; decimals: number; suffix: string; label: string }[];
  fullService: { title: string; body: string }[];
  steps: { title: string; icon: string; body: string }[];
  carrierRequirements: string[];
  pricingComparison: { feature: string; cells: { tierId: number; included: boolean; text: string }[] }[];
  blogIndex: {
    eyebrow: string;
    heading: string;
    highlight: string;
    subtitle: string;
    metaTitle: string;
    metaDescription: string;
    ldName: string;
    ldDescription: string;
  };
  blogSidebar: { heading: string; body: string; cta: { label?: string | null; href?: string | null } };
  servicePage: {
    heroCta: { label?: string | null; href?: string | null };
    benefitsLabel: string;
    benefitsHeading: string;
    benefitsHighlight: string;
    pricingHeading: string;
    pricingHighlight: string;
    pricingIntro: string;
    ctaHeading: string;
    ctaHighlight: string;
  };
}

/** One leg of the scroll-scrubbed home hero (FlightScrub) — a processed clip + its poster. */
export interface FlightLeg {
  desktop: string;
  mobile: string;
  poster: string;
  posterMobile: string;
  duration: number;
}

/** A published page's fields needed for the sitemap and llms.txt — not the full layout. */
export interface PageSummary {
  title: string;
  slug: string;
  showInSitemap: boolean;
  sitemapPriority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  updatedAt: string;
  description: string | null;
}
