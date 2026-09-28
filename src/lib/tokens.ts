import type { SiteInfo } from "@/types";

const TOKENS: Record<string, (site: SiteInfo) => string> = {
  name: (s) => s.name,
  legalName: (s) => s.legalName,
  tagline: (s) => s.tagline,
  subTagline: (s) => s.subTagline,
  city: (s) => s.address.city,
  region: (s) => s.address.region,
  founded: (s) => String(s.founded),
  phone: (s) => s.phone,
  phoneHref: (s) => s.phoneHref,
  // The digits only, with no "tel:" prefix — for building a link as `tel:{{phoneDigits}}`. A raw
  // `{{phoneHref}}` placeholder (no scheme prefix before substitution) gets mangled by the
  // seed-time HTML→Lexical conversion in richText content, the same way a bare relative URL
  // would; a real "tel:" prefix at seed time keeps it intact, same as "mailto:{{email}}" already does.
  phoneDigits: (s) => s.phoneHref.replace(/^tel:/, ""),
  email: (s) => s.email,
  street: (s) => s.address.street,
  postal: (s) => s.address.postal,
};

/** Replaces {{name}}, {{city}}, {{founded}}, etc. with live Site settings values. Unknown tokens are left as-is. */
export function fillTokens(text: string | null | undefined, site: SiteInfo): string {
  if (!text) return "";
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key: string) => {
    const fn = TOKENS[key];
    return fn ? fn(site) : match;
  });
}
