import { Forbidden } from "payload";
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
  // Only signed-in admins can see or manage accounts. Payload's own "create first user" flow is
  // shadowed below: src/lib/ensure-admin.ts creates the one admin account at boot from
  // SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD, so nothing anonymous should ever be able to claim it —
  // the committed snapshot deliberately ships with an empty users table (see scripts/db-export.sh).
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  // Endpoints defined here are matched before Payload's built-in auth endpoints (both land in the
  // same array; Payload's own /first-register is appended after these — see
  // node_modules/payload/dist/collections/config/sanitize.js — and endpoint lookup takes the
  // first match), so this replaces it outright rather than merely adding an extra check.
  endpoints: [
    {
      path: "/first-register",
      method: "post",
      handler: () => Response.json({ errors: [{ message: "Not found" }] }, { status: 404 }),
    },
  ],
  hooks: {
    // Belt-and-suspenders: registerFirstUserOperation calls payload.create with overrideAccess:
    // true, so access.create alone can't stop it. This also blocks any other future path that
    // tries to create a user without going through ensureAdmin's bootstrap context.
    beforeValidate: [
      ({ req, operation }) => {
        if (operation === "create" && !req.user && !req.context?.bootstrap) {
          throw new Forbidden(req.t);
        }
      },
    ],
  },
  fields: [{ name: "name", type: "text" }],
};
