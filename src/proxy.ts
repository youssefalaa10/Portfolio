import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE, isLocale, type Locale } from "@/core/i18n/config";

/**
 * Locale gate. Every page lives under `/{locale}`, so a request without one is
 * redirected to the best match: the reader's `Accept-Language` if we speak it,
 * otherwise the default.
 *
 * Named `proxy` rather than `middleware`: Next 16 renamed the convention.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const [firstSegment] = pathname.split("/").filter(Boolean);
  if (firstSegment && isLocale(firstSegment)) return NextResponse.next();

  const locale = resolveLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
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
