"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

import { HERO_PORTRAIT } from "@/core/config/assets";
import { SPRING } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

import { PORTRAIT_OBJECT_POSITION_CLASS } from "../constants";
import { useLiquidReveal } from "../hooks/use-liquid-reveal";

type LiquidRevealProps = {
  alt: string;
  /** Shown only once the effect is actually running, so it never lies. */
  hint: string;
  /**
   * Must establish a positioning context — `<Image fill>` and the canvas both
   * resolve against it. Deliberately not defaulted to `relative` here: Tailwind
   * emits `.relative` after `.absolute`, so a built-in `relative` would beat an
   * `absolute` passed by the caller no matter which order the classes appear in.
   */
  className: string;
};

/**
 * Two layers, one rectangle.
 *
 * The `<Image>` is the base portrait and the hero's LCP element — it renders on
 * the server and never depends on JavaScript. The `<canvas>` above it paints a
 * warmer relight of the same photograph along the pointer's trail.
 *
 * Both layers fill the same box with the same `object-cover` geometry, which is
 * why they register pixel-for-pixel: the box owns the layout, so neither layer
 * computes a position.
 */
export function LiquidReveal({ alt, hint, className }: LiquidRevealProps) {
  const { containerRef, canvasRef, active } = useLiquidReveal({
    src: HERO_PORTRAIT.rawSrc,
  });

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <Image
        src={HERO_PORTRAIT.src}
        alt={alt}
        fill
        preload
        sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 48vw, (min-width: 640px) 64vw, 86vw"
        className={cn("object-cover", PORTRAIT_OBJECT_POSITION_CLASS)}
      />

      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full"
      />

      {/* The reveal is undiscoverable without a nudge, so the nudge appears only
          where the reveal exists — never on touch or reduced motion. */}
      <AnimatePresence>
        {active ? (
          <motion.p
            className="pointer-events-none absolute bottom-6 end-6 max-w-40 text-end text-micro font-medium uppercase tracking-[0.05em] text-foreground/40"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ ...SPRING.reveal, delay: 1.6 }}
          >
            {hint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
