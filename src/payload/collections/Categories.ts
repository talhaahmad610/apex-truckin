import type { CollectionConfig } from "payload";
import { isAdmin, publicRead } from "../access";
import { slugField } from "../fields/slug";
import { revalidate } from "../hooks/revalidate";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: { singular: "Blog category", plural: "Blog categories" },
  admin: { group: "Blog", useAsTitle: "name", defaultColumns: ["name", "slug", "order"] },
  defaultSort: "order",
  access: { read: publicRead, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    { name: "name", type: "text", required: true, unique: true, maxLength: 40 },
    slugField("name"),
    { name: "order", type: "number", defaultValue: 0, admin: { position: "sidebar", description: "Lower numbers show first in the blog filter." } },
  ],
  hooks: {
    afterChange: [({ req }) => revalidate(req, { tags: ["posts", "categories"], paths: ["/blog"] })],
    afterDelete: [({ req }) => revalidate(req, { tags: ["posts", "categories"], paths: ["/blog"] })],
  },
};
