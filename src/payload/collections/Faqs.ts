import type { CollectionConfig } from "payload";
import { isAdmin, publicRead } from "../access";
import { orderField } from "../fields/lists";
import { revalidate } from "../hooks/revalidate";

export const FAQ_GROUPS = [
  { label: "General (carriers & contact pages)", value: "general" },
  { label: "Pricing page", value: "pricing" },
  { label: "Added to every service page", value: "service" },
] as const;

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: {
    group: "Content",
    useAsTitle: "question",
    defaultColumns: ["question", "group", "order"],
    description: "Shared FAQs. Service-specific FAQs live on each service instead.",
  },
  defaultSort: "order",
  access: { read: publicRead, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
      maxLength: 200,
      admin: { description: "In the service-page group, {service} is replaced with the service name (e.g. dry van)." },
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
      maxLength: 1500,
      admin: { description: "Plain text. It is also published to Google as FAQ structured data." },
    },
    { name: "group", type: "select", required: true, defaultValue: "general", options: [...FAQ_GROUPS], index: true, admin: { position: "sidebar" } },
    orderField,
  ],
  hooks: {
    // `everything: true` because any builder page can now embed a "faq" block by group — a
    // plain path list can't keep up with where a group is used.
    afterChange: [({ req }) => revalidate(req, { tags: ["faqs"], everything: true })],
    afterDelete: [({ req }) => revalidate(req, { tags: ["faqs"], everything: true })],
  },
};
