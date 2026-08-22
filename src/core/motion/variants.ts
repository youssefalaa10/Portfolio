import type { Variants } from "motion/react";

import { DURATION, SPRING, STAGGER } from "./springs";

/**
 * Reusable animation primitives. A component picks a named variant; it does not
 * author keyframes. Reduced motion is handled globally by
 * `<MotionConfig reducedMotion="user">` in the locale layout, which drops the
 * transform channels and keeps opacity — so nothing here needs a manual guard.
 */

/** Fade and rise. `distance` is in rem so it scales with the adaptive grid. */
export function fadeUp(distance = 0.75): Variants {
  return {
    hidden: { opacity: 0, y: `${distance}rem` },
    visible: { opacity: 1, y: "0rem", transition: SPRING.reveal },
  };
}

/** Opacity only — for elements whose position must not shift. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: SPRING.reveal },
};

/** Cards and panels: rise while settling up to full scale. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, y: "1rem", scale: 0.96 },
  visible: { opacity: 1, y: "0rem", scale: 1, transition: SPRING.panel },
};

/** Parent of a staggered group. Children use their own variant. */
export function staggerContainer(
  stagger: number = STAGGER.chip,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

/**
 * One line of a clipped heading. The parent wraps this in `overflow-hidden`, so
 * the line appears to rise out of the type itself.
 */
export const lineReveal: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: DURATION.line, ease: [0.215, 0.61, 0.355, 1] },
  },
};

/** One word of a statement. */
export const wordReveal: Variants = {
  hidden: { y: "1.5rem", opacity: 0 },
  visible: {
    y: "0rem",
    opacity: 1,
    transition: { duration: DURATION.word, ease: [0.165, 0.84, 0.44, 1] },
  },
};

/** Shared `whileInView` viewport config: play once, slightly before full entry. */
export const ONCE_IN_VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;
