"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { SPRING } from "@/core/motion/springs";
import { fade, fadeUp, ONCE_IN_VIEW } from "@/core/motion/variants";
import { cn } from "@/core/utils/cn";

export type ScrollTimelineEvent = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
};

type ScrollTimelineProps = {
  events: readonly ScrollTimelineEvent[];
  title?: string;
  subtitle?: string;
  /** Draws a fill-as-you-scroll line down the spine. */
  progressIndicator?: boolean;
  /** `alternating` zig-zags left/right at `sm` and up; `start` stacks one column. */
  cardAlignment?: "alternating" | "start";
  revealAnimation?: "fade" | "slide";
  className?: string;
};

/**
 * A vertical timeline that reveals its entries as the reader scrolls past
 * them, with an optional scroll-driven progress line down the spine.
 *
 * Bespoke build (see docs/code.md §13/§19), matching the real `lightswind`
 * package's prop surface without the dependency — built on the reveal
 * primitives (`fade`, `fadeUp`, `ONCE_IN_VIEW`) and springs already in
 * `core/motion`, so it reveals exactly like every other section on the page.
 */
export function ScrollTimeline({
  events,
  title,
  subtitle,
  progressIndicator = false,
  cardAlignment = "alternating",
  revealAnimation = "fade",
  className,
}: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, SPRING.reveal);

  const itemVariants = revealAnimation === "slide" ? fadeUp(1.5) : fade;
  const alternating = cardAlignment === "alternating";

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {title || subtitle ? (
        <div className="mb-12 text-center">
          {title ? (
            <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h3>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-foreground/60">{subtitle}</p>
          ) : null}
        </div>
      ) : null}

      <div className="relative">
        <div
          aria-hidden
          className="absolute start-4 top-0 bottom-0 w-px -translate-x-1/2 bg-line sm:start-1/2"
        >
          {progressIndicator ? (
            <motion.div
              aria-hidden
              className="absolute inset-x-0 top-0 h-full w-px origin-top bg-accent"
              style={{ scaleY: progress }}
            />
          ) : null}
        </div>

        <ol className="flex flex-col gap-10">
          {events.map((event, index) => {
            const onEnd = alternating && index % 2 === 1;

            return (
              <motion.li
                key={`${event.year}-${event.title}`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={ONCE_IN_VIEW}
                transition={{ delay: (index % 4) * 0.06 }}
                className={cn(
                  "relative ps-12 sm:ps-0",
                  alternating && "sm:grid sm:grid-cols-2 sm:gap-10",
                )}
              >
                <span
                  aria-hidden
                  className="absolute start-4 top-1.5 size-3 -translate-x-1/2 rounded-pill border-2 border-background bg-accent sm:start-1/2"
                />

                <div
                  className={cn(
                    alternating &&
                      (onEnd ? "sm:col-start-2" : "sm:col-start-1 sm:text-end"),
                  )}
                >
                  <div className="rounded-card-sm border border-line bg-surface p-6">
                    <span className="inline-block rounded-pill bg-background px-3 py-1 font-mono text-xs font-medium text-accent">
                      {event.year}
                    </span>
                    <h4 className="mt-3 text-lg font-semibold text-foreground">
                      {event.title}
                    </h4>
                    <p className="text-sm text-foreground/50">{event.subtitle}</p>
                    <p className="mt-2 text-sm font-light leading-relaxed text-foreground/65">
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
