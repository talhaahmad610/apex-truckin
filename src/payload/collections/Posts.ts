import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";
import { slugField } from "../fields/slug";
import { revalidate } from "../hooks/revalidate";
import { articleEditor } from "../editor";
import { lexicalPlainText } from "../lexicalText";

const site = () => (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3200").replace(/\/$/, "");

const postPaths = (slug?: string | null) => [
  "/",
  "/blog",
  "/sitemap.xml",
  "/llms.txt",
  ...(slug ? [`/blog/${slug}`] : []),
];

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Blog post", plural: "Blog posts" },
  admin: {
    group: "Blog",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "_status", "publishedAt", "updatedAt"],
    listSearchableFields: ["title", "excerpt"],
    // Opens the real page design with draft content (admin-only, see /api/preview).
    preview: (doc) => (doc?.slug ? `${site()}/api/preview?path=${encodeURIComponent(`/blog/${doc.slug}`)}` : null),
  },
  defaultSort: "-publishedAt",
  versions: { drafts: { schedulePublish: true }, maxPerDoc: 25 },
  access: {
    // Anonymous API readers only ever see published posts; admins see drafts too.
    read: ({ req }) => (req.user ? true : { _status: { equals: "published" } }),
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: "title", type: "text", required: true, maxLength: 200 },
    {
      name: "excerpt",
      type: "textarea",
      maxLength: 400,
      admin: { description: "One or two sentences shown on blog cards and above the article." },
    },
    { name: "content", type: "richText", editor: articleEditor, required: true },
    slugField("title"),
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "cover",
      label: "Cover image",
      type: "upload",
      relationTo: "media",
      admin: { position: "sidebar" },
    },
    { name: "author", type: "text", defaultValue: "Apex Truckin Team", maxLength: 80, admin: { position: "sidebar" } },
    {
      name: "publishedAt",
      label: "Publish date",
      type: "date",
      index: true,
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" }, description: "Set automatically on first publish if empty." },
    },
    {
      name: "readTime",
      label: "Read time (min)",
      type: "number",
      admin: { position: "sidebar", readOnly: true, description: "Calculated from the article length." },
    },
    {
      type: "collapsible",
      label: "SEO",
      fields: [
        { name: "metaTitle", type: "text", maxLength: 70, admin: { description: "Defaults to the post title." } },
        { name: "metaDescription", type: "textarea", maxLength: 170, admin: { description: "~150 characters for search results. Defaults to the excerpt." } },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.content) {
          const words = lexicalPlainText(data.content).split(/\s+/).filter(Boolean).length;
          data.readTime = Math.max(1, Math.round(words / 220));
        }
        if (data._status === "published" && !data.publishedAt) data.publishedAt = new Date().toISOString();
        return data;
      },
    ],
    afterChange: [
      ({ doc, previousDoc, req }) =>
        revalidate(req, {
          tags: ["posts", `post:${doc.slug}`, ...(previousDoc?.slug ? [`post:${previousDoc.slug}`] : [])],
          paths: [...postPaths(doc.slug), ...(previousDoc?.slug && previousDoc.slug !== doc.slug ? [`/blog/${previousDoc.slug}`] : [])],
        }),
    ],
    afterDelete: [({ doc, req }) => revalidate(req, { tags: ["posts", `post:${doc.slug}`], paths: postPaths(doc.slug) })],
  },
};
