import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/blog-data";
import { site } from "@/lib/site";
import { jsonLd } from "@/lib/schema";
import { Icon } from "@/components/ui/Icon";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog: DHA Islamabad-Rawalpindi Property News and Advice",
  description:
    "Updates and practical advice on buying, selling and investing in DHA Islamabad-Rawalpindi property, from the AD Real Estate advisory team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "AD Real Estate Blog",
    description:
      "Updates and practical advice on property in DHA Islamabad-Rawalpindi.",
    url: `${site.url}/blog`,
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AD Real Estate Blog",
    url: `${site.url}/blog`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(listSchema) }}
      />

      <section className="bg-navy-deep pb-14 pt-16">
        <div className="shell">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold/50" />
            Blog
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-tight text-white sm:text-5xl">
            Notes from the DHA property desk
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300">
            Updates and practical advice on buying, selling and investing in DHA
            Islamabad-Rawalpindi. For step-by-step references, see our{" "}
            <Link href="/guides" className="text-gold underline-offset-4 hover:underline">
              property guides
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-24">
        <div className="shell max-w-3xl">
          {posts.length === 0 ? (
            <p className="text-base text-slate-600">
              New posts are on the way. In the meantime, our{" "}
              <Link href="/guides" className="font-semibold text-navy underline-offset-4 hover:underline">
                property guides
              </Link>{" "}
              cover the buying process in detail.
            </p>
          ) : (
            <ul className="space-y-5">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="tap group block rounded-2xl border border-hairline bg-white p-6 shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)] transition-colors hover:border-gold/40 sm:p-8"
                  >
                    <p className="eyebrow text-gold-ink">
                      {p.category} · {p.dateLabel} · {p.readingTime}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-navy-deep">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">
                      {p.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold-ink">
                      Read the post
                      <Icon
                        name="arrow-right"
                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
