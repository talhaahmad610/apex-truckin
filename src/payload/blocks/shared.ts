import type { Block } from "payload";
import { FAQ_GROUPS } from "../collections/Faqs";
import { articleEditor } from "../editor";
import { bodyField, ctaGroup, defineBlock, gradientHeading, introField, sectionFraming } from "./_shared";
import { cardList } from "../fields/lists";

/** Available on both the home page and any `pages` document. */

export const PageHero: Block = defineBlock("pageHero", { singular: "Page hero" }, [
  { name: "eyebrow", type: "text", required: true, maxLength: 40 },
  ...gradientHeading(),
  { name: "subtitle", type: "textarea", maxLength: 300, admin: { description: "{{city}}, {{founded}} etc. are replaced with your Site settings values." } },
  { name: "image", type: "upload", relationTo: "media", admin: { description: "Leave empty for a plain dark background." } },
  ctaGroup(),
  {
    name: "size",
    type: "select",
    defaultValue: "default",
    options: [
      { label: "Default (tall)", value: "default" },
      { label: "Short", value: "short" },
      { label: "Legal page (shortest, shows \"Last updated\")", value: "legal" },
    ],
  },
  { name: "updated", label: "Last updated (legal size only)", type: "text", maxLength: 40, admin: { condition: (_, s) => s?.size === "legal" } },
]);

export const Marquee: Block = defineBlock("marquee", { singular: "Scrolling ticker" }, [
  { name: "reverse", type: "checkbox", defaultValue: false },
]);

export const Stats: Block = defineBlock("stats", { singular: "Stats" }, [
  ...sectionFraming({ label: "By the numbers" }),
  ...gradientHeading(),
  introField(),
]);

export const FullService: Block = defineBlock("fullService", { singular: "Full-service list" }, [
  ...sectionFraming({ label: "Full-service dispatch" }),
  ...gradientHeading(),
  bodyField({ maxLength: 300 }),
  ctaGroup(),
  { name: "image", type: "upload", relationTo: "media", admin: { description: "Split style only — background photo.", condition: (_, s) => s?.style === "split" } },
  {
    name: "style",
    type: "select",
    defaultValue: "split",
    options: [
      { label: "Split (photo + staggered list)", value: "split" },
      { label: "Cards (numbered tiles)", value: "cards" },
      { label: "Compact (2-column, with stats)", value: "compact" },
    ],
  },
  { name: "showStats", label: "Show stats alongside (compact style)", type: "checkbox", defaultValue: false, admin: { condition: (_, s) => s?.style === "compact" } },
]);

export const Steps: Block = defineBlock("steps", { singular: "Steps" }, [
  ...sectionFraming({ label: "How dispatch works" }),
  ...gradientHeading(),
  introField(),
  {
    name: "style",
    type: "select",
    defaultValue: "list",
    options: [
      { label: "List (numbered, vertical)", value: "list" },
      { label: "Grid (4 columns, with icons)", value: "grid" },
    ],
  },
]);

export const ServicesTabs: Block = defineBlock("servicesTabs", { singular: "Services (tabs)" }, [
  ...sectionFraming({ label: "What we do" }),
  ...gradientHeading(),
]);

export const ServicesGrid: Block = defineBlock("servicesGrid", { singular: "Services (grid)" }, []);

export const ServicesCompare: Block = defineBlock("servicesCompare", { singular: "Services comparison table" }, [
  ...sectionFraming({ label: "Compare", numbering: "none" }),
  ...gradientHeading(),
  { name: "emitCollectionLd", label: "Publish as a collection listing in Google's structured data", type: "checkbox", defaultValue: false },
]);

export const Pricing: Block = defineBlock("pricing", { singular: "Pricing plans" }, [
  ...sectionFraming({ label: "Pricing" }),
  { name: "heading", type: "text", maxLength: 140, admin: { description: "Leave empty to show just the plan cards with no heading." } },
  { name: "highlight", type: "text", maxLength: 80 },
  introField(),
]);

export const PricingCompare: Block = defineBlock("pricingCompare", { singular: "Pricing comparison table" }, [
  ...sectionFraming({ label: "Compare plans", numbering: "none" }),
  ...gradientHeading(),
]);

export const Testimonials: Block = defineBlock("testimonials", { singular: "Testimonials" }, [
  ...sectionFraming({ label: "Carrier voice" }),
  ...gradientHeading(),
  {
    name: "statLine",
    type: "text",
    maxLength: 60,
    defaultValue: "Average carrier satisfaction",
  },
  {
    name: "statNote",
    type: "text",
    maxLength: 160,
    defaultValue: "Based on verified reviews from owner-operators and fleets we dispatch.",
  },
  ctaGroup("cta", "Button", { label: "Join Them", href: "/contact" }),
]);

