import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

export const LEAD_STATUSES = [
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Qualified", value: "qualified" },
  { label: "Onboarded", value: "onboarded" },
  { label: "Lost", value: "lost" },
] as const;

export const LEAD_SOURCES = [
  { label: "Home page", value: "home" },
  { label: "Contact page", value: "contact" },
  { label: "Service page", value: "service" },
  { label: "Other page", value: "other" },
  { label: "Added manually", value: "manual" },
] as const;

export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Lead", plural: "Leads" },
  admin: {
    group: "CRM",
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "status", "equipmentType", "phone", "followUpAt", "createdAt"],
    listSearchableFields: ["fullName", "email", "phone", "mcNumber", "dotNumber"],
    description: "Every contact-form submission lands here. Work it through the pipeline with Status, Follow-up date and Notes.",
  },
  defaultSort: "-createdAt",
  // Admin-only. The public contact form writes through /api/contact on the server
  // (validated, rate-limited, honeypot-checked) using overrideAccess — never via this API.
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    {
      type: "row",
      fields: [
        { name: "fullName", type: "text", required: true, maxLength: 120, admin: { width: "50%" } },
        { name: "status", type: "select", required: true, defaultValue: "new", options: [...LEAD_STATUSES], index: true, admin: { width: "25%" } },
        { name: "followUpAt", label: "Follow up on", type: "date", index: true, admin: { width: "25%", date: { pickerAppearance: "dayOnly" } } },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "email", type: "email", required: true, admin: { width: "50%" } },
        { name: "phone", type: "text", maxLength: 30, admin: { width: "25%" } },
        { name: "equipmentType", label: "Equipment", type: "text", maxLength: 60, admin: { width: "25%" } },
      ],
    },
    { name: "message", type: "textarea", maxLength: 3000 },
    {
      type: "collapsible",
      label: "Qualification",
      admin: { initCollapsed: false },
      fields: [
        {
          type: "row",
          fields: [
            { name: "mcNumber", label: "MC #", type: "text", maxLength: 20, admin: { width: "33%" } },
            { name: "dotNumber", label: "DOT #", type: "text", maxLength: 20, admin: { width: "33%" } },
            { name: "truckCount", label: "Trucks", type: "number", min: 0, max: 10000, admin: { width: "33%" } },
          ],
        },
      ],
    },
    {
      name: "notes",
      type: "array",
      labels: { singular: "Note", plural: "Notes" },
      admin: { description: "Call notes, next steps — newest at the bottom." },
      fields: [
        { name: "text", type: "textarea", required: true, maxLength: 4000 },
        {
          type: "row",
          fields: [
            { name: "createdAt", label: "Added", type: "date", admin: { readOnly: true, width: "50%", date: { pickerAppearance: "dayAndTime" } } },
            { name: "author", type: "relationship", relationTo: "users", admin: { readOnly: true, width: "50%" } },
          ],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Submission details",
      admin: { initCollapsed: true, position: "sidebar" },
      fields: [
        { name: "source", type: "select", defaultValue: "manual", options: [...LEAD_SOURCES], index: true, admin: { readOnly: true } },
        { name: "sourcePath", label: "Submitted from", type: "text", admin: { readOnly: true } },
        { name: "ip", label: "IP address", type: "text", admin: { readOnly: true } },
        { name: "userAgent", label: "Browser", type: "text", admin: { readOnly: true } },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      // Stamp new notes with time + author so the history can't be forged or lost.
      ({ data, req, originalDoc }) => {
        if (!Array.isArray(data?.notes)) return data;
        const known = new Map<string, { createdAt?: string; author?: unknown }>();
        for (const n of originalDoc?.notes ?? []) if (n?.id) known.set(n.id, n);
        data.notes = data.notes.map((n: { id?: string; createdAt?: string; author?: unknown }) => {
          const prev = n.id ? known.get(n.id) : undefined;
          if (prev) return { ...n, createdAt: prev.createdAt, author: prev.author };
          return { ...n, createdAt: new Date().toISOString(), author: req.user?.id ?? null };
        });
        return data;
      },
    ],
  },
  timestamps: true,
};
