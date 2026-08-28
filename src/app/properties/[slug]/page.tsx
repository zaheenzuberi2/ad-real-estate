import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProperties, getProperty } from "@/lib/properties-data";
import { site, fullAddress } from "@/lib/site";
import { formatPkr } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { PropertyArt } from "@/components/ui/PropertyArt";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { ContactForm } from "@/components/sections/ContactForm";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const property = await getProperty(slug);
  if (!property) return {};

  const title = `${property.title}: ${property.propertyType} in ${property.phase}`;

  return {
    title,
    description: property.description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      type: "article",
      title,
      description: property.description,
      url: `${site.url}/properties/${property.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: property.description,
    },
  };
}

export default async function PropertyPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const properties = await getProperties();
  const others = properties.filter((p) => p.slug !== property.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: property.title,
    description: property.description,
    url: `${site.url}/properties/${property.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
      streetAddress: property.location,
    },
    ...(property.priceFrom && {
      offers: {
        "@type": "Offer",
        price: property.priceFrom,
        priceCurrency: "PKR",
        availability:
          property.status === "Sold Out"
            ? "https://schema.org/SoldOut"
            : "https://schema.org/InStock",
        seller: { "@id": `${site.url}/#organization` },
      },
    }),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Properties",
        item: `${site.url}/properties`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: property.title,
        item: `${site.url}/properties/${property.slug}`,
      },
    ],
  };

  const enquiryText = encodeURIComponent(
    `Hi, I'd like more information about ${property.title} (${property.location}).`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="relative overflow-hidden" style={{ background: property.gradient }}>
        {property.photos?.[0] ? (
          <>
            <Image
              src={property.photos[0].url}
              alt={property.photos[0].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/70" />
          </>
        ) : (
          <PropertyArt variant={property.art} />
        )}
        <div className="shell relative py-12 sm:py-20 lg:py-24">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/properties" className="transition-colors hover:text-gold">
                  Properties
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gold">{property.title}</li>
            </ol>
          </nav>

          <div className="flex flex-wrap gap-2.5">
            <span className="rounded-full bg-gold px-3.5 py-1.5 text-[10px] font-bold tracking-wide text-navy-deep">
              {property.status}
            </span>
            {property.badge && (
              <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-[10px] font-bold tracking-wide text-white backdrop-blur-sm">
                {property.badge.text}
              </span>
            )}
          </div>

          <p className="eyebrow mt-6 text-gold">{property.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-[2.1rem] font-medium leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {property.title}
          </h1>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-300">
            <Icon name="map-pin" className="h-4 w-4 shrink-0 text-gold" />
            {property.location}
          </p>

          <dl className="mt-8 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/20 sm:mt-10 sm:grid-cols-3">
            <div className="bg-navy-deep/85 px-5 py-4 sm:px-6 sm:py-5">
              <dt className="eyebrow text-[9px] text-slate-400">Starting From</dt>
              <dd className="mt-1 font-display text-xl font-semibold text-gold">
                {property.priceFrom ? formatPkr(property.priceFrom) : "On Request"}
              </dd>
            </div>
            <div className="bg-navy-deep/85 px-5 py-4 sm:px-6 sm:py-5">
              <dt className="eyebrow text-[9px] text-slate-400">Sizes</dt>
              <dd className="mt-1 font-display text-xl font-semibold text-white">
                {property.sizes.join(" · ")}
              </dd>
            </div>
            <div className="bg-navy-deep/85 px-5 py-4 sm:px-6 sm:py-5">
              <dt className="eyebrow text-[9px] text-slate-400">Type</dt>
              <dd className="mt-1 font-display text-xl font-semibold text-white">
                {property.propertyType}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={`${site.whatsapp.href}?text=${enquiryText}`} external variant="whatsapp" size="lg">
              <WhatsAppGlyph className="h-4 w-4" />
              Enquire On WhatsApp
            </Button>
            <Button href={site.phone.href} variant="outline" size="lg">
              <Icon name="phone" className="h-4 w-4" />
              {site.phone.display}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            {property.photos?.[0] && (
              <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_1px_2px_rgba(11,27,51,0.06),0_20px_40px_-16px_rgba(11,27,51,0.28)]">
                <Image
                  src={property.photos[0].url}
                  alt={property.photos[0].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            )}

            <h2 className="font-display text-3xl font-medium text-navy-deep">
              About This Development
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              {property.overview.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>

            <h3 className="mt-10 font-display text-xl font-semibold text-navy-deep">
              Key Features
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {property.features.map((f) => (
                <li
                  key={f.label}
                  className="flex items-center gap-3 rounded-xl border border-hairline bg-white px-4 py-3.5 text-sm font-medium text-slate-700"
                >
                  <Icon name={f.icon} className="h-4 w-4 shrink-0 text-gold" />
                  {f.label}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-xl font-semibold text-navy-deep">
              Why Buyers Choose It
            </h3>
            <ul className="mt-4 space-y-3">
              {property.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-slate-700">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-whatsapp-dark" />
                  {h}
                </li>
              ))}
            </ul>

            <p className="mt-8 rounded-xl border border-hairline bg-white px-5 py-4 text-xs leading-relaxed text-slate-500">
              <strong className="text-navy-deep">Pricing note:</strong>{" "}
              {property.priceNote}
            </p>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <ContactForm
              projectTitles={properties.map((p) => p.title)}
              defaultProject={property.title}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="shell">
          <h2 className="font-display text-3xl font-medium text-navy-deep">
            Other Developments
          </h2>
          <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep py-14">
        <div className="shell flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-medium text-white">
              Want to see {property.title} in person?
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              {fullAddress} · {site.hours}
            </p>
          </div>
          <Button href={`${site.whatsapp.href}?text=${enquiryText}`} external size="lg">
            Book A Site Visit
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  );
}
