import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "updatedAt"],
    group: "Settings",
  },
  auth: {
    // Enables per-user API keys ("Authorization: users API-Key <key>") for Postman / integrations.
    useAPIKey: true,
    tokenExpiration: 60 * 60 * 8, // 8h admin sessions
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // lock for 15 min after 5 failed logins
    cookies: { sameSite: "Lax", secure: process.env.NODE_ENV === "production" },
  },
  // Only signed-in admins can see or manage accounts. Payload still allows creating the very
  // first user through the admin "create first user" screen when the collection is empty.
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [{ name: "name", type: "text" }],
};
