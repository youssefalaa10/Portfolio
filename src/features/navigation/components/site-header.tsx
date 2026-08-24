"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { HoverLift } from "@/components/ui/hover-lift";
import { BrandMark, Download, MenuGrid } from "@/components/ui/icons";
import { Shell } from "@/components/ui/shell";
import { CV_ASSET } from "@/core/config/assets";
import { localeHref, type Locale } from "@/core/i18n/config";
import { HERO_DELAY, SPRING } from "@/core/motion/springs";

import { LocaleSwitcher } from "./locale-switcher";
import { NavMenu } from "./nav-menu";
import { PrimaryNav, type NavLabels } from "./nav-link";

type SiteHeaderProps = {
  locale: Locale;
  labels: NavLabels;
  copy: {
    brand: string;
    menu: string;
    close: string;
    downloadCv: string;
    tagline: string;
    switchLocale: string;
    switchLocaleLabel: string;
  };
};

const CHIP =
  "rounded-control border border-line/80 bg-white/40 backdrop-blur-sm transition-colors hover:bg-white/70";

/**
 * Header overlaying the hero: brand, primary nav, CV, locale switch, and the
 * menu trigger for narrow viewports.
 *
 * The live clock the design reference carries here was dropped — on a portfolio
 * the top-right corner is worth more as a way to reach the work and the CV than
 * as a readout of what time it is where Youssef lives.
 */
export function SiteHeader({ locale, labels, copy }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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
              <BrandMark className="text-2xl text-foreground" />
              {copy.brand}
            </HoverLift>
          </Link>

          <PrimaryNav locale={locale} labels={labels} />

          <div className="flex items-center gap-2 sm:gap-3">
            {/* A download, so a plain anchor — the client router would navigate
                to the PDF instead of saving it. */}
            <a
              href={CV_ASSET.href}
              download={CV_ASSET.downloadAs}
              className={`${CHIP} hidden md:block`}
            >
              <HoverLift
                lift={0}
                scale={1.05}
                spring="hover"
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-[0.05em] text-foreground"
              >
                <Download className="text-sm text-foreground/60" />
                {copy.downloadCv}
              </HoverLift>
            </a>

            <LocaleSwitcher
              locale={locale}
              label={copy.switchLocale}
              description={copy.switchLocaleLabel}
            />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              className={`${CHIP} lg:hidden`}
            >
              <HoverLift
                lift={0}
                scale={1.05}
                spring="hover"
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-[0.05em] text-foreground"
              >
                <MenuGrid className="text-sm" />
                <span className="sr-only sm:not-sr-only">{copy.menu}</span>
              </HoverLift>
            </button>
          </div>
        </Shell>
      </motion.header>

      <NavMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        locale={locale}
        labels={labels}
        copy={{
          brand: copy.brand,
          close: copy.close,
          downloadCv: copy.downloadCv,
          tagline: copy.tagline,
        }}
      />
    </>
  );
}
