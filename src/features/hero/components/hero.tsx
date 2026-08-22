import { Eyebrow } from "@/components/ui/eyebrow";
import { Star } from "@/components/ui/icons";
import { PillButton } from "@/components/ui/pill-button";
import { Shell } from "@/components/ui/shell";
import { LineReveal } from "@/core/components/line-reveal";
import { Reveal } from "@/core/components/reveal";
import { CONTACT_HREF } from "@/core/config/site";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { localeHref, type Locale } from "@/core/i18n/config";
import { HERO_DELAY, STAGGER } from "@/core/motion/springs";

import { HeroCard } from "./hero-card";
import { HeroStack } from "./hero-stack";
import { HeroStatusBar } from "./hero-status-bar";
import { HeroVisual } from "./hero-visual";

type HeroProps = {
  locale: Locale;
  copy: Dictionary["hero"];
};

const STAR_COUNT = 5;

/**
 * Above-the-fold composition. A server component: only the pieces that animate
 * or respond to the pointer cross into the client, which keeps the hero's
 * JavaScript to the reveal canvas, the carousel and the entrance springs.
 *
 * Entrance timings come from `HERO_DELAY` so the choreography is readable in one
 * place. Reveals here use `trigger="mount"` — above the fold, waiting on an
 * intersection would show a visible pop.
 */
export function Hero({ locale, copy }: HeroProps) {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden rounded-b-card bg-hero-to"
    >
      <HeroVisual
        portraitAlt={copy.portraitAlt}
        revealHint={copy.revealHint}
        watermark={copy.watermark}
      />

      <Shell className="relative z-20 flex flex-col gap-8 pb-20 pt-28 lg:grid lg:min-h-[100lvh] lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-36">
        {/* Left: the statement. */}
        <div className="flex flex-col gap-7 lg:col-span-7 lg:justify-center">
          <Reveal
            preset="fade-up"
            distance={0.625}
            trigger="mount"
            delay={HERO_DELAY.eyebrow}
          >
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </Reveal>

          <LineReveal
            as="h1"
            lines={copy.headline}
            trigger="mount"
            delay={HERO_DELAY.headline}
            stagger={STAGGER.line}
            className="max-w-[18ch] text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl"
          />

          <Reveal
            trigger="mount"
            delay={HERO_DELAY.credential}
            className="flex items-center gap-3"
          >
            <span className="flex items-center gap-0.5 text-base text-accent">
              {Array.from({ length: STAR_COUNT }, (_, index) => (
                <Star key={index} />
              ))}
            </span>
            <span className="text-sm font-medium text-foreground/70">
              {copy.credential}
            </span>
          </Reveal>

          <Reveal
            trigger="mount"
            delay={HERO_DELAY.actions}
            className="flex flex-wrap items-center gap-3"
          >
            <PillButton href={CONTACT_HREF} variant="dark" arrow="up-right">
              {copy.ctaPrimary}
            </PillButton>
            <PillButton href={localeHref(locale, "/work")} variant="outline">
              {copy.ctaSecondary}
            </PillButton>
          </Reveal>
        </div>

        {/* Right: the card and the stack, held to the bottom of the column so
            they sit across the subject's shoulders rather than over the face. */}
        <div className="flex flex-col items-start gap-8 lg:col-span-5 lg:items-end lg:justify-end">
          <Reveal preset="scale-in" trigger="mount" delay={HERO_DELAY.card}>
            <HeroCard copy={copy.card} />
          </Reveal>

          <Reveal
            distance={0.875}
            trigger="mount"
            delay={HERO_DELAY.stack}
            className="w-full lg:flex lg:justify-end"
          >
            <HeroStack label={copy.stack.label} />
          </Reveal>
        </div>
      </Shell>

      <HeroStatusBar copy={copy.status} />
    </section>
  );
}
