import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { FAQ, FlightLeg, PageSummary, Post, PricingTier, Service, SiteContentData, SiteInfo, TeamMember, Testimonial } from "@/types";
import type {
  Category as CmsCategory,
  FlightHeroBlock,
  FlightSource as CmsFlightSource,
  HomePage as CmsHomePage,
  Media as CmsMedia,
  Page as CmsPage,
  Post as CmsPost,
  Service as CmsService,
} from "@/payload-types";
import { getPayloadClient } from "./payload";
import { richTextToHtml } from "./richtext";
import { parseHeadHtml } from "./head-html";

/* ───────────────────────── helpers ───────────────────────── */

const isObj = <T extends object>(v: unknown): v is T => typeof v === "object" && v !== null;

/** Ready legs, in the admin's chosen order — unpopulated ids (bad relationship depth) and
 *  not-yet-ready legs are dropped rather than shown broken. Never throws on an empty CMS list;
 *  the caller (HeroSection) falls back to the static manifest when this returns []. */
export function legsFromBlock(legs: FlightHeroBlock["legs"]): FlightLeg[] {
  return (legs ?? [])
    .filter((l): l is CmsFlightSource => isObj<CmsFlightSource>(l) && l.status === "ready" && Boolean(l.output?.desktop))
    .map((l) => ({
      desktop: l.output!.desktop!,
      mobile: l.output!.mobile!,
      poster: l.output!.poster!,
      posterMobile: l.output!.posterMobile!,
      duration: l.output!.duration ?? 8,
    }));
}

export function postFromDoc(d: CmsPost): Post {
  const cover = isObj<CmsMedia>(d.cover) ? d.cover : null;
  const category = isObj<CmsCategory>(d.category) ? d.category.name : "";
  return {
    id: String(d.id),
    title: d.title,
    slug: d.slug,
    excerpt: d.excerpt ?? null,
    content: richTextToHtml(d.content),
    cover_image_url: cover?.url ?? null,
    cover_alt: cover?.alt ?? null,
    published_at: d.publishedAt ?? d.createdAt,
    category,
    author: d.author || "Apex Truckin Team",
    read_time: d.readTime ?? 1,
    meta_title: d.metaTitle ?? null,
    meta_description: d.metaDescription ?? null,
    is_published: d._status === "published",
    created_at: d.createdAt,
    updated_at: d.updatedAt,
  };
}

/* ───────────────────────── posts ───────────────────────── */

export interface PostQuery {
  category?: string | null;
  limit?: number;
  offset?: number;
}

const fetchPosts = unstable_cache(
  async ({ category, limit = 50, offset = 0 }: PostQuery): Promise<{ posts: Post[]; total: number }> => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "posts",
      where: {
        and: [{ _status: { equals: "published" } }, ...(category ? [{ "category.name": { equals: category } }] : [])],
      },
      sort: "-publishedAt",
      limit,
      page: Math.floor(offset / limit) + 1,
      depth: 1,
      overrideAccess: true,
    });
    return { posts: res.docs.map(postFromDoc), total: res.totalDocs };
  },
  ["cms:posts"],
  { tags: ["posts"], revalidate: 3600 },
);

export const getPosts = (q: PostQuery = {}) => fetchPosts(q);

const fetchPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "posts",
      where: { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
      limit: 1,
      depth: 1,
      overrideAccess: true,
    });
    return res.docs[0] ? postFromDoc(res.docs[0]) : null;
  },
  ["cms:post-by-slug"],
  { tags: ["posts"], revalidate: 3600 },
);

/** `draft: true` (preview mode only) reads the latest unpublished version, uncached. */
export const getPostBySlug = cache(async (slug: string, { draft = false }: { draft?: boolean } = {}): Promise<Post | null> => {
  if (!draft) return fetchPostBySlug(slug);
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    draft: true,
    limit: 1,
    depth: 1,
    overrideAccess: true,
  });
  return res.docs[0] ? postFromDoc(res.docs[0]) : null;
});

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const { posts } = await getPosts({ limit });
  return posts;
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const { posts } = await getPosts({ limit: 20 });
  const same = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = posts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}

/* ───────────────────────── categories ───────────────────────── */

export const getCategories = unstable_cache(
  async (): Promise<string[]> => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "categories", sort: "order", limit: 100, depth: 0, overrideAccess: true });
    return res.docs.map((c) => c.name);
  },
  ["cms:categories"],
  { tags: ["categories", "posts"], revalidate: 3600 },
);

