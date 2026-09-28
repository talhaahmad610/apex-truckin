import { DEFAULT_BRAND, emailShell, esc, oneLine, type EmailBrand } from "./layout";

export type LeadEmailData = {
  id: string | number;
  fullName: string;
  email: string;
  phone?: string | null;
  equipmentType?: string | null;
  message?: string | null;
  sourcePath?: string | null;
};

const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 12px 6px 0;color:#8b93a7;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#ffffff">${value}</td></tr>`;

export function leadAlertEmail(lead: LeadEmailData, adminUrl: string, brand: EmailBrand = DEFAULT_BRAND) {
  const tel = lead.phone ? lead.phone.replace(/[^\d+]/g, "") : "";
  const bodyHtml = `
<p style="margin:0 0 16px">A new carrier just reached out from <strong>${esc(lead.sourcePath || "the website")}</strong>.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px;margin:0 0 20px">
${row("Name", esc(lead.fullName))}
${row("Email", `<a href="mailto:${esc(lead.email)}" style="color:#f5a623">${esc(lead.email)}</a>`)}
${lead.phone ? row("Phone", `<a href="tel:${esc(tel)}" style="color:#f5a623">${esc(lead.phone)}</a>`) : ""}
${lead.equipmentType ? row("Equipment", esc(lead.equipmentType)) : ""}
</table>
${lead.message ? `<div style="background:#0f1117;border-radius:12px;padding:14px 16px;margin:0 0 20px;white-space:pre-wrap">${esc(lead.message)}</div>` : ""}
<a href="${esc(adminUrl)}" style="display:inline-block;background:#f5a623;color:#0a0a0f;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:999px">Open lead in admin</a>`;
  return {
    subject: oneLine(`New lead: ${lead.fullName}${lead.equipmentType ? ` · ${lead.equipmentType}` : ""}`),
    html: emailShell({ preheader: `${lead.fullName} — ${lead.phone || lead.email}`, heading: "New lead from the website", bodyHtml, brand }),
  };
}

export function autoReplyEmail(
  { firstName, subject, body }: { firstName: string; subject: string; body: string },
  brand: EmailBrand = DEFAULT_BRAND,
) {
  // The body is admin-authored plain text; escape it and keep line breaks.
  const text = body.replace(/\{\{\s*name\s*\}\}/g, firstName);
  const bodyHtml = `<div style="white-space:pre-wrap">${esc(text)}</div>`;
  return { subject: oneLine(subject), html: emailShell({ preheader: oneLine(text, 90), heading: oneLine(subject), bodyHtml, brand }), text };
}
