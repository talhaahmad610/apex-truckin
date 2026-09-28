import type { CollectionConfig } from "payload";
import { isAdmin, publicRead } from "../access";
import { orderField } from "../fields/lists";
import { revalidate } from "../hooks/revalidate";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  admin: { group: "Content", useAsTitle: "carrierName", defaultColumns: ["carrierName", "rating", "truckType", "featured", "order"] },
  defaultSort: "order",
  access: { read: publicRead, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    { name: "carrierName", label: "Carrier / driver name", type: "text", required: true, maxLength: 80 },
    { name: "reviewText", label: "Review", type: "textarea", required: true, maxLength: 800 },
    {
      type: "row",
      fields: [
        { name: "rating", type: "number", required: true, min: 1, max: 5, defaultValue: 5, admin: { width: "25%" } },
        { name: "truckType", label: "Truck / equipment", type: "text", maxLength: 60, admin: { width: "35%" } },
        { name: "location", type: "text", maxLength: 60, admin: { width: "40%" } },
      ],
    },
    { name: "featured", type: "checkbox", admin: { position: "sidebar", description: "Featured reviews show first." } },
    orderField,
  ],
  hooks: {
    // `everything: true` because a "testimonials" block can now be added to any builder page.
    afterChange: [({ req }) => revalidate(req, { tags: ["testimonials"], everything: true })],
    afterDelete: [({ req }) => revalidate(req, { tags: ["testimonials"], everything: true })],
  },
};
