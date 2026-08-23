import type { ReactNode } from "react";

import { cn } from "@/core/utils/cn";

type MarqueeProps = {
  /** One pass of the content. It is rendered twice to make the loop seamless. */
  children: ReactNode;
  /** `end` scrolls toward the inline end instead of the start. */
  direction?: "start" | "end";
  className?: string;
};

/**
 * Infinite ticker.
 *
 * A server component: the loop is a CSS animation, so it needs no JavaScript and
 * costs nothing on the main thread. The track holds two identical halves and
 * translates by exactly -50%, which puts the seam where the copies meet — so
 * there is never a visible jump.
 *
 * The duplicate is `aria-hidden`, and the animation stops under
 * `prefers-reduced-motion` via the base rule in globals.css: endlessly moving
 * text is exactly what that preference is about.
 */
export function Marquee({
  children,
  direction = "start",
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn("edge-fade-x group relative flex overflow-hidden", className)}
    >
      <div
        className={cn(
          "flex w-max shrink-0 will-change-transform",
          direction === "start" ? "animate-marquee" : "animate-marquee-reverse",
          // Pausing on hover lets a reader actually read an item.
          "group-hover:[animation-play-state:paused]",
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
