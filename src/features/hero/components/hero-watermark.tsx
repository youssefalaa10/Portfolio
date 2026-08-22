"use client";

import { motion } from "motion/react";

import { HERO_DELAY, SPRING } from "@/core/motion/springs";

type HeroWatermarkProps = {
  children: string;
};

/**
 * Oversized name behind the composition. Deliberately not a heading: it repeats
 * the identity already announced by the `<h1>`, so it is hidden from assistive
 * technology rather than read twice.
 */
export function HeroWatermark({ children }: HeroWatermarkProps) {
  return (
    <motion.div
      aria-hidden
      // The size steps up rather than using `text-watermark` everywhere: at the
      // 360px design base a 13rem word is wider than the screen.
      className="pointer-events-none absolute inset-x-0 bottom-20 select-none text-center text-[3.5rem] font-bold leading-none tracking-[-0.03em] text-white/65 sm:text-[7rem] lg:bottom-28 lg:text-watermark"
      initial={{ opacity: 0, y: "1.25rem" }}
      animate={{ opacity: 1, y: "0rem" }}
      transition={{ ...SPRING.watermark, delay: HERO_DELAY.watermark }}
    >
      {children}
    </motion.div>
  );
}
