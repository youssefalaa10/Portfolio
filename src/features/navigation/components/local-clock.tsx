"use client";

import { useSyncExternalStore } from "react";

import { SITE } from "@/core/config/site";
import { getIntlTag, type Locale } from "@/core/i18n/config";

type LocalClockProps = {
  locale: Locale;
  label: string;
};

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 1000);
  return () => window.clearInterval(timer);
}

/** Whole seconds, so the snapshot is stable between ticks. */
function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}

/** No correct server value exists for "now"; the clock fills in after hydration. */
function getServerSnapshot(): number | null {
  return null;
}

/**
 * Youssef's local time, in the reader's language.
 *
 * The wall clock is an external system, so it is subscribed to rather than
 * mirrored into state by an effect. Rendering nothing on the server is
 * deliberate: inventing a time would either mismatch during hydration or show
 * the reader a time that is not the time.
 */
export function LocalClock({ locale, label }: LocalClockProps) {
  const seconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const tag = getIntlTag(locale);
  const now = seconds === null ? null : new Date(seconds * 1000);

  const time = now
    ? new Intl.DateTimeFormat(tag, {
        hour: "numeric",
        minute: "2-digit",
        timeZone: SITE.timeZone,
      }).format(now)
    : "";

  const date = now
    ? new Intl.DateTimeFormat(tag, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: SITE.timeZone,
      }).format(now)
    : "";

  return (
    <div className="hidden items-center gap-3 rounded-control border border-line/80 bg-white/40 px-3 py-2 text-xs text-foreground/70 backdrop-blur-sm md:flex">
      <span className="text-foreground/45">{label}</span>
      <span className="min-w-14 font-medium tabular-nums text-foreground">
        {time}
      </span>
      <span aria-hidden className="text-foreground/30">
        •
      </span>
      <span className="whitespace-nowrap font-medium">{date}</span>
    </div>
  );
}
