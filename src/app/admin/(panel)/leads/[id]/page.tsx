import Link from "next/link";
import { notFound } from "next/navigation";
import { getLead, LEAD_STATUSES } from "@/lib/admin-data";
import { updateLead } from "@/app/admin/actions";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 py-2 text-sm">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-navy-deep">{children}</dd>
    </div>
  );
}

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await getLead(decodeURIComponent(id));
  if (!lead) notFound();

  const digits = (lead.whatsapp ?? "").replace(/\D/g, "");
  const received = lead.submittedAt
    ? new Date(lead.submittedAt).toLocaleString("en-PK")
    : "—";

  return (
    <div>
      <Link
        href="/admin/leads"
        className="text-sm text-slate-500 transition-colors hover:text-navy-deep"
      >
        ← All enquiries
      </Link>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-semibold">
          {lead.name || "Unknown"}
        </h1>
        <span className="rounded bg-navy-deep/5 px-2 py-0.5 text-xs font-semibold text-slate-500">
          {lead.channel ?? "Website form"}
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="rounded-xl border border-navy-deep/10 bg-white p-5">
          <dl className="divide-y divide-navy-deep/5">
            <Row label="WhatsApp">
              {lead.whatsapp && (
                <a
                  href={`https://wa.me/${digits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy underline underline-offset-2"
                >
                  {lead.whatsapp}
                </a>
              )}
            </Row>
            <Row label="Email">
              {lead.email && (
                <a
                  href={`mailto:${lead.email}`}
                  className="text-navy underline underline-offset-2"
                >
                  {lead.email}
                </a>
              )}
            </Row>
            <Row label="Looking to">{lead.intent}</Row>
            <Row label="Interest">{lead.project}</Row>
            <Row label="Budget">{lead.budget}</Row>
            <Row label="Area">{lead.area}</Row>
            <Row label="Features">{lead.features}</Row>
            <Row label="Timeframe">{lead.timeline}</Row>
            <Row label="Message">
              {lead.message && (
                <span className="whitespace-pre-wrap">{lead.message}</span>
              )}
            </Row>
            <Row label="Received">{received}</Row>
            <Row label="From page">{lead.sourcePage}</Row>
          </dl>
        </div>

        <form
          action={updateLead}
          className="h-fit rounded-xl border border-navy-deep/10 bg-white p-5"
        >
          <input type="hidden" name="id" value={lead._id} />

          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Status
          </label>
          <select
            name="status"
            defaultValue={lead.status ?? "new"}
            className="mt-2 w-full rounded-lg border border-hairline bg-sand px-3 py-2 text-sm focus:border-gold focus:outline-none"
          >
            {LEAD_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Assigned advisor
          </label>
          <input
            name="assignedTo"
            defaultValue={lead.assignedTo ?? ""}
            className="mt-2 w-full rounded-lg border border-hairline bg-sand px-3 py-2 text-sm focus:border-gold focus:outline-none"
          />

          <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Internal notes
          </label>
          <textarea
            name="notes"
            defaultValue={lead.notes ?? ""}
            rows={5}
            className="mt-2 w-full rounded-lg border border-hairline bg-sand px-3 py-2 text-sm focus:border-gold focus:outline-none"
          />

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-mid"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
