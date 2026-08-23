"use client";

import { motion } from "motion/react";

import { ArrowUpRight } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { SECTION_ID } from "@/core/config/site";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { SPRING } from "@/core/motion/springs";
import { fadeUp, ONCE_IN_VIEW } from "@/core/motion/variants";

type ServicesSectionProps = {
  copy: Dictionary["services"];
};

/**
 * Hover-fill service rows.
 *
 * The fill and the inset both animate from one variant label on the row, so the
 * surface, the padding and the arrow move as a single gesture. Padding is
 * animated in rem, not px, so the inset scales with the adaptive grid like
 * everything else.
 *
 * Rows are not links: each names something Youssef does, and there is no service
 * detail page to send anyone to. The arrow is decorative until there is.
 */
export function ServicesSection({ copy }: ServicesSectionProps) {
  return (
    <section id={SECTION_ID.services} className="bg-background">
      <Shell className="flex flex-col gap-12 py-20 lg:py-28">
        <SectionHeading
          eyebrow={copy.eyebrow}
          lines={copy.heading}
          headingClassName="max-w-[16ch]"
        />

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
                {/* The fill is a token-coloured layer whose opacity animates,
                    rather than an interpolated literal colour — a hardcoded
                    rgba() here would put `--color-surface` in two places. */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-card-sm bg-surface"
                  variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                  transition={SPRING.reveal}
                />

                <span className="w-7 shrink-0 text-sm font-medium tabular-nums text-foreground/40 sm:w-10">
                  {`0${index + 1}`}
                </span>

                <h3 className="flex-1 text-2xl font-medium tracking-[-0.01em] sm:text-3xl md:text-4xl">
                  {item.title}
                </h3>

                <p className="hidden max-w-80 text-sm text-foreground/55 lg:block">
                  {item.description}
                </p>

                <motion.span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-pill bg-ink text-white sm:size-12"
                  variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                  transition={SPRING.nudge}
                >
                  <span className="inline-flex rtl:-scale-x-100">
                    <ArrowUpRight />
                  </span>
                </motion.span>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
