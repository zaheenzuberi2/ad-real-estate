import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-navy-deep py-28">
      <div className="shell text-center">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="mt-4 font-display text-4xl font-medium text-white sm:text-5xl">
          This page has moved on
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-slate-400">
          The page you&apos;re looking for isn&apos;t here. Our current inventory
          is always on the properties page, or an advisor can help directly.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/properties" size="lg">
            Browse Properties
            <Icon name="arrow-right" className="h-4 w-4" />
          </Button>
          <Button href={site.whatsapp.href} external variant="outline" size="lg">
            <WhatsAppGlyph className="h-4 w-4" />
            Ask An Advisor
          </Button>
        </div>
      </div>
    </section>
  );
}
