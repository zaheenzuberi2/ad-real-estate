"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's one authored moment.
 *
 * A plot grid sits almost invisible over the navy. The pointer carries a warm
 * lamp across it, lighting only the squares it passes — the way a surveyor's
 * light reads a site plan in the dark. The grid is the subject's own texture
 * (plot maps), not decoration borrowed from elsewhere.
 *
 * Pointer-driven, so it does nothing on touch, where there is no cursor to
 * follow. The lamp idles in a slow orbit until the pointer first arrives.
 */
export function SurveyLight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let targetX = 0.5;
    let targetY = 0.4;
    let x = 0.5;
    let y = 0.4;
    let live = false;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = (e.clientY - rect.top) / rect.height;
      if (!live) {
        live = true;
        el.dataset.live = "true";
      }
    };

    const tick = () => {
      // Trail the pointer rather than snapping to it: the lamp has weight.
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      el.style.setProperty("--lx", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--ly", `${(y * 100).toFixed(2)}%`);
      frame = requestAnimationFrame(tick);
    };

    const parent = el.parentElement ?? el;
    parent.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      parent.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="survey-light" aria-hidden="true">
      <div className="survey-grid" />
      <div className="survey-grid survey-grid-lit" />
      <div className="survey-glow" />
    </div>
  );
}
