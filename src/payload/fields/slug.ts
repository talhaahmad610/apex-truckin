import type { Field } from "payload";

const toSlug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .slice(0, 120);

/** URL slug: auto-filled from `from` when left empty, always normalized to kebab-case. `reserved`
 *  rejects slugs that would collide with a real route (used by the `pages` collection). */
export const slugField = (from = "title", reserved: Set<string> = new Set()): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "The URL part, e.g. dry-van-vs-flatbed. Leave empty to generate it from the title.",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const src = (typeof value === "string" && value.trim()) || (data?.[from] as string | undefined) || "";
        return src ? toSlug(src) : value;
      },
    ],
  },
  validate: (v: unknown) => {
    if (typeof v !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v)) return "Use lowercase letters, numbers and dashes only.";
    return reserved.has(v) ? `"${v}" is reserved and can't be used here.` : true;
  },
});
