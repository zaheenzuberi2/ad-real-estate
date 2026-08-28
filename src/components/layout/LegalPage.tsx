export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="bg-navy-deep pb-12 pt-16">
        <div className="shell">
          <h1 className="font-display text-4xl font-medium text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-slate-400">Last updated {updated}</p>
        </div>
      </section>

      <section className="bg-ivory py-16">
        <div className="shell max-w-3xl space-y-8 text-base leading-relaxed text-slate-600 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy-deep [&_li]:ml-5 [&_li]:list-disc [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:space-y-2">
          {children}
        </div>
      </section>
    </>
  );
}