/* ───────────────────────── site settings ───────────────────────── */

const txt = (rows?: { text: string }[] | null) => (rows ?? []).map((r) => r.text);
/** A Payload upload relationship value at any depth → its public URL, or "" if unset/unpopulated. */
export const mediaUrl = (m: unknown) => (isObj<CmsMedia>(m) ? m.url ?? "" : "");
const mediaAlt = (m: unknown) => (isObj<CmsMedia>(m) ? m.alt ?? "" : "");

/** "https://x.com/apextruckin" → "@apextruckin". Empty if the URL is missing or has no path segment. */
function xHandleFrom(url: string | undefined | null): string {
  try {
    const seg = new URL(url ?? "").pathname.split("/").filter(Boolean)[0];
    return seg ? `@${seg}` : "";
  } catch {
    return "";
  }
}

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteInfo> => {
    const payload = await getPayloadClient();
    const s = await payload.findGlobal({ slug: "site-settings", depth: 1, overrideAccess: true });
    const wa = `https://wa.me/${s.whatsappNumber}${s.whatsappMessage ? `?text=${encodeURIComponent(s.whatsappMessage).replaceAll("'", "%27")}` : ""}`;
    return {
      name: s.name,
      legalName: s.legalName,
      tagline: s.tagline,
      subTagline: s.subTagline,
      founded: s.founded ?? new Date().getFullYear(),
      phone: s.phone,
      phoneHref: `tel:${s.phoneE164}`,
      email: s.email,
      whatsapp: wa,
      address: { street: s.address.street, city: s.address.city, region: s.address.region, postal: s.address.postal, country: s.address.country },
      hours: (s.hours ?? []).map((h) => ({ days: h.days, time: h.time })),
      socials: {
        facebook: s.socials?.facebook ?? "",
        instagram: s.socials?.instagram ?? "",
        linkedin: s.socials?.linkedin ?? "",
        x: s.socials?.x ?? "",
        xHandle: xHandleFrom(s.socials?.x),
      },
      open24x7: s.open24x7 ?? true,
      nav: (s.nav ?? []).map((n) => ({ label: n.label, href: n.href })),
      headerCta: { label: s.headerCta?.label || "Get Started", href: s.headerCta?.href || "/contact" },
      menuCta: { label: s.menuCta?.label || "Start Dispatching", href: s.menuCta?.href || "/contact" },
      whatsappTooltip: s.whatsappTooltip || "Talk to dispatch",
      footer: {
        headline: s.footerHeadline,
        highlight: s.footerHighlight ?? "",
        newsletterLabel: s.newsletterLabel ?? "",
        bottomLine: s.footerBottomLine ?? "",
        legalLinks: (s.legalLinks ?? []).map((n) => ({ label: n.label, href: n.href })),
        image: mediaUrl(s.footerImage) || null,
      },
      rateDisclaimer: s.rateDisclaimer,
      grossDisclaimer: s.grossDisclaimer,
      scripts: {
        head: parseHeadHtml(s.headHtml),
        bodyEnd: parseHeadHtml(s.bodyEndHtml, { allowRaw: true }),
        extraAllowedDomains: s.extraAllowedDomains ?? "",
        googleSiteVerification: s.googleSiteVerification ?? "",
        bingSiteVerification: s.bingSiteVerification ?? "",
      },
    };
  },
  ["cms:site-settings"],
  { tags: ["settings"], revalidate: 3600 },
);

/* ───────────────────────── services ───────────────────────── */

function serviceFromDoc(d: CmsService): Service {
  return {
    slug: d.slug,
    name: d.name,
    short: d.short,
    tagline: d.tagline,
    description: d.description,
    image: mediaUrl(d.image),
    imageAlt: mediaAlt(d.image),
    included: txt(d.included),
    requirements: txt(d.requirements),
    benefits: (d.benefits ?? []).map((b) => ({ title: b.title, body: b.body })),
    avgRate: d.avgRate,
    weeklyGross: d.weeklyGross,
    typicalLoads: txt(d.typicalLoads),
    faqs: (d.faqs ?? []).map((f) => ({ q: f.q, a: f.a })),
    comparison: {
      cdl: d.comparison?.cdl ?? "yes",
      tarpPay: Boolean(d.comparison?.tarpPay),
      permits: Boolean(d.comparison?.permits),
      tempMonitoring: Boolean(d.comparison?.tempMonitoring),
      dropHook: Boolean(d.comparison?.dropHook),
    },
    metaTitle: d.metaTitle ?? null,
    metaDescription: d.metaDescription ?? null,
  };
}

