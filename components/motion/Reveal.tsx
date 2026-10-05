"use client";

import { m } from "motion/react";
import { EASE } from "./ease";

type Props = {
  children: React.ReactNode;
  as?: "div" | "section" | "li" | "p" | "header" | "article" | "span";
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  className?: string;
};

/** Fade + slight rise when the element first enters the viewport. */
export function Reveal({ children, as = "div", delay = 0, y = 16, className }: Props) {
  const Tag = m[as];
  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}
