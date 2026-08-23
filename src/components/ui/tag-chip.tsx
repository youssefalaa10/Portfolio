import type { ReactNode } from "react";

import { cn } from "@/core/utils/cn";

type TagChipProps = {
  children: ReactNode;
  /** `light` sits on ink surfaces, `dark` on light ones. */
  tone?: "light" | "dark";
  className?: string;
};

/** Outlined pill used for tags and small labels. */
export function TagChip({ children, tone = "light", className }: TagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-4 py-2 text-sm",
        tone === "light"
          ? "border-white/25 text-white"
          : "border-line text-foreground/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
