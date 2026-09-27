import { JSDOM } from "jsdom";
import type { Payload } from "payload";
import { convertHTMLToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import type { SanitizedServerEditorConfig } from "@payloadcms/richtext-lexical";
import { articleFeatures } from "./editor";

let cached: Promise<SanitizedServerEditorConfig> | null = null;

/** Convert trusted-or-untrusted HTML into the article editor's Lexical JSON. Anything the article
 *  editor doesn't support (scripts, iframes, inline handlers…) simply has no node type and is dropped. */
export async function htmlToLexical(payload: Payload, html: string) {
  cached ??= editorConfigFactory.fromFeatures({ config: payload.config, features: articleFeatures });
  const editorConfig = await cached;
  // Drop elements whose *content* must never surface as article text (script/style bodies), and
  // inline <img> — images in articles must be CMS media (added in the editor), not arbitrary URLs.
  const dom = new JSDOM(`<!doctype html><body>${html}</body>`);
  dom.window.document.querySelectorAll("script,style,noscript,template,iframe,object,embed,img").forEach((el) => el.remove());
  const clean = dom.window.document.body.innerHTML.trim();
  return convertHTMLToLexical({ editorConfig, html: clean, JSDOM });
}
