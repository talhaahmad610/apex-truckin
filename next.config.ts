import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
import { withPayload } from "@payloadcms/next/withPayload";
import { getMediaOrigin } from "./src/lib/media-origin";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";

// Public origin of the MinIO/S3 media storage (images, processed hero clips).
const { origin: mediaOrigin, isLoopback: isLoopbackMedia } = getMediaOrigin();
const media = mediaOrigin ? new URL(mediaOrigin) : null;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // A self-contained `.next/standalone/server.js` the Docker image runs directly — no full
  // `node_modules` needed in the final image (see Dockerfile).
  output: "standalone",
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
    // Next 16 refuses to optimize images from local/private IPs (SSRF guard). Allowed only when the
    // media host itself is loopback (local MinIO — also for `next start` on a dev machine); a real
    // deployment serves media from a public hostname, so this stays off there. remotePatterns
    // above still limits the optimizer to that single media origin either way.
    dangerouslyAllowLocalIP: isDev || isLoopbackMedia,
  },
  // jsdom (used server-side to parse admin-pasted <head>/<footer> script snippets, see
  // src/lib/head-html.ts) must run as real Node, not be bundled into the server graph.
  serverExternalPackages: ["jsdom"],
  async headers() {
    // Public site CSP: only `frame-ancestors` — the one CSP directive the spec does NOT let a
    // <meta http-equiv> tag set (only an HTTP header can). Every other directive (script-src,
    // connect-src, img-src, frame-src, etc.) is rendered as a <meta> tag by SiteDocument.tsx,
    // rebuilt on every request from Site settings → Scripts & tracking (src/lib/csp.ts), so an
    // admin-pasted analytics/pixel snippet is allowed without a next.config.ts change or redeploy.
    // A header AND a meta CSP for the same directive would combine restrictively (the browser
    // enforces the intersection), which is why the static list here is deliberately this short.
    const siteCsp = "frame-ancestors 'self'";

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
