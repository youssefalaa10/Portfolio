import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { Shell } from "@/components/ui/shell";
import { DEFAULT_LOCALE, localeHref } from "@/core/i18n/config";
import { getDictionary } from "@/core/i18n/dictionaries";

/**
 * Route-level boundary for anything not built yet or not found.
 *
 * `not-found` cannot read route params, so it renders in the default locale.
 * That is a deliberate limitation of the convention rather than a shortcut.
 */
export default async function NotFound() {
  const dictionary = await getDictionary(DEFAULT_LOCALE);

  return (
    <Shell className="flex min-h-[70vh] flex-col justify-center gap-6 py-24">
      <Eyebrow>404</Eyebrow>
      <h1 className="max-w-[22ch] text-4xl font-semibold leading-[1.02] tracking-[-0.02em] sm:text-5xl">
        This page isn&rsquo;t here yet.
      </h1>
      <p className="max-w-[46ch] text-sm text-foreground/60">
        The rest of the portfolio is still being built. Head back to the start in
        the meantime.
      </p>
      <div className="flex flex-wrap gap-3">
        <PillButton href={localeHref(DEFAULT_LOCALE)} variant="dark" arrow="right">
          {dictionary.nav.home}
        </PillButton>
      </div>
    </Shell>
  );
}
