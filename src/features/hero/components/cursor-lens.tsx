"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

import { useInteractivePointer } from "@/core/hooks/use-interactive-pointer";

import { CURSOR_LENS } from "../constants";

type CursorLensProps = {
  /** The element the lens tracks. Nothing renders while the pointer is elsewhere. */
  targetRef: React.RefObject<HTMLElement | null>;
  /** Short instruction shown inside the lens. */
  label: string;
};

/**
 * A soft ring that follows the pointer while it is over the portrait, so the
 * relight is discoverable and the cursor has something to hold onto.
 *
 * Spring-tracked rather than pinned to the pointer: a lens that lags very
 * slightly reads as glass with weight, while one locked to the exact pixel reads
 * as a stuck overlay. It never renders on touch or under reduced motion.
 */
export function CursorLens({ targetRef, label }: CursorLensProps) {
  const interactive = useInteractivePointer();
  const [inside, setInside] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, {
    stiffness: CURSOR_LENS.stiffness,
    damping: CURSOR_LENS.damping,
  });
  const y = useSpring(rawY, {
    stiffness: CURSOR_LENS.stiffness,
    damping: CURSOR_LENS.damping,
  });

  useEffect(() => {
    if (!interactive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = targetRef.current;
    if (!target) return;

    const onMove = (event: PointerEvent) => {
      const rect = target.getBoundingClientRect();
      const withinX = event.clientX >= rect.left && event.clientX <= rect.right;
      const withinY = event.clientY >= rect.top && event.clientY <= rect.bottom;
      const within = withinX && withinY;

      if (within) {
        rawX.set(event.clientX - rect.left);
        rawY.set(event.clientY - rect.top);
      }

      setInside(within);
    };

    const onLeave = () => setInside(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [interactive, rawX, rawY, targetRef]);

  if (!interactive) return null;

  return (
    <motion.div
      aria-hidden
      // Ink-on-light rather than light-on-light: the lens has to stay legible
      // over both the pale backdrop and the near-black suit.
      className="pointer-events-none absolute z-30 grid place-items-center rounded-pill bg-ink/70 text-center text-[0.6rem] font-medium uppercase leading-tight tracking-[0.08em] text-white ring-1 ring-white/25 backdrop-blur-sm"
      style={{
        x,
        y,
        width: `${CURSOR_LENS.size}rem`,
        height: `${CURSOR_LENS.size}rem`,
        // Centre the lens on the pointer without disturbing the spring values.
        translate: "-50% -50%",
      }}
      initial={false}
      animate={{ opacity: inside ? 1 : 0, scale: inside ? 1 : 0.6 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="max-w-[4rem] px-1">{label}</span>
    </motion.div>
  );
}
