import type { Metadata } from "next";
import Link from "next/link";
import { dhaLocations } from "@/content/locations";
import { areaKinds } from "@/content/area-kinds";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { faqPageSchema, jsonLd } from "@/lib/schema";

const title = "Property Dealers in DHA Islamabad-Rawalpindi";
const description =
  "AD Real Estate is a registered real estate agency, property consultant and property dealer in DHA Phase 5. Plots, houses and commercial property, with title checks and full transfer support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/property-dealers" },
  openGraph: { title, description, url: `${site.url}/property-dealers` },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${site.url}/property-dealers#service`,
  serviceType: "Property dealing and real estate agency services",
  provider: { "@id": `${site.url}/#organization` },
  areaServed: { "@type": "Place", name: "DHA Islamabad-Rawalpindi" },
  name: title,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Property Dealers",
      item: `${site.url}/property-dealers`,
    },
  ],
};

const faqs = [
  {
    q: "Are you property dealers in DHA Islamabad-Rawalpindi?",
    a: "Yes. AD Real Estate is a registered real estate agency, property consultant and property dealer based in DHA Phase 5, working across DHA Islamabad-Rawalpindi.",
  },
  {
    q: "What do you deal in?",
    a: "Residential and commercial plots, houses and apartments, and new developments such as Margalla Orchard. Not everything is listed publicly, so tell an advisor what you are looking for and we will check availability.",
  },
  {
    q: "What is the difference between a property dealer and a real estate agency?",
    a: "In practice the terms overlap. We act as both: we connect buyers and sellers, and we also verify title and dues, advise on price and manage the transfer.",
  },
  {
    q: "Do you help with selling as well as buying?",
    a: "Yes. We act for sellers as well as buyers and help get a file or plot transfer-ready before showing it to serious buyers.",
  },
  {
    q: "Can overseas Pakistanis deal with you remotely?",
    a: "Yes. We handle guided site visits, verification and the full transfer on your behalf and report back with photos and documents at each step.",
  },
];

const chipCls =
  "tap inline-flex items-center rounded-full border border-hairline bg-white px-4 py-2 text-sm text-navy-deep transition-colors hover:border-gold/50 hover:text-gold";

export default function PropertyDealersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(faqs)) }}
      />

      <section className="bg-navy-deep pb-14 pt-16">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-100">Property Dealers</li>
            </ol>
          </nav>

          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Property Dealers
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            AD Real Estate is a registered real estate agency, property
            consultant and property dealer based in DHA Phase 5. We help
            buyers, sellers and investors deal in plots, houses and commercial
            property across DHA Islamabad-Rawalpindi, with title and dues
            checked and the transfer handled.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <div className="shell grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-medium text-navy-deep">
              What dealing with us involves
            </h2>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Icon name="shield-check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                Seller, ownership and dues verified before you pay
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Icon name="building" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                Plots, houses and commercial property across the phases
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Icon name="key" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                Costs in writing and full transfer support
              </li>
            </ul>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-medium text-navy-deep">
                Property dealers by phase
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Each phase has its own page with what we do there and any
                current listings.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {dhaLocations.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/areas/${l.slug}`} className={chipCls}>
                      {l.phase}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-2xl font-medium text-navy-deep">
                What we deal in
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {areaKinds.map((k) => (
                  <li key={k.slug}>
                    <Link href={`/areas/dha-phase-5/${k.slug}`} className={chipCls}>
                      {k.label} in DHA Phase 5
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/houses" className={chipCls}>
                    Houses &amp; Apartments
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className={chipCls}>
                    All Properties
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-12 rounded-2xl border border-hairline bg-white p-7">
              <h2 className="font-display text-xl font-medium text-navy-deep">
                Choosing a dealer? Read this first
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Whoever you deal with, there are checks worth running before
                any money moves. Our guide lists them, along with the red
                flags to watch for.
              </p>
              <Link
                href="/guides/how-to-choose-a-property-dealer-in-dha-islamabad"
                className="tap mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-ink hover:underline"
              >
                How to choose a property dealer in DHA
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-medium text-navy-deep">
                Frequently asked
              </h2>
              <div className="mt-6 divide-y divide-hairline border-y border-hairline">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-2">
                    <summary className="tap flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-left">
                      <h3 className="font-display text-base font-medium text-navy-deep">
                        {f.q}
                      </h3>
                      <Icon
                        name="chevron-down"
                        className="h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="mb-3 mt-1 pr-6 text-sm leading-relaxed text-slate-600 sm:pr-10">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit rounded-2xl border border-hairline bg-white p-7">
            <h2 className="font-display text-xl font-semibold text-navy-deep">
              Talk to an advisor
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Tell us whether you are buying or selling, the phase and your
              budget, and we will get back to you.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button href={site.whatsapp.href} external variant="whatsapp">
                <Icon name="whatsapp" className="h-4 w-4" />
                WhatsApp Us
              </Button>
              <Button href={site.phone.href} variant="dark">
                <Icon name="phone" className="h-4 w-4" />
                {site.phone.display}
              </Button>
              <Button href="/properties" variant="ghost">
                Browse All Properties
                <Icon name="arrow-right" className="h-4 w-4" />
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
