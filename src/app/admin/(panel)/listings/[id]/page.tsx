import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdminProperty,
  PROPERTY_STATUSES,
  FEATURE_ICONS,
} from "@/lib/admin-data";
import { phases } from "@/content/site-content";
import { propertyTypes } from "@/content/properties";
import {
  saveListing,
  deleteListing,
  uploadListingPhotos,
  deleteListingPhoto,
  updatePhotoAlt,
} from "@/app/admin/actions";
import { ConfirmButton } from "@/app/admin/(panel)/ConfirmButton";

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

export default async function ListingEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";
  const p = isNew ? null : await getAdminProperty(decodeURIComponent(id));
  if (!isNew && !p) notFound();

  return (
    <div>
      <Link
        href="/admin/listings"
        className="text-sm text-slate-500 transition-colors hover:text-navy-deep"
      >
        ← All listings
      </Link>
      <h1 className="mt-3 font-display text-2xl font-semibold">
        {isNew ? "New listing" : `Edit ${p?.title}`}
      </h1>

      <form action={saveListing} className="mt-6 space-y-5">
        {!isNew && <input type="hidden" name="id" value={p!._id} />}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Project name">
            <input name="title" defaultValue={p?.title ?? ""} required className={inputCls} />
          </Field>
          <Field
            label="URL slug"
            hint={isNew ? "e.g. dha-phase-5-6-plots" : "changing this makes a new page"}
          >
            <input
              name="slug"
              defaultValue={p?.slug ?? ""}
              required
              pattern="[a-z0-9\-]+"
              className={inputCls}
            />
          </Field>
          <Field label="Category label" hint='shown above the title, e.g. "Luxury Villas"'>
            <input name="eyebrow" defaultValue={p?.eyebrow ?? ""} className={inputCls} />
          </Field>
          <Field label="Address line">
            <input name="location" defaultValue={p?.location ?? ""} className={inputCls} />
          </Field>
          <Field label="Phase / sector">
            <select name="phase" defaultValue={p?.phase ?? ""} className={inputCls}>
              <option value="">Select a phase</option>
              {phases.map((ph) => (
                <option key={ph} value={ph}>
                  {ph}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Property type">
            <select
              name="propertyType"
              defaultValue={p?.propertyType ?? ""}
              className={inputCls}
            >
              <option value="">Select a type</option>
              {propertyTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Availability">
            <select
              name="status"
              defaultValue={p?.status ?? "Available"}
              className={inputCls}
            >
              {PROPERTY_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Sort order" hint="lower shows first">
            <input
              name="order"
              type="number"
              defaultValue={p?.order ?? 100}
              className={inputCls}
            />
          </Field>
          <Field label="Starting price (PKR)" hint="plain number, blank = On Request">
            <input
              name="priceFrom"
              inputMode="numeric"
              defaultValue={p?.priceFrom ?? ""}
              className={inputCls}
            />
          </Field>
          <Field label="Installment tenure (months)" hint="blank if not on installments">
            <input
              name="installmentMonths"
              type="number"
              defaultValue={p?.installmentMonths ?? ""}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Price note">
          <input name="priceNote" defaultValue={p?.priceNote ?? ""} className={inputCls} />
        </Field>

        <Field label="Short description" hint="cards + Google, ~150 chars">
          <textarea
            name="description"
            defaultValue={p?.description ?? ""}
            rows={2}
            className={inputCls}
          />
        </Field>

        <Field label="Full overview" hint="one paragraph per line">
          <textarea
            name="overview"
            defaultValue={(p?.overview ?? []).join("\n")}
            rows={5}
            className={inputCls}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Available sizes" hint="comma or line separated">
            <textarea
              name="sizes"
              defaultValue={(p?.sizes ?? []).join("\n")}
              rows={3}
              className={inputCls}
            />
          </Field>
          <Field label="Selling points" hint="one per line">
            <textarea
              name="highlights"
              defaultValue={(p?.highlights ?? []).join("\n")}
              rows={3}
              className={inputCls}
            />
          </Field>
        </div>

        <Field
          label="Key features"
          hint={`one per line as "icon | label". Icons: ${FEATURE_ICONS.join(", ")}`}
        >
          <textarea
            name="features"
            defaultValue={(p?.features ?? [])
              .map((f) => `${f.icon} | ${f.label}`)
              .join("\n")}
            rows={3}
            className={inputCls}
          />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={p?.featured ?? false}
            className="h-4 w-4 accent-navy"
          />
          Show on homepage
        </label>

        <div className="flex flex-wrap gap-3 border-t border-navy-deep/10 pt-5">
          <button
            type="submit"
            className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-mid"
          >
            {isNew ? "Create listing" : "Save changes"}
          </button>
          <Link
            href="/admin/listings"
            className="rounded-lg border border-navy-deep/15 px-5 py-2.5 text-sm font-semibold text-navy-deep transition-colors hover:bg-sand"
          >
            Cancel
          </Link>
        </div>
      </form>

      {!isNew && p && (
        <section className="mt-10 border-t border-navy-deep/10 pt-8">
          <h2 className="font-display text-lg font-semibold">Photos</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {(p.images ?? []).map((img) => (
              <div
                key={img._key}
                className="overflow-hidden rounded-xl border border-navy-deep/10 bg-white"
              >
                {img.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${img.url}?w=640&h=420&fit=crop&auto=format`}
                    alt={img.alt ?? ""}
                    className="aspect-[3/2] w-full object-cover"
                  />
                )}
                <div className="space-y-2 p-3">
                  <form action={updatePhotoAlt} className="flex gap-2">
                    <input type="hidden" name="id" value={p._id} />
                    <input type="hidden" name="key" value={img._key} />
                    <input
                      name="alt"
                      defaultValue={img.alt ?? ""}
                      placeholder="Describe this photo"
                      className="flex-1 rounded-md border border-hairline bg-sand px-2 py-1.5 text-xs"
                    />
                    <button
                      type="submit"
                      className="rounded-md border border-navy-deep/15 px-2.5 py-1.5 text-xs font-semibold"
                    >
                      Save
                    </button>
                  </form>
                  <form action={deleteListingPhoto}>
                    <input type="hidden" name="id" value={p._id} />
                    <input type="hidden" name="key" value={img._key} />
                    <ConfirmButton
                      message="Remove this photo?"
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Remove photo
                    </ConfirmButton>
                  </form>
                </div>
              </div>
            ))}
          </div>

          <form
            action={uploadListingPhotos}
            className="mt-5 rounded-xl border border-dashed border-navy-deep/20 bg-white p-4"
          >
            <input type="hidden" name="id" value={p._id} />
            <label className={labelCls}>Add photos</label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              required
              className="mt-2 block w-full text-sm"
            />
            <button
              type="submit"
              className="mt-3 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-mid"
            >
              Upload
            </button>
          </form>
        </section>
      )}

      {!isNew && p && (
        <section className="mt-10 border-t border-red-200 pt-6">
          <form action={deleteListing}>
            <input type="hidden" name="id" value={p._id} />
            <input type="hidden" name="slug" value={p.slug ?? ""} />
            <ConfirmButton
              message={`Delete "${p.title}" for good? It will be removed from the website.`}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              Delete this listing
            </ConfirmButton>
          </form>
        </section>
      )}
    </div>
  );
}
