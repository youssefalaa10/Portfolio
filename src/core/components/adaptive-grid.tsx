"use client";

import { useEffect } from "react";

const FONT_BASE = 16;
const BASE_WIDTH = 1920;
/** Damping, so very wide displays grow the layout without running away. */
const COEF = 0.6666;

/**
 * Scales the root font-size *up* beyond the 1920px design base.
 *
 * Everything below 1920px is handled by the media queries in globals.css — this
 * only fills the gap above them, where a vw-based rule would keep growing
 * unchecked. Below the base it removes the inline size so the stylesheet stays
 * in charge.
 *
 * Renders nothing; it exists so the effect has a home outside the layout tree.
 */
export function AdaptiveGrid() {
  useEffect(() => {
    const root = document.documentElement;

    const apply = () => {
      const widthReduction =
        ((BASE_WIDTH - window.innerWidth) / BASE_WIDTH) * 100;
      const size = FONT_BASE - (FONT_BASE * (widthReduction * COEF)) / 100;

      if (size > FONT_BASE) {
        root.style.fontSize = `${size}px`;
      } else {
        root.style.removeProperty("font-size");
      }
    };

    apply();
    window.addEventListener("resize", apply, { passive: true });

    return () => {
      window.removeEventListener("resize", apply);
      root.style.removeProperty("font-size");
    };
  }, []);

  return null;
}
