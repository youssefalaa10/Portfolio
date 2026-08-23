import { Reveal } from "@/core/components/reveal";
import type { Dictionary } from "@/core/i18n/dictionaries";

import { PROJECTS } from "../data/projects";
import { ProjectCard } from "./project-card";

type ProjectGridProps = {
  copy: Dictionary["work"]["projects"];
};

/**
 * Renders `PROJECTS` against the copy keyed by the same slug. Shared by the home
 * page's Selected Work section and the `/work` index, so the two can never drift
 * apart visually.
 */
export function ProjectGrid({ copy }: ProjectGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {PROJECTS.map((project, index) => {
        const entry = copy[project.slug];

        return (
          <Reveal as="li" key={project.slug} distance={2} delay={index * 0.09}>
            <ProjectCard
              project={project}
              title={entry.title}
              summary={entry.summary}
              tags={project.tags}
            />
          </Reveal>
        );
      })}
    </ul>
  );
}
