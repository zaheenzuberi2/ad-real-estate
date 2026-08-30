import { getProperties } from "@/lib/properties-data";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export async function FeaturedProjects() {
  const properties = await getProperties();
  const featured = properties.filter((p) => p.featured);

  return (
    <section className="bg-ivory py-16 sm:py-24 lg:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Signature Developments"
            title="Featured Projects"
            intro="A selection of the developments our team has personally vetted for title clarity, location and long-term value."
          />
          <Button href="/properties" variant="ghost" size="md">
            View All Projects
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 3) * 90}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
