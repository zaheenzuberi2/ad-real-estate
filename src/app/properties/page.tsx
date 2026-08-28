import type { Metadata } from "next";
import { budgetBands } from "@/content/properties";
import { getProperties } from "@/lib/properties-data";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { PropertyFilters } from "@/components/sections/PropertyFilters";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Properties For Sale in DHA & Bahria Town, Islamabad",
  description:
    "Browse verified plots, villas and commercial units across DHA and Bahria Town, Islamabad. Every listing title-checked before it reaches you.",
  alternates: { canonical: "/properties" },
  openGraph: {
    title: "Properties For Sale in DHA & Bahria Town, Islamabad",
    description:
      "Browse verified plots, villas and commercial units across DHA and Bahria Town, Islamabad.",
    url: `${site.url}/properties`,
  },
};

export default async function PropertiesPage(props: {
  searchParams: Promise<{ phase?: string; type?: string; budget?: string }>;
}) {
  const { phase, type, budget } = await props.searchParams;

  const band = budgetBands.find((b) => b.label === budget);
  const properties = await getProperties();

  const results = properties.filter((p) => {
    if (phase && p.phase !== phase) return false;
    if (type && p.propertyType !== type) return false;
    if (band && p.priceFrom !== null) {
      if (p.priceFrom < band.min || p.priceFrom > band.max) return false;
    }
    return true;
  });

  const filtered = Boolean(phase || type || budget);

  return (
    <>
      <section className="bg-navy-deep pb-14 pt-16">
        <div className="shell">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Our Inventory
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            Properties in DHA &amp; Bahria Town
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            Every listing below has had its title, dues, and transfer history
            checked by our team before publication.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-12 sm:py-16">
        <div className="shell">
          <PropertyFilters />

          <p className="mt-8 text-sm text-slate-500" aria-live="polite">
            Showing <strong className="text-navy-deep">{results.length}</strong>{" "}
            {results.length === 1 ? "property" : "properties"}
            {filtered && " matching your filters"}
          </p>

          {results.length > 0 ? (
            <div className="mt-6 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <PropertyCard key={p.slug} property={p} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-hairline bg-white p-12 text-center">
              <h2 className="font-display text-xl font-semibold text-navy-deep">
                No properties match those filters
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                Our inventory moves quickly and not everything we handle is
                listed publicly. Tell an advisor what you&apos;re looking for and
                we&apos;ll check what&apos;s available.
              </p>
              <Button href={site.whatsapp.href} external variant="whatsapp" className="mt-6">
                Ask An Advisor
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
