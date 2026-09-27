/** Escape untrusted text (form input) before interpolating it into email HTML. */
export const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Strip CR/LF so user input can never inject extra email headers via a subject line. */
export const oneLine = (s: unknown, max = 150) => String(s ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

/** Branded dark/amber shell, table-based for email-client compatibility. */
export function emailShell({ preheader, heading, bodyHtml }: { preheader: string; heading: string; bodyHtml: string }) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="color-scheme" content="dark"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#ffffff">
<span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#13151f;border:1px solid rgba(245,166,35,0.18);border-radius:20px">
<tr><td style="padding:28px 28px 8px"><div style="font-weight:800;letter-spacing:0.04em;font-size:18px">APEX <span style="color:#f5a623">TRUCKIN</span></div></td></tr>
<tr><td style="padding:8px 28px 4px"><h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff">${esc(heading)}</h1></td></tr>
<tr><td style="padding:12px 28px 28px;font-size:15px;line-height:1.6;color:#d6dbe4">${bodyHtml}</td></tr>
</table>
<p style="margin:16px 0 0;font-size:12px;color:#6b7280">Apex Truckin · Built to haul. Built to win.</p>
</td></tr></table></body></html>`;
}
