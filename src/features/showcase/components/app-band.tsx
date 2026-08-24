"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Shell } from "@/components/ui/shell";
import { LineReveal } from "@/core/components/line-reveal";
import { Reveal } from "@/core/components/reveal";
import { STORE_LINKS } from "@/core/config/site";
import { STAGGER } from "@/core/motion/springs";
import { AppBandRequestButton } from "./app-band-request-button";
import { PhoneFrame } from "./phone-frame";
import { StoreBadge } from "./store-badge";

export type AppBandCopy = {
  eyebrow: string;
  heading: readonly string[];
  body: string;
  cta: string;
  screenLabel: string;
  appStoreKicker: string;
  appStoreName: string;
  googlePlayKicker: string;
  googlePlayName: string;
};

/**
 * Full-bleed accent band promoting the apps.
 *
 * The accent is used at full strength here and nowhere else on the page, which
 * is what lets one band carry this much weight without the rest of the site
 * having to shout. Everything on it is a token: `accent-from → accent-to` for the
 * ground, `ink` for the pills, white for type.
 *
 * Store badges render **only** once their URLs exist in `core/config/site.ts`.
 * Until then the band still works — the request CTA carries it — so nothing here
 * links anywhere that isn't real.
 */
export function AppBand({ copy }: { copy: AppBandCopy }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // A slow counter-drift on the device: enough to feel alive as the band passes,
  // small enough that it never competes with the copy. Transform only.
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const hasStoreLinks = Boolean(STORE_LINKS.appStore || STORE_LINKS.googlePlay);

  return (
    <section className="bg-background py-10 lg:py-16">
      <Shell>
        <div
          ref={ref}
          className="relative overflow-hidden rounded-card bg-gradient-to-br from-accent-from via-accent to-accent-to text-white"
        >
          {/* Soft light from the top-end corner, so the slab has a direction. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -end-16 -top-24 size-80 rounded-pill bg-white/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 items-center gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:gap-8 lg:px-14">
            {/* Copy */}
            <div className="flex flex-col gap-6 lg:col-span-7">
              <Reveal preset="fade-up" distance={0.625}>
                <Eyebrow tone="light">{copy.eyebrow}</Eyebrow>
              </Reveal>

              <LineReveal
                as="h2"
                lines={copy.heading}
                delay={0.1}
                stagger={STAGGER.line}
                className="max-w-[20ch] text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl md:text-5xl"
              />

              <Reveal delay={0.2}>
                <p className="max-w-[48ch] text-base text-white/80">
                  {copy.body}
                </p>
              </Reveal>

              <Reveal delay={0.3} className="flex flex-wrap items-center gap-3">
                {hasStoreLinks ? (
                  <>
                    {STORE_LINKS.appStore ? (
                      <StoreBadge
                        href={STORE_LINKS.appStore}
                        kicker={copy.appStoreKicker}
                        name={copy.appStoreName}
                        store="apple"
                      />
                    ) : null}
                    {STORE_LINKS.googlePlay ? (
                      <StoreBadge
                        href={STORE_LINKS.googlePlay}
                        kicker={copy.googlePlayKicker}
                        name={copy.googlePlayName}
                        store="google"
                      />
                    ) : null}
                  </>
                ) : (
                  <AppBandRequestButton label={copy.cta} />
                )}
              </Reveal>
            </div>

            {/* Device. Cropped by the band's bottom edge on purpose — it reads as
                rising out of the slab rather than floating on it. */}
            <div className="relative lg:col-span-5">
              <motion.div
                className="mx-auto w-[58%] max-w-[16rem] sm:w-[42%] lg:w-full lg:max-w-[15rem]"
                style={reduced ? undefined : { y }}
              >
                <PhoneFrame label={copy.screenLabel} />
              </motion.div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
