import { defineField, defineType } from "sanity";

/**
 * Blog posts. Written in the admin panel (/admin/posts); the Studio can also
 * edit them. The body is plain text with light markup — see src/lib/blog-data.ts.
 */
export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      description: "Shown on the blog list and as the Google description. Aim for under 160 characters.",
      validation: (r) => r.required().max(300),
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "text",
      rows: 24,
      description:
        "Blank line between paragraphs. Start a line with ## for a heading, ### for a sub-heading, - for bullets, 1. for a numbered list.",
    }),
    defineField({ name: "publishedAt", title: "Publish Date", type: "datetime" }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
      description: "Off keeps the post as a draft, hidden from the site.",
    }),
  ],
  orderings: [
    { title: "Newest first", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
