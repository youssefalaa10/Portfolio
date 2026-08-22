/**
 * Project index.
 *
 * Structural facts only — slug and cover. Titles and summaries are translatable
 * and live under `messages.work.projects`, keyed by the same slug, so adding a
 * project means one entry here plus its copy, never a change to markup.
 *
 * Deliberately incomplete: the fuller schema the architecture calls for (year,
 * category, role, client, results, technologies) is not filled in with guesses.
 * Those fields land with the detail route, from Youssef's own notes.
 */

export type ProjectSlug = "bablabab" | "bella" | "kidzoo" | "montazah";

export type Project = {
  readonly slug: ProjectSlug;
  /** Cover image, relative to `public/`. Rendered with `fill` into a fixed ratio. */
  readonly cover: string;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "bablabab",
    cover: "/images/projects/bablabab-mockup/bablabab_1.png",
  },
  {
    slug: "bella",
    cover: "/images/projects/bella-mockup/bella.png",
  },
  {
    slug: "kidzoo",
    cover: "/images/projects/kidzoo-mockup/imgi_63_default_LE_upscale_prime_x4.png",
  },
  {
    slug: "montazah",
    cover: "/images/projects/montazah-mockup/montazah_1.jpeg",
  },
];