export const getServices = unstable_cache(
  async (): Promise<Service[]> => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "services", sort: "order", limit: 100, depth: 1, overrideAccess: true });
    return res.docs.map(serviceFromDoc);
  },
  ["cms:services"],
  { tags: ["services"], revalidate: 3600 },
);

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return (await getServices()).find((s) => s.slug === slug) ?? null;
}

/** Contact-form equipment dropdown: every service name, plus "Other". */
export async function getEquipmentTypes(): Promise<string[]> {
  return [...(await getServices()).map((s) => s.name), "Other"];
}

/* ───────────────────────── pricing / faqs / team / testimonials ───────────────────────── */

export const getPricingTiers = unstable_cache(
  async (): Promise<PricingTier[]> => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "pricing-tiers", sort: "order", limit: 20, depth: 0, overrideAccess: true });
    return res.docs.map((t) => ({
      id: t.id,
      name: t.name,
      price: t.price,
      unit: t.unit,
      blurb: t.blurb,
      features: txt(t.features),
      cta: t.cta,
      ctaHref: t.ctaHref || "/contact",
      ...(t.featured ? { featured: true } : {}),
    }));
  },
  ["cms:pricing-tiers"],
  { tags: ["pricing"], revalidate: 3600 },
);

export const getFaqs = unstable_cache(
  async (group: "general" | "pricing" | "service"): Promise<FAQ[]> => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "faqs", where: { group: { equals: group } }, sort: "order", limit: 100, depth: 0, overrideAccess: true });
    return res.docs.map((f) => ({ q: f.question, a: f.answer }));
  },
  ["cms:faqs"],
  { tags: ["faqs"], revalidate: 3600 },
);

export const getTeam = unstable_cache(
  async (): Promise<TeamMember[]> => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "team", sort: "order", limit: 50, depth: 1, overrideAccess: true });
    return res.docs.map((m) => ({ name: m.name, role: m.role, image: mediaUrl(m.photo), imageAlt: mediaAlt(m.photo), bio: m.bio }));
  },
  ["cms:team"],
  { tags: ["team"], revalidate: 3600 },
);

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "testimonials", sort: ["-featured", "order"], limit: 100, depth: 0, overrideAccess: true });
    return res.docs.map((t) => ({
      id: String(t.id),
      carrier_name: t.carrierName,
      truck_type: t.truckType ?? null,
      rating: t.rating,
      review_text: t.reviewText,
      location: t.location ?? null,
      is_featured: Boolean(t.featured),
      created_at: t.createdAt,
    }));
  },
  ["cms:testimonials"],
  { tags: ["testimonials"], revalidate: 3600 },
);

/* ───────────────────────── shared content ───────────────────────── */

