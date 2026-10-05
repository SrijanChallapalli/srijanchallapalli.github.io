"use client";

import { useEffect, useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Max travel in px toward the cursor. */
  strength?: number;
};

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * Frame whose contents drift toward the cursor and scale up slightly while the
 * nearest `[data-hover-root]` ancestor is hovered — so hovering a project's
 * title moves its image too. The frame clips, so the layout never shifts.
 */
export function ParallaxFrame({ children, className = "", strength = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hover = useMotionValue(0);
  const spring = { stiffness: 150, damping: 22, mass: 0.6 };
  const x = useSpring(useTransform(px, (v) => v * strength), spring);
  const y = useSpring(useTransform(py, (v) => v * strength), spring);
  const scale = useSpring(useTransform(hover, [0, 1], [1, 1.03]), spring);

  useEffect(() => {
    const frame = ref.current;
    if (!frame || reduce) return;
    const root = (frame.closest("[data-hover-root]") as HTMLElement | null) ?? frame;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = frame.getBoundingClientRect();
      px.set(clamp(((e.clientX - r.left) / r.width - 0.5) * 2));
      py.set(clamp(((e.clientY - r.top) / r.height - 0.5) * 2));
      hover.set(1);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
      hover.set(0);
    };
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce, px, py, hover]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <m.div className="absolute -inset-3" style={reduce ? undefined : { x, y, scale }}>
        {children}
      </m.div>
    </div>
  );
}
