"use client";

import { motion } from "motion/react";

import { HoverLift } from "@/components/ui/hover-lift";
import { CircleDot } from "@/components/ui/icons";
import { STACK } from "@/core/config/site";
import { STAGGER } from "@/core/motion/springs";
import { fadeUp, staggerContainer } from "@/core/motion/variants";

type HeroStackProps = {
  label: string;
};

/**
 * The technologies the work is built with. Adapted from the reference's
 * "Trusted by" partner grid — a personal portfolio has a stack, not a client
 * roster. Names come from `core/config/site.ts` because they are proper nouns
 * and identical in every locale.
 */
export function HeroStack({ label }: HeroStackProps) {
  return (
    <div className="w-full max-w-96 lg:w-76">
      <p className="mb-3 text-xs font-medium text-foreground/45 lg:text-end">
        {label}
      </p>

      {/* Wrapping rather than a fixed grid: "TypeScript" and "Firebase" do not
          fit a quarter of this column, and a truncated tool name is no name. */}
      <motion.ul
        className="flex flex-wrap gap-x-4 gap-y-2 lg:justify-end"
        variants={staggerContainer(STAGGER.chip)}
        initial="hidden"
        animate="visible"
      >
        {STACK.map((item) => (
          <motion.li key={item} variants={fadeUp(0.5)}>
            <HoverLift
              spring="chip"
              from={0.7}
              className="flex items-center gap-1.5 whitespace-nowrap text-xs text-foreground/70"
            >
              <CircleDot className="shrink-0 text-sm text-foreground/40" />
              {item}
            </HoverLift>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
