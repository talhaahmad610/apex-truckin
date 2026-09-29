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

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/**
 * Replaces {{name}}, {{city}}, {{founded}}, etc. with live Site settings values. `extra` supplies
 * page-local tokens not derived from Site settings (e.g. {{service}} on a service page) and is
 * checked first, so it can't be shadowed by a same-named Site settings token. Unknown tokens are
 * left as-is.
 *
 * `escape: true` HTML-escapes each substituted VALUE (not the surrounding template text) — for
 * substituting admin-controlled Site settings values into a string that's about to be rendered as
 * raw HTML (`dangerouslySetInnerHTML`), so a value like `Apex <b>Truckin</b>` can't inject markup.
 */
export function fillTokens(
  text: string | null | undefined,
  site: SiteInfo,
  extra?: Record<string, string>,
  opts?: { escape?: boolean },
): string {
  if (!text) return "";
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key: string) => {
    const value = extra && key in extra ? extra[key] : TOKENS[key]?.(site);
    if (value === undefined) return match;
    return opts?.escape ? escapeHtml(value) : value;
  });
}
