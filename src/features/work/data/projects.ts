/**
 * Project index.
 *
 * Structural facts only — slug, images, category and the technologies each was
 * actually built with. Titles, summaries, overviews, features and capabilities
 * are translatable and live under `messages.work.projects`, keyed by the same
 * slug, so adding a project means one entry here plus its copy and never a
 * change to markup.
 *
 * `href` is deliberately optional and unset everywhere below: several of these
 * shipped to the App Store / Google Play, but no store URL is recorded in
 * Youssef's notes, and a guessed link is worse than none. Add it here the
 * moment a real one exists — nothing else needs to change.
 */

export type ProjectSlug =
  | "bablabab"
  | "bella"
  | "kidzoo"
  | "montazah"
  | "services27"
  | "hessah"
  | "hola"
  | "ogg"
  | "purefit"
  | "teacherProgress"
  | "toxelpay"
  | "trucker"
  | "qutof"
  | "talabak"
  | "bakery"
  | "gatesOfEgypt"
  | "rawaed"
  | "sala"
  | "instapost";

export type ProjectCategory = "mobile" | "web";

export type Project = {
  readonly slug: ProjectSlug;
  /** Cover image, relative to `public/`. Rendered with `fill` into a fixed ratio. */
  readonly cover: string;
  /** Additional case-study screenshots, in display order. Cover is not repeated here. */
  readonly gallery: readonly string[];
  /** Proper nouns — identical in every locale, so not translated. */
  readonly tags: readonly string[];
  readonly category: ProjectCategory;
  /** Live store or site URL. Unset until a real one is confirmed — see note above. */
  readonly href?: string;
};

const p = (slug: string) => `/images/projects/${slug}` as const;

export const PROJECTS: readonly Project[] = [
  {
    slug: "bablabab",
    cover: p("bablabab-mockup/bablabab_1.avif"),
    gallery: [
      p("bablabab-mockup/bablabab_2.avif"),
      p("bablabab-mockup/bablabab_3.avif"),
      p("bablabab-mockup/bablabab_4.avif"),
      p("bablabab-mockup/bablabab_5.avif"),
    ],
    tags: ["Flutter", "Firebase"],
    category: "mobile",
  },
  {
    slug: "bella",
    cover: p("bella-mockup/bella.avif"),
    gallery: [
      p("bella-mockup/bella_app5.avif"),
      p("bella-mockup/bella2.avif"),
      p("bella-mockup/bella3.avif"),
      p("bella-mockup/bella4.avif"),
      p("bella-mockup/bella6.avif"),
      p("bella-mockup/bella7.avif"),
      p("bella-mockup/bellastore2.avif"),
    ],
    tags: ["Flutter", "Firebase"],
    category: "mobile",
  },
  {
    slug: "kidzoo",
    cover: p("kidzoo-mockup/kidzoo1.avif"),
    gallery: [
      p("kidzoo-mockup/kidzoo2.avif"),
      p("kidzoo-mockup/kidzo3.avif"),
      p("kidzoo-mockup/kidzo4.avif"),
      p("kidzoo-mockup/kidzo5.avif"),
    ],
    tags: ["Flutter", "Flutter Flame"],
    category: "mobile",
  },
  {
    slug: "montazah",
    cover: p("montazah-mockup/montazah.avif"),
    gallery: [
      p("montazah-mockup/montazah_1.avif"),
      p("montazah-mockup/montazah_2.avif"),
      p("montazah-mockup/montazah_3.avif"),
      p("montazah-mockup/montazah_4.avif"),
    ],
    tags: ["Flutter"],
    category: "mobile",
  },
  {
    slug: "services27",
    cover: p("27Services/27Services_1.avif"),
    gallery: [p("27Services/27Services_2.avif"), p("27Services/27Services_3.avif")],
    tags: ["Flutter", "Firebase", "Google Maps"],
    category: "mobile",
  },
  {
    slug: "hessah",
    cover: p("hessah/hessah_1.avif"),
    gallery: [p("hessah/hessah_2.avif"), p("hessah/hessah_3.avif")],
    tags: ["Flutter", "Firebase"],
    category: "mobile",
  },
  {
    slug: "hola",
    cover: p("hola/hola.avif"),
    gallery: [p("hola/hola1.avif"), p("hola/hola3.avif"), p("hola/hola4.avif"), p("hola/hola5.avif")],
    tags: ["Flutter", "Firebase"],
    category: "mobile",
  },
  {
    slug: "ogg",
    cover: p("ogg/ogg_1.avif"),
    gallery: [p("ogg/ogg_2.avif")],
    tags: ["Next.js"],
    category: "web",
  },
  {
    slug: "purefit",
    cover: p("purefit/purefit.avif"),
    gallery: [
      p("purefit/purefit2.avif"),
      p("purefit/purefit3.avif"),
      p("purefit/purefit4.avif"),
      p("purefit/purefit-ai.avif"),
    ],
    tags: ["Flutter", "Gemini AI", "Sqflite"],
    category: "mobile",
  },
  {
    slug: "teacherProgress",
    cover: p("teacher_progress/teacher_progress.avif"),
    gallery: [p("teacher_progress/teacher_progress_2.avif")],
    tags: ["Flutter", "Firebase"],
    category: "mobile",
  },
  {
    slug: "toxelpay",
    cover: p("toxelpay/toxelpay_1.avif"),
    gallery: [p("toxelpay/toxelpay_2.avif"), p("toxelpay/toxelpay_3.avif")],
    tags: ["Flutter"],
    category: "mobile",
  },
  {
    slug: "trucker",
    cover: p("trucker/Trucker.avif"),
    gallery: [p("trucker/trucker2.avif"), p("trucker/trucker3.avif"), p("trucker/trucker4.avif")],
    tags: ["Flutter", "WebSockets", "Google Maps"],
    category: "mobile",
  },
  {
    slug: "qutof",
    cover: p("qutof.avif"),
    gallery: [],
    tags: ["Flutter", "Firebase"],
    category: "mobile",
  },
  {
    slug: "talabak",
    cover: p("talabak_man_bara.avif"),
    gallery: [],
    tags: ["Flutter", "Firebase"],
    category: "mobile",
  },
  {
    slug: "bakery",
    cover: p("websites/bakery2.avif"),
    gallery: [],
    tags: ["React", "Node.js"],
    category: "web",
  },
  {
    slug: "gatesOfEgypt",
    cover: p("websites/gates-of-egypt_1.avif"),
    gallery: [p("websites/gates-of-egypt_2.avif")],
    tags: ["React"],
    category: "web",
  },
  {
    slug: "rawaed",
    cover: p("websites/rawad_1.avif"),
    gallery: [],
    tags: ["React"],
    category: "web",
  },
  {
    slug: "sala",
    cover: p("websites/sala.avif"),
    gallery: [],
    tags: ["React"],
    category: "web",
  },
  {
    slug: "instapost",
    cover: p("websites/instapost2.avif"),
    gallery: [],
    tags: ["React"],
    category: "web",
  },
];
