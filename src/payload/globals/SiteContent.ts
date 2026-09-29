import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";
import { revalidate } from "../hooks/revalidate";
import { textList } from "../fields/lists";
import { ctaGroup, iconSelect } from "../blocks/_shared";

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
        {
          label: "Page templates",
          description: "Copy for the two page types that stay code (Blog and Service pages) instead of the page builder.",
          fields: [
            {
              name: "blogIndex",
              label: "Blog index (/blog)",
              type: "group",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "eyebrow", type: "text", maxLength: 40, defaultValue: "Insights", admin: { width: "34%" } },
                    { name: "heading", type: "text", maxLength: 40, defaultValue: "Dispatch", admin: { width: "33%" } },
                    { name: "highlight", type: "text", maxLength: 40, defaultValue: "insights", admin: { width: "33%", description: "Shown in the orange gradient." } },
                  ],
                },
                {
                  name: "subtitle",
                  type: "textarea",
                  maxLength: 300,
                  defaultValue:
                    "Rate trends, lane strategy, broker negotiation and the regulations that matter — written by dispatchers who work the boards every day.",
                },
                { name: "metaTitle", label: "Meta title", type: "text", maxLength: 70, defaultValue: "Truck Dispatch Blog — Rates, Lanes & Owner-Operator Tips" },
                {
                  name: "metaDescription",
                  label: "Meta description",
                  type: "textarea",
                  maxLength: 170,
                  defaultValue:
                    "Practical truck dispatch insights: how to find better-paying loads, negotiate with brokers, cut deadhead, and grow your owner-operator business.",
                },
                { name: "ldName", label: "Structured-data name", type: "text", maxLength: 70, defaultValue: "Truck Dispatch Blog" },
                {
                  name: "ldDescription",
                  label: "Structured-data description",
                  type: "textarea",
                  maxLength: 200,
                  defaultValue: "Rate trends, lane strategy, broker negotiation and regulations for owner-operators and fleets.",
                },
              ],
            },
            {
              name: "blogSidebar",
              label: "Blog post sidebar card",
              type: "group",
              fields: [
                { name: "heading", type: "text", maxLength: 40, defaultValue: "Want better rates?" },
                { name: "body", type: "text", maxLength: 100, defaultValue: "Get a free lane review from a dispatcher." },
                ctaGroup("cta", "Button", { label: "Talk to dispatch", href: "/contact" }),
              ],
            },
            {
              name: "servicePage",
              label: "Service pages (/services/[slug])",
              admin: { description: "{{service}} = the service name lowercase (\"dry van\"); {{Service}} = as titled (\"Dry Van\")." },
              type: "group",
              fields: [
                ctaGroup("heroCta", "Hero button", { label: "Dispatch My {{Service}}", href: "/contact" }),
                {
                  type: "row",
                  fields: [
                    { name: "benefitsLabel", label: "Benefits section label", type: "text", maxLength: 40, defaultValue: "Benefits", admin: { width: "50%" } },
                    {
                      name: "benefitsHighlight",
                      label: "Benefits heading — highlighted words",
                      type: "text",
                      maxLength: 40,
                      defaultValue: "with Apex",
                      admin: { width: "50%" },
                    },
                  ],
                },
                { name: "benefitsHeading", label: "Benefits heading", type: "text", maxLength: 60, defaultValue: "Why carriers run {{service}}" },
                {
                  type: "row",
                  fields: [
                    { name: "pricingHeading", type: "text", maxLength: 40, defaultValue: "Straight rates.", admin: { width: "50%" } },
                    { name: "pricingHighlight", type: "text", maxLength: 40, defaultValue: "No surprises.", admin: { width: "50%" } },
                  ],
                },
                {
                  name: "pricingIntro",
                  type: "textarea",
                  maxLength: 300,
                  defaultValue: "No contracts, no setup fees, no forced dispatch. Pick the plan that fits your fleet today — switch anytime.",
                },
                {
                  type: "row",
                  fields: [
                    { name: "ctaHeading", label: "Closing CTA heading", type: "text", maxLength: 60, defaultValue: "Put your {{service}}", admin: { width: "50%" } },
                    { name: "ctaHighlight", label: "Closing CTA — highlighted words", type: "text", maxLength: 40, defaultValue: "to work.", admin: { width: "50%" } },
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
