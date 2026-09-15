import type { Metadata } from "next";
import { Story } from "@/components/sections/Story";
import { Certifications } from "@/components/sections/Certifications";
import { Team } from "@/components/sections/Team";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us: Registered Property Consultants in Islamabad",
  description:
    "AD Real Estate is a government-registered property advisory in DHA Phase 5, Islamabad, serving local and overseas buyers across DHA Islamabad-Rawalpindi since inception.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About AD Real Estate: Registered Property Consultants",
    description:
      "Government-registered property advisory in DHA Phase 5, Islamabad, serving local and overseas buyers.",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-deep pb-14 pt-16">
        <div className="shell">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" />
            About Us
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            A registered advisory, not a broker&apos;s desk
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            We are registered under the Real Estate Agents &amp; Motor Vehicle
            Dealers (Regulation of Business) Ordinance, 1980, and we verify
            every title before it reaches a client.
          </p>
        </div>
      </section>

      <Story />
      <Certifications />
      <Process />
      <Team />
      <Reviews />
    </>
  );
}
