import { sanityClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import type { GuideBlock } from "@/content/guides";

/**
 * Blog posts live in Sanity (written from /admin/posts). The body is plain
 * text with light markup, parsed here into the same block shape the guides use
 * so one renderer serves both.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO datetime. */
  date: string;
  dateLabel: string;
  modified: string;
  readingTime: string;
  body: GuideBlock[];
};

type SanityPost = {
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  body?: string;
  publishedAt?: string;
  _updatedAt: string;
  _createdAt: string;
};

const FIELDS = `title, "slug": slug.current, excerpt, category, body, publishedAt, _updatedAt, _createdAt`;

/** Blank line = paragraph; `##`/`###` = headings; `- ` bullets; `1. ` numbered. */
export function parseBody(text: string): GuideBlock[] {
  const blocks: GuideBlock[] = [];
  for (const chunk of text.replace(/\r\n/g, "\n").split(/\n{2,}/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    // A heading can sit directly above its first paragraph with no blank line.
    while (lines.length && /^#{2,3}\s+/.test(lines[0])) {
      const m = lines.shift()!.match(/^(#{2,3})\s+(.*)$/)!;
      blocks.push({ type: m[1].length === 2 ? "h2" : "h3", text: m[2].trim() });
    }
    if (lines.length === 0) continue;

    if (lines.every((l) => /^[-*]\s+/.test(l))) {
      blocks.push({ type: "ul", items: lines.map((l) => l.replace(/^[-*]\s+/, "")) });
    } else if (lines.every((l) => /^\d+[.)]\s+/.test(l))) {
      blocks.push({ type: "ol", items: lines.map((l) => l.replace(/^\d+[.)]\s+/, "")) });
    } else {
      blocks.push({ type: "p", text: lines.join(" ") });
    }
  }
  return blocks;
}

function toPost(p: SanityPost): Post {
  const date = p.publishedAt || p._createdAt;
  const body = parseBody(p.body ?? "");
  const words = (p.body ?? "").split(/\s+/).filter(Boolean).length;
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category || "Insights",
    date,
    dateLabel: new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Karachi",
    }),
    modified: p._updatedAt,
    readingTime: `${Math.max(1, Math.round(words / 200))} min read`,
    body,
  };
}

/** Published posts, newest first. Empty when Sanity isn't configured or is unreachable. */
export async function getPosts(): Promise<Post[]> {
  if (!isSanityConfigured) return [];
  try {
    const rows: SanityPost[] = await sanityClient.fetch(
      `*[_type == "post" && published == true && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) { ${FIELDS} }`,
    );
    return rows.map(toPost);
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!isSanityConfigured) return null;
  try {
    const row: SanityPost | null = await sanityClient.fetch(
      `*[_type == "post" && published == true && slug.current == $slug][0] { ${FIELDS} }`,
      { slug },
    );
    return row ? toPost(row) : null;
  } catch {
    return null;
  }
}
