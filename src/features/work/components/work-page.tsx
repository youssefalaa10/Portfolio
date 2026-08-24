import { Eyebrow } from "@/components/ui/eyebrow";
import { Shell } from "@/components/ui/shell";
import { LineReveal } from "@/core/components/line-reveal";
import { Reveal } from "@/core/components/reveal";
import type { Locale } from "@/core/i18n/config";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { STAGGER } from "@/core/motion/springs";

import { ProjectGrid } from "./project-grid";
import { ProjectSpotlight } from "./project-spotlight";

type WorkPageProps = {
  locale: Locale;
  copy: Dictionary["work"];
};

/** The dedicated work index. Shares `ProjectGrid` with the home page section. */
export function WorkPage({ locale, copy }: WorkPageProps) {
  return (
    <Shell className="flex flex-col gap-8 py-28 lg:py-36">
      <Reveal preset="fade-up" distance={0.625} trigger="mount">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
      </Reveal>

      <LineReveal
        as="h1"
        lines={copy.heading}
        trigger="mount"
        delay={0.1}
        stagger={STAGGER.line}
        className="max-w-[16ch] text-4xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-5xl"
      />

      <Reveal trigger="mount" delay={0.2}>
        <p className="max-w-[52ch] text-base text-foreground/60">{copy.intro}</p>
      </Reveal>

      {/* Spotlight first — one project at a time, in detail — then the full
          index below it. The grid is the reference; this is the introduction. */}
      <Reveal preset="fade-up" distance={0.625} trigger="mount" delay={0.28} className="mt-8">
        <Eyebrow>{copy.spotlight.eyebrow}</Eyebrow>
      </Reveal>

      <Reveal trigger="mount" delay={0.34} className="mt-2">
        <ProjectSpotlight
          locale={locale}
          copy={copy.projects}
          labels={{
            previous: copy.spotlight.previous,
            next: copy.spotlight.next,
            select: copy.spotlight.select,
            view: copy.viewProject,
          }}
        />
      </Reveal>

      <div className="mt-20 flex flex-col gap-8 border-t border-line pt-16">
        <Reveal preset="fade-up" distance={0.625}>
          <Eyebrow>{copy.spotlight.all}</Eyebrow>
        </Reveal>
        <ProjectGrid locale={locale} copy={copy.projects} viewLabel={copy.viewProject} />
      </div>
    </Shell>
  );
}
