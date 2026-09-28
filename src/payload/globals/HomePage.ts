import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";
import { revalidate } from "../hooks/revalidate";
import { seoGroup } from "../fields/seo";
import { HOME_ONLY_BLOCKS } from "../blocks/home";
import { REUSABLE_BLOCKS } from "../blocks/shared";

const site = () => (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3200").replace(/\/$/, "");

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "Home page",
  admin: {
    group: "Pages",
    description: "The sections that make up the home page, in order. Drag to reorder, untick to hide, or add a new section.",
    preview: () => `${site()}/api/preview?path=${encodeURIComponent("/")}`,
  },
  versions: { drafts: { schedulePublish: true }, max: 25 },
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Layout",
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [],
              blockReferences: [...HOME_ONLY_BLOCKS, ...REUSABLE_BLOCKS],
              required: true,
              minRows: 1,
            },
          ],
        },
        { label: "SEO", fields: [seoGroup] },
      ],
    },
  ],
  hooks: {
    afterChange: [({ req }) => revalidate(req, { tags: ["home"], paths: ["/"] })],
  },
};
