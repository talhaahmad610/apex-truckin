/**
 * Seed the CMS with the site's current content. Idempotent — upserts by slug/filename, so it is
 * safe to re-run (it refreshes seeded documents to the values below and never duplicates).
 *
 *   npm run seed
 *
 * Runs through `payload run`, which loads .env.local and the Payload config.
 */
import path from "path";
import { getPayload, type Payload } from "payload";
import config from "../src/payload.config";
import { htmlToLexical } from "../src/payload/htmlToLexical";
import { SEED_POSTS, SEED_TESTIMONIALS } from "../src/lib/seed-data";
import { COMPANY, GENERAL_FAQS, NAV_LINKS, PRICING, PRICING_FAQS, SERVICES, TEAM } from "../src/lib/constants";
import {
  CARRIER_REQUIREMENTS,
  FULL_SERVICE,
  HOME_LAYOUT,
  MARQUEE_ITEMS,
  PAGES,
  PRICING_COMPARISON,
  PRIVACY_HTML,
  STATS,
  STEPS,
  TERMS_HTML,
} from "../src/lib/seed-pages";

// A FRESH object per call: Payload hooks mutate req.context (the S3 plugin sets skipCloudStorage
// after an upload), so a shared object would make every later upload silently skip storage.
const ctx = () => ({ disableRevalidate: true });
const log = (...a: unknown[]) => console.log("[seed]", ...a);

async function ensureAdmin(payload: Payload) {
  const { totalDocs } = await payload.count({ collection: "users" });
  if (totalDocs) return log("admin user exists — skipped");
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password || password.startsWith("replace_with")) {
    throw new Error("No users yet: set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env.local (or create one at /admin).");
  }
  await payload.create({ collection: "users", data: { email, password, name: "Admin" }, context: ctx() });
  log(`created admin user ${email}`);
}

