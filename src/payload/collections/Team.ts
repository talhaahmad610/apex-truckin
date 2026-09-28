import type { CollectionConfig } from "payload";
import { isAdmin, publicRead } from "../access";
import { orderField } from "../fields/lists";
import { revalidate } from "../hooks/revalidate";

export const Team: CollectionConfig = {
  slug: "team",
  labels: { singular: "Team member", plural: "Team" },
  admin: { group: "Content", useAsTitle: "name", defaultColumns: ["name", "role", "order"] },
  defaultSort: "order",
  access: { read: publicRead, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    { name: "name", type: "text", required: true, maxLength: 80 },
    { name: "role", type: "text", required: true, maxLength: 80 },
    { name: "photo", type: "upload", relationTo: "media", required: true },
    { name: "bio", type: "textarea", required: true, maxLength: 240 },
    orderField,
  ],
  hooks: {
    // `everything: true` because a "team" block can now be added to any builder page.
    afterChange: [({ req }) => revalidate(req, { tags: ["team"], everything: true })],
    afterDelete: [({ req }) => revalidate(req, { tags: ["team"], everything: true })],
  },
};
