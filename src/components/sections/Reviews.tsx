import { reviews } from "@/content/reviews";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Reviews() {
  return (
    <section className="bg-sand py-16 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Client Feedback" title="What Our Clients Say" />
          <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3">
            <span className="font-display text-2xl font-semibold text-navy-deep">
              {site.rating.value.toFixed(1)}
            </span>
            <span className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" className="h-4 w-4 text-gold" filled />
              ))}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {site.rating.count} Google Reviews
            </span>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal as="li"
              key={r.name + r.meta} delay={i * 90}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)]"
            >
              <Icon name="quote" className="h-7 w-7 text-gold/40" filled />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                {r.text}
                {r.truncated && <span className="text-slate-400"> …</span>}
              </blockquote>
              <footer className="mt-6 border-t border-hairline pt-4">
                <p className="text-sm font-bold text-navy-deep">{r.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{r.meta}</p>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