/** Upload a file from /public (once) and return its media id. Matches on the stored filename. */
const mediaCache = new Map<string, number>();
export async function ensureMedia(payload: Payload, publicPath: string, alt: string): Promise<number> {
  if (mediaCache.has(publicPath)) return mediaCache.get(publicPath)!;
  const base = path.basename(publicPath).replace(/\.(jpe?g|png|avif)$/i, ".webp"); // uploads are stored as webp
  const found = await payload.find({ collection: "media", where: { filename: { equals: base } }, limit: 1, depth: 0 });
  let id = found.docs[0]?.id;
  // Self-heal: a record whose file is missing from storage gets re-uploaded (file replaced in place).
  const reachable = found.docs[0]?.url ? (await fetch(found.docs[0].url, { method: "HEAD" }).catch(() => null))?.ok : false;
  if (id && reachable) {
    await payload.update({ collection: "media", id, data: { alt }, context: ctx() });
  } else if (id) {
    await payload.update({
      collection: "media",
      id,
      data: { alt },
      filePath: path.resolve(process.cwd(), "public", publicPath.replace(/^\//, "")),
      overwriteExistingFiles: true,
      context: ctx(),
    });
    log(`re-uploaded missing file ${publicPath} → media #${id}`);
  } else {
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      filePath: path.resolve(process.cwd(), "public", publicPath.replace(/^\//, "")),
      context: ctx(),
    });
    id = doc.id;
    log(`uploaded ${publicPath} → media #${id}`);
  }
  mediaCache.set(publicPath, id);
  return id;
}

async function upsert(payload: Payload, collection: "categories" | "posts" | "pages", where: Record<string, unknown>, data: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  const found = await payload.find({ collection, where: where as never, limit: 1, depth: 0, draft: collection !== "categories" });
  const existing = found.docs[0];
  if (existing) {
    await payload.update({ collection, id: existing.id, data: data as never, context: ctx(), ...extra });
    return existing.id;
  }
  const doc = await payload.create({ collection, data: data as never, context: ctx(), ...extra });
  return doc.id;
}

async function seedBlog(payload: Payload) {
  const categories = ["Dispatch Tips", "Industry News", "Owner-Operator", "Regulations"];
  const catIds = new Map<string, number>();
  for (const [order, name] of categories.entries()) {
    catIds.set(name, await upsert(payload, "categories", { name: { equals: name } }, { name, slug: "", order }));
  }
  log(`categories: ${categories.length}`);

  for (const p of SEED_POSTS) {
    const cover = p.cover_image_url ? await ensureMedia(payload, p.cover_image_url, p.title) : null;
    await upsert(
      payload,
      "posts",
      { slug: { equals: p.slug } },
      {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: await htmlToLexical(payload, p.content ?? ""),
        category: catIds.get(p.category),
        cover,
        author: p.author,
        publishedAt: p.published_at,
        metaDescription: p.meta_description,
        _status: p.is_published ? "published" : "draft",
      },
    );
  }
  log(`posts: ${SEED_POSTS.length}`);
}

/* ───────────────────────── Phase 4: site content ───────────────────────── */

type Coll = "services" | "pricing-tiers" | "faqs" | "team" | "testimonials";
async function upsertBy(payload: Payload, collection: Coll, where: Record<string, unknown>, data: Record<string, unknown>) {
  const found = await payload.find({ collection, where: where as never, limit: 1, depth: 0 });
  if (found.docs[0]) {
    await payload.update({ collection, id: found.docs[0].id, data: data as never, context: ctx() });
    return found.docs[0].id;
  }
  return (await payload.create({ collection, data: data as never, context: ctx() })).id;
}

const rows = (list: readonly string[]) => list.map((text) => ({ text }));

async function seedSiteSettings(payload: Payload) {
  const digits = COMPANY.phoneHref.replace(/^tel:/, "");
  const wa = new URL(COMPANY.whatsapp);
  await payload.updateGlobal({
    slug: "site-settings",
    context: ctx(),
    data: {
      name: COMPANY.name,
      legalName: COMPANY.legalName,
      founded: COMPANY.founded,
      tagline: COMPANY.tagline,
      subTagline: COMPANY.subTagline,
      phone: COMPANY.phone,
      phoneE164: digits,
      email: COMPANY.email,
      whatsappNumber: wa.pathname.replace(/\D/g, ""),
      whatsappMessage: wa.searchParams.get("text") ?? "",
      address: { ...COMPANY.address },
      hours: COMPANY.hours.map((h) => ({ ...h })),
      socials: { ...COMPANY.socials },
      nav: NAV_LINKS.map((n) => ({ ...n })),
      footerHeadline: "Keep it",
      footerHighlight: "moving.",
      newsletterLabel: "Weekly lane & rate intel",
      footerBottomLine: "Truck dispatch services · Dallas, TX · Serving all 48 contiguous states",
      legalLinks: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Sitemap", href: "/sitemap.xml" },
      ],
      rateDisclaimer:
        "Rates vary by state, lane, equipment, load type, market conditions, deadhead and negotiated rate, and are not guaranteed.",
      grossDisclaimer:
        "Weekly gross is an estimate based on about 2,500–3,000 miles per week, before fuel, dispatch fees, insurance and other operating costs. It is not a guarantee of earnings — actual revenue varies by market, lanes, load availability, equipment and negotiated rates.",
    },
  });
  log("site settings");
}

// The services comparison table used to be computed from slugs in code; it is now per-service data.
const comparisonFor = (slug: string) => ({
  cdl: slug === "box-truck" || slug === "hotshot" ? ("depends" as const) : ("yes" as const),
  tarpPay: ["flatbed", "step-deck", "hotshot", "box-truck"].includes(slug),
  permits: ["flatbed", "step-deck"].includes(slug),
  tempMonitoring: slug === "reefer",
  dropHook: slug === "power-only" || slug === "dry-van",
});

async function seedServices(payload: Payload) {
  for (const [order, s] of SERVICES.entries()) {
    const image = await ensureMedia(payload, s.image, s.imageAlt);
    await upsertBy(payload, "services", { slug: { equals: s.slug } }, {
      name: s.name,
      slug: s.slug,
      order,
      short: s.short,
      tagline: s.tagline,
      description: s.description,
      image,
      avgRate: s.avgRate,
      weeklyGross: s.weeklyGross,
      included: rows(s.included),
      requirements: rows(s.requirements),
      benefits: s.benefits.map((b) => ({ ...b })),
      typicalLoads: rows(s.typicalLoads),
      faqs: s.faqs.map((f) => ({ ...f })),
      comparison: comparisonFor(s.slug),
    });
  }
  log(`services: ${SERVICES.length}`);
}

async function seedPricing(payload: Payload) {
  for (const [order, t] of PRICING.entries()) {
    await upsertBy(payload, "pricing-tiers", { name: { equals: t.name } }, {
      name: t.name,
      price: t.price,
      unit: t.unit,
      blurb: t.blurb,
      features: rows(t.features),
      cta: t.cta,
      featured: Boolean(t.featured),
      order,
    });
  }
  log(`pricing plans: ${PRICING.length}`);
}

async function seedFaqs(payload: Payload) {
  const groups: [string, { q: string; a: string }[]][] = [
    ["general", GENERAL_FAQS],
    ["pricing", PRICING_FAQS],
    [
      "service",
      [
        {
          q: "How much does {service} dispatch cost?",
          a: "Starter is 5% per load dispatched with no monthly fee. Professional is a flat $300 per truck per month. Enterprise fleets get custom pricing.",
        },
        { q: "Do you force dispatch?", a: "Never. Every load is sent to you for approval before it's booked." },
        {
          q: "How much can a {service} carrier gross per week?",
          a: "At typical freight rates of {avgRate}, a {service} carrier dispatched by Apex Truckin can gross an estimated {weeklyGross} per week before fuel, dispatch fees and other operating costs. This is an estimate, not a guarantee — actual revenue depends on the state, lane, load type, market conditions, deadhead and the rates our dispatchers negotiate.",
        },
      ],
    ],
  ];
  let n = 0;
  for (const [group, list] of groups) {
    for (const [order, f] of list.entries()) {
      await upsertBy(payload, "faqs", { and: [{ question: { equals: f.q } }, { group: { equals: group } }] }, { question: f.q, answer: f.a, group, order });
      n++;
    }
  }
  log(`faqs: ${n}`);
}

async function seedTeam(payload: Payload) {
  for (const [order, m] of TEAM.entries()) {
    const photo = await ensureMedia(payload, m.image, `Portrait of ${m.name}, ${m.role}`);
    await upsertBy(payload, "team", { name: { equals: m.name } }, { name: m.name, role: m.role, photo, bio: m.bio, order });
  }
  log(`team: ${TEAM.length}`);
}

async function seedTestimonials(payload: Payload) {
  // Preserve today's display order: featured first, then newest first.
  const sorted = [...SEED_TESTIMONIALS].sort((a, b) => Number(b.is_featured) - Number(a.is_featured) || +new Date(b.created_at) - +new Date(a.created_at));
  for (const [order, t] of sorted.entries()) {
    await upsertBy(payload, "testimonials", { carrierName: { equals: t.carrier_name } }, {
      carrierName: t.carrier_name,
      reviewText: t.review_text,
      rating: t.rating,
      truckType: t.truck_type,
      location: t.location,
      featured: t.is_featured,
      order,
    });
  }
  log(`testimonials: ${sorted.length}`);
}

/* ───────────────────────── Phase 5: page builder ───────────────────────── */

/** Resolves a block's `image: "/images/…"` field (if any) to a media id. Blocks with no image
 *  field pass through unchanged. Doesn't recurse into nested arrays — none of the seeded blocks
 *  carry images below the top level. */
async function resolveBlockImage(payload: Payload, block: Record<string, unknown>): Promise<Record<string, unknown>> {
  if (typeof block.image === "string" && block.image.startsWith("/")) {
    const alt = (block.heading as string | undefined) ?? (block.eyebrow as string | undefined) ?? "";
    return { ...block, image: await ensureMedia(payload, block.image, alt) };
  }
  return block;
}

async function seedSiteContent(payload: Payload) {
  // Comparison cells reference real pricing-tier ids — look them up by name after seedPricing.
  const tiers = await payload.find({ collection: "pricing-tiers", limit: 20, depth: 0 });
  const tierId = (name: string) => tiers.docs.find((t) => t.name.toLowerCase().startsWith(name))?.id;
  const [starter, pro, ent] = [tierId("starter"), tierId("professional"), tierId("enterprise")];

  await payload.updateGlobal({
    slug: "site-content",
    context: ctx(),
    data: {
      marqueeItems: rows(MARQUEE_ITEMS),
      stats: STATS,
      fullService: FULL_SERVICE,
      steps: STEPS,
      carrierRequirements: rows(CARRIER_REQUIREMENTS),
      pricingComparison: PRICING_COMPARISON.map((r) => ({
        feature: r.feature,
        cells: [
          { tier: starter, included: r.starter === true, text: typeof r.starter === "string" ? r.starter : "" },
          { tier: pro, included: r.pro === true, text: typeof r.pro === "string" ? r.pro : "" },
          { tier: ent, included: r.ent === true, text: typeof r.ent === "string" ? r.ent : "" },
        ],
      })),
    },
  });
  log("site content");
}

async function seedHomePage(payload: Payload) {
  const layout = await Promise.all(HOME_LAYOUT.map((b) => resolveBlockImage(payload, b as Record<string, unknown>)));
  await payload.updateGlobal({
    slug: "home-page",
    context: ctx(),
    data: {
      layout: layout as never,
      _status: "published",
      meta: {
        title: "Truck Dispatch Services for Owner-Operators & Fleets",
        description:
          "24/7 truck dispatch for owner-operators and fleets: dry van, flatbed, reefer, hotshot, step deck, power only and box truck. Higher-paying loads, no forced dispatch.",
      },
    },
  });
  log("home page");
}

async function seedPages(payload: Payload) {
  for (const p of PAGES) {
    const layout = await Promise.all(p.layout.map((b) => resolveBlockImage(payload, b as Record<string, unknown>)));
    if (p.slug === "privacy" || p.slug === "terms") {
      const richTextBlock = layout.find((b) => b.blockType === "richText");
      if (richTextBlock) richTextBlock.content = await htmlToLexical(payload, p.slug === "privacy" ? PRIVACY_HTML : TERMS_HTML);
    }
    await upsert(
      payload,
      "pages",
      { slug: { equals: p.slug } },
      {
        title: p.title,
        slug: p.slug,
        layout: layout as never,
        meta: p.meta,
        showInSitemap: true,
        sitemapPriority: p.sitemapPriority,
        changeFrequency: p.changeFrequency,
        _status: "published",
      },
    );
  }
  log(`pages: ${PAGES.length}`);
}

const payload = await getPayload({ config });
await ensureAdmin(payload);
await seedBlog(payload);
await seedSiteSettings(payload);
await seedServices(payload);
await seedPricing(payload);
await seedFaqs(payload);
await seedTeam(payload);
await seedTestimonials(payload);
await seedSiteContent(payload);
await seedHomePage(payload);
await seedPages(payload);
log("done — the seed skips cache revalidation, so restart a running dev server (or save Site settings in /admin) to see the changes");
process.exit(0);
