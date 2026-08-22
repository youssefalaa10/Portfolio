/**
 * Non-translatable site data. Copy lives in `messages/*.json`; anything that is
 * the same in every language (routes, proper nouns, contact details) lives here.
 */

export const SITE = {
  name: "Youssef Alaa",
  shortName: "Youssef",
  email: "youssef.alaa@qweelvo.com",
  /** Used for the header clock and the hero status bar. */
  timeZone: "Africa/Cairo",
  workingSince: 2021,
} as const;

/** `mailto:` target for every "let's talk" affordance. */
export const CONTACT_HREF = `mailto:${SITE.email}` as const;

/**
 * Primary navigation. `key` indexes `messages.nav`, so labels are translated
 * while routes stay canonical. Consumed by the header and menu once the pages
 * these point at exist — see docs/code.md § Roadmap.
 */
export type NavKey = "home" | "work" | "services" | "about" | "contact";

export type NavItem = {
  readonly key: NavKey;
  readonly path: string;
};

export const PRIMARY_NAV: readonly NavItem[] = [
  { key: "home", path: "/" },
  { key: "work", path: "/work" },
  { key: "services", path: "/services" },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
];

/** Technologies surfaced in the hero. Proper nouns — identical in every locale. */
export const STACK: readonly string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Flutter",
  "Firebase",
  "Tailwind",
  "Node",
];
