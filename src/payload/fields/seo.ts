import type { Field } from "payload";

/** Shared SEO group for the home page and CMS pages. */
export const seoGroup: Field = {
  name: "meta",
  label: "SEO",
  type: "group",
  admin: { description: "Defaults are derived from the page content when left empty." },
  fields: [
    { name: "title", label: "Page title", type: "text", maxLength: 70 },
    { name: "description", type: "textarea", maxLength: 170 },
    { name: "image", label: "Social share image", type: "upload", relationTo: "media" },
    { name: "canonical", label: "Canonical URL override", type: "text", admin: { description: "Rarely needed — leave empty unless this page duplicates another URL." } },
    { name: "noIndex", label: "Hide from search engines", type: "checkbox", defaultValue: false },
  ],
};
