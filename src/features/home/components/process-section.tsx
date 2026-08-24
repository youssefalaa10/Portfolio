"use client";

import { motion } from "motion/react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { fadeUp, ONCE_IN_VIEW } from "@/core/motion/variants";

type ProcessSectionProps = {
  copy: Dictionary["home"]["process"];
};

export function ProcessSection({ copy }: ProcessSectionProps) {
  return (
    <section className="border-b border-line bg-surface/40 py-20 lg:py-28">
      <Shell className="space-y-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={copy.eyebrow}
            lines={copy.heading}
            headingClassName="max-w-[16ch]"
          />
          <p className="max-w-md text-sm font-light text-foreground/65">
            {copy.intro}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step, index) => (
            <motion.div
              key={step.num}
              variants={fadeUp(1.5)}
              initial="hidden"
              whileInView="visible"
              viewport={ONCE_IN_VIEW}
              transition={{ delay: index * 0.08 }}
              className="relative flex flex-col justify-between rounded-card border border-line bg-background p-6 transition-all hover:border-foreground/30"
            >
              <div className="space-y-4">
                <span className="font-mono text-2xl font-bold tracking-tight text-accent">
                  {step.num}
                </span>

                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>

                <p className="text-xs font-light leading-relaxed text-foreground/65">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Shell>
    </section>
  );
}
