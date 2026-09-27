import type { CollectionConfig } from "payload";
import { isAdmin, publicRead } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content", defaultColumns: ["filename", "alt", "updatedAt"] },
  access: { read: publicRead, create: isAdmin, update: isAdmin, delete: isAdmin },
  upload: {
    // Images only — video footage for the hero goes through its own validated pipeline.
    mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/avif"], // no SVG: it can carry script (XSS)
    focalPoint: true,
    crop: true,
    imageSizes: [
      { name: "thumbnail", width: 480, height: 320, position: "centre" },
      { name: "card", width: 960, height: 640, position: "centre" },
      { name: "hero", width: 1920, height: undefined, position: "centre" },
      { name: "og", width: 1200, height: 630, position: "centre" },
    ],
    adminThumbnail: "thumbnail",
    formatOptions: { format: "webp", options: { quality: 82 } },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the image for screen readers and SEO. Required." },
    },
  ],
};
