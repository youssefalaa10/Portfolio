"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { ArrowUpRight } from "@/components/ui/icons";
import { SPRING } from "@/core/motion/springs";

import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
  title: string;
  summary: string;
};

/**
 * Ink card on the light page — the reference's portfolio card language.
 *
 * Hover lifts the card and rotates the badge from one gesture on the root, the
 * same pattern as `PillButton`. Not a link yet: the detail route does not exist,
 * and a card that navigates nowhere is worse than a card that does not pretend to.
 */
export function ProjectCard({ project, title, summary }: ProjectCardProps) {
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
        sizes="(min-width: 768px) 44vw, 90vw"
        className="object-cover opacity-40"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20"
      />

      <motion.span
        aria-hidden
        className="absolute end-6 top-6 grid size-11 place-items-center rounded-pill bg-white/10 text-white ring-1 ring-white/15 sm:end-8 sm:top-8"
        variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: 45, scale: 1.08 } }}
        transition={SPRING.nudge}
      >
        <ArrowUpRight />
      </motion.span>

      <div className="relative">
        <h3 className="text-2xl font-medium tracking-[-0.01em] sm:text-3xl">
          {title}
        </h3>
        <p className="mt-2 max-w-112 text-sm text-white/55">{summary}</p>
      </div>
    </motion.article>
  );
}
