import type { ElementType, ReactNode } from "react";

import { cn } from "@/core/utils/cn";

type ShellProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /**
   * Horizontal padding. `none` is for callers that need the max-width and the
   * centring but supply their own inline padding.
   */
  gutter?: "default" | "none";
};

/**
 * The page measure: `max-w-shell` centred, with the standard responsive gutter.
 * Every section's content sits inside one of these so columns line up across
 * the whole page.
 */
export function Shell({
  children,
  as: Component = "div",
  className,
  gutter = "default",
}: ShellProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-shell",
        gutter === "default" && "px-5 sm:px-8",
        className,
      )}
    >
      {children}
    </Component>
  );
}
