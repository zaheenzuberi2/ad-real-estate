import type { Metadata } from "next";
import Link from "next/link";
import { getProperties } from "@/lib/properties-data";
import { dhaLocations } from "@/content/locations";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import {
  commercialServiceSchema,
  commercialBreadcrumbSchema,
  jsonLd,
} from "@/lib/schema";

const title = "Commercial Plots & Property for Sale in DHA Islamabad-Rawalpindi";
const description =
  "AD Real Estate helps buyers and investors find, verify and transfer commercial plots for sale in DHA Islamabad-Rawalpindi, from corner shops to main boulevard sites. Title and dues checked before you commit.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/commercial" },
  openGraph: { title, description, url: `${site.url}/commercial` },
};

const faqs = (hasListings: boolean) => [
  {
    q: "Do you have commercial plots for sale in DHA Islamabad-Rawalpindi?",
    a: hasListings
      ? "Yes, see our current commercial listing below."
      : "Not always publicly listed. We source and verify commercial plots across DHA Islamabad-Rawalpindi on request, so tell an advisor what you're looking for and we'll check current availability.",
  },
  {
    q: "What should I check before buying a commercial plot in DHA?",
    a: "The same checks that matter on any DHA file: confirmed title, no outstanding development or transfer dues, and the plot's actual commercial-use category for that sector, since permitted business types vary by phase. We verify all three before you commit.",
  },
  {
    q: "Can overseas Pakistanis buy commercial property in DHA through you?",
    a: "Yes. We handle guided site visits, verification and the full transfer process on your behalf and report back with photos and documents at each step.",
  },
];

export default async function CommercialPage() {
  const properties = await getProperties();
  const matches = properties.filter((p) => p.propertyType === "Commercial Plot");
  const items = faqs(matches.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(commercialServiceSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(commercialBreadcrumbSchema()) }}
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
              <li className="text-slate-100">Commercial Plots</li>
            </ol>
          </nav>

          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Commercial Real Estate
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            AD Real Estate is a registered property advisory based in DHA
            Phase 5, working with buyers and investors on commercial plots
            across DHA Islamabad-Rawalpindi. Whether you&apos;re after a corner shop, a
            main boulevard site, or an office plot, our advisors can help you
            find and verify one.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <div className="shell grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-medium text-navy-deep">
              What we check on a commercial plot
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Commercial files carry a few risks a residential plot
              doesn&apos;t: outstanding commercialization dues, a permitted
              business category that doesn&apos;t match what you plan to
              build, or a corner premium that isn&apos;t actually reflected
              in the asking price. We confirm all of that before you commit,
              arrange a guided site visit, and manage the transfer paperwork
              once a deal is agreed.
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Icon name="shield-check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                Title, dues and commercial-use category verified
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Icon name="building" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                Guided site visits across DHA&apos;s commercial sectors
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Icon name="key" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                Full transfer support once a deal is agreed
              </li>
            </ul>

            {matches.length > 0 ? (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-medium text-navy-deep">
                  Current commercial listings
                </h2>
                <div className="mt-6 grid gap-7 sm:grid-cols-2">
                  {matches.map((p) => (
                    <PropertyCard key={p.slug} property={p} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-12 rounded-2xl border border-dashed border-hairline bg-white p-8">
                <h2 className="font-display text-xl font-semibold text-navy-deep">
                  Nothing publicly listed right now
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Commercial inventory moves quickly and isn&apos;t always
                  listed publicly. Tell an advisor what you&apos;re looking
                  for, and which phase, and we&apos;ll check what&apos;s
                  available.
                </p>
                <Button
                  href={site.whatsapp.href}
                  external
                  variant="whatsapp"
                  className="mt-6"
                >
                  Ask An Advisor
                </Button>
              </div>
            )}

            <div className="mt-12">
              <h2 className="font-display text-2xl font-medium text-navy-deep">
                Browse by phase instead
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Looking in a specific part of DHA? Each phase has its own
                page with what we do there and any current listings.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {dhaLocations.map((l) => (
                  <li key={l.slug}>
                    <Link
                      href={`/areas/${l.slug}`}
                      className="tap inline-flex items-center rounded-full border border-hairline bg-white px-4 py-2 text-sm text-navy-deep transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      {l.phase}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-medium text-navy-deep">
                Frequently asked
              </h2>
              <div className="mt-6 divide-y divide-hairline border-y border-hairline">
                {items.map((f) => (
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
              Tell us what kind of commercial plot you&apos;re looking for
              and we&apos;ll get back to you with what&apos;s actually
              available.
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
