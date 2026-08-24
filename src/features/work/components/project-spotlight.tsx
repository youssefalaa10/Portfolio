"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { TagChip } from "@/components/ui/tag-chip";
import { SPRING } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

import { PROJECTS } from "../data/projects";

type ProjectCopy = { title: string; summary: string };

type ProjectSpotlightProps = {
  copy: Record<string, ProjectCopy>;
  labels: { previous: string; next: string; select: string };
  className?: string;
};

/**
 * Project spotlight — one project at a time, cover image with the detail card
 * overlapping it.
 *
 * Adapted from a testimonial-carousel pattern. It shows **projects** rather than
 * testimonials because the quotes a testimonial carousel needs would have had to
 * be invented, and invented endorsements are not something to ship. The same
 * layout carries real work instead: covers, names, summaries and stacks that all
 * already exist in `data/projects.ts`.
 *
 * Only the active slide is mounted, so no matter how many projects are added
 * exactly one cover image is ever in the DOM.
 */
export function ProjectSpotlight({
  copy,
  labels,
  className,
}: ProjectSpotlightProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (step: number) => {
    setDirection(step);
    setIndex((current) => (current + step + PROJECTS.length) % PROJECTS.length);
  };

  const project = PROJECTS[index];
  const entry = copy[project.slug];

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex flex-col md:flex-row md:items-center">
        {/* Cover */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-surface md:aspect-square md:w-[52%] md:shrink-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.slug}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={project.cover}
                alt=""
                fill
                sizes="(min-width: 768px) 52vw, 92vw"
                className="object-cover"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Detail card, pulled back over the cover on desktop. */}
        <div className="relative z-10 -mt-10 mx-4 rounded-card border border-line bg-background p-7 shadow-[0_1.5rem_4rem_-1.5rem_color-mix(in_oklab,var(--color-ink)_30%,transparent)] sm:p-9 md:-mt-0 md:mx-0 md:-ms-16 md:flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.slug}
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: direction * 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -14 }}
              transition={SPRING.carousel}
            >
              <div className="flex flex-col gap-2">
                <span className="text-micro font-medium uppercase tracking-[0.08em] text-accent">
                  {`0${index + 1} / 0${PROJECTS.length}`}
                </span>
                <h3 className="text-2xl font-medium tracking-[-0.01em] sm:text-3xl">
                  {entry.title}
                </h3>
              </div>

              <p className="text-base text-foreground/65">{entry.summary}</p>

              {project.tags.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <TagChip tone="dark">{tag}</TagChip>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <SpotlightControl label={labels.previous} onClick={() => go(-1)}>
          <ArrowLeft className="rtl:-scale-x-100" />
        </SpotlightControl>

        <div className="flex items-center gap-2">
          {PROJECTS.map((item, dot) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => {
                setDirection(dot >= index ? 1 : -1);
                setIndex(dot);
              }}
              aria-label={labels.select.replace("{index}", String(dot + 1))}
              aria-current={dot === index}
              className={cn(
                "h-1.5 rounded-pill transition-all duration-300",
                dot === index
                  ? "w-6 bg-foreground/70"
                  : "w-1.5 bg-foreground/20 hover:bg-foreground/40",
              )}
            />
          ))}
        </div>

        <SpotlightControl label={labels.next} onClick={() => go(1)}>
          <ArrowRight className="rtl:-scale-x-100" />
        </SpotlightControl>
      </div>
    </div>
  );
}

function SpotlightControl({
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
      className="grid size-12 place-items-center rounded-pill border border-line bg-background text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {children}
    </button>
  );
}
