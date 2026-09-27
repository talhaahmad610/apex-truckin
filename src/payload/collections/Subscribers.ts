import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

export const Subscribers: CollectionConfig = {
  slug: "subscribers",
  labels: { singular: "Subscriber", plural: "Newsletter subscribers" },
  admin: {
    group: "CRM",
    useAsTitle: "email",
    defaultColumns: ["email", "status", "source", "createdAt"],
  },
  defaultSort: "-createdAt",
  // Admin-only; the public signup goes through /api/newsletter on the server.
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    { name: "email", type: "email", required: true, unique: true, index: true },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Unsubscribed", value: "unsubscribed" },
      ],
    },
    { name: "source", type: "text", admin: { readOnly: true, description: "Page the visitor subscribed from." } },
  ],
  timestamps: true,
};
