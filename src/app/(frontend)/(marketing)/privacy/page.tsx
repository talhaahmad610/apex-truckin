import { getSiteSettings } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const generateMetadata = () => pageMetadata({
  title: "Privacy Policy",
  description: "How Apex Truckin collects, uses and protects personal information from carriers, brokers and website visitors.",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const COMPANY = await getSiteSettings();
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="September 1, 2025">
      <p>
        This Privacy Policy explains how {COMPANY.legalName} (&ldquo;Apex Truckin,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects, uses,
        shares and protects information when you visit apextruckin.com, contact us, or use our truck dispatch services.
      </p>

      <h2>1. Information we collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li><strong>Contact details</strong> — name, email address, phone number and company name submitted through our forms, email, phone or WhatsApp.</li>
        <li><strong>Carrier information</strong> — MC and USDOT numbers, W-9, certificate of insurance, equipment type, preferred lanes and banking or factoring details needed to dispatch and invoice loads.</li>
        <li><strong>Communications</strong> — messages, call notes and records of load approvals.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Device and browser type, IP address, pages viewed and referring URLs, collected through server logs and privacy-friendly analytics.</li>
        <li>Cookies that are strictly necessary for the site to function. We do not use advertising cookies.</li>
      </ul>

      <h2>2. How we use information</h2>
      <ul>
        <li>To provide dispatch services: sourcing loads, negotiating rates, completing broker setup packets and submitting invoices.</li>
        <li>To respond to inquiries and provide customer support.</li>
        <li>To send newsletters or lane updates you&apos;ve subscribed to (you can unsubscribe at any time).</li>
        <li>To comply with legal obligations, enforce our terms and protect against fraud.</li>
        <li>To improve our website and services.</li>
      </ul>

      <h2>3. How we share information</h2>
      <p>We do not sell personal information. We share information only as needed to operate our services:</p>
      <ul>
        <li><strong>Freight brokers and shippers</strong> — carrier authority, insurance and contact details required to book loads on your behalf.</li>
        <li><strong>Factoring companies</strong> — invoices and supporting documents, when you use factoring.</li>
        <li><strong>Service providers</strong> — hosting, database (Supabase), email and communications providers bound by confidentiality obligations.</li>
        <li><strong>Legal</strong> — when required by law, subpoena or to protect rights and safety.</li>
      </ul>

      <h2>4. Data retention</h2>
      <p>
        We keep carrier and load records for as long as you use our services and for up to seven years afterward to meet tax and
        regulatory record-keeping requirements. Contact form submissions that don&apos;t become customers are deleted after 24 months.
      </p>

      <h2>5. Security</h2>
      <p>
        We use encryption in transit (TLS), access controls, row-level database security and least-privilege access for staff.
        No method of transmission is 100% secure, but we work hard to protect your information.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Depending on where you live (including California under the CCPA/CPRA), you may have the right to access, correct, delete
        or obtain a copy of your personal information, and to opt out of certain processing. To make a request, email{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. We will verify and respond within 45 days.
      </p>

      <h2>7. Children</h2>
      <p>Our services are intended for businesses and are not directed to children under 16. We do not knowingly collect their information.</p>

      <h2>8. Changes</h2>
      <p>We may update this policy from time to time. Material changes will be posted on this page with an updated date.</p>

      <h2>9. Contact</h2>
      <p>
        {COMPANY.legalName}, {COMPANY.address.street}, {COMPANY.address.city}, {COMPANY.address.region} {COMPANY.address.postal} ·{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> · <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
      </p>
    </LegalPage>
  );
}
