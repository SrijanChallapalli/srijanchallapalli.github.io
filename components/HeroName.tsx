"use client";

import { useEffect, useRef } from "react";

const MIN = 560;
const MAX = 820;
const RADIUS = 260; // px of influence around the cursor

/**
 * The name, set huge. Letters rise in with CSS on first paint (no JS needed),
 * then thicken slightly toward the cursor — Geist is a variable font, so this
 * is a weight change, not a scale trick.
 */
export function HeroName({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-letter]"));
    let frame = 0;
    let x = 0;
    let y = 0;
    let hovering = false;

    const paint = () => {
      frame = 0;
      for (const l of letters) {
        let w = 600;
        if (hovering) {
          const r = l.getBoundingClientRect();
          const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y);
          const t = Math.max(0, 1 - d / RADIUS);
          w = MIN + (MAX - MIN) * t * t;
        }
        l.style.setProperty("--w", w.toFixed(0));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      hovering = true;
      schedule();
    };
    const onLeave = () => {
      hovering = false;
      schedule();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  let i = 0;
  return (
    <h1 ref={ref} className="t-display select-none" aria-label={lines.join(" ")}>
      {lines.map((line) => (
        <span key={line} className="block whitespace-nowrap" aria-hidden>
          <span className="rise-mask">
            {Array.from(line).map((ch, j) => (
              <span
                key={j}
                data-letter
                className="rise weight-letter"
                style={{ "--i": i++ } as React.CSSProperties}
              >
                {ch}
              </span>
            ))}
          </span>
        </span>
      ))}
    </h1>
  );
}
