import type { Block, Field } from "payload";
import { ICON_OPTIONS } from "./iconOptions";

/** Show/hide a block without deleting it. Every block gets this. */
export const enabledField: Field = {
  name: "enabled",
  type: "checkbox",
  defaultValue: true,
  admin: { description: "Untick to hide this section without deleting it." },
};

/** The small pill label above a section heading, plus how its number is shown. */
export const sectionFraming = (defaults: { label?: string; numbering?: "counter" | "dash" | "none" } = {}): Field[] => [
  {
    type: "row",
    fields: [
      { name: "label", type: "text", maxLength: 40, defaultValue: defaults.label, admin: { width: "60%", description: "Small pill above the heading, e.g. \"What we do\"." } },
      {
        name: "numbering",
        type: "select",
        defaultValue: defaults.numbering ?? "counter",
        options: [
          { label: "Number automatically (01, 02…)", value: "counter" },
          { label: "Dash (—)", value: "dash" },
          { label: "No number", value: "none" },
        ],
        admin: { width: "40%" },
      },
    ],
  },
];

/** Heading text with an optional gradient-highlighted phrase, matching the site's heading style everywhere. */
export const gradientHeading = (opts: { required?: boolean; headingLabel?: string } = {}): Field[] => [
  { name: "heading", label: opts.headingLabel ?? "Heading", type: "text", required: opts.required ?? true, maxLength: 140 },
  {
    type: "row",
    fields: [
      { name: "highlight", type: "text", maxLength: 80, admin: { width: "50%", description: "Words shown in the orange gradient right after the heading." } },
      { name: "tail", type: "text", maxLength: 80, admin: { width: "50%", description: "Optional plain words after the highlighted ones." } },
    ],
  },
];

export const introField = (opts: { label?: string; maxLength?: number } = {}): Field => ({
  name: "intro",
  label: opts.label ?? "Intro text",
  type: "textarea",
  maxLength: opts.maxLength ?? 600,
});

export const bodyField = (opts: { label?: string; maxLength?: number; required?: boolean } = {}): Field => ({
  name: "body",
  label: opts.label ?? "Body",
  type: "textarea",
  required: opts.required,
  maxLength: opts.maxLength ?? 600,
});

/** A single button: label + a page path or full URL. */
export const ctaGroup = (name = "cta", label = "Button", defaults: { label?: string; href?: string } = {}): Field => ({
  name,
  label,
  type: "group",
  fields: [
    {
      type: "row",
      fields: [
        { name: "label", type: "text", maxLength: 40, defaultValue: defaults.label, admin: { width: "50%" } },
        {
          name: "href",
          type: "text",
          defaultValue: defaults.href,
          admin: { width: "50%", description: "A page path like /contact, or a full https:// URL." },
          validate: (v: unknown) => (!v || (typeof v === "string" && /^(\/|https?:\/\/)/.test(v)) ? true : "Start with / or http(s)://"),
        },
      ],
    },
  ],
});

export const iconSelect = (name = "icon", label = "Icon"): Field => ({
  name,
  label,
  type: "select",
  options: [...ICON_OPTIONS],
});

/** Wraps a block's own fields with the enabled checkbox every block needs, and a stable interfaceName
 *  for generated types. `labels` may be a plain singular string ("Stats" → plural "Stats" + "s"). */
export const defineBlock = (slug: string, labels: string | { singular: string; plural?: string }, fields: Field[]): Block => {
  const singular = typeof labels === "string" ? labels : labels.singular;
  const plural = typeof labels === "string" ? `${labels}s` : (labels.plural ?? `${labels.singular}s`);
  return {
    slug,
    interfaceName: `${slug[0]!.toUpperCase()}${slug.slice(1)}Block`,
    labels: { singular, plural },
    fields: [enabledField, ...fields],
  };
};
