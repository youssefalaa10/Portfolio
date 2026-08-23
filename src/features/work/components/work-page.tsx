import { Eyebrow } from "@/components/ui/eyebrow";
import { Shell } from "@/components/ui/shell";
import { LineReveal } from "@/core/components/line-reveal";
import { Reveal } from "@/core/components/reveal";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { STAGGER } from "@/core/motion/springs";

import { ProjectGrid } from "./project-grid";

type WorkPageProps = {
  copy: Dictionary["work"];
};

/** The dedicated work index. Shares `ProjectGrid` with the home page section. */
export function WorkPage({ copy }: WorkPageProps) {
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
        <p className="max-w-[52ch] text-sm text-foreground/60">{copy.intro}</p>
      </Reveal>

      <div className="mt-6">
        <ProjectGrid copy={copy.projects} />
      </div>
    </Shell>
  );
}
