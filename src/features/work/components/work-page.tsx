import { Eyebrow } from "@/components/ui/eyebrow";
import { Shell } from "@/components/ui/shell";
import { LineReveal } from "@/core/components/line-reveal";
import { Reveal } from "@/core/components/reveal";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { STAGGER } from "@/core/motion/springs";

import { PROJECTS } from "../data/projects";
import { ProjectCard } from "./project-card";

type WorkPageProps = {
  copy: Dictionary["work"];
};

/**
 * Work index. Renders `PROJECTS` against the copy keyed by the same slug, so a
 * new project is a data change, never a new component.
 */
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

      <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((project, index) => {
          const project_copy = copy.projects[project.slug];

          return (
            <Reveal
              as="li"
              key={project.slug}
              distance={2}
              delay={index * 0.09}
            >
              <ProjectCard
                project={project}
                title={project_copy.title}
                summary={project_copy.summary}
              />
            </Reveal>
          );
        })}
      </ul>
    </Shell>
  );
}
