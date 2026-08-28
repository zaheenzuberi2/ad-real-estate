export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`eyebrow flex items-center gap-3 text-gold ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-gold/50" />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-3xl font-medium leading-tight sm:text-4xl ${
          dark ? "text-white" : "text-navy-deep"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
