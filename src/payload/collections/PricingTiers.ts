import type { CollectionConfig } from "payload";
import { isAdmin, publicRead } from "../access";
import { orderField, textList } from "../fields/lists";
import { revalidate } from "../hooks/revalidate";

export const PricingTiers: CollectionConfig = {
  slug: "pricing-tiers",
  labels: { singular: "Pricing plan", plural: "Pricing plans" },
  admin: { group: "Content", useAsTitle: "name", defaultColumns: ["name", "price", "unit", "featured", "order"] },
  defaultSort: "order",
  access: { read: publicRead, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, maxLength: 40, admin: { width: "34%" } },
        { name: "price", type: "text", required: true, maxLength: 20, admin: { width: "22%", description: "e.g. 5%, $300, Custom" } },
        { name: "unit", type: "text", required: true, maxLength: 40, admin: { width: "44%", description: "e.g. per truck / month" } },
      ],
    },
    { name: "blurb", type: "textarea", required: true, maxLength: 200 },
    textList("features", "Features", { maxLength: 80 }),
    { name: "cta", label: "Button label", type: "text", required: true, maxLength: 40 },
    { name: "featured", type: "checkbox", admin: { position: "sidebar", description: "Highlights the plan (Most popular)." } },
    orderField,
  ],
  hooks: {
    afterChange: [({ req }) => revalidate(req, { tags: ["pricing"], paths: ["/", "/pricing", "/llms.txt"] })],
    afterDelete: [({ req }) => revalidate(req, { tags: ["pricing"], paths: ["/", "/pricing", "/llms.txt"] })],
  },
};
