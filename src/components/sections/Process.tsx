import { processSteps } from "@/content/site-content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section className="bg-navy-deep py-14 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="How It Works"
          title="From First Call To Possession"
          align="center"
          tone="dark"
        />

        <ol className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-14 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 50}
              className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:border-0 sm:bg-transparent sm:p-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/10 sm:h-12 sm:w-12 sm:rounded-xl">
                <Icon name={step.icon} className="h-[18px] w-[18px] text-gold sm:h-5 sm:w-5" />
              </div>
              <p className="eyebrow mt-3.5 text-[9px] text-gold sm:mt-5 sm:text-[10px]">
                Step {i + 1}
              </p>
              <h3 className="mt-1.5 font-display text-base font-semibold text-white sm:mt-2 sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-400 sm:mt-3 sm:text-sm">
                {step.desc}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
