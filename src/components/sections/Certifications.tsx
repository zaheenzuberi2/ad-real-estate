import Image from "next/image";
import { certifications } from "@/content/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

export function Certifications() {
  return (
    <section className="bg-navy-deep py-16 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Verified & Recognised"
          title="Certifications & Recognition"
          intro="All displayed at our DHA Phase 5 office, from our government registration to industry recognition earned over the years."
          tone="dark"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
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

          <ul className="space-y-4">
            {certifications.map((c) => (
              <li
                key={c.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-start gap-3.5">
                  <Icon name="award" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {c.title}
                    </h3>
                    <p className="eyebrow mt-1 text-[9px] text-gold">
                      {c.issuer}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                      {c.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
