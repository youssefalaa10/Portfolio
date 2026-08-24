"use client";

import { motion } from "motion/react";

import { SPRING } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

type HangingIdCardProps = {
  name: string;
  role: string;
  badgeId: string;
  /** Any valid CSS colour. Defaults to the site's accent token, so the badge
   *  never needs a literal hex at the call site unless one is deliberately
   *  supplied. */
  accentColor?: string;
  /**
   * Rope length in px — matches the reference component's unit — rendered on
   * the rem grid (docs/code.md §8: everything sized in rem, not px).
   */
  ropeLength?: number;
  className?: string;
};

/**
 * A pendant ID badge on a rope: settles in with a spring on mount, sways
 * gently at rest, and can be dragged — it always snaps back to centre.
 *
 * Bespoke build (see docs/code.md §13/§19): the real `lightswind` package is a
 * paid, CLI-installed registry, which conflicts with this project's
 * zero-extra-dependency contract. This reproduces the same prop surface using
 * only the `motion` dependency already in the project and this site's own
 * design tokens, so it can never visually drift from the rest of the page.
 */
export function HangingIdCard({
  name,
  role,
  badgeId,
  accentColor = "var(--color-accent)",
  ropeLength = 96,
  className,
}: HangingIdCardProps) {
  const ropeRem = ropeLength / 16;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Clip */}
      <div
        aria-hidden
        className="z-10 h-5 w-9 rounded-t-control rounded-b-sm bg-ink shadow-sm"
      />

      {/* Rope */}
      <div
        aria-hidden
        className="-mt-px w-px bg-line"
        style={{ height: `${ropeRem}rem` }}
      />

      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 320, bounceDamping: 18 }}
        initial={{ rotate: -6, y: -12, opacity: 0 }}
        animate={{ rotate: [-3, 3, -3], y: 0, opacity: 1 }}
        transition={{
          y: SPRING.panel,
          opacity: SPRING.panel,
          rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.02 }}
        whileDrag={{ scale: 1.04, rotate: 0 }}
        style={{ transformOrigin: "top center" }}
        className="w-64 max-w-[85vw] cursor-grab touch-none select-none rounded-card border border-line bg-background p-5 text-center shadow-xl active:cursor-grabbing"
      >
        <span
          aria-hidden
          className="mx-auto -mt-9 mb-3 block size-6 rounded-pill border-4 border-background bg-line"
        />
        <span
          aria-hidden
          className="mx-auto mb-4 block h-1.5 w-16 rounded-pill"
          style={{ backgroundColor: accentColor }}
        />
        <p className="text-lg font-semibold tracking-[-0.01em] text-foreground">{name}</p>
        <p className="mt-1 text-sm text-foreground/60">{role}</p>
        <p className="mt-4 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/40">
          {badgeId}
        </p>
      </motion.div>
    </div>
  );
}
