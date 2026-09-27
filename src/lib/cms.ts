import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { FAQ, Post, PricingTier, Service, SiteInfo, TeamMember, Testimonial } from "@/types";
import type { Category as CmsCategory, Media as CmsMedia, Post as CmsPost, Service as CmsService } from "@/payload-types";
import { getPayloadClient } from "./payload";
import { richTextToHtml } from "./richtext";

/* ───────────────────────── helpers ───────────────────────── */

const isObj = <T extends object>(v: unknown): v is T => typeof v === "object" && v !== null;

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
const mediaUrl = (m: unknown) => (isObj<CmsMedia>(m) ? m.url ?? "" : "");
const mediaAlt = (m: unknown) => (isObj<CmsMedia>(m) ? m.alt ?? "" : "");

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
      },
      nav: (s.nav ?? []).map((n) => ({ label: n.label, href: n.href })),
      footer: {
        headline: s.footerHeadline,
        highlight: s.footerHighlight ?? "",
        newsletterLabel: s.newsletterLabel ?? "",
        bottomLine: s.footerBottomLine ?? "",
        legalLinks: (s.legalLinks ?? []).map((n) => ({ label: n.label, href: n.href })),
        image: mediaUrl(s.footerImage) || null,
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
      name: t.name,
      price: t.price,
      unit: t.unit,
      blurb: t.blurb,
      features: txt(t.features),
      cta: t.cta,
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
