"use client";

import { motion } from "motion/react";

import { ArrowUpRight } from "@/components/ui/icons";
import { SUPPORT_LINK } from "@/core/config/site";
import { SPRING } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

type SupportCardProps = {
  copy: {
    label: string;
    title: string;
    body: string;
    cta: string;
  };
  className?: string;
};

/**
 * "Buy me a coffee" support card.
 *
 * Renders **nothing** while `SUPPORT_LINK` is empty — a support button that goes
 * nowhere is worse than no button, and this way the block appears the moment the
 * URL is pasted into `core/config/site.ts` with no other change.
 *
 * The cup is drawn in CSS rather than pulled from an icon set: it needs to be
 * bigger and warmer than a 1em glyph, and the steam animates.
 */
export function SupportCard({ copy, className }: SupportCardProps) {
  if (!SUPPORT_LINK) return null;

  return (
    <motion.a
      href={SUPPORT_LINK}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "group relative flex items-center gap-5 overflow-hidden rounded-card border border-line bg-surface/60 p-6",
        className,
      )}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={{ rest: { y: 0 }, hover: { y: -4 } }}
      transition={SPRING.panel}
    >
      {/* Warm bloom, so the card reads as the one inviting thing on the page. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -end-8 -top-10 size-32 rounded-pill bg-accent/20 blur-2xl"
        variants={{ rest: { opacity: 0.55 }, hover: { opacity: 1 } }}
        transition={SPRING.panel}
      />

      {/* The cup */}
      <span aria-hidden className="relative shrink-0">
        <span className="relative block h-11 w-10 rounded-b-[0.9rem] rounded-t-[0.2rem] bg-ink">
          <span className="absolute inset-x-1 top-1 h-1.5 rounded-pill bg-accent-from/80" />
          {/* Handle */}
          <span className="absolute -end-2.5 top-3 h-4 w-3 rounded-e-pill border-2 border-ink" />
        </span>

        {/* Steam — two strands, offset so it never reads as a metronome. */}
        {[0, 1].map((strand) => (
          <motion.span
            key={strand}
            className="absolute -top-3 h-3 w-0.5 rounded-pill bg-accent/50"
            style={{ insetInlineStart: strand === 0 ? "0.65rem" : "1.5rem" }}
            variants={{
              rest: { opacity: 0.35, y: 0 },
              hover: { opacity: [0.2, 0.8, 0.2], y: [-1, -5, -1] },
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              delay: strand * 0.35,
              ease: "easeInOut",
            }}
          />
        ))}
      </span>

      <span className="relative flex flex-1 flex-col gap-1">
        <span className="text-micro font-medium uppercase tracking-[0.08em] text-foreground/45">
          {copy.label}
        </span>
        <span className="text-lg font-medium tracking-[-0.01em] text-foreground">
          {copy.title}
        </span>
        <span className="text-sm text-foreground/60">{copy.body}</span>
      </span>

      <motion.span
        aria-hidden
        className="relative grid size-11 shrink-0 place-items-center rounded-pill bg-ink text-white"
        variants={{
          rest: { rotate: 0, scale: 1 },
          hover: { rotate: 45, scale: 1.08 },
        }}
        transition={SPRING.nudge}
      >
        <ArrowUpRight />
      </motion.span>

      <span className="sr-only">{copy.cta}</span>
    </motion.a>
  );
}
