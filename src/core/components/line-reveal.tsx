"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";

import { STAGGER } from "@/core/motion/springs";
import { lineReveal, ONCE_IN_VIEW, staggerContainer } from "@/core/motion/variants";
import { cn } from "@/core/utils/cn";

type LineRevealProps = {
  /**
   * Explicit lines. Authored per locale in `messages/*.json` rather than derived
   * from natural wrapping, so the break points are a translation decision and
   * the clip stays correct in both directions.
   */
  lines: readonly string[];
  as?: ElementType;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "in-view";
  className?: string;
};

/**
 * Heading reveal: each line rises out of its own clip. The wrapper carries the
 * type styles; the inner span is what moves.
 */
export function LineReveal({
  lines,
  as: Component = "h2",
  delay = 0,
  stagger = STAGGER.line,
  trigger = "in-view",
  className,
}: LineRevealProps) {
  const MotionHeading = motion[Component as "h2"];

  return (
    <MotionHeading
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      {...(trigger === "mount"
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: ONCE_IN_VIEW })}
    >
      {lines.map((line, index) => (
        <span
          key={`${index}-${line}`}
          className={cn("block overflow-hidden", "pb-[0.06em]")}
        >
          <motion.span className="block" variants={lineReveal}>
            {line}
          </motion.span>
        </span>
      ))}
    </MotionHeading>
  );
}
