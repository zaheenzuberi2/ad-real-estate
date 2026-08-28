import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects the information you share through this website.`,
  alternates: { canonical: "/privacy" },
};

/**
 * Plain-language starting point. Have a Pakistani legal advisor review this
 * before launch — it is not a substitute for professional advice.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="26 August 2026">
      <div>
        <h2>What we collect</h2>
        <p>
          When you submit an enquiry through this website, we collect the name,
          WhatsApp number, email address, project of interest, and any message
          you choose to provide. We do not collect payment details, CNIC
          numbers, or identity documents through this website.
        </p>
      </div>

      <div>
        <h2>Why we collect it</h2>
        <p>
          We use your details for one purpose: to respond to your enquiry and
          advise you on the property you asked about. An advisor will typically
          contact you on WhatsApp or by phone.
        </p>
      </div>

      <div>
        <h2>Who can see it</h2>
        <p>
          Enquiries are stored in our content management system and are visible
          only to {site.name} staff. We do not sell your information, and we do
          not share it with third-party marketing services.
        </p>
      </div>

      <div>
        <h2>How long we keep it</h2>
        <p>
          We retain enquiry records for as long as needed to serve you and to
          meet our record-keeping obligations as a registered real estate
          agency. You may ask us to delete your record at any time.
        </p>
      </div>

      <div>
        <h2>Cookies and analytics</h2>
        <p>
          This website does not set advertising or tracking cookies. Embedded
          Google Maps content is served by Google and is subject to Google&apos;s
          own privacy policy.
        </p>
      </div>

      <div>
        <h2>Your choices</h2>
        <p>
          You can ask us to correct or delete the information we hold about you,
          or ask us to stop contacting you. Write to{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-navy underline decoration-gold underline-offset-4"
          >
            {site.email}
          </a>{" "}
          or visit our office at {fullAddress}.
        </p>
      </div>

      <div>
        <h2>Contact</h2>
        <p>
          {site.legalName}
          <br />
          {fullAddress}
          <br />
          <a
            href={site.phone.href}
            className="font-semibold text-navy underline decoration-gold underline-offset-4"
          >
            {site.phone.display}
          </a>
        </p>
      </div>
    </LegalPage>
  );
}
