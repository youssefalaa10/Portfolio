"use client";

import { motion } from "motion/react";

import { Cpu, Layout, Shield, Sparkles } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { fadeUp, ONCE_IN_VIEW } from "@/core/motion/variants";

type PhilosophyBentoProps = {
  copy: Dictionary["home"]["bento"];
};

export function PhilosophyBento({ copy }: PhilosophyBentoProps) {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Sparkles className="text-xl text-accent" />;
      case 1:
        return <Shield className="text-xl text-accent" />;
      case 2:
        return <Layout className="text-xl text-accent" />;
      default:
        return <Cpu className="text-xl text-accent" />;
    }
  };

  return (
    <section className="border-b border-line bg-background py-20 lg:py-28">
      <Shell className="space-y-12">
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
          {copy.items.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp(1.5)}
              initial="hidden"
              whileInView="visible"
              viewport={ONCE_IN_VIEW}
              transition={{ delay: index * 0.08 }}
              className="group flex flex-col justify-between rounded-card border border-line bg-surface p-6 transition-all duration-300 hover:border-foreground/30 hover:bg-surface-2"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-control bg-white shadow-xs">
                    {getIcon(index)}
                  </div>
                  <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-accent">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>

                <p className="text-xs font-light leading-relaxed text-foreground/65">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Shell>
    </section>
  );
}
