import type { CollectionConfig } from "payload";
import { isAdmin, publicRead } from "../access";
import { slugField } from "../fields/slug";
import { cardList, faqList, orderField, textList } from "../fields/lists";
import { revalidate } from "../hooks/revalidate";

const paths = () => ["/sitemap.xml", "/llms.txt"];

export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Service", plural: "Services" },
  admin: {
    group: "Content",
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "avgRate", "order"],
    description:
      "Equipment types you dispatch. Each gets its own page at /services/<slug>, a tab on the home page, a footer link, and a column in the comparison table.",
  },
  defaultSort: "order",
  access: { read: publicRead, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            {
              name: "name",
              type: "text",
              required: true,
              maxLength: 40,
              admin: { description: "e.g. Dry Van. The word Dispatch is added automatically where needed." },
            },
            {
              name: "short",
              label: "Short description",
              type: "textarea",
              required: true,
              maxLength: 160,
              admin: { description: "One line for cards and lists." },
            },
            { name: "tagline", type: "text", required: true, maxLength: 80 },
            { name: "description", type: "textarea", required: true, maxLength: 800 },
            { name: "image", type: "upload", relationTo: "media", required: true },
            {
              type: "row",
              fields: [
                {
                  name: "avgRate",
                  label: "Average rate",
                  type: "text",
                  required: true,
                  maxLength: 40,
                  admin: { width: "50%", description: "e.g. $2.00 – $3.00 / mile" },
                },
                {
                  name: "weeklyGross",
                  label: "Potential weekly gross",
                  type: "text",
                  required: true,
                  maxLength: 40,
                  admin: { width: "50%", description: "e.g. $7,500 – $8,500. Estimate at ~2,500–3,000 mi/week — shown with the rate disclaimers from Site settings." },
                },
              ],
            },
          ],
        },
        {
          label: "Details",
          fields: [
            textList("included", "What is included"),
            textList("requirements", "Requirements"),
            cardList("benefits", "Benefits"),
            textList("typicalLoads", "Typical loads"),
            faqList(),
          ],
        },
        {
          label: "Comparison table",
          description: "What this service shows in each row of the comparison table on /services.",
          fields: [
            {
              name: "comparison",
              type: "group",
              label: false,
              fields: [
                {
                  name: "cdl",
                  label: "CDL required",
                  type: "select",
                  defaultValue: "yes",
                  options: [
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                    { label: "Depends", value: "depends" },
                  ],
                },
                { name: "tarpPay", label: "Tarp / accessorial pay", type: "checkbox" },
                { name: "permits", label: "Permit coordination", type: "checkbox" },
                { name: "tempMonitoring", label: "Temperature monitoring", type: "checkbox" },
                { name: "dropHook", label: "Drop & hook focus", type: "checkbox" },
              ],
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            { name: "metaTitle", type: "text", maxLength: 70, admin: { description: "Defaults to the page's standard title." } },
            { name: "metaDescription", type: "textarea", maxLength: 170, admin: { description: "Defaults to the description." } },
          ],
        },
      ],
    },
    slugField("name"),
    orderField,
  ],
  hooks: {
    // `everything: true` because "servicesTabs"/"servicesGrid"/"servicesCompare" blocks can now
    // be added to any builder page (not just the fixed /services routes the old path list covered).
    afterChange: [({ req }) => revalidate(req, { tags: ["services"], paths: paths(), everything: true })],
    afterDelete: [({ req }) => revalidate(req, { tags: ["services"], paths: paths(), everything: true })],
  },
};
