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
    const settings = await payload.findGlobal({ slug: "notifications", overrideAccess: true, depth: 0 });
    const site = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3200").replace(/\/$/, "");
    const recipients = (settings.leadAlertRecipients ?? []).map((r) => r.email).filter(Boolean);

    if (recipients.length) {
      const alert = leadAlertEmail(lead, `${site}/admin/collections/leads/${lead.id}`);
      await payload.sendEmail({ to: recipients, subject: alert.subject, html: alert.html, replyTo: lead.email });
    }

    const ar = settings.autoReply;
    if (ar?.enabled && ar.subject && ar.body) {
      const firstName = lead.fullName.trim().split(/\s+/)[0] || "there";
      const reply = autoReplyEmail({ firstName, subject: ar.subject, body: ar.body });
      await payload.sendEmail({ to: lead.email, subject: reply.subject, html: reply.html, text: reply.text });
    }
  } catch (err) {
    payload.logger.error({ err, msg: `[notify] failed to send lead emails for lead ${lead.id}` });
  }
}
