import type { Block } from "payload";
import { defineBlock, gradientHeading, iconSelect, introField, sectionFraming } from "./_shared";

/**
 * Home-only blocks. Each relies on page-level scroll choreography (FlightScrub's sticky stage,
 * GSAP ScrollTrigger pinning, Lenis) that assumes exactly one instance on the page, so these are
 * only offered on the home-page global's layout field, never on the `pages` collection.
 */

const beatFields = [
  {
    type: "row" as const,
    fields: [
      { name: "railLabel", label: "Progress-rail label", type: "text" as const, required: true, maxLength: 12, admin: { width: "30%", description: "Short word shown on the scroll progress rail, e.g. Apex, 24/7." } },
      { name: "eyebrow", type: "text" as const, maxLength: 60, admin: { width: "70%", description: "First beat: text next to the live dot. Others: small amber kicker above the heading." } },
    ],
  },
  ...gradientHeading({ headingLabel: "Heading (first beat: your brand name)" }),
  { name: "subheading", label: "Second heading line (first beat only)", type: "text" as const, maxLength: 60 },
  { name: "body", type: "textarea" as const, maxLength: 300, admin: { description: "{{subTagline}}, {{name}} etc. are replaced with your Site settings values." } },
  {
    name: "chips",
    label: "Chips",
    type: "array" as const,
    maxRows: 3,
    fields: [{ type: "row" as const, fields: [iconSelect("icon", "Icon"), { name: "text", type: "text" as const, required: true, maxLength: 40, admin: { width: "100%" } }] }],
  },
  {
    name: "ctas",
    label: "Buttons",
    type: "array" as const,
    maxRows: 2,
    fields: [
      {
        type: "row" as const,
        fields: [
          { name: "label", type: "text" as const, required: true, maxLength: 30, admin: { width: "40%" } },
          { name: "href", type: "text" as const, required: true, admin: { width: "35%" } },
          { name: "variant", type: "select" as const, defaultValue: "primary", options: ["primary", "ghost"], admin: { width: "25%" } },
        ],
      },
    ],
  },
];

export const FlightHero: Block = defineBlock("flightHero", { singular: "Flight hero", plural: "Flight heroes" }, [
  {
    name: "beats",
    label: "Beats",
    type: "array",
    minRows: 1,
    maxRows: 6,
    labels: { singular: "Beat", plural: "Beats" },
    admin: { description: "Each beat is a screenful of the scroll-scrubbed hero. The first beat is the intro screen (brand name, live-dot pill, 2 buttons); the rest are supporting screens." },
    fields: beatFields,
  },
]);

export const HowItWorks: Block = defineBlock("howItWorks", { singular: "How it works (pinned timeline)" }, [
  ...sectionFraming({ label: "The process" }),
  ...gradientHeading(),
  introField({ label: "Side note" }),
]);

export const CoverageMap: Block = defineBlock("coverageMap", { singular: "Coverage map" }, [
  ...sectionFraming({ label: "Local broker network", numbering: "dash" }),
  ...gradientHeading(),
  introField(),
  {
    name: "regions",
    label: "Regions",
    type: "array",
    minRows: 1,
    maxRows: 4,
    fields: [
      { name: "name", type: "text", required: true, maxLength: 30 },
      { name: "states", type: "array", labels: { singular: "State", plural: "States" }, fields: [{ name: "text", type: "text", required: true, maxLength: 30 }] },
    ],
  },
]);

export const HOME_ONLY_BLOCKS: Block[] = [FlightHero, HowItWorks, CoverageMap];
export const HOME_ONLY_BLOCK_SLUGS = HOME_ONLY_BLOCKS.map((b) => b.slug);
