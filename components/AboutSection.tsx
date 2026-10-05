import Image from "next/image";
import { about, now, stack } from "@/data/site";
import { Reveal } from "./motion/Reveal";
import { SectionHeader } from "./SectionHeader";

export function AboutSection() {
  return (
    <section aria-labelledby="about-title" id="about" className="container-page section-space">
      <SectionHeader title="About" id="about-title" />

      <div className="grid-page gap-y-12">
        <Reveal className="col-span-12 md:col-span-4 lg:col-span-3">
          <figure className="group relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[4px] bg-paper-2">
            <Image
              src="/portrait.jpg"
              alt="Portrait of Srijan Challapalli"
              fill
              sizes="(min-width: 768px) 280px, 70vw"
              className="object-cover grayscale transition-[filter,transform] duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03] group-hover:grayscale-0"
            />
          </figure>
          <dl className="mt-6 flex max-w-[280px] flex-col gap-3">
            {about.facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-t border-rule pt-3">
                <dt className="t-meta text-ink-3">{k}</dt>
                <dd className="text-right text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className={i === 0 ? "t-lead text-pretty" : "mt-6 text-lg text-pretty text-ink-2"}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* NOW */}
      <div className="grid-page mt-32 gap-y-8 md:mt-44" id="now">
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <Reveal>
            <h3 className="t-h4 font-semibold">Now</h3>
            <p className="t-meta mt-2 text-ink-3">What I&apos;m exploring · Oct 2026</p>
          </Reveal>
        </div>
        <ol className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
          {now.map((n, i) => (
            <Reveal as="li" key={n.topic} delay={i * 0.04}>
              <div className="group flex flex-col gap-1 border-t border-rule py-4 sm:flex-row sm:items-baseline sm:gap-6">
                <span className="font-mono text-xs text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xl font-medium tracking-[-0.025em] sm:w-64 sm:shrink-0">{n.topic}</span>
                <span className="text-ink-2">{n.note}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* STACK */}
      <div className="grid-page mt-32 gap-y-8 md:mt-44" id="stack">
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <Reveal>
            <h3 className="t-h4 font-semibold">Stack</h3>
            <p className="t-meta mt-2 text-ink-3">What I reach for</p>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-7 lg:col-start-6">
          {stack.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.05}>
              <div className="border-t border-rule py-5">
                <p className="t-meta text-ink-3">{row.label}</p>
                {/* Hovering one item quiets the rest of its row. */}
                <p className="group/row mt-2 text-2xl leading-snug font-medium tracking-[-0.03em] md:text-3xl">
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
        </div>
      </div>
    </section>
  );
}
