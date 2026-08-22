import { Shell } from "@/components/ui/shell";
import { ArrowDown } from "@/components/ui/icons";
import { Reveal } from "@/core/components/reveal";
import { HERO_DELAY } from "@/core/motion/springs";

type HeroStatusBarProps = {
  copy: {
    availability: string;
    location: string;
    scroll: string;
  };
};

/** Hairline footer to the hero: availability, location, and a scroll cue. */
export function HeroStatusBar({ copy }: HeroStatusBarProps) {
  return (
    <Reveal
      preset="fade"
      trigger="mount"
      delay={HERO_DELAY.status}
      className="relative z-20"
    >
      <Shell className="flex items-center justify-between gap-3 border-t border-foreground/10 py-5 text-xs font-medium uppercase tracking-[0.025em] text-foreground/60">
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="size-1.5 rounded-pill bg-accent"
          />
          {copy.availability}
        </span>

        <span className="hidden sm:inline">{copy.location}</span>

        <span className="inline-flex items-center gap-2">
          {copy.scroll}
          <ArrowDown className="text-sm" />
        </span>
      </Shell>
    </Reveal>
  );
}
