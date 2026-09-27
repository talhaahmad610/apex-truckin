import { convertLexicalToHTML, defaultHTMLConverters, type HTMLConverters } from "@payloadcms/richtext-lexical/html";
import type { SerializedEditorState, SerializedLexicalNode } from "@payloadcms/richtext-lexical/lexical";

type Node = SerializedLexicalNode & { children?: Node[]; headerState?: number; colSpan?: number; rowSpan?: number };
type ToHTML = (args: { nodes: SerializedLexicalNode[] }) => string[];

/** Cell content without Lexical's paragraph wrappers (the site's tables never had <p> in cells). */
const cellHTML = (cell: Node, nodesToHTML: ToHTML) =>
  (cell.children ?? [])
    .map((c) => (c.type === "paragraph" ? nodesToHTML({ nodes: c.children ?? [] }).join("") : nodesToHTML({ nodes: [c] }).join("")))
    .filter((s) => s.replace(/<br\s*\/?>/g, "").trim())
    .join("<br />");

const cell = (c: Node, nodesToHTML: ToHTML) => {
  const tag = (c.headerState ?? 0) > 0 ? "th" : "td";
  const span = `${c.colSpan && c.colSpan > 1 ? ` colspan="${c.colSpan}"` : ""}${c.rowSpan && c.rowSpan > 1 ? ` rowspan="${c.rowSpan}"` : ""}`;
  return `<${tag}${span}>${cellHTML(c, nodesToHTML)}</${tag}>`;
};

const row = (r: Node, nodesToHTML: ToHTML) => `<tr>${(r.children ?? []).map((c) => cell(c, nodesToHTML)).join("")}</tr>`;

/**
 * Tables rendered as plain semantic markup styled by `.prose-apex` — no inline borders/padding
 * and no wrapper div (the defaults would change the design). A first row made entirely of header
 * cells becomes <thead>, matching the original articles.
 */
const tableConverters: HTMLConverters = {
  table: ({ node, nodesToHTML }) => {
    const rows = ((node as Node).children ?? []) as Node[];
    const first = rows[0];
    const headerRow = first && (first.children ?? []).length > 0 && (first.children ?? []).every((c) => (c.headerState ?? 0) > 0);
    const head = headerRow ? `<thead>${row(first!, nodesToHTML)}</thead>` : "";
    const body = (headerRow ? rows.slice(1) : rows).map((r) => row(r, nodesToHTML)).join("");
    return `<table>${head}<tbody>${body}</tbody></table>`;
  },
  tablerow: ({ node, nodesToHTML }) => row(node as Node, nodesToHTML),
  tablecell: ({ node, nodesToHTML }) => cell(node as Node, nodesToHTML),
};

const converters: HTMLConverters = { ...defaultHTMLConverters, ...tableConverters };

/** Lexical JSON → HTML for `.prose-apex`. Built-in converters escape all text and sanitize link
 *  URLs, and the custom ones above emit only fixed tags, so editors can't inject HTML/script. */
export function richTextToHtml(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  return convertLexicalToHTML({ data: data as SerializedEditorState, converters, disableContainer: true });
}
