import { SplitHeading } from "./motion/SplitHeading";
import { Reveal } from "./motion/Reveal";

type Props = {
  title: string;
  id: string;
  /** Small mono note beside the title, e.g. a count. */
  note?: string;
  aside?: React.ReactNode;
};

/** Big section title — the main structural device of the page. */
export function SectionHeader({ title, id, note, aside }: Props) {
  return (
    <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
      <div className="flex items-start gap-2">
        <SplitHeading text={title} id={id} className="t-h2" />
        {note && (
          <Reveal as="span" delay={0.2} className="t-meta mt-1 text-ink-3 md:mt-3">
            ({note})
          </Reveal>
        )}
      </div>
      {aside && <Reveal delay={0.15}>{aside}</Reveal>}
    </div>
  );
}

/** Mono, slash-separated list — how tech stacks are shown everywhere. */
export function StackLine({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <p className={`t-meta text-ink-2 ${className}`}>
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && <span className="text-ink-3"> / </span>}
          {item}
        </span>
      ))}
    </p>
  );
}

export function ArrowLink({
  href,
  children,
  external = true,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`group inline-flex items-center gap-1 text-[15px] transition-colors duration-200 hover:text-ink ${className}`}
    >
      <span className="link-underline">{children}</span>
      <span className="arrow arrow-ne text-ink-3 group-hover:text-accent" aria-hidden>
        ↗
      </span>
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
