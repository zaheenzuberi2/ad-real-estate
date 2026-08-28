import { LogoMark, LogoLockup } from "@/components/ui/Logo";

/**
 * Internal contrast check for the mark. Not linked from anywhere and excluded
 * from the sitemap; delete once the logo is signed off.
 */
export const metadata = { robots: { index: false, follow: false } };

const grounds = [
  { name: "Navy deep (header, footer)", bg: "#060D1A", tone: "onDark" as const },
  { name: "Navy mid", bg: "#13294B", tone: "onDark" as const },
  { name: "Ivory (page)", bg: "#FBFAF7", tone: "onLight" as const },
  { name: "Sand (alt sections)", bg: "#F3EDE0", tone: "onLight" as const },
  { name: "White (cards)", bg: "#FFFFFF", tone: "onLight" as const },
  { name: "Gold (inverse test)", bg: "#C6A15B", tone: "onLight" as const },
];

export default function LogoCheck() {
  return (
    <div className="shell py-16">
      <h1 className="font-display text-3xl font-medium text-navy-deep">
        Logo on every ground
      </h1>
      <p className="mt-3 max-w-xl text-sm text-slate-600">
        The counter is knocked out of the path, so whatever sits behind the mark
        shows through it. Check that the peaks stay legible on each surface.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {grounds.map((g) => (
          <div key={g.name} className="overflow-hidden rounded-2xl">
            <div
              className="flex flex-col items-center justify-center gap-6 p-10"
              style={{ background: g.bg }}
            >
              <LogoMark size={64} />
              <LogoLockup tone={g.tone} className="w-40" />
            </div>
            <p className="bg-white px-4 py-3 text-xs font-semibold text-navy-deep">
              {g.name}
              <span className="ml-2 font-normal text-slate-400">{g.bg}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold text-navy-deep">
          Small sizes
        </h2>
        <div
          className="mt-4 flex flex-wrap items-end gap-8 rounded-2xl p-8"
          style={{ background: "#060D1A" }}
        >
          {[16, 20, 24, 32, 40, 56, 80].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <LogoMark size={s} />
              <span className="text-[10px] text-slate-400">{s}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
