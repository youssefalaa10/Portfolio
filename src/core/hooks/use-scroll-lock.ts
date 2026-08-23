"use client";

import { useEffect } from "react";

/**
 * Freezes page scroll while an overlay is open.
 *
 * Compensates for the scrollbar's width so locking does not shift the layout
 * sideways, and counts nested locks — two overlays open at once must not have the
 * first one to close release the page.
 */
let locks = 0;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const { body, documentElement } = document;
    locks += 1;

    if (locks === 1) {
      const gutter = window.innerWidth - documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (gutter > 0) body.style.paddingInlineEnd = `${gutter}px`;
    }

    return () => {
      locks -= 1;
      if (locks === 0) {
        body.style.removeProperty("overflow");
        body.style.removeProperty("padding-inline-end");
      }
    };
  }, [active]);
}
