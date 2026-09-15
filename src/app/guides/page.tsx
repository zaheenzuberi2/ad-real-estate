import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/content/guides";
import { site } from "@/lib/site";
import { jsonLd } from "@/lib/schema";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Property Guides: Buying in DHA, Islamabad-Rawalpindi",
  description:
    "Practical guides to buying, transferring and investing in DHA Islamabad-Rawalpindi property: the process, the paperwork and the pitfalls, from a registered advisory.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "DHA Islamabad-Rawalpindi Property Guides",
    description:
      "The process, the paperwork and the pitfalls of buying property in DHA, Islamabad-Rawalpindi.",
    url: `${site.url}/guides`,
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: guides.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${site.url}/guides/${g.slug}`,
    name: g.title,
  })),
};

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListSchema) }}
      />

      <section className="bg-navy-deep pb-14 pt-16">
        <div className="shell">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Guides
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            Property guides for DHA, Islamabad-Rawalpindi
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            Straight answers on how DHA Islamabad-Rawalpindi transactions actually work:
            the routes to market, the paperwork, the taxes, and the checks that
            protect your money. Written by a registered advisory, not a
            brokerage.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-24">
        <div className="shell max-w-3xl">
          <ul className="space-y-5">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="tap group block rounded-2xl border border-hairline bg-white p-6 shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)] transition-colors hover:border-gold/40 sm:p-8"
                >
                  <p className="eyebrow text-gold-ink">
                    {g.category} · {g.readingTime}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-navy-deep">
                    {g.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {g.dek}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold-ink">
                    Read the guide
                    <Icon
                      name="arrow-right"
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm leading-relaxed text-slate-500">
            More guides are on the way. If there is something you want covered,{" "}
            <Link
              href="/contact"
              className="font-semibold text-navy underline decoration-gold underline-offset-4"
            >
              tell an advisor
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
