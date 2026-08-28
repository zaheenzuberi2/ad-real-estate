import Image from "next/image";
import { companyStats } from "@/content/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Story() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Our Story"
            title="Property investment shouldn't feel like a gamble"
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              AD Real Estate started as a small advisory practice in DHA Phase 5,
              Islamabad. What we do has not changed since. We
              shortlist honestly, we verify every title before it reaches a
              client, and we stay involved until possession is complete.
            </p>
            <p>
              We marked our Grand Launch Event in DHA Phase 5 alongside partners
              including Gulf Properties and Fortune, opening the next chapter for
              the firm. We now serve a growing base of clients across Islamabad
              along with overseas Pakistani investors.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {companyStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-gold">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-[11px] leading-snug text-slate-500">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="drift-slow relative order-first aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(6,13,26,0.5)] lg:order-none">
          <Image
            src="/images/adeel-malik.jpg"
            alt="Adeel Malik, Chief Executive Officer of AD Real Estate"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep to-transparent p-6 pt-16">
            <p className="font-display text-xl font-semibold text-white">
              Adeel Malik
            </p>
            <p className="eyebrow mt-1 text-[10px] text-gold">
              Chief Executive Officer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
