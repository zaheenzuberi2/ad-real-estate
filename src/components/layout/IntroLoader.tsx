"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

const SESSION_KEY = "ad-re-intro-shown";
const LOGO_SRC = "/images/logo.png";

/**
 * A one-second branded overlay on first load.
 *
 * The cover is raised by a blocking inline script in the root layout (it sets
 * `data-intro` on <html> during HTML parse), and CSS in globals.css shows
 * `#intro-overlay` from the very first paint — so the page never flashes
 * underneath before React hydrates. There is also a pure-CSS failsafe that
 * hides the overlay after a few seconds if this component never runs.
 *
 * This component's job once hydrated: pick the logo (`/images/logo.png`, or
 * the vector mark if that file is missing), run the rise-and-settle animation,
 * then drop `data-intro` so the cover fades out.
 *
 * Plays once per browser tab (sessionStorage); the inline script already
 * skips repeat visits, prefers-reduced-motion, /studio and /admin.
 */
export function IntroLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const tookOver = useRef(false);
  const [logo, setLogo] = useState<"img" | "vector" | null>(null);

  // Take over the cover the inline script already raised.
  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-intro")) return;
    tookOver.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Private-mode storage can throw; the intro just replays next load.
    }

    let settled = false;
    const decide = (choice: "img" | "vector") => {
      if (settled) return;
      settled = true;
      setLogo(choice);
    };
    const probe = new Image();
    probe.onload = () => decide("img");
    probe.onerror = () => decide("vector");
    probe.src = LOGO_SRC;
    const fallback = setTimeout(() => decide("vector"), 500);
    return () => clearTimeout(fallback);
  }, []);

  // Once the logo is on screen: animate in, hold, then fade the cover.
  useEffect(() => {
    if (!tookOver.current || !logo) return;
    const mark = markRef.current;
    if (!mark) return;

    mark.classList.add("intro-mark-in");

    const leave = setTimeout(() => {
      document.documentElement.removeAttribute("data-intro");
      mark.classList.add("scale-110", "opacity-0");
    }, 1250);
    const finish = setTimeout(() => {
      overlayRef.current?.classList.add("invisible");
    }, 1800);

    return () => {
      clearTimeout(leave);
      clearTimeout(finish);
      document.documentElement.removeAttribute("data-intro");
    };
  }, [logo]);

  return (
    <div
      id="intro-overlay"
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-navy-deep transition-opacity duration-500 ease-brand"
    >
      <div ref={markRef} className="transition-all duration-500 ease-brand">
        {logo === "img" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={LOGO_SRC}
            alt="AD Real Estate"
            className="h-auto w-[clamp(200px,44vw,340px)]"
          />
        ) : logo === "vector" ? (
          <LogoMark size={84} />
        ) : null}
      </div>
    </div>
  );
}
