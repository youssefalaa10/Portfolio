/**
 * Project index.
 *
 * Structural facts only — slug, cover, and the technologies each was actually
 * built with. Titles and summaries are translatable and live under
 * `messages.work.projects`, keyed by the same slug, so adding a project means one
 * entry here plus its copy and never a change to markup.
 *
 * Deliberately without `year`, `category`, `role`, `client` or `results`: those
 * are facts about Youssef's work that are not mine to invent. They land with the
 * detail route, from his own notes.
 */

export type ProjectSlug = "bablabab" | "bella" | "kidzoo" | "montazah";

export type Project = {
  readonly slug: ProjectSlug;
  /** Cover image, relative to `public/`. Rendered with `fill` into a fixed ratio. */
  readonly cover: string;
  /** Proper nouns — identical in every locale, so not translated. */
  readonly tags: readonly string[];
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "bablabab",
    cover: "/images/projects/bablabab-mockup/bablabab_1.png",
    tags: ["Flutter", "Firebase"],
  },
  {
    slug: "bella",
    cover: "/images/projects/bella-mockup/bella.png",
    tags: ["Flutter", "E-commerce"],
  },
  {
    slug: "kidzoo",
    cover: "/images/projects/kidzoo-mockup/imgi_63_default_LE_upscale_prime_x4.png",
    tags: ["Flutter", "Education"],
  },
  {
    slug: "montazah",
    cover: "/images/projects/montazah-mockup/montazah_1.jpeg",
    tags: ["Flutter", "Booking"],
  },
];
