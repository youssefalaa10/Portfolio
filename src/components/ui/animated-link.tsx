"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { SPRING } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

const MotionLink = motion.create(Link);

type AnimatedLinkProps = {
  children: ReactNode;
  href: string;
  /** Inline-axis travel on hover, in px. */
  shift?: number;
  /** Resting opacity; hover always settles at 1. */
  from?: number;
  /** Set for links that leave the site. */
  external?: boolean;
  className?: string;
};

function isProtocolHref(href: string) {
  return !href.startsWith("/") && !href.startsWith("#");
}

/**
 * Text link that slides along the inline axis on hover. The `rtl:-scale-x-100`
 * wrapper mirrors both the glyph order and the motion's coordinate space, so one
 * positive `x` is correct in both directions.
 */
export function AnimatedLink({
  children,
  href,
  shift = 4,
  from = 0.65,
  external = false,
  className,
}: AnimatedLinkProps) {
  const gesture = {
    className: cn("inline-flex", className),
    initial: "rest",
    animate: "rest",
    whileHover: "hover",
    whileFocus: "hover",
  } as const;

  // Three levels on purpose: the outer flip mirrors the motion's coordinate
  // space so `x` travels along the inline axis, and the inner flip un-mirrors
  // the text so it stays readable. Collapsing them would either reverse the
  // travel direction in Arabic or render the label backwards.
  const inner = (
    <span className="inline-flex rtl:-scale-x-100">
      <motion.span
        className="inline-flex"
        variants={{
          rest: { x: 0, opacity: from },
          hover: { x: shift, opacity: 1 },
        }}
        transition={SPRING.lift}
      >
        <span className="inline-flex rtl:-scale-x-100">{children}</span>
      </motion.span>
    </span>
  );

  if (external || isProtocolHref(href)) {
    return (
      <motion.a
        {...gesture}
        href={href}
        {...(external
          ? { target: "_blank", rel: "noreferrer noopener" }
          : null)}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <MotionLink {...gesture} href={href}>
      {inner}
    </MotionLink>
  );
}
