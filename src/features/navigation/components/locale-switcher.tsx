"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HoverLift } from "@/components/ui/hover-lift";
import {
  LOCALES,
  localizePathname,
  type Locale,
} from "@/core/i18n/config";

type LocaleSwitcherProps = {
  locale: Locale;
  /** Native name of the target language, e.g. "العربية". */
  label: string;
  /** Accessible description of the action, in the *current* language. */
  description: string;
};

/**
 * Swaps the locale segment and keeps the rest of the route, so switching
 * language never sends the reader back to the home page.
 *
 * A link rather than a button: it changes the URL, and readers expect to be able
 * to open it in a new tab or bookmark it.
 */
export function LocaleSwitcher({
  locale,
  label,
  description,
}: LocaleSwitcherProps) {
  const pathname = usePathname();
  const target = LOCALES.find((candidate) => candidate !== locale) ?? locale;

  return (
    <Link
      href={localizePathname(pathname, target)}
      hrefLang={target}
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
    </Link>
  );
}
