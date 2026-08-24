"use client";

import { motion } from "motion/react";

import { SPRING } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

import type { Annotation } from "../data/annotations";

type AnnotationLabelProps = {
  annotation: Annotation;
  label: string;
  /** Order in the reveal sequence. */
  index: number;
};

const VIEWPORT = { once: true, margin: "0px 0px -18% 0px" } as const;

/**
 * Where the device's edge sits, as a percentage of the stage.
 *
 * The phone is a centred `w-[30%]` column at `lg`, so it occupies 35–65%. Each
 * annotation is stretched from its own outer inset to just short of that edge,
 * which is what lets the connector actually *reach* the device instead of being
 * a fixed-width stub floating in the gap.
 */
const DEVICE_EDGE = 66;

/**
 * One workflow label and the line that connects it to the device.
 *
 * Reveals once and then holds still — the brief asked for elements that settle
 * rather than elements that keep moving, and a label that drifts forever pulls
 * attention off the work.
 *
 * The connector has three parts, because a bare curve reads as a stray hairline:
 * a dot where it leaves the label, the curve itself, and an arrowhead where it
 * meets the phone. The curve is drawn in a stretched viewBox (cheap, and
 * `non-scaling-stroke` keeps the weight honest), while the dot and the head are
 * separate un-stretched marks so they never skew.
 *
 * A gradient stroke fades the line out at the label end, so the eye is pulled
 * toward the device rather than away from it.
 */
export function AnnotationLabel({
  annotation,
  label,
  index,
}: AnnotationLabelProps) {
  const { Icon, side, top, inset, path, secondary } = annotation;
  const delay = 0.25 + index * 0.11;
  const gradientId = `annotation-fade-${annotation.key}`;

  // Where the curve begins, read straight off the path's `M` command, so the
  // terminal dot always sits on the line instead of near it. Cheaper than
  // carrying a second coordinate in the data and impossible to get out of sync.
  const startY = Number(/^M\s*[\d.]+\s+([\d.]+)/.exec(path)?.[1] ?? 50);

  // `start`-side paths run left→right toward the device; `end`-side paths run
  // right→left. So the dot belongs at the label end of each, and the arrowhead
  // at the device end — which are opposite physical edges.
  const onStartSide = side === "start";

  return (
    <div
      className={cn(
        "pointer-events-none absolute z-20 items-center gap-2.5",
        // Connectors need horizontal room, so labels appear at `lg`; the two
        // secondary ones wait for `xl` rather than crowding in.
        secondary ? "hidden xl:flex" : "hidden lg:flex",
        side === "start" ? "flex-row" : "flex-row-reverse",
      )}
      style={
        onStartSide
          ? {
              top: `${top}%`,
              insetInlineStart: `${inset}%`,
              insetInlineEnd: `${DEVICE_EDGE}%`,
            }
          : {
              top: `${top}%`,
              insetInlineEnd: `${inset}%`,
              insetInlineStart: `${DEVICE_EDGE}%`,
            }
      }
    >
      <motion.span
        className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-line bg-white/85 px-4 py-2 text-xs font-medium text-foreground shadow-[0_0.5rem_1.5rem_-0.75rem_color-mix(in_oklab,var(--color-ink)_28%,transparent)] backdrop-blur-sm"
        initial={{ opacity: 0, y: 10, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ ...SPRING.reveal, delay }}
      >
        <span className="grid size-5 shrink-0 place-items-center rounded-pill bg-accent/12 text-[0.7rem] text-accent">
          <Icon />
        </span>
        {label}
      </motion.span>

      {/* Connector */}
      {/* One flip for RTL mirrors the path, the dot and the head together, so
          the whole connector keeps pointing at the device. */}
      <span aria-hidden className="relative h-20 min-w-0 flex-1 rtl:-scale-x-100">
        {/* Terminal dot, sitting on the curve where it leaves the label. */}
        <motion.span
          className={cn(
            "absolute size-1.5 -translate-y-1/2 rounded-pill bg-foreground/45",
            onStartSide ? "left-0" : "right-0",
          )}
          style={{ top: `${startY}%` }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ ...SPRING.nudge, delay: delay + 0.08 }}
        />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full text-foreground/45"
          fill="none"
        >
          <defs>
            {/* Fades the tail so the line emerges from the label rather than
                being welded to it. */}
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
              <stop offset="35%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
            </linearGradient>
          </defs>

          <motion.path
            d={path}
            stroke={`url(#${gradientId})`}
            strokeWidth={1.4}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={VIEWPORT}
            transition={{
              duration: 0.8,
              delay: delay + 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </svg>

        {/* Arrowhead at the device end. Un-stretched, so it stays a clean
            chevron whatever the container's aspect works out to. */}
        <motion.svg
          viewBox="0 0 12 12"
          className={cn(
            "absolute top-1/2 size-2.5 -translate-y-1/2 text-accent",
            onStartSide ? "right-0" : "left-0 -scale-x-100",
          )}
          fill="none"
          initial={{ opacity: 0, x: onStartSide ? -4 : 4 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ ...SPRING.nudge, delay: delay + 0.62 }}
        >
          <path
            d="M3 1.5 L9 6 L3 10.5"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </span>
    </div>
  );
}
