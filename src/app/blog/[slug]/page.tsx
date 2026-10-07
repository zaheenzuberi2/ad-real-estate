import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/blog-data";
import { site } from "@/lib/site";
import { jsonLd, blogPostingSchema, blogBreadcrumbSchema } from "@/lib/schema";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ArticleBlock } from "@/components/ui/ArticleBlocks";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.modified,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) notFound();

  const others = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(blogPostingSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(blogBreadcrumbSchema(post)) }}
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
                <Link href="/blog" className="transition-colors hover:text-gold">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gold">{post.title}</li>
            </ol>
          </nav>

          <p className="eyebrow text-gold">
            {post.category} · {post.readingTime}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium leading-[1.15] text-white sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-300">
            {post.excerpt}
          </p>
          <p className="mt-4 text-xs text-slate-400">
            Published <time dateTime={post.date}>{post.dateLabel}</time>
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <div className="shell max-w-3xl">
          <article className="text-base leading-relaxed text-slate-600">
            {post.body.map((block, i) => (
              <ArticleBlock key={i} block={block} />
            ))}
          </article>

          <aside className="mt-12 rounded-2xl border border-gold/30 bg-sand p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-navy-deep">
              Questions about DHA property?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Talk to a registered advisor about buying, selling or checking a
              file before you commit.
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

          {others.length > 0 && (
            <section className="mt-14">
              <h2 className="eyebrow text-gold-ink">More from the blog</h2>
              <ul className="mt-4 space-y-3">
                {others.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="tap group flex items-center justify-between gap-4 border-b border-hairline py-3 text-navy-deep transition-colors hover:text-gold-ink"
                    >
                      <span className="font-display text-lg font-medium">
                        {p.title}
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
        </div>
      </section>
    </>
  );
}
