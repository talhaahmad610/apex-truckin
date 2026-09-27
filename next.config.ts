import type { NextConfig } from "next";

const supabaseHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : null;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Turbopack is the default build/dev tool as of Next 16; a custom `webpack()` config here
  // makes `next build` fail outright (see Next 16 upgrade guide). The playwright-cli dev-watcher
  // ignore hack this used to hold isn't worth forcing a webpack build over — dropped.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
      ...(supabaseHost ? [{ protocol: "https" as const, hostname: supabaseHost }] : []),
    ],
  },
  async headers() {
    // Next.js needs 'unsafe-inline' for script-src (its own hydration bootstrap and the
    // JSON-LD <script> tags) and style-src (inline styles from GSAP/Framer Motion) short of
    // a nonce-based setup via middleware. frame-src allows the Google Maps embed on /contact.
    //
    // 'unsafe-eval' is added in dev ONLY: `next dev`'s webpack HMR wraps every module in
    // eval(...) by default, and without this the browser throws "EvalError: ... violates
    // ... script-src" on every load, breaking client-side JS across the whole app in dev.
    // Production bundles never use eval() for their own code, so this stays out of prod.
    const isDev = process.env.NODE_ENV !== "production";
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://images.pexels.com https://images.unsplash.com https://*.supabase.co",
      "font-src 'self' data:",
      // 'blob:' is required: the hero video plays from URL.createObjectURL() blobs, not files.
      "media-src 'self' blob:",
      `connect-src 'self'${supabaseHost ? ` https://${supabaseHost}` : ""} https://*.supabase.co`,
      "frame-src https://www.google.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
          // Harmless over plain HTTP (browsers only honor HSTS on HTTPS responses) — takes
          // effect automatically once this is served over HTTPS in production.
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
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

export default nextConfig;
