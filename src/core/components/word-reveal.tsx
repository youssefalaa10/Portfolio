"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";

import { STAGGER } from "@/core/motion/springs";
import {
  ONCE_IN_VIEW,
  staggerContainer,
  wordReveal,
} from "@/core/motion/variants";
import { cn } from "@/core/utils/cn";

/**
 * A run of words sharing one emphasis. Splitting the statement into runs rather
 * than one string is what lets the tail be muted without breaking the stagger:
 * every word in every run belongs to the same sequence.
 *
 * `tone` is typed loosely because runs come from `messages/*.json`, where values
 * widen to `string`. `"muted"` is the only recognised value; anything else
 * renders at default emphasis rather than failing.
 */
export type WordRun = {
  readonly text: string;
  readonly tone?: string;
};

type WordRevealProps = {
  runs: readonly WordRun[];
  as?: ElementType;
  delay?: number;
  className?: string;
};

/** Statement reveal: each word rises into place, staggered. */
export function WordReveal({
  runs,
  as: Component = "p",
  delay = 0,
  className,
}: WordRevealProps) {
  const MotionText = motion[Component as "p"];

  return (
    <MotionText
      className={className}
      variants={staggerContainer(STAGGER.word, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={ONCE_IN_VIEW}
    >
      {runs.map((run, runIndex) =>
        run.text
          .split(/\s+/)
          .filter(Boolean)
          .map((word, wordIndex) => (
            <motion.span
              key={`${runIndex}-${wordIndex}-${word}`}
              variants={wordReveal}
              className={cn(
                "inline-block",
                run.tone === "muted" && "text-muted",
              )}
            >
              {word}
              {/* A normal space would collapse between inline-blocks. */}
              <span aria-hidden>&nbsp;</span>
            </motion.span>
          )),
      )}
    </MotionText>
  );
}
