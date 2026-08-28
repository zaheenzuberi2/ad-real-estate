"use client";

import Link from "next/link";
import { useRef } from "react";

type Variant = "primary" | "outline" | "dark" | "whatsapp" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "tap group relative inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-brand " +
  "will-change-transform disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-navy-deep shadow-[0_6px_18px_-8px_rgba(198,161,91,0.9)] " +
    "hover:bg-gold-bright hover:shadow-[0_16px_34px_-10px_rgba(198,161,91,0.95)]",
  outline:
    "border border-white/25 text-white shadow-[0_4px_14px_-8px_rgba(0,0,0,0.6)] " +
    "hover:border-white/45 hover:bg-white/10 hover:shadow-[0_16px_30px_-12px_rgba(0,0,0,0.7)]",
  dark:
    "bg-navy text-white shadow-[0_6px_18px_-8px_rgba(11,27,51,0.75)] " +
    "hover:bg-navy-mid hover:shadow-[0_16px_34px_-10px_rgba(11,27,51,0.8)]",
  whatsapp:
    "bg-whatsapp text-white shadow-[0_6px_18px_-8px_rgba(37,211,102,0.9)] " +
    "hover:bg-whatsapp-dark hover:shadow-[0_16px_34px_-10px_rgba(37,211,102,0.95)]",
  ghost:
    "border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-6 py-3 text-xs sm:text-sm",
  lg: "px-7 py-3.5 text-sm",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Disables the cursor pull; use for full-width or in-flow buttons. */
  still?: boolean;
};

/**
 * The floaty behaviour, in three parts:
 *  - it rests on a soft shadow and lifts further on hover;
 *  - it leans a few pixels toward the cursor while the pointer is inside it,
 *    so it feels buoyant rather than nailed down;
 *  - it presses back down on click, so the weight reads as real.
 *
 * The lean is pointer-only and capped small: enough to notice, never enough to
 * make the control hard to hit, and it never runs on touch or under
 * prefers-reduced-motion.
 */
function useMagnetic(disabled?: boolean) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || disabled) return;
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    el.style.setProperty("--mx", `${(dx * 5).toFixed(2)}px`);
    el.style.setProperty("--my", `${(dy * 3).toFixed(2)}px`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  };

  return { ref, onPointerMove, onPointerLeave: reset, onBlur: reset };
}

const motionClass =
  "translate-x-[var(--mx,0)] translate-y-[calc(var(--my,0px))] " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] active:duration-100";

/**
 * Only the two genuine call-to-action variants idle-bob at rest — this is
 * what makes them read as "floaty" before a visitor ever touches one, since
 * hover/lean effects by definition only show up on interaction, and most
 * visitors on touch devices never hover at all. Secondary controls (ghost,
 * ordinary outline, dark) stay still at rest so the page doesn't turn into a
 * field of simultaneously bobbing pills.
 */
const idlesAtRest: Partial<Record<Variant, boolean>> = {
  primary: true,
  whatsapp: true,
  outline: true,
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  still,
  href,
  external,
  ...rest
}: CommonProps &
  ({ href: string; external?: boolean } | { href?: undefined; external?: never }) &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { ref, onPointerMove, onPointerLeave, onBlur } = useMagnetic(still);
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${still ? "" : motionClass} ${className}`;
  const handlers = still ? {} : { onPointerMove, onPointerLeave, onBlur };

  // The idle bob lives on an inner span, never the button itself, so it never
  // fights the outer element's own hover-lift/magnetic-lean transform.
  const content =
    !still && idlesAtRest[variant] ? (
      <span className="drift-btn inline-flex items-center gap-2">
        {children}
      </span>
    ) : (
      children
    );

  if (href) {
    // tel:, mailto: and similar schemes are neither an internal route nor a
    // page to open in a new tab — they need a plain anchor either way.
    const isScheme = /^[a-z][a-z0-9+.-]*:/i.test(href) && !href.startsWith("http");

    if (external && !isScheme) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          {...handlers}
        >
          {content}
        </a>
      );
    }

    if (isScheme) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cls}
          {...handlers}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        {...handlers}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cls}
      {...handlers}
      {...rest}
    >
      {content}
    </button>
  );
}
