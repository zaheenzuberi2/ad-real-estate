import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { PropertyArt } from "@/components/ui/PropertyArt";
import { formatPkr } from "@/lib/format";
import { Button } from "@/components/ui/Button";

export function PropertyCard({ property }: { property: Property }) {
  const cover = property.photos?.[0];

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)] transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(11,27,51,0.08),0_28px_50px_-16px_rgba(11,27,51,0.32)]">
      <Link
        href={`/properties/${property.slug}`}
        className="relative block aspect-[4/3] overflow-hidden"
        style={{ background: property.gradient }}
        aria-label={`View ${property.title}`}
      >
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <PropertyArt variant={property.art} />
        )}
        {property.badge && (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide ${
              property.badge.highlight
                ? "bg-gold text-navy-deep"
                : "bg-white/15 text-white backdrop-blur-sm"
            }`}
          >
            {property.badge.text}
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-navy-deep/70 px-3 py-1.5 text-[10px] font-bold tracking-wide text-gold backdrop-blur-sm">
          {property.status}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-gold">{property.eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-navy-deep">
          <Link
            href={`/properties/${property.slug}`}
            className="transition-colors hover:text-navy-mid"
          >
            {property.title}
          </Link>
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500">
          <Icon name="map-pin" className="h-3.5 w-3.5 shrink-0 text-gold" />
          {property.location}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          {property.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {property.features.map((f) => (
            <li
              key={f.label}
              className="flex items-center gap-2.5 text-xs font-medium text-slate-700"
            >
              <Icon name={f.icon} className="h-4 w-4 shrink-0 text-gold" />
              {f.label}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-4 border-t border-hairline pt-5">
          <div>
            <p className="eyebrow text-[9px] text-slate-400">Starting From</p>
            <p className="font-display text-lg font-semibold text-navy-deep">
              {property.priceFrom ? formatPkr(property.priceFrom) : "On Request"}
            </p>
          </div>
          <Button href={`/properties/${property.slug}`} variant="dark" size="sm">
            Details
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
