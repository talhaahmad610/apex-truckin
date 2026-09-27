import type { Metadata } from "next";
import { COMPANY, SERVICES } from "./constants";
import { absoluteUrl } from "./utils";
import type { FAQ, Post, Service } from "@/types";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://apextruckin.com").replace(/\/$/, "");
const OG_DEFAULT = "/images/og-default.jpg";

export function pageMetadata({
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
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: COMPANY.name,
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
const ORG_REF = {
  "@id": `${SITE_URL}/#organization`,
  "@type": ["Organization", "LocalBusiness"],
  name: COMPANY.name,
  logo: absoluteUrl("/icon.svg"),
};
const WEBSITE_REF = { "@id": `${SITE_URL}/#website`, "@type": "WebSite", name: COMPANY.name };

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY.name,
  legalName: COMPANY.legalName,
  url: SITE_URL,
  logo: absoluteUrl("/icon.svg"),
  image: absoluteUrl(OG_DEFAULT),
  slogan: COMPANY.tagline,
  description: COMPANY.subTagline,
  telephone: "+1-888-000-0000",
  email: COMPANY.email,
  foundingDate: String(COMPANY.founded),
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.region,
    postalCode: COMPANY.address.postal,
    addressCountry: COMPANY.address.country,
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
    telephone: "+1-888-000-0000",
    contactType: "customer service",
    areaServed: "US",
    availableLanguage: ["English", "Spanish"],
    hoursAvailable: "Mo-Su 00:00-23:59",
  },
  sameAs: Object.values(COMPANY.socials),
  // No aggregateRating here: a self-issued rating on your own Organization/LocalBusiness
  // (not sourced from a verifiable third-party review platform) violates Google's structured
  // data guidelines and risks a manual action. Re-add only once backed by real Review nodes
  // or a genuine third-party source (Google Business Profile, Trustpilot, etc).
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Truck dispatch services",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: `${s.name} Dispatch`, url: absoluteUrl(`/services/${s.slug}`) },
    })),
  },
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: COMPANY.name,
  publisher: ORG_REF,
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
  name,
  description,
  path,
  items,
}: {
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
  isPartOf: WEBSITE_REF,
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

export const serviceLd = (s: Service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": absoluteUrl(`/services/${s.slug}#service`),
  name: `${s.name} Truck Dispatch`,
  serviceType: "Truck dispatch",
  description: s.description,
  url: absoluteUrl(`/services/${s.slug}`),
  image: absoluteUrl(s.image),
  provider: ORG_REF,
  areaServed: { "@type": "Country", name: "United States" },
  offers: [
    {
      "@type": "Offer",
      name: "Starter",
      description: "5% per load dispatched",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "5", priceCurrency: "USD", unitText: "percent per load dispatched" },
    },
    { "@type": "Offer", name: "Professional", price: "300", priceCurrency: "USD", description: "Per truck per month" },
  ],
});

export const articleLd = (p: Post) => ({
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
  publisher: ORG_REF,
  mainEntityOfPage: absoluteUrl(`/blog/${p.slug}`),
  articleSection: p.category,
  timeRequired: `PT${p.read_time}M`,
  inLanguage: "en-US",
});
