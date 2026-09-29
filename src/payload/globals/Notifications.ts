import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";

export const Notifications: GlobalConfig = {
  slug: "notifications",
  label: "Email notifications",
  admin: { group: "Settings", description: "Who gets emailed about new leads, and the automatic reply carriers receive." },
  access: { read: isAdmin, update: isAdmin },
  fields: [
    {
      name: "contactSuccessMessage",
      label: "Contact form success message",
      type: "textarea",
      maxLength: 200,
      defaultValue: "Thanks! A dispatcher will reach out within 1 business hour.",
      admin: { description: "Shown as the confirmation toast after a visitor submits the contact form." },
    },
    {
      name: "leadAlertRecipients",
      label: "Send new-lead alerts to",
      type: "array",
      admin: { description: "Everyone listed gets an email the moment a contact form is submitted." },
      fields: [{ name: "email", type: "email", required: true }],
    },
    {
      name: "autoReply",
      type: "group",
      label: "Auto-reply to the carrier",
      fields: [
        { name: "enabled", type: "checkbox", defaultValue: true },
        {
          name: "subject",
          type: "text",
          defaultValue: "We got your message — Apex Truckin",
          maxLength: 150,
          admin: { condition: (_, s) => Boolean(s?.enabled) },
        },
        {
          name: "body",
          type: "textarea",
          maxLength: 3000,
          defaultValue:
            "Hi {{name}},\n\nThanks for reaching out to Apex Truckin. A dispatcher will call you within 1 business hour to talk through your truck, lanes and home-time goals.\n\nNeed us sooner? Call us any time — we pick up 24/7.\n\n— The Apex Truckin dispatch desk",
          admin: {
            description: "Plain text. {{name}} is replaced with the carrier's first name.",
            condition: (_, s) => Boolean(s?.enabled),
          },
        },
      ],
    },
  ],
};
