import type { ReactNode } from "react";

import { cn } from "@/core/utils/cn";

type EyebrowProps = {
  children: ReactNode;
  /** `dark` sits on light surfaces, `light` on ink surfaces. */
  tone?: "dark" | "light";
  /** Adds the pill outline used where the eyebrow stands alone above a heading. */
  outlined?: boolean;
  className?: string;
};

/** Small dotted label that introduces a section or a headline. */
export function Eyebrow({
  children,
  tone = "dark",
  outlined = false,
  className,
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium",
        tone === "dark" ? "text-foreground/70" : "text-white/70",
        outlined && "rounded-pill border border-line px-4 py-1.5",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 shrink-0 rounded-pill",
          tone === "dark" ? "bg-foreground/50" : "bg-white/60",
        )}
      />
      {children}
    </span>
  );
}
