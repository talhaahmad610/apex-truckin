import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";

import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const siteURL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3200").replace(/\/$/, "");
const s3Bucket = process.env.S3_BUCKET || "apex-media";
// Where browsers fetch files from. Differs from S3_ENDPOINT in production (internal Docker
// hostname vs the public media.<domain> reverse-proxy URL); identical locally.
const s3PublicURL = (process.env.S3_PUBLIC_URL || process.env.S3_ENDPOINT || "").replace(/\/$/, "");

export default buildConfig({
  serverURL: siteURL,
  secret: process.env.PAYLOAD_SECRET || "",
  // The site already owns /api/* (contact, newsletter, posts…), so Payload's REST/GraphQL live here.
  routes: { api: "/cms-api", admin: "/admin" },
  admin: {
    user: Users.slug,
    // Built-in avatar instead of Gravatar (no third-party request leaking a hash of the admin email).
    avatar: "default",
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " · Apex Truckin CMS",
      robots: "noindex, nofollow",
    },
  },
  // Only accept cookie-authenticated requests originating from the site itself.
  csrf: [siteURL],
  cors: [siteURL],
  collections: [Users, Media],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
    migrationDir: path.resolve(dirname, "migrations"),
    // Dev auto-syncs the schema; production only changes via committed migrations.
    push: process.env.NODE_ENV !== "production",
  }),
  sharp,
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        apiKey: process.env.RESEND_API_KEY,
        defaultFromAddress: process.env.EMAIL_FROM || "dispatch@apextruckin.com",
        defaultFromName: "Apex Truckin",
      })
    : undefined, // falls back to Payload's console adapter (logs instead of sending)
  plugins: [
    s3Storage({
      bucket: s3Bucket,
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || "us-east-1",
        forcePathStyle: true, // MinIO requires path-style addressing
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      },
      collections: {
        media: {
          prefix: "media",
          // Serve straight from MinIO (bucket policy allows anonymous GET on media/*) instead of
          // proxying every image through the Node server — faster and cacheable.
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            `${s3PublicURL}/${s3Bucket}/${prefix ? `${prefix}/` : ""}${encodeURIComponent(filename)}`,
        },
      },
    }),
  ],
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  graphQL: { disablePlaygroundInProduction: true },
});
