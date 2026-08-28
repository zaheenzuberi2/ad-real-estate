"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site, navLinks } from "@/lib/site";
import { LogoMark } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-md shadow-lg"
          : "bg-navy-deep"
      }`}
    >
      <div className="shell flex items-center justify-between gap-2 py-3 sm:gap-4 sm:py-3.5">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="shrink-0">
            <LogoMark size={34} />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base font-semibold text-white sm:text-lg">
              {site.name}
            </span>
            <span className="block truncate text-[9px] font-semibold tracking-[0.12em] text-gold sm:text-[10px] sm:tracking-[0.16em]">
              {site.tagline.toUpperCase()}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-xs font-semibold tracking-[0.14em] uppercase transition-colors ${
                  active ? "text-gold" : "text-slate-200 hover:text-white"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-navy-deep sm:flex"
          >
            <Icon name="phone" className="h-3.5 w-3.5" />
            {site.phone.display}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="tap flex items-center justify-center rounded-lg text-white lg:hidden"
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-white/10 bg-navy-deep lg:hidden"
        >
          <div className="shell flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/5 py-3.5 text-sm font-semibold tracking-wide text-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.phone.href}
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-bold text-navy-deep"
            >
              <Icon name="phone" className="h-4 w-4" />
              {site.phone.display}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
