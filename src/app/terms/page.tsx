import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms under which ${site.name} provides information and advisory services through this website.`,
  alternates: { canonical: "/terms" },
};

/**
 * Plain-language starting point. Have a Pakistani legal advisor review this
 * before launch — it is not a substitute for professional advice.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="26 August 2026">
      <div>
        <h2>About us</h2>
        <p>
          This website is operated by {site.legalName}, registered under the Real
          Estate Agents &amp; Motor Vehicle Dealers (Regulation of Business)
          Ordinance, 1980.
        </p>
      </div>

      <div>
        <h2>Information is indicative</h2>
        <p>
          Prices, plot sizes, availability, and installment plans shown on this
          website are indicative and change frequently. Nothing here is an offer
          or a contract. Always confirm current terms with an advisor in writing
          before you commit to a transaction.
        </p>
      </div>

      <div>
        <h2>The installment calculator</h2>
        <p>
          The calculator is an estimation tool only. It assumes equal monthly
          installments with no markup, fees, or taxes, and does not reflect any
          particular developer&apos;s actual payment schedule.
        </p>
      </div>

      <div>
        <h2>Independent verification</h2>
        <p>
          We verify title, dues, and transfer history on the properties we
          present. This does not replace your own due diligence, and we strongly
          recommend an independent legal review for high-value purchases.
        </p>
      </div>

      <div>
        <h2>Our fees</h2>
        <p>
          Our consultancy fee depends on the transaction type and project. We
          confirm it in writing before any work begins.
        </p>
      </div>

      <div>
        <h2>Financing</h2>
        <p>
          Where we introduce you to a partner bank, approval and terms are set by
          the lender, not by us. We do not provide financing and we are not
          responsible for a lender&apos;s decision.
        </p>
      </div>

      <div>
        <h2>External links</h2>
        <p>
          This website links to third-party services such as WhatsApp and Google
          Maps. We are not responsible for the content or practices of those
          services.
        </p>
      </div>

      <div>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the Islamic Republic of
          Pakistan, and disputes fall under the jurisdiction of the courts of
          Islamabad.
        </p>
      </div>
    </LegalPage>
  );
}
