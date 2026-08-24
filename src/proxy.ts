import { NextResponse, type NextRequest } from "next/server";

import {
  DEFAULT_LOCALE,
  internalizePathname,
  isLocale,
  type Locale,
} from "@/core/i18n/config";

/** Reader's chosen language, set here and read back on every request. */
const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Locale gate. Every page still lives under `/{locale}` internally, but the
 * visible URL never carries one: this rewrites `pathname` onto
 * `/{locale}${pathname}` behind the scenes, so `/work` and `/ar`-cookied
 * `/work` render the same route with different content instead of being two
 * different URLs. Language is a `NEXT_LOCALE` cookie — set here from
 * `Accept-Language` on a reader's first visit, and set client-side by
 * `LocaleSwitcher` after that — never a path segment.
 *
 * A request that still names a locale in its path (an old bookmark, a crawler
 * that ignored `robots`/canonical) is redirected to the prefix-free
 * equivalent, so exactly one URL ever serves a given page.
 *
 * Named `proxy` rather than `middleware`: Next 16 renamed the convention.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const [firstSegment, ...rest] = pathname.split("/").filter(Boolean);
  if (firstSegment && isLocale(firstSegment)) {
    const url = request.nextUrl.clone();
    url.pathname = rest.length > 0 ? `/${rest.join("/")}` : "/";
    return NextResponse.redirect(url);
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : resolveLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = internalizePathname(pathname, locale);

  const response = NextResponse.rewrite(url);
  if (cookieLocale !== locale) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }
  return response;
}

function resolveLocale(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, quality] = part.trim().split(";q=");
      return { tag: tag.split("-")[0].toLowerCase(), q: Number(quality ?? 1) };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    if (isLocale(tag)) return tag;
  }

  return DEFAULT_LOCALE;
}

export const config = {
  /* Skip Next internals, the API surface and anything with a file extension. */
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
