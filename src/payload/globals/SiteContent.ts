import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";
import { revalidate } from "../hooks/revalidate";
import { textList } from "../fields/lists";
import { iconSelect } from "../blocks/_shared";

/**
 * Lists shown on more than one page (steps, stats, the "full-service" items, marquee items,
 * carrier requirements, the pricing comparison rows). Editing one here updates every block that
 * uses it, instead of drifting out of sync per page. Each block still carries its own heading and
 * intro copy — only the repeated list itself lives here.
 */
export const SiteContent: GlobalConfig = {
  slug: "site-content",
  label: "Shared content",
  admin: { group: "Content", description: "Lists reused across several pages — steps, stats, the full-service items, marquee items, carrier requirements and the pricing comparison table." },
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Marquee",
          fields: [textList("marqueeItems", "Marquee items", { maxLength: 40 })],
        },
        {
          label: "Stats",
          fields: [
            {
              name: "stats",
              type: "array",
              minRows: 1,
              maxRows: 6,
              labels: { singular: "Stat", plural: "Stats" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "number", required: true, admin: { width: "34%" } },
                    { name: "decimals", type: "number", defaultValue: 0, min: 0, max: 2, admin: { width: "33%" } },
                    { name: "suffix", type: "text", maxLength: 12, admin: { width: "33%", description: "e.g. +, \" States\", ★, /7" } },
                  ],
                },
                { name: "label", type: "text", required: true, maxLength: 40 },
              ],
            },
          ],
        },
        {
          label: "Full-service items",
          fields: [
            {
              name: "fullService",
              type: "array",
              minRows: 1,
              maxRows: 8,
              labels: { singular: "Item", plural: "Items" },
              fields: [
                { name: "title", type: "text", required: true, maxLength: 60 },
                { name: "body", type: "textarea", required: true, maxLength: 400 },
              ],
            },
          ],
        },
        {
          label: "Steps",
          fields: [
            {
              name: "steps",
              type: "array",
              minRows: 3,
              maxRows: 6,
              labels: { singular: "Step", plural: "Steps" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "title", type: "text", required: true, maxLength: 30, admin: { width: "70%" } },
                    iconSelect("icon", "Icon"),
                  ],
                },
                { name: "body", type: "textarea", required: true, maxLength: 300 },
              ],
            },
          ],
        },
        {
          label: "Carrier requirements",
          fields: [textList("carrierRequirements", "Requirements", { maxLength: 120 })],
        },
        {
          label: "Pricing comparison",
          fields: [
            {
              name: "pricingComparison",
              type: "array",
              labels: { singular: "Row", plural: "Rows" },
              admin: { description: "Each row is a feature; each cell says whether a plan includes it (or a short replacement label, e.g. \"Up to 2\")." },
              fields: [
                { name: "feature", type: "text", required: true, maxLength: 60 },
                {
                  name: "cells",
                  type: "array",
                  minRows: 1,
                  labels: { singular: "Plan cell", plural: "Plan cells" },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "tier", type: "relationship", relationTo: "pricing-tiers", required: true, admin: { width: "40%" } },
                        { name: "included", type: "checkbox", defaultValue: true, admin: { width: "20%" } },
                        { name: "text", type: "text", maxLength: 30, admin: { width: "40%", description: "Optional — replaces the check/dash." } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [({ req }) => revalidate(req, { tags: ["content"], paths: ["/llms.txt"], everything: true })],
  },
};
