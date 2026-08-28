import { team } from "@/content/team";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamCard } from "@/components/ui/TeamCard";

export function Team() {
  return (
    <section className="bg-ivory py-16 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="The People Behind AD Real Estate"
          title="Leadership Team"
          intro="Tap a card for direct contact details. Every advisor here has personally walked clients through site visits, verification, and possession."
        />

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {team.map((m, i) => (
            <TeamCard key={m.name} member={m} priority={i === 0} />
          ))}
        </ul>
      </div>
    </section>
  );
}
