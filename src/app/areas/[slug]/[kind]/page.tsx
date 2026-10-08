import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dhaLocations, getLocation, phaseNumbersIn, phaseNote } from "@/content/locations";
import { areaKinds, getAreaKind } from "@/content/area-kinds";
import { guides } from "@/content/guides";
import { getProperties } from "@/lib/properties-data";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { faqPageSchema, jsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return dhaLocations.flatMap((l) =>
    areaKinds.map((k) => ({ slug: l.slug, kind: k.slug })),
  );
}

type Params = Promise<{ slug: string; kind: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug, kind } = await params;
  const location = getLocation(slug);
  const k = getAreaKind(kind);
  if (!location || !k) return {};

  const title = `${k.label} in ${location.phase}, Islamabad`;
  const description = `${k.label} in ${location.phase}, Islamabad-Rawalpindi from a registered real estate agency, property consultant and dealer. Title and dues verified, transfer handled.`;
  const path = `/areas/${slug}/${kind}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: `${site.url}${path}` },
  };
}

const chipCls =
  "tap inline-flex items-center rounded-full border border-hairline bg-white px-4 py-2 text-sm text-navy-deep transition-colors hover:border-gold/50 hover:text-gold";

export default async function AreaKindPage({ params }: { params: Params }) {
  const { slug, kind } = await params;
  const location = getLocation(slug);
  const k = getAreaKind(kind);
  if (!location || !k) notFound();

  const { phase, phaseNumber } = location;
  const properties = await getProperties();
  const matches = properties.filter(
    (p) =>
      k.types.includes(p.propertyType) &&
      phaseNumbersIn(`${p.title} ${p.phase} ${p.location}`).includes(phaseNumber),
  );
  const faqs = k.faqs(phase, matches.length > 0);
  const note = phaseNote(phaseNumber);
  const pageTitle = `${k.label} in ${phase}, Islamabad`;
  const url = `${site.url}/areas/${slug}/${kind}`;
  const relatedGuides = k.guides
    .map((g) => guides.find((x) => x.slug === g))
    .filter((g): g is (typeof guides)[number] => Boolean(g));
  const siblings = areaKinds.filter((x) => x.slug !== kind);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    serviceType: `${k.label} agency services`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Place", name: `${phase}, Islamabad-Rawalpindi` },
    name: pageTitle,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${site.url}/areas` },
      { "@type": "ListItem", position: 3, name: phase, item: `${site.url}/areas/${slug}` },
      { "@type": "ListItem", position: 4, name: k.label, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(faqs)) }} />

      <section className="bg-navy-deep pb-14 pt-16">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/areas" className="transition-colors hover:text-gold">Areas We Serve</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/areas/${slug}`} className="transition-colors hover:text-gold">{phase}</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-100">{k.label}</li>
            </ol>
          </nav>

          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" />
            {phase}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            {pageTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            {k.intro(phase)}
          </p>
          {note && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">{note}</p>
          )}
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <div className="shell grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-medium text-navy-deep">
              {k.checksTitle} in {phase}
            </h2>
            <ul className="mt-6 space-y-4">
              {k.checks.map((c) => (
                <li key={c} className="flex items-start gap-3 text-sm text-slate-700">
                  <Icon name="shield-check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  {c}
                </li>
              ))}
            </ul>

            {matches.length > 0 ? (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-medium text-navy-deep">
                  Current {k.noun} in {phase}
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
                  Not everything we handle is listed publicly. Tell an advisor
                  the {k.noun} you are looking for in {phase} and we will check
                  what is available.
                </p>
                <Button href={site.whatsapp.href} external variant="whatsapp" className="mt-6">
                  Ask An Advisor
                </Button>
              </div>
            )}

            <div className="mt-12">
              <h2 className="font-display text-xl font-medium text-navy-deep">
                More in {phase}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                <li>
                  <Link href={`/areas/${slug}`} className={chipCls}>
                    {phase} overview
                  </Link>
                </li>
                {siblings.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/areas/${slug}/${x.slug}`} className={chipCls}>
                      {x.label} in {phase}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <section className="mt-14">
              <h2 className="font-display text-2xl font-medium text-navy-deep">Frequently asked</h2>
              <div className="mt-6 divide-y divide-hairline border-y border-hairline">
                {faqs.map((f) => (
                  <details key={f.q} className="group py-2">
                    <summary className="tap flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-left">
                      <h3 className="font-display text-base font-medium text-navy-deep">{f.q}</h3>
                      <Icon
                        name="chevron-down"
                        className="h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="mb-3 mt-1 pr-6 text-sm leading-relaxed text-slate-600 sm:pr-10">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {relatedGuides.length > 0 && (
              <section className="mt-14">
                <h2 className="eyebrow text-gold-ink">Guides</h2>
                <ul className="mt-4 space-y-3">
                  {relatedGuides.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/guides/${g.slug}`}
                        className="tap group flex items-center justify-between gap-4 border-b border-hairline py-3 text-navy-deep transition-colors hover:text-gold-ink"
                      >
                        <span className="font-display text-lg font-medium">{g.title}</span>
                        <Icon
                          name="arrow-right"
                          className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-hairline bg-white p-7">
            <h2 className="font-display text-xl font-semibold text-navy-deep">Talk to an advisor</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Tell us what you are looking for in {phase} and we will get back
              to you with what is actually available.
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
