/**
 * Non-translatable site data. Copy lives in `messages/*.json`; anything that is
 * the same in every language (routes, proper nouns, contact details) lives here.
 */

export const SITE = {
  name: "Youssef Alaa",
  shortName: "Youssef",
  email: "youssefalaacj@gmail.com",
  workingSince: 2021,
} as const;

/** `mailto:` target, for readers who would rather not use the form. */
export const CONTACT_HREF = `mailto:${SITE.email}` as const;

/**
 * Primary navigation.
 */
export type NavKey = "work" | "services" | "about" | "contact";

export type NavItem =
  | {
      readonly key: "work" | "services" | "about";
      readonly kind: "route";
      readonly path: string;
    }
  | { readonly key: "contact"; readonly kind: "modal" };

export const PRIMARY_NAV: readonly NavItem[] = [
  { key: "work", kind: "route", path: "/work" },
  { key: "services", kind: "route", path: "/services" },
  { key: "about", kind: "route", path: "/about" },
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

export type SocialLink = {
  readonly label: string;
  readonly href: string;
  readonly tone: "accent" | "surface";
};

export const SOCIAL_LINKS: readonly SocialLink[] = [];

/**
 * Support link ("buy me a coffee"). Empty until you paste your URL — the block
 * in the About section hides itself while this is blank, exactly like
 * `SOCIAL_LINKS`, so the page is never showing a button that goes nowhere.
 *
 *   export const SUPPORT_LINK = "https://buymeacoffee.com/<you>";
 */
export const SUPPORT_LINK = "" as string;

/**
 * Live store listings for the apps. Same rule: each badge renders only once its
 * URL exists, so the app band ships complete either way.
 */
export const STORE_LINKS = {
  appStore: "" as string,
  googlePlay: "" as string,
} as const;
