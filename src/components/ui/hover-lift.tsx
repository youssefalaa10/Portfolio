"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { SPRING } from "@/core/motion/springs";

type HoverLiftProps = {
  children: ReactNode;
  /** Rise on hover, in px. */
  lift?: number;
  /** Scale on hover. */
  scale?: number;
  /** Resting opacity; hover always settles at 1. */
  from?: number;
  /** Which named spring drives it. */
  spring?: keyof typeof SPRING;
  className?: string;
};

/**
 * Pointer-driven spring hover for labels, chips and marks. Sits inside the
 * interactive element rather than being it, so semantics and focus rings stay
 * on the real `<a>` or `<button>`.
 */
export function HoverLift({
  children,
  lift = 2,
  scale = 1,
  from = 1,
  spring = "lift",
  className,
}: HoverLiftProps) {
  return (
    <motion.span
      className={className}
      initial={false}
      variants={{
        rest: { y: 0, scale: 1, opacity: from },
        hover: { y: -lift, scale, opacity: 1 },
      }}
      animate="rest"
      whileHover="hover"
      transition={SPRING[spring]}
    >
      {children}
    </motion.span>
  );
}
