"use client";

import { motion } from "motion/react";

import { ArrowRight } from "@/components/ui/icons";
import { Shell } from "@/components/ui/shell";
import { SPRING } from "@/core/motion/springs";
import { fadeUp, ONCE_IN_VIEW } from "@/core/motion/variants";
import { cn } from "@/core/utils/cn";

type CreateBandProps = {
  /** The words, in order. The arrow tile is inserted before the last one. */
  words: readonly string[];
};

const TILE: Record<string, string> = {
  light: "bg-surface text-foreground",
  accent: "bg-gradient-to-br from-accent-from to-accent-to text-white",
  dark: "bg-ink text-white",
  ghost: "bg-surface/60 text-foreground/35",
};

type Cell = { key: string; variant: string; content: string | null };

/**
 * Pills reading as one sentence. The arrow is its own cell rather than a glyph
 * inside a word, which is what lets it carry the ink variant and give the row its
 * rhythm.
 *
 * Built from the array rather than fixed positions, so a locale can use a
 * different number of words without the layout breaking.
 */
export function CreateBand({ words }: CreateBandProps) {
  const cells: Cell[] = words.flatMap((word, index) => {
    const isLast = index === words.length - 1;
    const variant = isLast ? "ghost" : index === 0 ? "light" : "accent";
    const tile: Cell = { key: `word-${index}`, variant, content: word };

    return isLast
      ? [{ key: "arrow", variant: "dark", content: null }, tile]
      : [tile];
  });

  return (
    <section className="bg-background">
      <Shell as="ul" className="flex flex-col gap-3 py-10 sm:flex-row sm:gap-4">
        {cells.map((cell, index) => (
          <motion.li
            key={cell.key}
            className="flex-1"
            variants={fadeUp(1.75)}
            initial="hidden"
            whileInView="visible"
            viewport={ONCE_IN_VIEW}
            transition={{ delay: index * 0.12 }}
          >
            <motion.div
              className={cn(
                "grid h-24 place-items-center rounded-pill text-3xl font-medium sm:h-40 sm:text-4xl",
                TILE[cell.variant],
              )}
              initial={false}
              whileHover={{ scale: 1.03 }}
              transition={SPRING.nudge}
            >
              {cell.content ?? (
                <ArrowRight
                  aria-hidden
                  className="text-4xl sm:text-5xl rtl:-scale-x-100"
                />
              )}
            </motion.div>
          </motion.li>
        ))}
      </Shell>
    </section>
  );
}
