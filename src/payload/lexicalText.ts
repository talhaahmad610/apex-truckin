/** Plain text of a Lexical document (for word counts / read time). */
export function lexicalPlainText(node: unknown): string {
  if (!node || typeof node !== "object") return "";
  const n = node as { text?: unknown; children?: unknown[]; root?: unknown };
  if (n.root) return lexicalPlainText(n.root);
  let out = typeof n.text === "string" ? n.text : "";
  if (Array.isArray(n.children)) out += " " + n.children.map(lexicalPlainText).join(" ");
  return out;
}
