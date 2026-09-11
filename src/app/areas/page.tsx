import type { Metadata } from "next";
import Link from "next/link";
import { dhaLocations } from "@/content/locations";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Real Estate Agency in DHA Islamabad: Areas We Serve",
  description:
    "AD Real Estate advises buyers, sellers and investors across every phase of DHA Islamabad, from DHA Phase 1 to DHA Phase 6. See the phase you're interested in.",
  alternates: { canonical: "/areas" },
  openGraph: {
    title: "Real Estate Agency in DHA Islamabad: Areas We Serve",
    description:
      "AD Real Estate advises buyers, sellers and investors across every phase of DHA Islamabad, from Phase 1 to Phase 6.",
    url: `${site.url}/areas`,
  },
};

export default function AreasPage() {
  return (
    <>
      <section className="bg-navy-deep pb-14 pt-16">
        <div className="shell">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Areas We Serve
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            A real estate agency for every phase of DHA Islamabad
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            We are based in DHA Phase 5, and our advisors work with buyers,
            sellers and investors across the whole of DHA Islamabad. Pick your
            phase below for what we can do there.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-20">
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dhaLocations.map((l) => (
              <Link
                key={l.slug}
                href={`/areas/${l.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-hairline bg-white p-6 shadow-[0_1px_2px_rgba(11,27,51,0.06)] transition-all duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_18px_36px_-16px_rgba(11,27,51,0.24)]"
              >
                <span>
                  <span className="flex items-center gap-2.5 font-display text-lg font-semibold text-navy-deep">
                    <Icon name="map-pin" className="h-4 w-4 shrink-0 text-gold" />
                    {l.phase}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    Islamabad
                  </span>
                </span>
                <Icon
                  name="arrow-right"
                  className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-gold"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
