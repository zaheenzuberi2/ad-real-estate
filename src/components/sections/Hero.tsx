import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { SurveyLight } from "@/components/ui/SurveyLight";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { PropertySearch } from "@/components/sections/PropertySearch";

/**
 * Deliberately un-revealed: this is the first thing on the page, already in
 * view at scroll position 0. Fading it in on a timer only delays the one
 * thing a visitor arrives to read, and briefly renders as a wall of near-
 * invisible text on every single load. Reveal-on-scroll belongs to content
 * the visitor scrolls to, not the content already in front of them.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <AmbientGlow />
      <SurveyLight />

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
            <Icon
              name="arrow-right"
              className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1"
            />
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
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-navy-deep/80 px-5 py-4 sm:px-6 sm:py-5"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  className={`block font-display text-xl font-semibold leading-tight text-gold drift sm:text-2xl ${
                    i === 1 ? "drift-delay-1" : i === 2 ? "drift-delay-2" : ""
                  }`}
                >
                  {stat.value}
                </span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <PropertySearch />
        </div>
      </div>
    </section>
  );
}
