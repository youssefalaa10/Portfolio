"use client";

import { useRouter } from "next/navigation";

import { HoverLift } from "@/components/ui/hover-lift";
import { LOCALES, type Locale } from "@/core/i18n/config";

type LocaleSwitcherProps = {
  locale: Locale;
  /** Native name of the target language, e.g. "العربية". */
  label: string;
  /** Accessible description of the action, in the *current* language. */
  description: string;
};

const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Swaps the reader's language without touching the URL — pages are
 * prefix-free (see `docs/code.md` §4), so the active locale lives in a
 * `NEXT_LOCALE` cookie rather than a path segment. This sets that cookie and
 * asks the router to refresh: `proxy.ts` reads the new cookie on that refetch
 * and rewrites to the other locale's content in place, on the same route the
 * reader was already on.
 *
 * A button rather than a link: nothing here is a URL to open in a new tab or
 * bookmark, it is a same-page preference change.
 */
export function LocaleSwitcher({
  locale,
  label,
  description,
}: LocaleSwitcherProps) {
  const router = useRouter();
  const target = LOCALES.find((candidate) => candidate !== locale) ?? locale;

  const onClick = () => {
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      lang={target}
      aria-label={description}
      className="rounded-control border border-line/80 bg-white/40 backdrop-blur-sm transition-colors hover:bg-white/70"
    >
      <HoverLift
        lift={0}
        scale={1.05}
        spring="hover"
        className="flex items-center px-4 py-2 text-xs font-medium uppercase tracking-[0.05em] text-foreground"
      >
        {label}
      </HoverLift>
    </button>
  );
}
