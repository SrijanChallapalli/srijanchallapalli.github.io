"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * One motion config for the whole site. `reducedMotion="user"` drops
 * transforms for people who ask for less motion while keeping opacity fades.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
