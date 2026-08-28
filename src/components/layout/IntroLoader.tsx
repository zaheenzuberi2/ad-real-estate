"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/ui/Logo";

const SESSION_KEY = "ad-re-intro-shown";

/**
 * A brief branded overlay on first load: the mark settles into place, then
 * the whole thing fades away to reveal the page underneath — which has
 * already rendered normally beneath it, so nothing is actually gated behind
 * this, it is only decoration on top.
 *
 * `pointer-events-none` is permanent, not just while hidden: a fixed,
 * full-viewport layer that ever gains real pointer events would silently
 * swallow every click on the page for as long as it lingers, including
 * during the opacity fade where it is visually gone but still painted.
 *
 * Always mounted in the DOM and driven entirely through refs rather than
 * React state, so there is no render triggered by an effect — the overlay
 * carries no state a re-render would need to reflect. Plays once per browser
 * tab (sessionStorage), not on every internal navigation, never under
 * prefers-reduced-motion, and never on /studio, where a splash screen would
 * just be friction for daily admin use.
 */
export function IntroLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  useEffect(() => {
    const overlay = overlayRef.current;
    const mark = markRef.current;
    if (!overlay || !mark || isStudio) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Private-mode storage can throw; worst case it just replays next load.
    }

    overlay.classList.remove("opacity-0", "invisible");
    mark.classList.add("intro-mark-in");
    document.body.style.overflow = "hidden";

    const leave = setTimeout(() => {
      overlay.classList.add("opacity-0");
      mark.classList.add("scale-110", "opacity-0");
    }, 900);

    const done = setTimeout(() => {
      overlay.classList.add("invisible");
      document.body.style.overflow = "";
    }, 1400);

    return () => {
      clearTimeout(leave);
      clearTimeout(done);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once per mount by design
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] invisible flex items-center justify-center bg-navy-deep opacity-0 transition-opacity duration-500 ease-brand"
    >
      <div ref={markRef} className="transition-all duration-500 ease-brand">
        <LogoMark size={72} />
      </div>
    </div>
  );
}
