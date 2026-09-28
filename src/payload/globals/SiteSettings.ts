import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";
import { revalidate } from "../hooks/revalidate";

/**
 * Company details, navigation and footer copy shared by every page. Every field defaults to the
 * site's current content, so the site renders identically even before this is first saved.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Settings", description: "Company details, navigation and footer — used on every page and in Google structured data." },
  access: { read: () => true, update: isAdmin },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Company",
          fields: [
            {
              type: "row",
              fields: [
                { name: "name", type: "text", required: true, defaultValue: "Apex Truckin", maxLength: 60, admin: { width: "50%" } },
                { name: "legalName", type: "text", required: true, defaultValue: "Apex Truckin LLC", maxLength: 80, admin: { width: "30%" } },
                { name: "founded", type: "number", defaultValue: 2019, min: 1900, max: 2100, admin: { width: "20%" } },
              ],
            },
            { name: "tagline", type: "text", required: true, defaultValue: "Built to Haul. Built to Win.", maxLength: 80 },
            {
              name: "subTagline",
              label: "Short description",
              type: "textarea",
              required: true,
              maxLength: 240,
              defaultValue: "Elite truck dispatch services for owner-operators and fleet carriers across the United States.",
            },
          ],
        },
        {
          label: "Contact",
          fields: [
            {
              type: "row",
              fields: [
                { name: "phone", label: "Phone (as shown)", type: "text", required: true, defaultValue: "+1 (888) 000-0000", maxLength: 30, admin: { width: "50%" } },
                {
                  name: "phoneE164",
                  label: "Phone (dialing format)",
                  type: "text",
                  required: true,
                  defaultValue: "+18880000000",
                  admin: { width: "50%", description: "Digits with country code, e.g. +18880000000. Used for tap-to-call links." },
                  validate: (v: unknown) => (typeof v === "string" && /^\+\d{8,15}$/.test(v) ? true : "Use + and 8–15 digits, e.g. +18880000000"),
                },
              ],
            },
            { name: "email", type: "email", required: true, defaultValue: "dispatch@apextruckin.com" },
            {
              type: "row",
              fields: [
                {
                  name: "whatsappNumber",
                  label: "WhatsApp number",
                  type: "text",
                  required: true,
                  defaultValue: "18880000000",
                  admin: { width: "40%", description: "Digits only, with country code." },
                  validate: (v: unknown) => (typeof v === "string" && /^\d{8,15}$/.test(v) ? true : "Digits only, e.g. 18880000000"),
                },
                {
                  name: "whatsappMessage",
                  label: "WhatsApp greeting",
                  type: "text",
                  maxLength: 200,
                  defaultValue: "Hi Apex Truckin, I'd like to start dispatching.",
                  admin: { width: "60%", description: "Pre-filled message when a visitor taps WhatsApp." },
                },
              ],
            },
            {
              name: "address",
              type: "group",
              fields: [
                { name: "street", type: "text", required: true, defaultValue: "2100 Commerce St, Suite 400" },
                {
                  type: "row",
                  fields: [
                    { name: "city", type: "text", required: true, defaultValue: "Dallas", admin: { width: "40%" } },
                    { name: "region", label: "State", type: "text", required: true, defaultValue: "TX", admin: { width: "20%" } },
                    { name: "postal", label: "ZIP", type: "text", required: true, defaultValue: "75201", admin: { width: "20%" } },
                    { name: "country", type: "text", required: true, defaultValue: "US", admin: { width: "20%" } },
                  ],
                },
              ],
            },
            {
              name: "hours",
              type: "array",
              labels: { singular: "Hours row", plural: "Hours" },
              defaultValue: [
                { days: "Dispatch Desk", time: "24 / 7 / 365" },
                { days: "Onboarding (Mon–Fri)", time: "7:00 AM – 9:00 PM CT" },
                { days: "Billing (Mon–Fri)", time: "8:00 AM – 6:00 PM CT" },
              ],
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "days", type: "text", required: true, maxLength: 60, admin: { width: "50%" } },
                    { name: "time", type: "text", required: true, maxLength: 60, admin: { width: "50%" } },
                  ],
                },
              ],
            },
            {
              name: "socials",
              type: "group",
              fields: [
                { name: "facebook", type: "text", defaultValue: "https://facebook.com/apextruckin" },
                { name: "instagram", type: "text", defaultValue: "https://instagram.com/apextruckin" },
                { name: "linkedin", type: "text", defaultValue: "https://linkedin.com/company/apextruckin" },
                { name: "x", label: "X (Twitter)", type: "text", defaultValue: "https://x.com/apextruckin" },
              ],
            },
            {
              name: "open24x7",
              label: "Open 24/7",
              type: "checkbox",
              defaultValue: true,
              admin: { description: "Publishes round-the-clock opening hours in Google's structured data. Turn off if the dispatch desk has set hours." },
            },
          ],
        },
        {
          label: "Rates",
          description: "Qualifiers shown next to any per-mile rate or weekly-gross figure on the site (services, home page).",
          fields: [
            {
              name: "rateDisclaimer",
              label: "Rate disclaimer",
              type: "textarea",
              required: true,
              maxLength: 300,
              defaultValue:
                "Rates vary by state, lane, equipment, load type, market conditions, deadhead and negotiated rate, and are not guaranteed.",
            },
            {
              name: "grossDisclaimer",
              label: "Weekly gross disclaimer",
              type: "textarea",
              required: true,
              maxLength: 300,
              defaultValue:
                "Weekly gross is an estimate based on about 2,500–3,000 miles per week, before fuel, dispatch fees, insurance and other operating costs. It is not a guarantee of earnings — actual revenue varies by market, lanes, load availability, equipment and negotiated rates.",
            },
          ],
        },
        {
          label: "Scripts & tracking",
          description:
            "Paste analytics, Tag Manager, pixel or verification snippets here — no code changes needed. They're pasted as-is into every public page (not /admin). Only <script>, <meta>, <link>, <style> and <noscript> tags are used; anything else is dropped. The site's security policy automatically allows exactly the domains these snippets need — nothing else. Test a change in Preview before publishing, and check the browser console for a blocked-by-CSP message if a script doesn't fire.",
          fields: [
            {
              name: "headHtml",
              label: "Head scripts",
              type: "textarea",
              maxLength: 20000,
              admin: { rows: 10, description: "Rendered in <head> — e.g. a Google Analytics (GA4) or Google Tag Manager snippet, a Meta Pixel base code, or extra <meta>/<link> tags." },
            },
            {
              name: "bodyEndHtml",
              label: "Body-end scripts",
              type: "textarea",
              maxLength: 20000,
              admin: { rows: 6, description: "Rendered just before </body> — e.g. Google Tag Manager's <noscript> snippet, or a chat-widget script." },
            },
            {
              name: "extraAllowedDomains",
              label: "Extra allowed domains",
              type: "textarea",
              maxLength: 2000,
              admin: {
                rows: 3,
                description:
                  "One https:// origin per line. Only needed if a script above loads something from a domain not already covered automatically — e.g. a Tag Manager container that loads a vendor tag at runtime. The browser console will say \"Refused to load/connect\" and name the blocked domain.",
              },
              validate: (v: unknown) => {
                if (!v) return true;
                const lines = String(v).split("\n").map((l) => l.trim()).filter(Boolean);
                const bad = lines.find((l) => !/^https:\/\/[a-z0-9.*-]+(:\d+)?$/i.test(l));
                return bad ? `Not a valid https:// origin: "${bad}"` : true;
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "googleSiteVerification",
                  label: "Google Search Console verification code",
                  type: "text",
                  maxLength: 100,
                  admin: { width: "50%", description: "The content value only, not the full <meta> tag." },
                },
                {
                  name: "bingSiteVerification",
                  label: "Bing Webmaster verification code",
                  type: "text",
                  maxLength: 100,
                  admin: { width: "50%", description: "The content value only, not the full <meta> tag." },
                },
              ],
            },
          ],
        },
        {
          label: "Navigation",
          fields: [
            {
              name: "nav",
              label: "Main menu",
              type: "array",
              labels: { singular: "Link", plural: "Links" },
              admin: { description: "Top navigation and mobile menu (also the footer Company column)." },
              defaultValue: [
                { label: "Services", href: "/services" },
                { label: "Carriers", href: "/carriers" },
                { label: "Pricing", href: "/pricing" },
                { label: "About", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ],
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, maxLength: 30, admin: { width: "50%" } },
                    {
                      name: "href",
                      label: "Link",
                      type: "text",
                      required: true,
                      admin: { width: "50%", description: "A page path like /pricing" },
                      validate: (v: unknown) => (typeof v === "string" && /^\/[\w\-/]*$/.test(v) ? true : "Use a site path starting with /"),
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Footer",
          fields: [
            {
              type: "row",
              fields: [
                { name: "footerHeadline", label: "Headline", type: "text", required: true, defaultValue: "Keep it", maxLength: 40, admin: { width: "50%" } },
                {
                  name: "footerHighlight",
                  label: "Highlighted words",
                  type: "text",
                  defaultValue: "moving.",
                  maxLength: 40,
                  admin: { width: "50%", description: "Shown after the headline in the orange gradient." },
                },
              ],
            },
            {
              name: "footerImage",
              label: "Background photo",
              type: "upload",
              relationTo: "media",
              admin: { description: "Shown faintly behind the footer. Leave empty for the default sunset photo." },
            },
            { name: "newsletterLabel", label: "Newsletter label", type: "text", defaultValue: "Weekly lane & rate intel", maxLength: 60 },
            {
              name: "footerBottomLine",
              label: "Bottom line",
              type: "text",
              defaultValue: "Truck dispatch services · Dallas, TX · Serving all 48 contiguous states",
              maxLength: 160,
            },
            {
              name: "legalLinks",
              type: "array",
              labels: { singular: "Link", plural: "Legal links" },
              defaultValue: [
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Sitemap", href: "/sitemap.xml" },
              ],
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, maxLength: 40, admin: { width: "50%" } },
                    { name: "href", label: "Link", type: "text", required: true, admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [({ req }) => revalidate(req, { tags: ["settings"], paths: ["/llms.txt", "/sitemap.xml"], everything: true })],
  },
};
