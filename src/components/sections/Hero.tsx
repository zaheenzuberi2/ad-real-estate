import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { HeroPlan } from "@/components/ui/HeroPlan";
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
    <section className="relative isolate overflow-hidden bg-navy-deep">
      <AmbientGlow />

      <div className="shell relative z-10 pb-16 pt-14 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-32">
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:items-center lg:gap-14">
          {/* Copy + calls to action */}
          <div className="order-1 max-w-[36rem]">
            <h1 className="font-display text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-white [@media(min-width:400px)]:text-[2.6rem] sm:text-[3.5rem] sm:leading-[1.04] lg:text-[4rem] lg:tracking-[-0.03em]">
              A real estate agency
              <span className="mt-1 block italic font-medium text-gold">
                for DHA, Islamabad-Rawalpindi
              </span>
            </h1>

            <p className="mt-5 max-w-[46ch] text-[0.95rem] leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
              We help you buy, sell and invest in plots, villas and commercial
              property across DHA, Islamabad-Rawalpindi, the capital&apos;s most guarded
              address. Our team handles site visits, title verification and
              transfer of possession for families and overseas investors,
              from the first call to the last signature.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Button href="/properties" size="lg">
                Browse Properties
                <Icon
                  name="arrow-right"
                  className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1"
                />
              </Button>
              <Button
                href={site.whatsapp.href}
                external
                variant="outline"
                size="lg"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                Talk To An Advisor
              </Button>
            </div>

            <div className="mt-7 flex flex-col gap-1.5 text-[0.8rem] text-slate-400 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
              <span className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 font-semibold text-gold">
                  <Icon name="star" className="h-3.5 w-3.5" />
                  {site.rating.value.toFixed(1)}
                </span>
                <span className="text-slate-600" aria-hidden="true">
                  &middot;
                </span>
                <span>{site.rating.count} verified Google reviews</span>
              </span>
              <span className="hidden text-slate-600 sm:inline" aria-hidden="true">
                &middot;
              </span>
              <span>Registered DHA consultants</span>
            </div>
          </div>

          {/* Territory masterplan — right column on desktop, closes the hero on mobile */}
          <div className="order-3 mt-12 w-full sm:mx-auto sm:max-w-md lg:order-2 lg:mx-0 lg:mt-0 lg:max-w-none">
            <HeroPlan />
          </div>

          {/* Search — high on mobile, full-width band on desktop */}
          <div className="order-2 mt-12 sm:mt-14 lg:order-3 lg:col-span-2 lg:mt-16">
            <PropertySearch />
          </div>
        </div>
      </div>
    </section>
  );
}
