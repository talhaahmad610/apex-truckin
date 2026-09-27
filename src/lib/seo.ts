import type { Metadata } from "next";
import { absoluteUrl } from "./utils";
import { getSiteSettings } from "./cms";
import type { FAQ, Post, PricingTier, Service, SiteInfo } from "@/types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://apextruckin.com").replace(/\/$/, "");
const OG_DEFAULT = "/images/og-default.jpg";

export async function pageMetadata({
  title,
  description,
  path,
  image = OG_DEFAULT,
  type = "website",
  publishedTime,
  authors,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}): Promise<Metadata> {
  const site = await getSiteSettings();
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: site.name,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === "article" ? { publishedTime, authors } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image], site: "@apextruckin" },
  };
}

/* ───────────────────────── JSON-LD builders ───────────────────────── */

/**
 * Next.js renders each `<JsonLd>` call as its own separate `<script>` tag (no shared
 * `@graph`), so a bare `{"@id": "...#organization"}` reference in one script can't resolve
 * against the full Organization node defined in a different script on the same page. Every
 * builder below inlines this minimal, self-contained stand-in (kept in sync with
 * `organizationLd()`'s own `@id`/name/logo) instead of a bare reference, so each block is
 * valid on its own regardless of how a given parser handles multiple JSON-LD scripts.
 */
const orgRef = (site: SiteInfo) => ({
  "@id": `${SITE_URL}/#organization`,
  "@type": ["Organization", "LocalBusiness"],
  name: site.name,
  logo: absoluteUrl("/icon.svg"),
});
const websiteRef = (site: SiteInfo) => ({ "@id": `${SITE_URL}/#website`, "@type": "WebSite", name: site.name });
// Schema.org telephone, e.g. "+1-888-000-0000" for North American numbers (E.164 otherwise).
const tel = (site: SiteInfo) => {
  const e164 = site.phoneHref.replace(/^tel:/, "");
  const m = /^\+1(\d{3})(\d{3})(\d{4})$/.exec(e164);
  return m ? `+1-${m[1]}-${m[2]}-${m[3]}` : e164;
};

export const organizationLd = (site: SiteInfo, services: Service[]) => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: SITE_URL,
  logo: absoluteUrl("/icon.svg"),
  image: absoluteUrl(OG_DEFAULT),
  slogan: site.tagline,
  description: site.subTagline,
  telephone: tel(site),
  email: site.email,
  foundingDate: String(site.founded),
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postal,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "Country", name: "United States" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: tel(site),
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: ["English", "Spanish"],
    hoursAvailable: "Mo-Su 00:00-23:59",
  },
  sameAs: Object.values(site.socials).filter(Boolean),
  // No aggregateRating here: a self-issued rating on your own Organization/LocalBusiness
  // (not sourced from a verifiable third-party review platform) violates Google's structured
  // data guidelines and risks a manual action. Re-add only once backed by real Review nodes
  // or a genuine third-party source (Google Business Profile, Trustpilot, etc).
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Truck dispatch services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: `${s.name} Dispatch`, url: absoluteUrl(`/services/${s.slug}`) },
    })),
  },
});

export const websiteLd = (site: SiteInfo) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.name,
  publisher: orgRef(site),
  inLanguage: "en-US",
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

/** CollectionPage + ItemList for a listing page (e.g. /services, /blog). */
export const collectionLd = ({
  site,
  name,
  description,
  path,
  items,
}: {
  site: SiteInfo;
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string; image?: string }[];
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": absoluteUrl(`${path}#collection`),
  name,
  description,
  url: absoluteUrl(path),
  isPartOf: websiteRef(site),
  mainEntity: {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
      ...(it.image ? { image: absoluteUrl(it.image) } : {}),
    })),
  },
});

export const faqLd = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

/** Offers derived from the CMS pricing plans ("5%" → percent-per-load, "$300" → price; "Custom" is skipped). */
const offersFrom = (tiers: PricingTier[]): Record<string, unknown>[] =>
  tiers.flatMap<Record<string, unknown>>((t) => {
    const pct = /^(\d+(?:\.\d+)?)\s*%$/.exec(t.price.trim());
    if (pct) {
      return [{ "@type": "Offer", name: t.name, description: `${t.price} ${t.unit}`, priceSpecification: { "@type": "UnitPriceSpecification", price: pct[1], priceCurrency: "USD", unitText: `percent ${t.unit}` } }];
    }
    const usd = /^\$\s*([\d,]+(?:\.\d+)?)$/.exec(t.price.trim());
    if (usd) return [{ "@type": "Offer", name: t.name, price: usd[1]!.replace(/,/g, ""), priceCurrency: "USD", description: t.unit.replace(/^per /, "Per ") }];
    return [];
  });

export const serviceLd = (s: Service, site: SiteInfo, tiers: PricingTier[]) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": absoluteUrl(`/services/${s.slug}#service`),
  name: `${s.name} Truck Dispatch`,
  serviceType: "Truck dispatch",
  description: s.description,
  url: absoluteUrl(`/services/${s.slug}`),
  image: absoluteUrl(s.image),
  provider: orgRef(site),
  areaServed: { "@type": "Country", name: "United States" },
  offers: offersFrom(tiers),
});

export const articleLd = (p: Post, site: SiteInfo) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": absoluteUrl(`/blog/${p.slug}#article`),
  headline: p.title,
  description: p.meta_description ?? p.excerpt ?? undefined,
  image: p.cover_image_url ? absoluteUrl(p.cover_image_url) : absoluteUrl(OG_DEFAULT),
  datePublished: p.published_at,
  // Real "last edited" time from the CMS; only emitted when it's actually after publication.
  ...(p.updated_at && +new Date(p.updated_at) > +new Date(p.published_at) ? { dateModified: p.updated_at } : {}),
  author: { "@type": "Person", name: p.author },
  publisher: orgRef(site),
  mainEntityOfPage: absoluteUrl(`/blog/${p.slug}`),
  articleSection: p.category,
  timeRequired: `PT${p.read_time}M`,
  inLanguage: "en-US",
});
