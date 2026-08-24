"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "@/components/ui/icons";
import { TagChip } from "@/components/ui/tag-chip";
import { localeHref, type Locale } from "@/core/i18n/config";
import { SPRING } from "@/core/motion/springs";

import type { Project } from "../data/projects";

const MotionLink = motion.create(Link);

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  title: string;
  summary: string;
  categoryLabel: string;
  tags: readonly string[];
  viewLabel: string;
};

/**
 * Clean, image-forward case-study card — no watermark, no dimmed overlay
 * sitting on top of the artwork (see docs/code.md §13). The cover renders at
 * full brightness in a fixed ratio; the copy and tags live below it, the way
 * an app-store or product-showcase gallery presents a project rather than
 * burying it under decoration.
 *
 * Links to the project's own case-study page — the whole card is the target,
 * per the Roadmap's original note that `ProjectCard` was built to become one.
 */
export function ProjectCard({
  project,
  locale,
  title,
  summary,
  categoryLabel,
  tags,
  viewLabel,
}: ProjectCardProps) {
  return (
    <MotionLink
      href={localeHref(locale, `/work/${project.slug}`)}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-surface"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      variants={{ rest: { y: 0 }, hover: { y: -6 } }}
      transition={SPRING.panel}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-background">
        <motion.div
          className="absolute inset-0"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
          transition={SPRING.panel}
        >
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 1280px) 30vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="space-y-2">
          <span className="text-micro font-medium uppercase tracking-[0.08em] text-accent">
            {categoryLabel}
          </span>
          <h3 className="text-xl font-medium tracking-[-0.01em] text-foreground sm:text-2xl">
            {title}
          </h3>
          <p className="text-sm text-foreground/60">{summary}</p>
        </div>

        {tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <TagChip tone="dark">{tag}</TagChip>
              </li>
            ))}
          </ul>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-foreground">
          {viewLabel}
          <motion.span
            className="inline-flex"
            variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }}
            transition={SPRING.hover}
          >
            <ArrowUpRight className="rtl:-scale-x-100" />
          </motion.span>
        </span>
      </div>
    </MotionLink>
  );
}
