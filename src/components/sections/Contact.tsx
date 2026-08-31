import { site, fullAddress } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { Button } from "@/components/ui/Button";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { getProperties } from "@/lib/properties-data";

export async function Contact() {
  const mapsQuery = encodeURIComponent(`${site.legalName}, ${fullAddress}`);
  const properties = await getProperties();

  return (
    <section id="contact" className="bg-ivory py-16 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Visit Or Get In Touch"
          title="Speak To Our Advisory Team"
          intro="Walk in, call ahead or send an enquiry. Our consultants respond to every lead personally."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)] sm:p-7">
              <h3 className="font-display text-xl font-semibold text-navy-deep">
                Islamabad HQ
              </h3>
              <address className="mt-4 space-y-3.5 text-sm not-italic leading-relaxed text-slate-600">
                <p className="flex gap-3">
                  <Icon name="map-pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {fullAddress}
                </p>
                <p className="flex gap-3">
                  <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {site.hours}
                </p>
                <a
                  href={site.phone.href}
                  className="tap flex items-center gap-3 py-2 font-semibold text-navy transition-colors hover:text-gold"
                >
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {site.phone.display}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="tap flex items-center gap-3 break-all py-2 font-semibold text-navy transition-colors hover:text-gold"
                >
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {site.email}
                </a>
              </address>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={site.whatsapp.href} external variant="whatsapp" size="sm">
                  <WhatsAppGlyph className="h-4 w-4" />
                  WhatsApp Us
                </Button>
                <Button
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  external
                  variant="ghost"
                  size="sm"
                >
                  <Icon name="navigation" className="h-4 w-4" />
                  Get Directions
                </Button>
              </div>
            </div>

            <MapEmbed query={mapsQuery} addressLine={fullAddress} />
          </div>

          <ContactForm projectTitles={properties.map((p) => p.title)} />
        </div>
      </div>
    </section>
  );
}
