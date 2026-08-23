import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { CountUp } from "@/core/components/count-up";
import { Reveal } from "@/core/components/reveal";
import { SECTION_ID } from "@/core/config/site";
import type { Dictionary } from "@/core/i18n/dictionaries";

import { STATS } from "../data/stats";

type StatsSectionProps = {
  copy: Dictionary["stats"];
};

/**
 * Ink panel with scroll-driven numbers.
 *
 * The values live in `features/stats/data/stats.ts` because they are facts, not
 * copy; only the labels are translated. Each number counts up as the panel
 * settles into view — see `core/components/count-up.tsx` for the trigger window.
 */
export function StatsSection({ copy }: StatsSectionProps) {
  return (
    <section id={SECTION_ID.stats} className="bg-background">
      <Shell className="pb-20 lg:pb-28">
        <Reveal preset="scale-in" distance={2.5}>
          <div className="rounded-card bg-ink px-6 py-12 text-white sm:px-8 sm:py-16 md:px-16">
            <SectionHeading
              eyebrow={copy.eyebrow}
              lines={copy.heading}
              tone="light"
              headingClassName="max-w-[20ch] text-3xl font-medium tracking-[-0.01em] sm:text-3xl md:text-4xl"
            />

            <ul className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
              {STATS.map((stat, index) => (
                <Reveal as="li" key={stat.key} distance={1.25} delay={index * 0.09}>
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    className="block text-5xl font-semibold tracking-[-0.02em] sm:text-6xl md:text-7xl"
                  />
                  <span className="mt-3 block text-sm text-white/55">
                    {copy.labels[stat.key]}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
