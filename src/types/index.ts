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
  socials: { facebook: string; instagram: string; linkedin: string; x: string };
  nav: NavLink[];
  footer: { headline: string; highlight: string; newsletterLabel: string; bottomLine: string; legalLinks: NavLink[]; image: string | null };
  /** Rate & earnings qualifiers shown next to any per-mile rate or weekly-gross figure. */
  rateDisclaimer: string;
  grossDisclaimer: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface PricingTier {
  name: string;
  price: string;
  unit: string;
  blurb: string;
  features: string[];
  cta: string;
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
