import { faqs } from "@/content/faqs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

export function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="bg-ivory py-16 sm:py-24 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="shell max-w-3xl">
        <SectionHeading
          eyebrow="Frequently Asked"
          title="Common Questions"
          align="center"
        />

        <div className="mt-12 divide-y divide-hairline border-y border-hairline">
          {faqs.map((f) => (
            <details key={f.q} className="group py-2">
              <summary className="tap flex cursor-pointer list-none items-center justify-between gap-4 py-3 text-left">
                <h3 className="font-display text-lg font-medium text-navy-deep">
                  {f.q}
                </h3>
                <Icon
                  name="chevron-down"
                  className="h-5 w-5 shrink-0 text-gold transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mb-3 mt-1 pr-6 text-sm leading-relaxed text-slate-600 sm:pr-10">
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          This is general information. For anything specific to your
          transaction, please confirm the details with your advisor.
        </p>
      </div>
    </section>
  );
}
