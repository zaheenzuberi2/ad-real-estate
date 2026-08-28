import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { site, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Our Islamabad Advisory Team",
  description: `Visit our office at ${fullAddress}, call ${site.phone.display}, or send an enquiry. Our consultants respond to every lead personally.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact AD Real Estate, Islamabad",
    description: `Visit our DHA Phase 5 office, call ${site.phone.display}, or message us on WhatsApp.`,
    url: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-deep pb-14 pt-16">
        <div className="shell">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Get In Touch
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            Talk to an advisor
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            Walk into our DHA Phase 5 office, call ahead, or send an enquiry and
            we&apos;ll reach out on WhatsApp within one business day.
          </p>
        </div>
      </section>

      <Contact />
      <Faq />
    </>
  );
}
