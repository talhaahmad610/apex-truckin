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
import { Leads } from "./payload/collections/Leads";
import { Subscribers } from "./payload/collections/Subscribers";
import { Notifications } from "./payload/globals/Notifications";
import { Posts } from "./payload/collections/Posts";
import { Categories } from "./payload/collections/Categories";
import { Services } from "./payload/collections/Services";
import { Testimonials } from "./payload/collections/Testimonials";
import { Team } from "./payload/collections/Team";
import { Faqs } from "./payload/collections/Faqs";
import { PricingTiers } from "./payload/collections/PricingTiers";
import { Pages } from "./payload/collections/Pages";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { SiteContent } from "./payload/globals/SiteContent";
import { HomePage } from "./payload/globals/HomePage";
import { HOME_ONLY_BLOCKS } from "./payload/blocks/home";
import { REUSABLE_BLOCKS } from "./payload/blocks/shared";

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
    components: {
      beforeDashboard: ["/payload/components/CrmOverview#CrmOverview"],
    },
    meta: {
      titleSuffix: " · Apex Truckin CMS",
      robots: "noindex, nofollow",
    },
  },
  // Only accept cookie-authenticated requests originating from the site itself.
  csrf: [siteURL],
  cors: [siteURL],
  collections: [Leads, Subscribers, Services, PricingTiers, Testimonials, Faqs, Team, Posts, Categories, Pages, Media, Users],
  globals: [SiteSettings, SiteContent, HomePage, Notifications],
  // Every block referenced anywhere via `blockReferences` (home-page + pages layouts) must be
  // registered here — that's what blockReferences resolves against.
  blocks: [...HOME_ONLY_BLOCKS, ...REUSABLE_BLOCKS],
  editor: lexicalEditor(),
  // Runs queued jobs (scheduled publishing; hero video processing) inside the long-running Node
  // server. Needs a persistent process — fine on the planned VPS, not on serverless.
  jobs: {
    autoRun: [{ cron: "* * * * *", allQueues: true }],
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
    migrationDir: path.resolve(dirname, "migrations"),
    // Schema changes ONLY via committed migrations (npm run migrate:create / migrate), in dev too —
    // dev-mode push drifts from the migration history and makes `payload migrate` prompt/hang.
    push: false,
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
