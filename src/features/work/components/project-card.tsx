"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { ArrowUpRight, LogoMark } from "@/components/ui/icons";
import { TagChip } from "@/components/ui/tag-chip";
import { SPRING } from "@/core/motion/springs";

import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
  title: string;
  summary: string;
  tags: readonly string[];
};

/**
 * Ink card on the light page — the reference's portfolio card language.
 *
 * Hover lifts the card and rotates the badge from a single variant label on the
 * root, the same pattern as `PillButton`, so the two gestures cannot fall out of
 * sync.
 *
 * Not a link: the detail route does not exist yet, and a card that navigates
 * nowhere is worse than one that does not pretend to. Wrapping this in a `<Link>`
 * is the only change needed when `work/[slug]` lands.
 */
export function ProjectCard({
  project,
  title,
  summary,
  tags,
}: ProjectCardProps) {
  return (
    <motion.article
      className="relative flex min-h-88 flex-col justify-end overflow-hidden rounded-card bg-ink p-6 text-white ring-1 ring-white/5 sm:min-h-104 sm:p-8"
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { y: 0, scale: 1 }, hover: { y: -8, scale: 1.012 } }}
      transition={SPRING.panel}
    >
      <Image
        src={project.cover}
        alt=""
        fill
        sizes="(min-width: 768px) 46vw, 92vw"
        className="object-cover opacity-35"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/25"
      />

      <motion.span
        aria-hidden
        className="absolute end-6 top-6 grid size-11 place-items-center rounded-pill bg-white/10 text-white ring-1 ring-white/15 sm:end-8 sm:top-8"
        variants={{
          rest: { rotate: 0, scale: 1 },
          hover: { rotate: 45, scale: 1.08 },
        }}
        transition={SPRING.nudge}
      >
        <ArrowUpRight />
      </motion.span>

      <LogoMark
        aria-hidden
        className="pointer-events-none absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-white/10 rtl:translate-x-1/2"
      />

      <div className="relative">
        <h3 className="text-2xl font-medium tracking-[-0.01em] sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 max-w-112 text-sm text-white/55">{summary}</p>

        {tags.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <TagChip tone="light">{tag}</TagChip>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.article>
  );
}
