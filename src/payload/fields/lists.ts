import type { ArrayField, Field } from "payload";

/** A simple, reorderable list of short strings (stored as [{ text }]). */
export const textList = (name: string, label: string, opts: { description?: string; maxLength?: number; minRows?: number } = {}): ArrayField => ({
  name,
  label,
  type: "array",
  labels: { singular: "Item", plural: "Items" },
  minRows: opts.minRows,
  admin: { description: opts.description, initCollapsed: false },
  fields: [{ name: "text", type: "text", required: true, maxLength: opts.maxLength ?? 200 }],
});

/** Question/answer pairs. Plain text answers (also used verbatim in FAQPage JSON-LD). */
export const faqList = (name = "faqs", label = "FAQs"): ArrayField => ({
  name,
  label,
  type: "array",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    { name: "q", label: "Question", type: "text", required: true, maxLength: 200 },
    { name: "a", label: "Answer", type: "textarea", required: true, maxLength: 1500 },
  ],
});

/** Title + body cards (benefits, values, pillars…). */
export const cardList = (name: string, label: string, bodyMax = 400): ArrayField => ({
  name,
  label,
  type: "array",
  labels: { singular: "Card", plural: "Cards" },
  fields: [
    { name: "title", type: "text", required: true, maxLength: 80 },
    { name: "body", type: "textarea", required: true, maxLength: bodyMax },
  ],
});

export const orderField: Field = {
  name: "order",
  type: "number",
  defaultValue: 0,
  index: true,
  admin: { position: "sidebar", description: "Lower numbers show first." },
};
