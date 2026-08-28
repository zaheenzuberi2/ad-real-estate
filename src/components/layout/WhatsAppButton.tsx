import { site } from "@/lib/site";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";

export function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with an advisor on WhatsApp"
      className="tap fixed bottom-5 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_26px_-8px_rgba(37,211,102,0.7)] transition-[transform,box-shadow,background-color] duration-300 ease-brand hover:-translate-y-1 hover:scale-105 hover:bg-whatsapp-dark hover:shadow-[0_18px_36px_-10px_rgba(37,211,102,0.8)] sm:bottom-6 sm:right-6"
    >
      {/* Rests on a slow bob so it reads as alive even before the visitor hovers it. */}
      <span className="drift-slow flex items-center justify-center">
        <WhatsAppGlyph className="h-7 w-7" />
      </span>
    </a>
  );
}
