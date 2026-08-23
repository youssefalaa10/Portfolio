import { Eyebrow } from "@/components/ui/eyebrow";
import { LineReveal } from "@/core/components/line-reveal";
import { Reveal } from "@/core/components/reveal";
import { STAGGER } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  /** Explicit lines, so break points are a translation decision. */
  lines: readonly string[];
  tone?: "dark" | "light";
  align?: "start" | "center";
  /** Heading level. Sections use `h2`; only the hero owns the `h1`. */
  as?: "h2" | "h3";
  outlinedEyebrow?: boolean;
  className?: string;
  headingClassName?: string;
};

/**
 * Eyebrow plus clipped line-reveal heading — the pattern every section below the
 * hero opens with. Centralised so the type scale and reveal timing stay in step
 * across the page.
 */
export function SectionHeading({
  eyebrow,
  lines,
  tone = "dark",
  align = "start",
  as = "h2",
  outlinedEyebrow = false,
  className,
  headingClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <Reveal preset="fade-up" distance={0.625}>
        <Eyebrow tone={tone} outlined={outlinedEyebrow}>
          {eyebrow}
        </Eyebrow>
      </Reveal>

      <LineReveal
        as={as}
        lines={lines}
        delay={0.12}
        stagger={STAGGER.line}
        className={cn(
          "text-4xl font-semibold tracking-[-0.02em] sm:text-5xl",
          tone === "light" ? "text-white" : "text-foreground",
          align === "center" && "w-fit",
          headingClassName,
        )}
      />
    </div>
  );
}
