"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { TeamMember } from "@/content/team";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";

/**
 * Flips to reveal contact details.
 *
 * Pointer devices flip on hover/focus (CSS). Touch devices have no hover, so
 * the card flips itself as it passes through the middle of the viewport, and a
 * tap toggles it manually from then on.
 */
export function TeamCard({
  member,
  priority,
}: {
  member: TeamMember;
  priority?: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [flipped, setFlipped] = useState(false);
  const takenOver = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Pointer devices are handled by :hover in CSS — don't fight it.
    if (!window.matchMedia("(hover: none)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!takenOver.current) setFlipped(entry.isIntersecting);
      },
      // A band across the middle of the screen: the card turns as it passes
      // through and turns back once it leaves.
      { rootMargin: "-38% 0px -38% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    takenOver.current = true;
    setFlipped((v) => !v);
  };

  return (
    <li ref={ref} className={`flip ${flipped ? "is-flipped" : ""}`}>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={flipped}
        aria-label={`${member.name}, ${member.role}. Show contact details`}
        className="block w-full cursor-pointer text-left"
      >
        <div className="flip-inner">
          {/* Front */}
          <div className="flip-face rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)]">
            <div className="relative aspect-[3/4] bg-navy">
              <Image
                src={member.photo}
                alt={`${member.name}, ${member.role} at AD Real Estate`}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1280px) 30vw, 20vw"
                className="object-cover"
                priority={priority}
              />
              <span className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-navy-deep/70 text-gold backdrop-blur-sm">
                <Icon name="arrow-right" className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="font-display text-base font-semibold leading-tight text-navy-deep sm:text-lg">
                {member.name}
              </h3>
              <p className="eyebrow mt-1 text-[9px] leading-snug text-gold">
                {member.role}
              </p>
            </div>
          </div>

          {/* Back */}
          <div className="flip-face flip-back flex flex-col justify-between rounded-2xl border border-gold/30 bg-navy-deep p-5 text-white shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)]">
            <div>
              <h3 className="font-display text-base font-semibold leading-tight sm:text-lg">
                {member.name}
              </h3>
              <p className="eyebrow mt-1 text-[9px] leading-snug text-gold">
                {member.role}
              </p>
              <span className="mt-4 block h-px w-10 bg-gold/40" />
            </div>

            <div className="mt-4 space-y-2.5">
              {member.phoneIntl && (
                <>
                  <a
                    href={`https://wa.me/${member.phoneIntl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="tap flex items-center gap-2.5 rounded-lg bg-whatsapp px-3 py-2.5 text-xs font-bold text-white"
                  >
                    <WhatsAppGlyph className="h-4 w-4 shrink-0" />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:+${member.phoneIntl}`}
                    onClick={(e) => e.stopPropagation()}
                    className="tap flex items-center gap-2.5 rounded-lg border border-white/20 px-3 py-2.5 text-xs font-semibold text-slate-100"
                  >
                    <Icon name="phone" className="h-4 w-4 shrink-0 text-gold" />
                    {member.phoneDisplay}
                  </a>
                </>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="tap flex items-center gap-2.5 rounded-lg border border-white/20 px-3 py-2.5 text-[11px] font-semibold break-all text-slate-100"
                >
                  <Icon name="mail" className="h-4 w-4 shrink-0 text-gold" />
                  {member.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </button>
    </li>
  );
}
