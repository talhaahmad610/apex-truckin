import "server-only";
import type { HeadNode } from "@/types";
import { originsFromNodes } from "./head-html";

/**
 * Extra origins a known vendor's tag needs beyond the one domain it's loaded from — e.g. pasting a
 * Google Tag Manager `<script src="...googletagmanager.com...">` also means GA4's own analytics
 * domains get hit once the container loads. Matched by hostname suffix. Add an entry here before
 * telling an admin they need an "extra allowed domain" for a mainstream analytics/ads/pixel tool —
 * that field is a fallback for anything not covered here (or a vendor added later by a Tag
 * Manager container at runtime), not the primary way most tools get allowed.
 */
const VENDOR_COMPANIONS: Record<string, { script?: string[]; connect?: string[]; img?: string[]; frame?: string[]; font?: string[] }> = {
  "googletagmanager.com": {
    connect: ["https://www.google-analytics.com", "https://*.google-analytics.com", "https://analytics.google.com", "https://*.analytics.google.com", "https://stats.g.doubleclick.net"],
    img: ["https://www.google-analytics.com", "https://*.google-analytics.com", "https://www.googletagmanager.com"],
  },
  "google-analytics.com": {
    connect: ["https://*.google-analytics.com", "https://www.googletagmanager.com"],
    img: ["https://*.google-analytics.com"],
  },
  "googleadservices.com": {
    connect: ["https://googleads.g.doubleclick.net", "https://www.google.com", "https://pagead2.googlesyndication.com"],
    img: ["https://googleads.g.doubleclick.net", "https://www.google.com"],
    frame: ["https://td.doubleclick.net", "https://bid.g.doubleclick.net"],
  },
  "doubleclick.net": {
    connect: ["https://googleads.g.doubleclick.net", "https://stats.g.doubleclick.net"],
    img: ["https://googleads.g.doubleclick.net"],
  },
  "connect.facebook.net": {
    connect: ["https://www.facebook.com"],
    img: ["https://www.facebook.com"],
    frame: ["https://www.facebook.com"],
  },
  "clarity.ms": {
    connect: ["https://*.clarity.ms", "https://c.bing.com"],
    img: ["https://*.clarity.ms", "https://c.bing.com"],
  },
  "hotjar.com": {
    connect: ["https://*.hotjar.com", "https://*.hotjar.io", "wss://*.hotjar.com"],
    img: ["https://*.hotjar.com"],
    frame: ["https://vars.hotjar.com"],
    font: ["https://script.hotjar.com"],
  },
  "licdn.com": {
    connect: ["https://px.ads.linkedin.com", "https://px4.ads.linkedin.com"],
    img: ["https://px.ads.linkedin.com", "https://p.adsymptotic.com"],
  },
  "tiktok.com": {
    connect: ["https://analytics.tiktok.com"],
    img: ["https://analytics.tiktok.com"],
  },
};

function companionsFor(origins: string[]) {
  const out = { script: new Set<string>(), connect: new Set<string>(), img: new Set<string>(), frame: new Set<string>(), font: new Set<string>() };
  for (const origin of origins) {
    let host: string;
    try {
      host = new URL(origin).hostname;
    } catch {
      continue;
    }
    for (const [suffix, extra] of Object.entries(VENDOR_COMPANIONS)) {
      if (host === suffix || host.endsWith(`.${suffix}`)) {
        extra.script?.forEach((o) => out.script.add(o));
        extra.connect?.forEach((o) => out.connect.add(o));
        extra.img?.forEach((o) => out.img.add(o));
        extra.frame?.forEach((o) => out.frame.add(o));
        extra.font?.forEach((o) => out.font.add(o));
      }
    }
  }
  return out;
}

const withExtra = (base: string, extra: Set<string>) => (extra.size ? `${base} ${[...extra].join(" ")}` : base);

/**
 * The full public-page CSP, rendered as a <meta http-equiv> tag (see SiteDocument.tsx) so it can
 * be rebuilt from Site settings on every request without a next.config.ts change or a redeploy.
 * `frame-ancestors` is NOT included here — the CSP spec doesn't honor it via <meta>, so it stays a
 * static header directive in next.config.ts.
 */
export function buildCsp({
  head,
  bodyEnd,
  extraAllowedDomains,
  mediaOrigin,
  isDev,
}: {
  head: HeadNode[];
  bodyEnd: HeadNode[];
  extraAllowedDomains: string;
  mediaOrigin: string;
  isDev: boolean;
}): string {
  const pasted = [...originsFromNodes(head), ...originsFromNodes(bodyEnd)];
  const extra = (extraAllowedDomains || "").split("\n").map((l) => l.trim()).filter(Boolean);
  const introduced = [...pasted, ...extra];
  const companions = companionsFor(introduced);
  const script = new Set([...introduced, ...companions.script]);
  const connect = new Set([...introduced, ...companions.connect]);
  const img = new Set([...introduced, ...companions.img]);
  const frame = new Set([...introduced, ...companions.frame]);
  const media = mediaOrigin ? ` ${mediaOrigin}` : "";

  return [
    "default-src 'self'",
    // Next needs 'unsafe-inline' for its hydration bootstrap and JSON-LD <script> tags, and
    // 'unsafe-eval' in dev only (HMR wraps modules in eval()). Vendor origins are appended from
    // whatever's actually pasted into Site settings → Scripts & tracking.
    withExtra(`script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`, script),
    "style-src 'self' 'unsafe-inline'",
    withExtra(`img-src 'self' data: https://images.pexels.com https://images.unsplash.com${media}`, img),
    withExtra("font-src 'self' data:", companions.font),
    `media-src 'self' blob:${media}`,
    withExtra(`connect-src 'self'${media}`, connect),
    withExtra("frame-src https://www.google.com", frame),
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ].join("; ");
}
