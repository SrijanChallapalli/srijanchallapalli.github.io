"use client";

import { m } from "motion/react";
import { EASE } from "./ease";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  /** Seconds between words. */
  stagger?: number;
};

/**
 * Heading whose words slide up out of a mask as it scrolls into view.
 * Screen readers get the plain string; the split spans are aria-hidden.
 */
export function SplitHeading({ text, as = "h2", className, id, stagger = 0.04 }: Props) {
  const Tag = m[as];
  const words = text.split(" ");

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ staggerChildren: stagger }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          <span className="rise-mask">
            <m.span
              data-reveal
              className="inline-block"
              variants={{
                hidden: { y: "105%" },
                show: { y: 0, transition: { duration: 0.75, ease: EASE } },
              }}
            >
              {word}
            </m.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
