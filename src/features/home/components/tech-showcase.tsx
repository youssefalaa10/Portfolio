"use client";

import { motion } from "motion/react";

import { Database, Monitor, Smartphone } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { fadeUp, ONCE_IN_VIEW } from "@/core/motion/variants";

type TechShowcaseProps = {
  copy: Dictionary["home"]["techShowcase"];
};

export function TechShowcase({ copy }: TechShowcaseProps) {
  const getCatIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Smartphone className="text-2xl text-accent" />;
      case 1:
        return <Monitor className="text-2xl text-accent" />;
      default:
        return <Database className="text-2xl text-accent" />;
    }
  };

  return (
    <section className="border-b border-line bg-background py-20 lg:py-28">
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

        <div className="grid gap-8 md:grid-cols-3">
          {copy.categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              variants={fadeUp(1.5)}
              initial="hidden"
              whileInView="visible"
              viewport={ONCE_IN_VIEW}
              transition={{ delay: index * 0.08 }}
              className="flex flex-col justify-between rounded-card border border-line bg-surface p-8 transition-colors hover:border-foreground/30"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-control bg-white shadow-xs">
                    {getCatIcon(index)}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {cat.name}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center justify-between rounded-control border border-line/60 bg-background/80 px-4 py-2.5 text-xs font-medium text-foreground/85"
                    >
                      <span>{skill}</span>
                      <span className="size-1.5 rounded-full bg-accent" />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Shell>
    </section>
  );
}