export const getSiteContent = unstable_cache(
  async (): Promise<SiteContentData> => {
    const payload = await getPayloadClient();
    const c = await payload.findGlobal({ slug: "site-content", depth: 0, overrideAccess: true });
    return {
      marqueeItems: txt(c.marqueeItems),
      stats: (c.stats ?? []).map((s) => ({ value: s.value, decimals: s.decimals ?? 0, suffix: s.suffix ?? "", label: s.label })),
      fullService: (c.fullService ?? []).map((f) => ({ title: f.title, body: f.body })),
      steps: (c.steps ?? []).map((s) => ({ title: s.title, icon: s.icon ?? "phone-call", body: s.body })),
      carrierRequirements: txt(c.carrierRequirements),
      pricingComparison: (c.pricingComparison ?? []).map((r) => ({
        feature: r.feature,
        cells: (r.cells ?? []).map((cell) => ({
          tierId: typeof cell.tier === "object" && cell.tier !== null ? cell.tier.id : (cell.tier as number),
          included: Boolean(cell.included),
          text: cell.text ?? "",
        })),
      })),
      blogIndex: {
        eyebrow: c.blogIndex?.eyebrow || "Insights",
        heading: c.blogIndex?.heading || "Dispatch",
        highlight: c.blogIndex?.highlight || "insights",
        subtitle:
          c.blogIndex?.subtitle ||
          "Rate trends, lane strategy, broker negotiation and the regulations that matter — written by dispatchers who work the boards every day.",
        metaTitle: c.blogIndex?.metaTitle || "Truck Dispatch Blog — Rates, Lanes & Owner-Operator Tips",
        metaDescription:
          c.blogIndex?.metaDescription ||
          "Practical truck dispatch insights: how to find better-paying loads, negotiate with brokers, cut deadhead, and grow your owner-operator business.",
        ldName: c.blogIndex?.ldName || "Truck Dispatch Blog",
        ldDescription: c.blogIndex?.ldDescription || "Rate trends, lane strategy, broker negotiation and regulations for owner-operators and fleets.",
      },
      blogSidebar: {
        heading: c.blogSidebar?.heading || "Want better rates?",
        body: c.blogSidebar?.body || "Get a free lane review from a dispatcher.",
        cta: { label: c.blogSidebar?.cta?.label || "Talk to dispatch", href: c.blogSidebar?.cta?.href || "/contact" },
      },
      servicePage: {
        heroCta: { label: c.servicePage?.heroCta?.label || "Dispatch My {{Service}}", href: c.servicePage?.heroCta?.href || "/contact" },
        benefitsLabel: c.servicePage?.benefitsLabel || "Benefits",
        benefitsHeading: c.servicePage?.benefitsHeading || "Why carriers run {{service}}",
        benefitsHighlight: c.servicePage?.benefitsHighlight || "with Apex",
        pricingHeading: c.servicePage?.pricingHeading || "Straight rates.",
        pricingHighlight: c.servicePage?.pricingHighlight || "No surprises.",
        pricingIntro:
          c.servicePage?.pricingIntro || "No contracts, no setup fees, no forced dispatch. Pick the plan that fits your fleet today — switch anytime.",
        ctaHeading: c.servicePage?.ctaHeading || "Put your {{service}}",
        ctaHighlight: c.servicePage?.ctaHighlight || "to work.",
      },
    };
  },
  ["cms:site-content"],
  { tags: ["content"], revalidate: 3600 },
);

/* ───────────────────────── home page & builder pages ───────────────────────── */

const fetchHomePage = unstable_cache(
  async (): Promise<CmsHomePage> => {
    const payload = await getPayloadClient();
    return payload.findGlobal({ slug: "home-page", depth: 2, overrideAccess: true });
  },
  ["cms:home-page"],
  { tags: ["home"], revalidate: 3600 },
);

/** `draft: true` (preview mode only) reads the latest unpublished version, uncached. */
export const getHomePage = cache(async ({ draft = false }: { draft?: boolean } = {}): Promise<CmsHomePage> => {
  if (!draft) return fetchHomePage();
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "home-page", draft: true, depth: 2, overrideAccess: true });
});

const fetchPageBySlug = (slug: string) =>
  unstable_cache(
    async (): Promise<CmsPage | null> => {
      const payload = await getPayloadClient();
      const res = await payload.find({ collection: "pages", where: { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] }, limit: 1, depth: 2, overrideAccess: true });
      return res.docs[0] ?? null;
    },
    ["cms:page-by-slug", slug],
    { tags: ["pages", `page:${slug}`], revalidate: 3600 },
  )();

/** `draft: true` (preview mode only) reads the latest unpublished version, uncached. */
export const getPageBySlug = cache(async (slug: string, { draft = false }: { draft?: boolean } = {}): Promise<CmsPage | null> => {
  if (!draft) return fetchPageBySlug(slug);
  const payload = await getPayloadClient();
  const res = await payload.find({ collection: "pages", where: { slug: { equals: slug } }, draft: true, limit: 1, depth: 2, overrideAccess: true });
  return res.docs[0] ?? null;
});

/** Published pages' sitemap/llms.txt fields only — not the full layout. */
export const getPublishedPages = unstable_cache(
  async (): Promise<PageSummary[]> => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "pages", where: { _status: { equals: "published" } }, limit: 200, depth: 0, overrideAccess: true });
    return res.docs.map((p) => ({
      title: p.title,
      slug: p.slug,
      showInSitemap: p.showInSitemap ?? true,
      sitemapPriority: p.sitemapPriority ?? 0.7,
      changeFrequency: p.changeFrequency ?? "monthly",
      updatedAt: p.updatedAt,
      description: p.meta?.description ?? null,
    }));
  },
  ["cms:pages"],
  { tags: ["pages"], revalidate: 3600 },
);
