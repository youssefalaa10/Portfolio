/**
 * Locale contract. Adding a language means adding it here and adding a matching
 * file under `messages/` — nothing else. Components never branch on locale.
 */

export const LOCALES = ["en", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export type Direction = "ltr" | "rtl";

const DIRECTIONS: Record<Locale, Direction> = {
  en: "ltr",
  ar: "rtl",
};

/** BCP-47 tags used for `Intl` formatting (clock, numbers, dates). */
const INTL_TAGS: Record<Locale, string> = {
  en: "en-GB",
  ar: "ar-EG",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDirection(locale: Locale): Direction {
  return DIRECTIONS[locale];
}

export function getIntlTag(locale: Locale): string {
  return INTL_TAGS[locale];
}

/** Rewrites a pathname onto another locale, preserving the rest of the route. */
export function localizePathname(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  return `/${segments.join("/")}`;
}

/** Prefixes an app-relative path with the active locale. */
export function localeHref(locale: Locale, path = "/"): string {
  const normalized = path === "/" ? "" : path.replace(/^\/+/, "/");
  return `/${locale}${normalized}`;
}
