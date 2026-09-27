import { getSiteSettings } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/sections/LegalPage";

export const generateMetadata = () => pageMetadata({
  title: "Terms of Service",
  description: "The terms that govern use of the Apex Truckin website and truck dispatch services.",
  path: "/terms",
});

export default async function TermsPage() {
  const COMPANY = await getSiteSettings();
  return (
    <LegalPage title="Terms of Service" path="/terms" updated="September 1, 2025">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the apextruckin.com website and the truck dispatch services
        provided by {COMPANY.legalName} (&ldquo;Apex Truckin&rdquo;). By using our website or services you agree to these Terms.
      </p>

      <h2>1. Our role</h2>
      <p>
        Apex Truckin is a dispatch service acting as an agent for motor carriers. <strong>We are not a freight broker or a motor
        carrier</strong>, and we do not take possession of freight. The carrier remains solely responsible for the safe operation of
        its equipment, regulatory compliance, cargo care and delivery.
      </p>

      <h2>2. Carrier responsibilities</h2>
      <ul>
        <li>Maintain active operating authority (MC/USDOT), required insurance and a safety rating that is not &ldquo;Unsatisfactory.&rdquo;</li>
        <li>Provide accurate information about equipment, availability, lanes and hours of service.</li>
        <li>Review and approve each rate confirmation before a load is booked. We never force dispatch.</li>
        <li>Comply with all FMCSA, DOT and state regulations, including hours-of-service and ELD rules.</li>
      </ul>

      <h2>3. Fees and payment</h2>
      <ul>
        <li><strong>Starter:</strong> 5% of the gross linehaul rate for each load dispatched, invoiced weekly.</li>
        <li><strong>Professional:</strong> $300 per active truck per month, billed on the 1st of each month.</li>
        <li><strong>Enterprise:</strong> as set out in a separate written agreement.</li>
      </ul>
      <p>
        Fees are due within 7 days of invoice. Late balances may incur a 1.5% monthly charge. Fees are earned when a load is
        booked and are not contingent on broker payment unless otherwise agreed in writing.
      </p>

      <h2>4. Term and cancellation</h2>
      <p>
        Starter and Professional plans are month-to-month. Either party may cancel with 7 days&apos; written notice. Fees for loads booked
        before cancellation remain payable.
      </p>

      <h2>5. Authorization</h2>
      <p>
        By enrolling, you authorize Apex Truckin to act on your behalf to search for loads, negotiate rates, sign rate confirmations
        you&apos;ve approved and submit broker setup packets and invoices.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Apex Truckin is not liable for cargo loss or damage, accidents, broker non-payment,
        detention, fines or indirect, incidental or consequential damages. Our total liability for any claim is limited to the fees you
        paid us in the 30 days before the event giving rise to the claim.
      </p>

      <h2>7. Website use</h2>
      <p>
        Content on this site is for general information only and is not legal, tax or financial advice. You may not scrape, copy or
        misuse the site, or attempt to access our systems without authorization.
      </p>

      <h2>8. Governing law</h2>
      <p>These Terms are governed by the laws of the State of Texas. Disputes will be resolved in the state or federal courts of Dallas County, Texas.</p>

      <h2>9. Changes</h2>
      <p>We may update these Terms. Continued use of our services after changes are posted means you accept the updated Terms.</p>

      <h2>10. Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or call <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>.
      </p>
    </LegalPage>
  );
}
