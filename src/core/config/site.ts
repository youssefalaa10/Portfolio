/**
 * Non-translatable site data. Copy lives in `messages/*.json`; anything that is
 * the same in every language (routes, proper nouns, contact details) lives here.
 */

export const SITE = {
  name: "Youssef Alaa",
  shortName: "Youssef",
  email: "youssef.alaa@qweelvo.com",
  workingSince: 2021,
} as const;

/** `mailto:` target, for readers who would rather not use the form. */
export const CONTACT_HREF = `mailto:${SITE.email}` as const;

/**
 * Primary navigation.
 *
 * `key` indexes `messages.nav`, so labels are translated while destinations stay
 * canonical. `kind` says what activating an item does — which is what keeps the
 * header, the overlay menu and the footer from each inventing their own routing.
 *
 * `anchor` items point at sections of the home page, which is sanctioned section
 * navigation, not faked multi-page routing: `/work` is a real route with its own
 * page. Hrefs are built locale-first so an anchor still resolves from `/work`.
 */
export type NavKey = "work" | "services" | "about" | "contact";

export type NavItem =
  | { readonly key: "work"; readonly kind: "route"; readonly path: string }
  | { readonly key: "services" | "about"; readonly kind: "anchor"; readonly hash: string }
  | { readonly key: "contact"; readonly kind: "modal" };

export const PRIMARY_NAV: readonly NavItem[] = [
  { key: "work", kind: "route", path: "/work" },
  { key: "services", kind: "anchor", hash: "services" },
  { key: "about", kind: "anchor", hash: "about" },
  { key: "contact", kind: "modal" },
];

/** Section ids, so anchors and section markup cannot drift apart. */
export const SECTION_ID = {
  home: "home",
  about: "about",
  work: "work",
  services: "services",
  stats: "stats",
} as const;

/** Technologies surfaced in the hero and the marquee. Identical in every locale. */
export const STACK: readonly string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Flutter",
  "Dart",
  "Firebase",
  "Tailwind CSS",
  "Node.js",
  "Motion",
  "PostgreSQL",
];

/**
 * Social links. `label` is a proper noun, so it stays here rather than in
 * messages.
 *
 * Intentionally empty: your handles are not something to guess at, and a chip
 * linking to `github.com/` is worse than no chip. Add entries and the row in the
 * About section renders itself — the block is hidden while the list is empty.
 *
 *   { label: "GitHub", href: "https://github.com/<you>", tone: "accent" }
 */
export type SocialLink = {
  readonly label: string;
  readonly href: string;
  readonly tone: "accent" | "surface";
};

export const SOCIAL_LINKS: readonly SocialLink[] = [];
