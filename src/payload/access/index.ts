import type { Access, FieldAccess } from "payload";

/** Any logged-in admin user. This site has a single role: every user is a full admin. */
export const isAdmin: Access = ({ req }) => Boolean(req.user);
export const isAdminField: FieldAccess = ({ req }) => Boolean(req.user);

/** Public read (the website renders it), admin-only writes. */
export const publicRead: Access = () => true;
