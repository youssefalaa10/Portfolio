"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Final value. */
  value: number;
  /** Appended verbatim — "+", "%", or nothing. */
  suffix?: string;
  className?: string;
};

/**
 * Counts up once when it enters view, then holds the final value.
 *
 * Deliberately not scroll-linked. Tying the digits to scroll progress — which is
 * what the design reference does — means the number reads 0 whenever the panel
 * is not inside the trigger window: scroll past it and back, or arrive by anchor,
 * and the page claims zero of everything. A number is information first and an
 * animation second, so it latches.
 *
 * Under reduced motion it lands on the value immediately. Either way the first
 * render is 0 on the server and on the client, so there is no hydration mismatch.
 */
export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(count, "change", (latest) =>
    setDisplay(Math.round(latest)),
  );

  useEffect(() => {
    if (!inView) return;

    const controls = animate(count, value, {
      duration: reduced ? 0 : 1.4,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [inView, value, count, reduced]);

  return (
    <span ref={ref} className={className}>
      <motion.span className="tabular-nums">{display}</motion.span>
      {suffix}
    </span>
  );
}
