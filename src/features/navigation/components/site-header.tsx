"use client";

import { motion } from "motion/react";
import Link from "next/link";

import { HoverLift } from "@/components/ui/hover-lift";
import { LogoMark } from "@/components/ui/icons";
import { Shell } from "@/components/ui/shell";
import { localeHref, type Locale } from "@/core/i18n/config";
import { HERO_DELAY, SPRING } from "@/core/motion/springs";

import { LocalClock } from "./local-clock";
import { LocaleSwitcher } from "./locale-switcher";

type SiteHeaderProps = {
  locale: Locale;
  copy: {
    brand: string;
    localTime: string;
    switchLocale: string;
    switchLocaleLabel: string;
  };
};

/**
 * Header overlaying the hero.
 *
 * Scope note: this carries the brand, the clock and the locale switch. The
 * primary nav list and the full-screen menu overlay arrive with the pages they
 * would link to — a menu pointing at routes that do not exist yet is worse than
 * no menu. `PRIMARY_NAV` in `core/config/site.ts` already holds the routes, so
 * that is an additive change, not a rewrite. See docs/code.md § Roadmap.
 */
export function SiteHeader({ locale, copy }: SiteHeaderProps) {
  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING.header, delay: HERO_DELAY.header }}
    >
      <Shell className="flex items-center justify-between gap-6 py-5 sm:py-6">
        <Link
          href={localeHref(locale)}
          className="rounded-control"
          aria-label={copy.brand}
        >
          <HoverLift
            lift={0}
            scale={1.04}
            spring="hover"
            className="flex items-center gap-2 text-lg font-semibold tracking-[-0.01em] text-foreground"
          >
            <LogoMark className="text-xl text-accent" />
            {copy.brand}
          </HoverLift>
        </Link>

        <div className="flex items-center gap-3">
          <LocalClock locale={locale} label={copy.localTime} />
          <LocaleSwitcher
            locale={locale}
            label={copy.switchLocale}
            description={copy.switchLocaleLabel}
          />
        </div>
      </Shell>
    </motion.header>
  );
}
