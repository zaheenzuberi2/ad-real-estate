import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { LogoMark } from "@/components/ui/Logo";
import { site } from "@/lib/site";

/**
 * The real Hero content, laid over the reference-matched background from the
 * background-only prototype: near-black ground, orange glow top-left, blue
 * glow bottom-right brightening to a near-white corner, heavy visible grain.
 * Still isolated here, not wired into the live Hero.
 */
export const metadata = { robots: { index: false, follow: false } };

export default function ColorPrototype() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 4% -4%, #FF6E42 0%, #a8391a 22%, #2a1006 42%, transparent 62%)," +
            "radial-gradient(ellipse 55% 50% at 100% 108%, #ffffff 0%, #cfe9f7 8%, #3f96c2 26%, #0c3d55 46%, transparent 68%)," +
            "linear-gradient(160deg, #05070a 0%, #030405 60%, #000000 100%)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 0.9,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='linear' slope='1.6' intercept='0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          opacity: 0.6,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Watermark: the mark itself as a large, faint background presence,
          not a duplicate of the header logo. Bleeds off the top-right edge,
          sits behind all copy, and never intercepts clicks. */}
      <LogoMark
        size={120}
        className="pointer-events-none absolute -right-24 -top-24 h-auto w-[420px] opacity-[0.08] sm:-right-28 sm:-top-28 sm:w-[600px] lg:-right-32 lg:-top-32 lg:w-[780px]"
      />

      <div className="shell relative pb-14 pt-14 sm:pb-16 sm:pt-24 lg:pt-28">
        <p className="eyebrow flex items-center gap-3 text-gold">
          <span className="h-px w-8 shrink-0 bg-gold/50 sm:w-10" />
          Elite Property Advisory, Islamabad
        </p>

        <h1 className="mt-5 max-w-4xl font-display text-[2.1rem] font-medium leading-[1.1] text-white sm:mt-6 sm:text-6xl lg:text-7xl">
          Your foothold in{" "}
          <span className="italic text-gold">DHA &amp; Bahria Town</span>
        </h1>

        <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-slate-300 sm:mt-7 sm:text-lg">
          Islamabad&apos;s two most guarded addresses, navigated for you by a
          team that has handled site visits, title verification and transfer
          of possession for families and overseas investors from the first
          call to the last signature.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
          <Button href="/properties" size="lg">
            Browse Properties
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
          <Button href={site.whatsapp.href} external variant="outline" size="lg">
            <WhatsAppGlyph className="h-4 w-4" />
            Talk To An Advisor
          </Button>
        </div>

        <dl className="mt-10 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl bg-gold/20 sm:mt-14 sm:grid-cols-3">
          {[
            {
              value: `${site.rating.count}`,
              label: `Verified ${site.rating.value.toFixed(1)} star reviews`,
            },
            { value: "DHA & Bahria", label: "Registered consultants" },
            { value: "Phase 1 to 9", label: "Full coverage" },
          ].map((stat) => (
            <div key={stat.label} className="bg-black/50 px-5 py-4 sm:px-6 sm:py-5">
              <dd>
                <span className="block font-display text-xl font-semibold leading-tight text-gold sm:text-2xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
