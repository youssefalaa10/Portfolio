"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { ArrowUpRight } from "@/components/ui/icons";
import { PillButton } from "@/components/ui/pill-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { SECTION_ID } from "@/core/config/site";
import { localeHref, type Locale } from "@/core/i18n/config";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { SPRING } from "@/core/motion/springs";
import { fadeUp, ONCE_IN_VIEW } from "@/core/motion/variants";

type ServicesSectionProps = {
  locale: Locale;
  copy: Dictionary["services"];
  exploreLabel?: string;
};

/**
 * Hover-fill service rows with route links to dedicated /services page.
 */
export function ServicesSection({
  locale,
  copy,
  exploreLabel = "Explore Micro Matrix",
}: ServicesSectionProps) {
  const servicesHref = localeHref(locale, "/services");

  return (
    <section
      id={SECTION_ID.services}
      className="border-b border-line bg-background"
    >
      <Shell className="flex flex-col gap-12 py-20 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={copy.eyebrow}
            lines={copy.heading}
            headingClassName="max-w-[16ch]"
          />
          <PillButton href={servicesHref} variant="outline" arrow="right">
            {exploreLabel}
          </PillButton>
        </div>

        <ul>
          {copy.items.map((item, index) => (
            <motion.li
              key={item.title}
              className={index === 0 ? undefined : "border-t border-line"}
              variants={fadeUp(1.5)}
              initial="hidden"
              whileInView="visible"
              viewport={ONCE_IN_VIEW}
              transition={{ delay: index * 0.08 }}
            >
              <Link href={servicesHref} className="block rounded-card-sm">
                <motion.div
                  className="relative flex items-center gap-4 rounded-card-sm sm:gap-6"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  variants={{
                    rest: { paddingInline: "1.5rem", paddingBlock: "1.5rem" },
                    hover: { paddingInline: "2rem", paddingBlock: "1.75rem" },
                  }}
                  transition={SPRING.reveal}
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-card-sm bg-surface"
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={SPRING.reveal}
                  />

                  <span className="w-7 shrink-0 font-mono text-sm font-medium tabular-nums text-foreground/40 sm:w-10">
                    {`0${index + 1}`}
                  </span>

                  <h3 className="flex-1 text-2xl font-medium tracking-[-0.01em] sm:text-3xl md:text-4xl">
                    {item.title}
                  </h3>

                  <p className="hidden max-w-80 text-sm text-foreground/55 lg:block">
                    {item.description}
                  </p>

                  <motion.span aria-hidden transition={SPRING.nudge}>
                    <span className="inline-flex rtl:-scale-x-100">
                      <ArrowUpRight />
                    </span>
                  </motion.span>
                </motion.div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
