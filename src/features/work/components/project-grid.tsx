import { Reveal } from "@/core/components/reveal";
import type { Locale } from "@/core/i18n/config";
import type { Dictionary } from "@/core/i18n/dictionaries";

import { PROJECTS } from "../data/projects";
import { ProjectCard } from "./project-card";

type ProjectGridProps = {
  locale: Locale;
  copy: Dictionary["work"]["projects"];
  viewLabel: string;
  /** Caps how many cards render — the home page teaser uses this; `/work` does not. */
  limit?: number;
};

/**
 * Renders `PROJECTS` against the copy keyed by the same slug. Shared by the home
 * page's Selected Work section and the `/work` index, so the two can never drift
 * apart visually.
 */
export function ProjectGrid({ locale, copy, viewLabel, limit }: ProjectGridProps) {
  const projects = typeof limit === "number" ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => {
        const entry = copy[project.slug];

        return (
          <Reveal as="li" key={project.slug} distance={2} delay={(index % 6) * 0.06}>
            <ProjectCard
              project={project}
              locale={locale}
              title={entry.title}
              summary={entry.summary}
              categoryLabel={entry.categoryLabel}
              tags={project.tags}
              viewLabel={viewLabel}
            />
          </Reveal>
        );
      })}
    </ul>
  );
}
