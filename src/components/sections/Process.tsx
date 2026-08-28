import { processSteps } from "@/content/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section className="bg-navy-deep py-16 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="How It Works"
          title="From First Call To Possession"
          align="center"
          tone="dark"
        />

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
                <Icon name={step.icon} className="h-5 w-5 text-gold" />
              </div>
              <p className="eyebrow mt-5 text-[10px] text-gold">Step {i + 1}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
