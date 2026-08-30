import Link from "next/link";
import { getAdminProperties } from "@/lib/admin-data";
import { deleteListing } from "@/app/admin/actions";
import { ConfirmButton } from "@/app/admin/(panel)/ConfirmButton";

export default async function ListingsPage() {
  const properties = await getAdminProperties();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold">Listings</h1>
        <Link
          href="/admin/listings/new"
          className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-mid"
        >
          + New listing
        </Link>
      </div>

      <ul className="mt-6 divide-y divide-navy-deep/10 overflow-hidden rounded-xl border border-navy-deep/10 bg-white">
        {properties.map((p) => (
          <li
            key={p._id}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5"
          >
            <span className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-sand">
              {p.images?.[0]?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${p.images[0].url}?w=128&h=96&fit=crop&auto=format`}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{p.title}</span>
              <span className="block truncate text-xs text-slate-500">
                {[p.phase, p.propertyType, p.status].filter(Boolean).join(" · ")}
                {p.featured ? " · on homepage" : ""}
              </span>
            </span>
            <Link
              href={`/admin/listings/${encodeURIComponent(p._id)}`}
              className="rounded-md border border-navy-deep/15 px-3 py-1.5 text-xs font-semibold text-navy-deep transition-colors hover:bg-sand"
            >
              Edit
            </Link>
            <form action={deleteListing}>
              <input type="hidden" name="id" value={p._id} />
              <input type="hidden" name="slug" value={p.slug ?? ""} />
              <ConfirmButton
                message={`Delete "${p.title}"? This removes the listing from the site.`}
                className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                Delete
              </ConfirmButton>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
