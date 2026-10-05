import Image from "next/image";
import { about, now, stack } from "@/data/site";
import { Reveal } from "./motion/Reveal";
import { SectionHeader } from "./SectionHeader";

export function AboutSection() {
  return (
    <section aria-labelledby="about-title" id="about" data-crumb="About">
      <SectionHeader title="About" id="about-title" compact />

      {about.paragraphs.map((p, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <p className={i === 0 ? "t-lead text-pretty" : "mt-6 text-lg text-pretty text-ink-2"}>{p}</p>
        </Reveal>
      ))}

      <Reveal className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end">
        <figure className="group relative aspect-[4/5] w-full max-w-[220px] shrink-0 overflow-hidden rounded-[4px] bg-paper-2">
          <Image
            src="/portrait.jpg"
            alt="Portrait of Srijan Challapalli"
            fill
            sizes="220px"
            className="object-cover grayscale transition-[filter,transform] duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        </figure>
        <dl className="flex w-full flex-col gap-3">
          {about.facts.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-t border-rule pt-3">
              <dt className="t-meta text-ink-3">{k}</dt>
              <dd className="text-right text-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function SubHeader({ title, note }: { title: string; note: string }) {
  return (
    <Reveal className="mb-6">
      <h3 className="t-h4 font-semibold">{title}</h3>
      <p className="t-meta mt-2 text-ink-3">{note}</p>
    </Reveal>
  );
}

export function StackSection() {
  return (
    <section id="stack" aria-label="Stack" data-crumb="Stack">
      <SubHeader title="Stack" note="What I reach for" />
      {stack.map((row, i) => (
        <Reveal key={row.label} delay={i * 0.05}>
          <div className="border-t border-rule py-5">
            <p className="t-meta text-ink-3">{row.label}</p>
            {/* Hovering one item quiets the rest of its row. */}
            <p className="group/row mt-2 text-2xl leading-snug font-medium tracking-[-0.03em]">
              {row.items.map((item, j) => (
                <span key={item}>
                  {j > 0 && <span className="font-normal text-ink-3"> / </span>}
                  <span className="transition-colors duration-200 group-hover/row:text-ink-3 hover:!text-ink">
                    {item}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

export function NowSection() {
  return (
    <section id="now" aria-label="Now" data-crumb="Now">
      <SubHeader title="Now" note="What I'm exploring · Oct 2026" />
      <ol>
        {now.map((n, i) => (
          <Reveal as="li" key={n.topic} delay={i * 0.04}>
            <div className="flex flex-col gap-1 border-t border-rule py-4 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="font-mono text-xs text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-xl font-medium tracking-[-0.025em] sm:w-48 sm:shrink-0">{n.topic}</span>
              <span className="text-ink-2">{n.note}</span>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
