import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dhaLocations, getLocation, phaseNumbersIn } from "@/content/locations";
import { getProperties } from "@/lib/properties-data";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { areaServiceSchema, areaBreadcrumbSchema, jsonLd } from "@/lib/schema";

export async function generateStaticParams() {
  return dhaLocations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};

  const title = `Real Estate Agency in ${location.phase}, Islamabad`;
  const description = `AD Real Estate is a registered property advisory serving buyers, sellers and investors in ${location.phase}, Islamabad. Title checks, guided site visits and transfer support.`;

  return {
    title,
    description,
    alternates: { canonical: `/areas/${slug}` },
    openGraph: { title, description, url: `${site.url}/areas/${slug}` },
  };
}

const faqsFor = (phase: string, hasListings: boolean) => [
  {
    q: `Do you have plots for sale in ${phase}?`,
    a: hasListings
      ? `Yes, see our current ${phase} listing below.`
      : `Not always publicly listed. We source and verify plots in ${phase} on request, so tell an advisor what you're looking for and we'll check current availability.`,
  },
  {
    q: `Can you help me sell a plot in ${phase}?`,
    a: `Yes. We verify the title and dues, list qualifying plots, and market them to our buyer network across DHA Islamabad-Rawalpindi.`,
  },
  {
    q: `Do you handle transfers for overseas Pakistanis buying in ${phase}?`,
    a: `Yes. We manage guided site visits, verification and the full transfer process for overseas clients and report back with photos and documents at each step.`,
  },
];

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const { phase, phaseNumber } = location;
  const properties = await getProperties();
  const matches = properties.filter((p) =>
    phaseNumbersIn(`${p.title} ${p.phase} ${p.location}`).includes(phaseNumber),
  );
  const faqs = faqsFor(phase, matches.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(areaServiceSchema(phase, slug)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(areaBreadcrumbSchema(phase, slug)),
        }}
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
              <li>
                <Link href="/areas" className="transition-colors hover:text-gold">
                  Areas We Serve
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-100">{phase}</li>
            </ol>
          </nav>

          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Service Area
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            Real Estate Agency in {phase}, Islamabad
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            AD Real Estate is a registered property advisory based in DHA
            Phase 5, working with buyers, sellers and investors across DHA
            Islamabad-Rawalpindi, including {phase}. Whether you want to buy a plot,
            sell one, or get a second opinion on a file someone has offered
            you in {phase}, our advisors can help.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <div className="shell grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-medium text-navy-deep">
              What we do in {phase}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Our work in {phase} covers the same checks we run everywhere in
              DHA: confirming title and outstanding dues before you commit,
              arranging a guided site visit, and managing the transfer
              paperwork once a deal is agreed. For overseas clients, we
              handle site visits and paperwork on your behalf and report back
              with photos and documents.
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Icon name="shield-check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                Title and dues verified before you commit
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Icon name="map-pin" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                Guided site visits in {phase}
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-700">
                <Icon name="key" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                Full transfer support once a deal is agreed
              </li>
            </ul>

            {matches.length > 0 ? (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-medium text-navy-deep">
                  Current listings in {phase}
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
                  Nothing publicly listed in {phase} right now
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Our inventory moves quickly and not everything we handle in
                  {` ${phase}`} is listed publicly. Tell an advisor what
                  you&apos;re looking for and we&apos;ll check what&apos;s
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
              Tell us what you&apos;re looking for in {phase} and we&apos;ll
              get back to you with what&apos;s actually available.
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
