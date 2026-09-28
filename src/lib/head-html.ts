import "server-only";
import { JSDOM } from "jsdom";
import type { HeadNode } from "@/types";

/**
 * Turns an admin-pasted HTML snippet (a Google Analytics/Tag Manager/Pixel snippet, an extra
 * <meta>/<link> tag, a chat widget…) into a small set of typed nodes the site can render safely.
 *
 * Only <script>, <meta>, <link>, <style> and <noscript> are kept — anything else (a raw <div>, an
 * onclick handler on some other tag, a <form>…) is dropped, unless `allowRaw` is set (used for the
 * body-end box only, where a chat widget sometimes ships a wrapping <div>). No script executes
 * during parsing: JSDOM here has no `runScripts` option, so it only ever reads the markup.
 */
export function parseHeadHtml(html: string | null | undefined, { allowRaw = false }: { allowRaw?: boolean } = {}): HeadNode[] {
  if (!html?.trim()) return [];
  let dom: JSDOM;
  try {
    dom = new JSDOM(`<!doctype html><body>${html}</body>`);
  } catch {
    return []; // malformed markup — fail closed, never throw from a cached settings read
  }
  const out: HeadNode[] = [];
  let i = 0;
  for (const el of Array.from(dom.window.document.body.children)) {
    const tag = el.tagName.toLowerCase();
    const attrs = Object.fromEntries(Array.from(el.attributes).map((a) => [a.name, a.value]));
    if (tag === "script") {
      const { src, id } = attrs;
      const inline = src ? undefined : (el.textContent ?? "");
      // async/defer are dropped: next/script's `strategy` already controls load timing.
      const rest = Object.fromEntries(Object.entries(attrs).filter(([k]) => !["src", "id", "async", "defer"].includes(k)));
      out.push({ kind: "script", id: id || `site-script-${hash(src || inline || String(i))}`, src, inline, attrs: rest });
      i++;
    } else if (tag === "meta" || tag === "link") {
      out.push({ kind: "element", tag, attrs });
    } else if (tag === "style") {
      out.push({ kind: "element", tag, attrs, text: el.textContent ?? "" });
    } else if (tag === "noscript") {
      out.push({ kind: "noscript", html: el.innerHTML });
    } else if (allowRaw) {
      out.push({ kind: "raw", html: el.outerHTML });
    }
  }
  return out;
}

/** Every https:// origin referenced by a parsed snippet — used to build the CSP allowlist. */
export function originsFromNodes(nodes: HeadNode[]): string[] {
  const origins = new Set<string>();
  const scan = (text: string | undefined) => {
    if (!text) return;
    for (const m of text.matchAll(/https:\/\/[a-z0-9.-]+(?::\d+)?/gi)) origins.add(originOf(m[0]));
  };
  for (const n of nodes) {
    if (n.kind === "script") {
      scan(n.src);
      scan(n.inline);
    } else if (n.kind === "element") {
      scan(n.attrs.href);
      scan(n.attrs.src);
    } else if (n.kind === "noscript" || n.kind === "raw") {
      scan(n.html);
    }
  }
  return [...origins].filter(Boolean);
}

function originOf(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

/** Small stable hash so an inline script without an author-supplied id still gets a consistent React key/next/script id across renders. */
function hash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}
