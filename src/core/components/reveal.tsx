"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { fade, fadeUp, ONCE_IN_VIEW, scaleIn } from "@/core/motion/variants";

type RevealPreset = "fade-up" | "fade" | "scale-in";

type RevealProps = {
  children: ReactNode;
  /** Which primitive to play. Defaults to `fade-up`. */
  preset?: RevealPreset;
  /** Rise distance in rem, for the `fade-up` preset. */
  distance?: number;
  /** Seconds to wait before playing. */
  delay?: number;
  /**
   * `mount` plays immediately — used above the fold, where waiting for an
   * intersection would mean a visible pop. `in-view` plays once on scroll.
   */
  trigger?: "mount" | "in-view";
  className?: string;
  /** Render as a different element so reveals do not break list semantics. */
  as?: "div" | "li" | "span" | "section";
};

/**
 * The single entry point for entrance animation. Wrapping server-rendered
 * children keeps the client boundary at this component instead of pushing
 * `"use client"` up into whole sections.
 */
export function Reveal({
  children,
  preset = "fade-up",
  distance = 0.75,
  delay = 0,
  trigger = "in-view",
  className,
  as = "div",
}: RevealProps) {
  const variants =
    preset === "fade" ? fade : preset === "scale-in" ? scaleIn : fadeUp(distance);

  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      {...(trigger === "mount"
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: ONCE_IN_VIEW })}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
