import type { IconName } from "@/lib/types";

const paths: Record<IconName, React.ReactNode> = {
  ruler: <path d="M3 15 15 3l6 6L9 21z M7 11l2 2 M11 7l2 2" />,
  route: <path d="M4 19h6a4 4 0 0 0 0-8H8a4 4 0 0 1 0-8h6 M18 3v4 M18 17v4" />,
  "map-pin": (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  "calendar-clock": (
    <>
      <path d="M21 10H3 M8 2v4 M16 2v4 M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h7" />
      <circle cx="18" cy="18" r="4" />
      <path d="M18 16.5V18l1 1" />
    </>
  ),
  flag: <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />,
  "heart-pulse": (
    <path d="M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0 0 12 5.4 5.5 5.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7zM3.5 12h4l1.5-3 3 6 2-3h4" />
  ),
  "message-circle": (
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5a8.4 8.4 0 0 1-.9-3.9 8.5 8.5 0 0 1 8.4-9 8.5 8.5 0 0 1 8.6 8.4z" />
  ),
  navigation: <path d="M3 11l19-9-9 19-2-8-8-2z" />,
  "shield-check": (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  key: (
    <>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="M10.7 12.3 21 2m-3 3 2.5 2.5M15 8l2.5 2.5" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.8a2 2 0 0 1 1.7 2z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  whatsapp: (
    <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.7.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.5-.4z M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" />
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "arrow-right": <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m20 6-11 11-5-5" />,
  star: <path d="m12 2 3.1 6.3 7 1-5 4.9 1.2 6.9-6.3-3.3-6.2 3.3L6.9 14l-5-4.9 7-1z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  quote: <path d="M7 11H4a4 4 0 0 1 4-4V5a6 6 0 0 0-6 6v7h5zm11 0h-3a4 4 0 0 1 4-4V5a6 6 0 0 0-6 6v7h5z" />,
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="m8.2 13.4-1.4 7.6L12 18l5.2 3-1.4-7.6" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 7h.01M15 7h.01M9 12h.01M15 12h.01M10 22v-4h4v4" />
    </>
  ),
};

export function Icon({
  name,
  className = "h-5 w-5",
  filled = false,
}: {
  name: IconName;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
