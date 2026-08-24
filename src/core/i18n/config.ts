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

/**
 * Maps a visible, prefix-free pathname onto its internal `/{locale}/...`
 * route. Every page lives under `app/[locale]/`, so something has to add the
 * segment back before Next's router can match it — that something is
 * `src/proxy.ts`, via `NextResponse.rewrite`, and this is the one function it
 * uses to build that internal URL. Nothing else should call this: it is not
 * for building hrefs, which are prefix-free (see `localeHref`).
 */
export function internalizePathname(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  return `/${segments.join("/")}`;
}

/**
 * Builds an app-relative href. Visible URLs carry no locale segment — the
 * active language is a `NEXT_LOCALE` cookie the proxy reads, not something in
 * the path — so this only normalises `path`. `locale` stays in the signature
 * (every call site already has it in scope, and it keeps the door open if a
 * future requirement brings prefixed URLs back) but a bare path never needs
 * one added.
 */
export function localeHref(locale: Locale, path = "/"): string {
  void locale;
  const normalized = path === "/" ? "" : path.replace(/^\/+/, "/");
  return normalized || "/";
}
