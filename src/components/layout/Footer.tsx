import Link from "next/link";
import { site, navLinks, fullAddress, developer } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { getProperties } from "@/lib/properties-data";
import { FacebookGlyph, InstagramGlyph, YouTubeGlyph } from "@/components/ui/SocialGlyphs";

export async function Footer() {
  const properties = await getProperties();

  return (
    <footer className="bg-navy-deep text-slate-300">
      <div className="shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-3">
            <LogoMark size={40} />
            <span className="leading-tight">
              <span className="block font-display text-xl font-semibold text-white">
                {site.name}
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.16em] text-gold">
                {site.tagline.toUpperCase()}
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
            {site.description}
          </p>
          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            {site.legalName}, registered under the Real Estate Agents &amp;
            Motor Vehicle Dealers (Regulation of Business) Ordinance, 1980.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AD Real Estate on Facebook"
              className="tap flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-gold/50 hover:text-gold hover:shadow-[0_10px_22px_-10px_rgba(198,161,91,0.5)]"
            >
              <FacebookGlyph className="h-[18px] w-[18px]" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AD Real Estate on Instagram"
              className="tap flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-gold/50 hover:text-gold hover:shadow-[0_10px_22px_-10px_rgba(198,161,91,0.5)]"
            >
              <InstagramGlyph className="h-[18px] w-[18px]" />
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AD Real Estate on YouTube"
              className="tap flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-gold/50 hover:text-gold hover:shadow-[0_10px_22px_-10px_rgba(198,161,91,0.5)]"
            >
              <YouTubeGlyph className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="eyebrow text-gold">Explore</h2>
          <ul className="mt-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="tap flex items-center text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mt-8 text-gold">Projects</h2>
          <ul className="mt-2">
            {properties.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/properties/${p.slug}`}
                  className="tap flex items-center text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-gold">Islamabad HQ</h2>
          <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-slate-400">
            <p>{fullAddress}</p>
            <p className="flex items-center gap-2 text-slate-300">
              <Icon name="clock" className="h-4 w-4 shrink-0 text-gold" />
              {site.hours}
            </p>
            <a
              href={site.phone.href}
              className="tap flex items-center gap-2 py-1.5 text-slate-100 transition-colors hover:text-gold"
            >
              <Icon name="phone" className="h-4 w-4 shrink-0 text-gold" />
              {site.phone.display}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="tap flex items-center gap-2 break-all py-1.5 text-slate-100 transition-colors hover:text-gold"
            >
              <Icon name="mail" className="h-4 w-4 shrink-0 text-gold" />
              {site.email}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="tap flex items-center transition-colors hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="tap flex items-center transition-colors hover:text-slate-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-navy">
        <p className="shell flex flex-wrap items-center justify-center gap-x-2 gap-y-1 py-4 text-center text-[11px] text-slate-500">
          <span>Designed &amp; built by</span>
          <a
            href={developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-200 transition-colors hover:text-gold"
          >
            {developer.name}
          </a>
          <span aria-hidden="true">·</span>
          <span>{developer.role}</span>
          <span aria-hidden="true">·</span>
          <a
            href={developer.phone.href}
            target="_blank"
            rel="noopener noreferrer"
            className="tap transition-colors hover:text-gold"
          >
            {developer.phone.display}
          </a>
        </p>
      </div>
    </footer>
  );
}
