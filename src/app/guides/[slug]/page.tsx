import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, getGuide, type GuideBlock } from "@/content/guides";
import { site } from "@/lib/site";
import {
  jsonLd,
  articleSchema,
  guideBreadcrumbSchema,
  faqPageSchema,
} from "@/lib/schema";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: `${site.url}/guides/${guide.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 font-display text-2xl font-semibold text-navy-deep">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-6 font-display text-lg font-semibold text-navy-deep">
          {block.text}
        </h3>
      );
    case "p":
      return <p className="mt-4">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="ml-5 list-disc pl-1">
              {it}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-4 space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="ml-5 list-decimal pl-1">
              {it}
            </li>
          ))}
        </ol>
      );
  }
}

export default async function GuidePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const others = guides.filter((g) => g.slug !== guide.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema(guide)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(guideBreadcrumbSchema(guide)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(guide.faqs)) }}
      />

      <section className="bg-navy-deep pb-12 pt-16">
        <div className="shell max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/guides"
                  className="transition-colors hover:text-gold"
                >
                  Guides
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gold">{guide.title}</li>
            </ol>
          </nav>

          <p className="eyebrow text-gold">
            {guide.category} · {guide.readingTime}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium leading-[1.15] text-white sm:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            {guide.dek}
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Updated {guide.dateLabel}
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <div className="shell max-w-3xl">
          <article className="text-base leading-relaxed text-slate-600">
            {guide.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>

          <aside className="mt-12 rounded-2xl border border-gold/30 bg-sand p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-navy-deep">
              Weighing a specific plot?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Send us the file or the location and we will run the checks in
              this guide before you commit — seller verification, the NDC, the
              sector&apos;s transfer status, and the full cost breakdown in
              writing.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="sm" still>
                Talk to an advisor
              </Button>
              <Button href="/properties" variant="ghost" size="sm" still>
                See current listings
              </Button>
            </div>
          </aside>

          <section className="mt-14">
            <h2 className="font-display text-2xl font-semibold text-navy-deep">
              Frequently asked
            </h2>
            <div className="mt-6 divide-y divide-hairline border-y border-hairline">
              {guide.faqs.map((f) => (
                <details key={f.q} className="group py-2">
                  <summary className="tap flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-left">
                    <h3 className="font-display text-lg font-medium text-navy-deep">
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

          {others.length > 0 && (
            <section className="mt-14">
              <h2 className="eyebrow text-gold-ink">More guides</h2>
              <ul className="mt-4 space-y-3">
                {others.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/guides/${g.slug}`}
                      className="tap group flex items-center justify-between gap-4 border-b border-hairline py-3 text-navy-deep transition-colors hover:text-gold-ink"
                    >
                      <span className="font-display text-lg font-medium">
                        {g.title}
                      </span>
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

          <p className="mt-12 text-xs leading-relaxed text-slate-500">
            This guide is general information. Rules, fees and tax rates vary by
            phase and change over time — confirm the specifics for your plot
            with DHA and a qualified advisor before you commit.
          </p>
        </div>
      </section>
    </>
  );
}
