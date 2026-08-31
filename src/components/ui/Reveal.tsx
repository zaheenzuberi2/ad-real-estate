"use client";

import { useEffect, useRef } from "react";

/**
 * Settles content into place the first time it scrolls into view.
 *
 * The state lives on the DOM node rather than in React: this never needs to
 * re-render, and the markup ships visible so a failed or blocked script leaves
 * a readable page instead of a blank one.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Hide only once we know the observer can bring it back.
    el.dataset.reveal = "out";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "in";
          observer.disconnect();
        }
      },
      // Positive bottom margin: start the reveal ~15% before the element
      // actually enters the viewport, so it has finished settling by the time
      // it is on screen — even on a fast scroll.
      { rootMargin: "0px 0px 15% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined
      }
      className={className}
    >
      {children}
    </Tag>
  );
}
