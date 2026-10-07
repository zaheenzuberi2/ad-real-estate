import type { GuideBlock } from "@/content/guides";

/** Renders parsed article blocks (guides and blog posts share this). */
export function ArticleBlock({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 font-display text-2xl font-semibold text-navy-deep">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-6 font-display text-lg font-semibold text-navy-deep">
          {block.text}
        </h3>
      );
    case "p":
      return <p className="mt-4">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="ml-5 list-disc pl-1">
              {it}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-4 space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="ml-5 list-decimal pl-1">
              {it}
            </li>
          ))}
        </ol>
      );
  }
}
