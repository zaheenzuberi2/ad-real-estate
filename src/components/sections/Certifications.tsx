import Image from "next/image";
import { certifications } from "@/content/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

export function Certifications() {
  return (
    <section className="bg-navy-deep py-14 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Verified & Recognised"
          title="Certifications & Recognition"
          intro="All displayed at our DHA Phase 5 office, from our government registration to industry recognition earned over the years."
          tone="dark"
        />

        <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <figure>
            <div className="overflow-hidden rounded-2xl border border-gold/20">
              <Image
                src="/images/certificates.jpg"
                alt="Framed certificates and awards displayed at the AD Real Estate office in DHA Phase 5, Islamabad"
                width={800}
                height={600}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-slate-500">
              Original certificates on display at our Islamabad office
            </figcaption>
          </figure>

          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-1">
            {certifications.map((c) => (
              <li
                key={c.title}
                className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-5 lg:flex-row lg:items-start lg:gap-3.5"
              >
                <Icon
                  name="award"
                  className="h-[18px] w-[18px] shrink-0 text-gold sm:h-5 sm:w-5 lg:mt-0.5"
                />
                <div className="mt-2 lg:mt-0">
                  <h3 className="font-display text-[0.8rem] font-semibold leading-snug text-white sm:text-base">
                    {c.title}
                  </h3>
                  <p className="eyebrow mt-1 text-[8px] text-gold sm:text-[9px]">
                    {c.issuer}
                  </p>
                  <p className="mt-2 hidden text-sm leading-relaxed text-slate-400 lg:block">
                    {c.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
