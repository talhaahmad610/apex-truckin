import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";
import { slugField } from "../fields/slug";
import { seoGroup } from "../fields/seo";
import { revalidate } from "../hooks/revalidate";
import { REUSABLE_BLOCKS } from "../blocks/shared";

const site = () => (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3200").replace(/\/$/, "");

// Reserved so a page can never shadow a real route (the catch-all only matches single-segment
// paths, so this list only needs single-segment collisions).
const RESERVED_SLUGS = new Set(["blog", "admin", "api", "cms-api", "flight", "images", "sitemap.xml", "robots.txt", "llms.txt", "icon.svg"]);

const pagePaths = (slug?: string | null) => ["/sitemap.xml", "/llms.txt", ...(slug ? [`/${slug}`] : [])];

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    group: "Pages",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt"],
    description: "Build any page from reorderable sections. About, Carriers, Pricing, Contact, Services, Privacy and Terms are all built this way.",
    preview: (doc) => (doc?.slug ? `${site()}/api/preview?path=${encodeURIComponent(`/${doc.slug}`)}` : null),
  },
  defaultSort: "title",
  versions: { drafts: { schedulePublish: true }, maxPerDoc: 25 },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      maxLength: 80,
      admin: { description: "Short name used in breadcrumbs and the sitemap, e.g. \"About\". The browser/Google title is set separately under SEO." },
    },
    slugField("title", RESERVED_SLUGS),
    {
      type: "tabs",
      tabs: [
        {
          label: "Layout",
          fields: [{ name: "layout", type: "blocks", blocks: [], blockReferences: [...REUSABLE_BLOCKS], required: true, minRows: 1 }],
        },
        { label: "SEO", fields: [seoGroup] },
      ],
    },
    {
      type: "row",
      admin: { position: "sidebar" },
      fields: [
        { name: "showInSitemap", type: "checkbox", defaultValue: true, admin: { width: "50%" } },
        { name: "changeFrequency", type: "select", defaultValue: "monthly", options: ["weekly", "monthly", "yearly"], admin: { width: "50%" } },
      ],
    },
    { name: "sitemapPriority", type: "number", min: 0, max: 1, defaultValue: 0.7, admin: { position: "sidebar", step: 0.05 } },
  ],
  hooks: {
    afterChange: [
      ({ doc, previousDoc, req }) =>
        revalidate(req, {
          tags: ["pages", `page:${doc.slug}`, ...(previousDoc?.slug && previousDoc.slug !== doc.slug ? [`page:${previousDoc.slug}`] : [])],
          paths: [...pagePaths(doc.slug), ...(previousDoc?.slug && previousDoc.slug !== doc.slug ? [`/${previousDoc.slug}`] : [])],
        }),
    ],
    afterDelete: [({ doc, req }) => revalidate(req, { tags: ["pages", `page:${doc.slug}`], paths: pagePaths(doc.slug) })],
  },
};
