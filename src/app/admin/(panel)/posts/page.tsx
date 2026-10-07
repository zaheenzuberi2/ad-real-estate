import Link from "next/link";
import { getAdminPosts } from "@/lib/admin-data";
import { deletePost } from "@/app/admin/actions";
import { ConfirmButton } from "@/app/admin/(panel)/ConfirmButton";

export default async function PostsPage() {
  const posts = await getAdminPosts();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold">Blog posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-mid"
        >
          + New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
          No posts yet. Write the first one with “New post”.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-navy-deep/10 overflow-hidden rounded-xl border border-navy-deep/10 bg-white">
          {posts.map((p) => (
            <li
              key={p._id}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">{p.title}</span>
                <span className="block truncate text-xs text-slate-500">
                  {p.published ? "Published" : "Draft"}
                  {p.category ? ` · ${p.category}` : ""}
                  {p.publishedAt
                    ? ` · ${new Date(p.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Karachi" })}`
                    : ""}
                </span>
              </span>
              {p.published && p.slug && (
                <Link
                  href={`/blog/${p.slug}`}
                  target="_blank"
                  className="rounded-md border border-navy-deep/15 px-3 py-1.5 text-xs font-semibold text-navy-deep transition-colors hover:bg-sand"
                >
                  View
                </Link>
              )}
              <Link
                href={`/admin/posts/${encodeURIComponent(p._id)}`}
                className="rounded-md border border-navy-deep/15 px-3 py-1.5 text-xs font-semibold text-navy-deep transition-colors hover:bg-sand"
              >
                Edit
              </Link>
              <form action={deletePost}>
                <input type="hidden" name="id" value={p._id} />
                <input type="hidden" name="slug" value={p.slug ?? ""} />
                <ConfirmButton
                  message={`Delete "${p.title}"? This removes the post from the site.`}
                  className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  Delete
                </ConfirmButton>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
