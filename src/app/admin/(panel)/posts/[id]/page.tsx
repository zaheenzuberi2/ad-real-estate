import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminPost } from "@/lib/admin-data";
import { savePost } from "@/app/admin/actions";

const inputCls =
  "mt-1.5 w-full rounded-lg border border-hairline bg-sand px-3 py-2 text-sm text-navy-deep focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
const labelCls =
  "text-xs font-semibold uppercase tracking-[0.13em] text-slate-500";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {hint && <span className="ml-2 text-[11px] text-slate-400">{hint}</span>}
      {children}
    </label>
  );
}

export default async function PostEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const p = isNew ? null : await getAdminPost(decodeURIComponent(id));
  if (!isNew && !p) notFound();

  const dateValue = p?.publishedAt
    ? new Date(p.publishedAt).toLocaleDateString("en-CA", { timeZone: "Asia/Karachi" })
    : "";

  return (
    <div>
      <Link
        href="/admin/posts"
        className="text-sm text-slate-500 transition-colors hover:text-navy-deep"
      >
        ← All posts
      </Link>
      <h1 className="mt-3 font-display text-2xl font-semibold">
        {isNew ? "New post" : `Edit ${p?.title}`}
      </h1>

      <form action={savePost} className="mt-6 space-y-5">
        {!isNew && <input type="hidden" name="id" value={p!._id} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Title">
            <input name="title" defaultValue={p?.title ?? ""} required className={inputCls} />
          </Field>
          <Field
            label="URL slug"
            hint={isNew ? "e.g. dha-plot-prices-explained" : "changing this makes a new page"}
          >
            <input
              name="slug"
              defaultValue={p?.slug ?? ""}
              required
              pattern="[a-z0-9\-]+"
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category" hint="e.g. Market update, Buying advice">
            <input name="category" defaultValue={p?.category ?? ""} className={inputCls} />
          </Field>
          <Field label="Publish date" hint="blank = today when published">
            <input name="publishedAt" type="date" defaultValue={dateValue} className={inputCls} />
          </Field>
        </div>

        <Field label="Summary" hint="shown on the list and in Google, under 160 characters">
          <textarea
            name="excerpt"
            defaultValue={p?.excerpt ?? ""}
            rows={2}
            maxLength={300}
            required
            className={inputCls}
          />
        </Field>

        <Field
          label="Post text"
          hint="blank line between paragraphs · ## heading · ### sub-heading · - bullet · 1. numbered"
        >
          <textarea
            name="body"
            defaultValue={p?.body ?? ""}
            rows={22}
            className={`${inputCls} font-mono leading-relaxed`}
          />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="published"
            defaultChecked={p?.published ?? false}
            className="h-4 w-4 accent-navy"
          />
          Published (untick to keep it as a draft)
        </label>

        <div className="flex flex-wrap gap-3 border-t border-navy-deep/10 pt-5">
          <button
            type="submit"
            className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-mid"
          >
            {isNew ? "Create post" : "Save changes"}
          </button>
          <Link
            href="/admin/posts"
            className="rounded-lg border border-navy-deep/15 px-5 py-2.5 text-sm font-semibold text-navy-deep transition-colors hover:bg-sand"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