export const Faq: Block = defineBlock("faq", { singular: "FAQ" }, [
  ...sectionFraming({ label: "FAQ", numbering: "none" }),
  ...gradientHeading({ required: false }),
  {
    name: "source",
    type: "select",
    defaultValue: "group",
    options: [
      { label: "A shared FAQ group", value: "group" },
      { label: "Hand-picked FAQs", value: "picked" },
    ],
  },
  { name: "group", type: "select", defaultValue: "general", options: [...FAQ_GROUPS], admin: { condition: (_, s) => s?.source === "group" } },
  { name: "items", label: "FAQs", type: "relationship", relationTo: "faqs", hasMany: true, admin: { condition: (_, s) => s?.source === "picked" } },
]);

export const BlogPreview: Block = defineBlock("blogPreview", { singular: "Blog preview" }, [
  ...sectionFraming({ label: "Insights" }),
  ...gradientHeading(),
  ctaGroup(),
  { name: "limit", type: "number", defaultValue: 3, min: 1, max: 6 },
]);

export const CtaBanner: Block = defineBlock("ctaBanner", { singular: "CTA banner" }, [
  ...gradientHeading({ headingLabel: "Heading" }),
  bodyField({ maxLength: 300 }),
  { name: "truck", label: "Show the truck illustration", type: "checkbox", defaultValue: true },
  ctaGroup("cta", "Button", { label: "Start Dispatching", href: "/contact" }),
]);

export const ContactBlock: Block = defineBlock("contact", { singular: "Contact" }, [
  ...sectionFraming({ label: "Contact" }),
  ...gradientHeading({ required: false }),
  introField(),
  { name: "formHeading", type: "text", maxLength: 60, defaultValue: "Start dispatching" },
  { name: "statusLine", type: "text", maxLength: 60, admin: { description: "Section style only, e.g. \"Dispatch desk online now\"." } },
  { name: "replyNote", type: "text", maxLength: 60, admin: { description: "Section style only, e.g. \"Avg. reply < 1 hr\"." } },
  { name: "methodsLabel", label: "WhatsApp method label", type: "text", maxLength: 40, defaultValue: "Message a dispatcher" },
  {
    name: "style",
    type: "select",
    defaultValue: "section",
    options: [
      { label: "Home-page section", value: "section" },
      { label: "Full contact page (with business hours)", value: "page" },
    ],
  },
]);

export const Team: Block = defineBlock("team", { singular: "Team" }, [
  ...sectionFraming({ label: "The team" }),
  ...gradientHeading(),
]);

export const Timeline: Block = defineBlock("timeline", { singular: "Timeline" }, [
  ...sectionFraming({ label: "Our story" }),
  ...gradientHeading(),
  {
    name: "paragraphs",
    type: "array",
    labels: { singular: "Paragraph", plural: "Paragraphs" },
    fields: [{ name: "text", type: "textarea", required: true, maxLength: 600 }],
  },
  {
    name: "milestones",
    type: "array",
    labels: { singular: "Milestone", plural: "Milestones" },
    fields: [
      {
        type: "row",
        fields: [
          { name: "year", type: "text", required: true, maxLength: 10, admin: { width: "20%" } },
          { name: "title", type: "text", required: true, maxLength: 60, admin: { width: "80%" } },
        ],
      },
      { name: "body", type: "textarea", required: true, maxLength: 300 },
    ],
  },
]);

export const Values: Block = defineBlock("values", { singular: "Values" }, [
  ...sectionFraming({ label: "Mission & values" }),
  ...gradientHeading(),
  { name: "image", type: "upload", relationTo: "media", admin: { description: "Background photo." } },
  cardList("cards", "Value cards", 200),
]);

export const Requirements: Block = defineBlock("requirements", { singular: "Requirements list" }, [
  ...sectionFraming({ label: "Requirements" }),
  ...gradientHeading(),
  introField(),
  ctaGroup(),
]);

export const RichText: Block = defineBlock("richText", { singular: "Rich text" }, [
  { name: "content", type: "richText", editor: articleEditor },
  { name: "width", type: "select", defaultValue: "820", options: [{ label: "Article (820px)", value: "820" }, { label: "Wide (1100px)", value: "1100" }] },
]);

export const ImageText: Block = defineBlock("imageText", { singular: "Image + text" }, [
  ...sectionFraming({ label: "", numbering: "none" }),
  ...gradientHeading(),
  bodyField({ maxLength: 600 }),
  ctaGroup(),
  { name: "image", type: "upload", relationTo: "media", required: true },
  { name: "imageSide", type: "select", defaultValue: "right", options: ["left", "right"] },
]);

export const REUSABLE_BLOCKS: Block[] = [
  PageHero,
  Marquee,
  Stats,
  FullService,
  Steps,
  ServicesTabs,
  ServicesGrid,
  ServicesCompare,
  Pricing,
  PricingCompare,
  Testimonials,
  Faq,
  BlogPreview,
  CtaBanner,
  ContactBlock,
  Team,
  Timeline,
  Values,
  Requirements,
  RichText,
  ImageText,
];
export const REUSABLE_BLOCK_SLUGS = REUSABLE_BLOCKS.map((b) => b.slug);
