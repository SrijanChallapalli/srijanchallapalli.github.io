"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Distance from the viewport top when the column is shorter than the screen. */
  offset?: number;
  "data-col"?: string;
};

/**
 * Sticky column for side-by-side layouts. A column taller than the viewport
 * scrolls until its bottom reaches the screen edge, then holds — so two
 * columns of different heights always finish together.
 */
export function StickyColumn({ children, className = "", offset = 96, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(offset);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setTop(Math.min(offset, window.innerHeight - el.offsetHeight - 48));
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    update();
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [offset]);

  return (
    <div ref={ref} {...rest} className={`lg:sticky ${className}`} style={{ top }}>
      {children}
    </div>
  );
}
