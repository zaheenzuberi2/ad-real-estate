import { reviews } from "@/content/reviews";
import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

const slug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * The testimonials scroll past in one continuous marquee. Each review appears
 * TWICE on purpose: the track holds the full set followed by an identical,
 * `aria-hidden` clone, and the CSS animation shifts it by exactly -50%. When
 * the clone reaches where the original started, the transform snaps back with
 * nothing to see — that is what makes the loop seamless. Removing the second
 * copy would make the row visibly jump on every cycle.
 *
 * Keys are derived from the review's own content (name + position) so they are
 * unique and STABLE across renders. Never key with the array index, nor with
 * `Math.random()` / `crypto.randomUUID()` generated inside `.map()` — a key
 * that changes every render forces React to throw away and rebuild every node.
 */
export function Reviews() {
  const base = reviews.map((review, index) => ({
    review,
    id: `${slug(review.name)}-${index}`,
  }));

  const track = [
    ...base.map((item) => ({ ...item, key: item.id, clone: false })),
    ...base.map((item) => ({ ...item, key: `${item.id}--loop`, clone: true })),
  ];

  return (
    <section className="overflow-hidden bg-sand py-14 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading eyebrow="Client Feedback" title="What Our Clients Say" />
          <div className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 sm:gap-3 sm:px-5 sm:py-3">
            <span className="font-display text-xl font-semibold text-navy-deep sm:text-2xl">
              {site.rating.value.toFixed(1)}
            </span>
            <span className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={`star-${i}`}
                  name="star"
                  className="h-3.5 w-3.5 text-gold sm:h-4 sm:w-4"
                  filled
                />
              ))}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 sm:text-xs">
              {site.rating.count} Google Reviews
            </span>
          </div>
        </div>
      </div>

      <div
        className="marquee-wrap group mt-8 overflow-x-auto sm:mt-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0, #000 5%, #000 95%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0, #000 5%, #000 95%, transparent 100%)",
        }}
      >
        <ul
          className="marquee-track flex w-max gap-5 px-5 sm:px-8"
          style={{ animationDuration: "90s" }}
        >
          {track.map(({ review, key, clone }) => (
            <li
              key={key}
              aria-hidden={clone || undefined}
              className="flex w-[290px] shrink-0 flex-col rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(11,27,51,0.06),0_16px_34px_-16px_rgba(11,27,51,0.24)] sm:w-[350px] sm:p-6"
            >
              <Icon name="quote" className="h-6 w-6 text-gold/40 sm:h-7 sm:w-7" filled />
              <blockquote className="mt-3 line-clamp-6 flex-1 text-[0.85rem] leading-relaxed text-slate-700 sm:mt-4 sm:text-sm">
                {review.text}
                {review.truncated && <span className="text-slate-500"> …</span>}
              </blockquote>
              <footer className="mt-5 border-t border-hairline pt-3.5 sm:mt-6 sm:pt-4">
                <p className="text-sm font-bold text-navy-deep">{review.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{review.meta}</p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
