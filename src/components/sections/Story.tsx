import Image from "next/image";
import { companyStats } from "@/content/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Story() {
  return (
    <section className="bg-white py-14 sm:py-24 lg:py-28">
      <div className="shell grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="Our Story"
            title="Property investment shouldn't feel like a gamble"
          />
          <div className="mt-5 space-y-3 text-[0.9rem] leading-relaxed text-slate-600 sm:mt-6 sm:space-y-4 sm:text-base">
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

          <dl className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-6">
            {companyStats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-hairline p-3 sm:border-0 sm:p-0"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-semibold text-gold sm:text-3xl">
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

        <div className="relative order-first mx-auto aspect-[4/5] w-full max-w-[230px] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(6,13,26,0.5)] sm:max-w-[280px] lg:order-none lg:mx-0 lg:max-w-none">
          <Image
            src="/images/adeel-malik.jpg"
            alt="Adeel Malik, Chief Executive Officer of AD Real Estate"
            fill
            sizes="(max-width: 1024px) 280px, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
