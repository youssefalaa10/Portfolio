import { Hero } from "@/features/hero/components/hero";
import type { Dictionary } from "@/core/i18n/dictionaries";
import type { Locale } from "@/core/i18n/config";

type HomePageProps = {
  locale: Locale;
  dictionary: Dictionary;
};

/**
 * Home route composition. The route file stays a two-liner; this is where
 * sections are ordered. Later phases append About, Selected Work, Services and
 * Stats below the hero without touching `app/`.
 */
export function HomePage({ locale, dictionary }: HomePageProps) {
  return (
    <>
      <Hero locale={locale} copy={dictionary.hero} />
    </>
  );
}
