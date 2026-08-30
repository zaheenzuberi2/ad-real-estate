import Link from "next/link";
import { logout } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-sand text-navy-deep">
      <header className="border-b border-navy-deep/10 bg-navy-deep text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-5">
            <span className="font-display text-sm font-semibold">
              AD Real Estate
              <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                Admin
              </span>
            </span>
            <nav className="flex gap-1 text-sm">
              <Link
                href="/admin/leads"
                className="rounded-md px-3 py-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Enquiries
              </Link>
              <Link
                href="/admin/listings"
                className="rounded-md px-3 py-1.5 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Listings
              </Link>
            </nav>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
