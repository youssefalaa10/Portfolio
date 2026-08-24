"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { ArrowLeft, ArrowRight, Cpu, Layout, Smartphone } from "@/components/ui/icons";
import { SPRING } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

/**
 * One icon per discipline, in the same order as `hero.card.items` in the
 * message files (product engineering, mobile apps, interface design). A fixed
 * abstract mark here would say nothing about which slide is showing; these say
 * exactly that, and all three already exist in the shared icon set.
 */
const DISCIPLINE_ICONS = [Cpu, Smartphone, Layout] as const;

export type HeroCardItem = {
  caption: string;
  title: string;
};

type HeroCardCopy = {
  items: readonly HeroCardItem[];
  previous: string;
  next: string;
  /** Contains `{index}`, replaced with the 1-based slide number. */
  select: string;
};

type HeroCardProps = {
  copy: HeroCardCopy;
};

const SWAP_DISTANCE = 14;

/**
 * Discipline carousel.
 *
 * Deviation from the design reference, on purpose: the reference makes the whole
 * card a click target *and* nests previous/next buttons inside it, which is
 * invalid nesting and unreachable by keyboard. Here the controls are the only
 * interactive elements — two buttons plus a dot per slide for direct access —
 * and the slide itself is a polite live region.
 */
export function HeroCard({ copy }: HeroCardProps) {
  const { items } = copy;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (step: number) => {
    setDirection(step);
    setIndex((current) => (current + step + items.length) % items.length);
  };

  const active = items[index];
  const ActiveIcon = DISCIPLINE_ICONS[index] ?? DISCIPLINE_ICONS[0];

  return (
    <div
      className="w-full max-w-96 rounded-card-sm bg-white/70 p-2 shadow-sm ring-1 ring-line/70 backdrop-blur-md lg:w-76"
      aria-roledescription="carousel"
    >
      <div className="flex gap-2 rounded-control">
        <div
          className="relative grid aspect-square w-24 shrink-0 place-items-center overflow-hidden rounded-control bg-ink text-3xl"
          aria-hidden
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: direction * SWAP_DISTANCE }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -SWAP_DISTANCE }}
              transition={SPRING.carousel}
              className="grid place-items-center text-accent-from"
            >
              <ActiveIcon />
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex flex-1 flex-col justify-between rounded-control bg-surface/70 p-3">
          <div
            className="relative min-h-13"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: direction * SWAP_DISTANCE }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: direction * -SWAP_DISTANCE }}
                transition={SPRING.carousel}
              >
                <p className="text-micro font-medium uppercase tracking-[0.05em] text-foreground/45">
                  {active.caption}
                </p>
                <p className="mt-1 max-w-32 text-sm font-medium leading-[1.35] text-foreground">
                  {active.title}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              {items.map((item, dot) => (
                <button
                  key={item.caption}
                  type="button"
                  onClick={() => {
                    setDirection(dot >= index ? 1 : -1);
                    setIndex(dot);
                  }}
                  aria-label={copy.select.replace("{index}", String(dot + 1))}
                  aria-current={dot === index}
                  className={cn(
                    "h-1 rounded-pill transition-all duration-300",
                    dot === index
                      ? "w-4 bg-foreground/70"
                      : "w-1.5 bg-foreground/20 hover:bg-foreground/40",
                  )}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <CarouselControl label={copy.previous} onClick={() => go(-1)}>
                <ArrowLeft className="rtl:-scale-x-100" />
              </CarouselControl>
              <CarouselControl label={copy.next} onClick={() => go(1)}>
                <ArrowRight className="rtl:-scale-x-100" />
              </CarouselControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarouselControl({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-7 place-items-center rounded-pill bg-white text-foreground/70 ring-1 ring-line transition-colors hover:text-foreground"
    >
      {children}
    </button>
  );
}
