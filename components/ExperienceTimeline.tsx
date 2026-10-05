"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import type { Experience } from "@/data/experience";
import { EASE } from "./motion/ease";
import { Reveal } from "./motion/Reveal";
import { StackLine } from "./SectionHeader";

function Entry({ item, defaultOpen }: { item: Experience; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <li className="grid-page border-t border-rule py-8 md:py-10">
      <div className="col-span-12 md:col-span-3">
        <p className="font-mono text-sm text-ink-2 tabular-nums">{item.year}</p>
        <p className="t-meta mt-1 text-ink-3">{item.period}</p>
      </div>

      <div className="col-span-12 mt-4 md:col-span-9 md:mt-0">
        <h3 className="t-h4 font-semibold">
          {item.company}
          <span className="font-normal text-ink-2"> — {item.role}</span>
        </h3>
        <p className="mt-3 max-w-[60ch] text-ink-2">{item.summary}</p>

        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {item.impact.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-2xl font-semibold tracking-[-0.04em] tabular-nums">{s.value}</dd>
              <dd className="text-[13px] text-ink-2">{s.label}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group t-meta mt-6 inline-flex items-center gap-2 text-ink-2 transition-colors hover:text-ink"
        >
          <span
            className={`grid size-5 place-items-center rounded-full border border-rule transition-transform duration-300 ease-[var(--ease-out)] group-hover:border-ink-3 ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden
          >
            +
          </span>
          {open ? "Less" : "What I did"}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <m.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden"
            >
              <ul className="mt-6 flex max-w-[68ch] flex-col gap-3">
                {item.details.map((d) => (
                  <li key={d} className="flex gap-4 text-ink-2">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-3" aria-hidden />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <StackLine items={item.stack} className="mt-6" />
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
}

export function ExperienceTimeline({ items }: { items: Experience[] }) {
  return (
    <Reveal>
      <ol className="border-b border-rule">
        {items.map((item) => (
          <Entry key={item.company} item={item} defaultOpen={false} />
        ))}
      </ol>
    </Reveal>
  );
}
