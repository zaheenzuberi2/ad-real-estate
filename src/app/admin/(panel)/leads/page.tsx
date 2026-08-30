import Link from "next/link";
import { getLeads, LEAD_STATUSES } from "@/lib/admin-data";

const statusLabel = (v?: string) =>
  LEAD_STATUSES.find((s) => s.value === v)?.label ?? "New";

const statusClass = (v?: string) =>
  ({
    new: "bg-gold/20 text-navy-deep",
    contacted: "bg-blue-100 text-blue-800",
    visit: "bg-amber-100 text-amber-800",
    won: "bg-green-100 text-green-800",
    closed: "bg-slate-200 text-slate-600",
  })[v ?? "new"] ?? "bg-gold/20 text-navy-deep";

function fmt(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-PK", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function LeadsPage() {
  const leads = await getLeads();
  const fresh = leads.filter((l) => (l.status ?? "new") === "new").length;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold">Enquiries</h1>
        <p className="text-sm text-slate-500">
          {leads.length} total{fresh ? ` · ${fresh} new` : ""}
        </p>
      </div>

      {leads.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-navy-deep/15 bg-white p-8 text-center text-sm text-slate-500">
          No enquiries yet. They arrive here from the contact form and the chat
          assistant.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-navy-deep/10 overflow-hidden rounded-xl border border-navy-deep/10 bg-white">
          {leads.map((l) => (
            <li key={l._id}>
              <Link
                href={`/admin/leads/${encodeURIComponent(l._id)}`}
                className="flex flex-col gap-1 px-4 py-3.5 transition-colors hover:bg-sand/60 sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="flex min-w-0 flex-1 items-center gap-2.5">
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusClass(
                      l.status,
                    )}`}
                  >
                    {statusLabel(l.status)}
                  </span>
                  <span className="truncate font-semibold">
                    {l.name || "Unknown"}
                  </span>
                  {l.channel === "Chat assistant" && (
                    <span className="shrink-0 rounded bg-navy-deep/5 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                      Chat
                    </span>
                  )}
                </span>
                <span className="truncate text-sm text-slate-500 sm:max-w-[40%]">
                  {[l.intent || l.project, l.budget, l.area]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
                <span className="shrink-0 text-xs text-slate-400">
                  {fmt(l.submittedAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
