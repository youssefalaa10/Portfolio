"use client";

import Image from "next/image";

import { HERO_PORTRAIT } from "@/core/config/assets";
import { cn } from "@/core/utils/cn";

import {
  PORTRAIT_BASE_FILTER,
  PORTRAIT_OBJECT_POSITION_CLASS,
} from "../constants";
import { useCursorRelight } from "../hooks/use-cursor-relight";
import { CursorLens } from "./cursor-lens";

type HeroPortraitProps = {
  alt: string;
  /** Instruction shown inside the cursor lens. */
  lensLabel: string;
  /**
   * Must establish a positioning context — `<Image fill>`, the canvas and the
   * lens all resolve against it. Deliberately not defaulted to `relative` here:
   * Tailwind emits `.relative` after `.absolute`, so a built-in `relative` would
   * beat an `absolute` passed by the caller regardless of class order.
   */
  className: string;
};

/**
 * Three layers, one rectangle: the portrait, the light the cursor paints on it,
 * and the lens that tracks the pointer.
 *
 * The box owns the geometry, so none of the layers computes a position — which
 * is what keeps the light registered with the subject at every viewport size.
 */
export function HeroPortrait({
  alt,
  lensLabel,
  className,
}: HeroPortraitProps) {
  const { containerRef, canvasRef, active } = useCursorRelight({
    src: HERO_PORTRAIT.rawSrc,
  });

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <Image
        src={HERO_PORTRAIT.src}
        alt={alt}
        fill
        preload
        sizes="(min-width: 1280px) 52vw, (min-width: 1024px) 56vw, (min-width: 640px) 70vw, 92vw"
        className={cn(
          "object-cover",
          PORTRAIT_OBJECT_POSITION_CLASS,
          PORTRAIT_BASE_FILTER,
        )}
      />

      {/* Composited normally, on purpose — no blend mode. The canvas holds the
          same photograph in full colour, so ordinary source-over is all that is
          needed and the hue is exactly the photograph's own. */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full"
      />

      {active ? <CursorLens targetRef={containerRef} label={lensLabel} /> : null}
    </div>
  );
}
