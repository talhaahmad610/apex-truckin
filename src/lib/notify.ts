import "server-only";
import type { Payload } from "payload";
import { autoReplyEmail, leadAlertEmail, type LeadEmailData } from "@/emails/lead";

/**
 * Sends the new-lead alert (to the addresses configured in the Notifications global) and the
 * optional carrier auto-reply. Called after the HTTP response is sent (next/server `after`), so a
 * slow or failing email provider never delays or fails the visitor's form submission.
 */
export async function notifyNewLead(payload: Payload, lead: LeadEmailData) {
  try {
    const [settings, site] = await Promise.all([
      payload.findGlobal({ slug: "notifications", overrideAccess: true, depth: 0 }),
      payload.findGlobal({ slug: "site-settings", overrideAccess: true, depth: 0 }),
    ]);
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3200").replace(/\/$/, "");
    const brand = { name: site.name, tagline: site.tagline };
    const from = { name: site.name, address: process.env.EMAIL_FROM || site.email };
    const recipients = (settings.leadAlertRecipients ?? []).map((r) => r.email).filter(Boolean);

    if (recipients.length) {
      const alert = leadAlertEmail(lead, `${siteUrl}/admin/collections/leads/${lead.id}`, brand);
      await payload.sendEmail({ from, to: recipients, subject: alert.subject, html: alert.html, replyTo: lead.email });
    }

    const ar = settings.autoReply;
    if (ar?.enabled && ar.subject && ar.body) {
      const firstName = lead.fullName.trim().split(/\s+/)[0] || "there";
      const reply = autoReplyEmail({ firstName, subject: ar.subject, body: ar.body }, brand);
      await payload.sendEmail({ from, to: lead.email, subject: reply.subject, html: reply.html, text: reply.text });
    }
  } catch (err) {
    payload.logger.error({ err, msg: `[notify] failed to send lead emails for lead ${lead.id}` });
  }
}
