import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
import { withPayload } from "@payloadcms/next/withPayload";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";

// Public origin of the MinIO/S3 media storage (images, processed hero clips).
const media = (() => {
  try {
    const raw = process.env.S3_PUBLIC_URL || process.env.S3_ENDPOINT;
    return raw ? new URL(raw) : null;
  } catch {
    return null;
  }
})();
const mediaOrigin = media ? media.origin : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Turbopack is the default build/dev tool as of Next 16; a custom `webpack()` config here
  // makes `next build` fail outright (see Next 16 upgrade guide) — don't add one.
  turbopack: { root: path.resolve(dirname) },
  // Two root layouts ((frontend) + (payload)) means no single layout can compose a 404 for
  // unmatched URLs; app/global-not-found.tsx renders the branded one in its own document.
  experimental: { globalNotFound: true },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      ...(media
        ? [
            {
              protocol: media.protocol.replace(":", "") as "http" | "https",
              hostname: media.hostname,
              ...(media.port ? { port: media.port } : {}),
              pathname: `/${process.env.S3_BUCKET || "apex-media"}/**`,
            },
          ]
        : []),
    ],
    // Next 16 refuses to optimize images from local/private IPs (SSRF guard). Local MinIO is on
    // 127.0.0.1, so allow it in development only — production media sits behind a public host.
    dangerouslyAllowLocalIP: isDev,
  },
  async headers() {
    // Public site CSP. Next.js needs 'unsafe-inline' for script-src (its own hydration bootstrap and
    // the JSON-LD <script> tags) and style-src (inline styles from GSAP/Framer Motion) short of a
    // nonce-based setup. frame-src allows the Google Maps embed on /contact.
    //
    // 'unsafe-eval' is added in dev ONLY: the dev bundler wraps modules in eval(...) for HMR, and
    // without this the browser throws "EvalError: ... violates ... script-src" on every load.
    // Production bundles never use eval() for their own code, so this stays out of prod.
    const siteCsp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: https://images.pexels.com https://images.unsplash.com ${mediaOrigin}`.trim(),
      "font-src 'self' data:",
      // 'blob:' is required: the hero video plays from URL.createObjectURL() blobs, not files;
      // the media origin is needed once hero clips are served from storage (fetched as blobs).
      `media-src 'self' blob: ${mediaOrigin}`.trim(),
      `connect-src 'self' ${mediaOrigin}`.trim(),
      "frame-src https://www.google.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; ");

    // Payload admin: its own, looser-but-still-restrictive policy (the admin UI uses blob:/data:
    // previews and inline styles). Never applied to public pages.
    const adminCsp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: blob: ${mediaOrigin}`.trim(),
      "font-src 'self' data:",
      `media-src 'self' blob: ${mediaOrigin}`.trim(),
      `connect-src 'self' ${mediaOrigin}`.trim(),
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; ");

    const common = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      // Harmless over plain HTTP (browsers only honor HSTS on HTTPS responses) — takes
      // effect automatically once this is served over HTTPS in production.
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    ];

    return [
      { source: "/:path*", headers: common },
      // Everything except the admin UI and Payload's REST/GraphQL API.
      { source: "/((?!admin|cms-api).*)", headers: [{ key: "Content-Security-Policy", value: siteCsp }] },
      {
        source: "/admin/:path*",
        headers: [
          { key: "Content-Security-Policy", value: adminCsp },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      { source: "/cms-api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      {
        source: "/flight/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
