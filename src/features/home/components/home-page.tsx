import type { Dictionary } from "@/core/i18n/dictionaries";
import type { Locale } from "@/core/i18n/config";
import { AboutSection } from "@/features/about/components/about-section";
import { Hero } from "@/features/hero/components/hero";
import { SelectedWork } from "@/features/work/components/selected-work";
import { ServicesSection } from "@/features/services/components/services-section";
import { StatsSection } from "@/features/stats/components/stats-section";

import { CreateBand } from "./create-band";
import { StackMarquee } from "./stack-marquee";

type HomePageProps = {
  locale: Locale;
  dictionary: Dictionary;
};

/**
 * Home route composition — the section order and nothing else. The route file
 * stays a two-liner; adding or reordering a section happens here.
 */
export function HomePage({ locale, dictionary }: HomePageProps) {
  return (
    <>
      <Hero locale={locale} copy={dictionary.hero} />
      <AboutSection copy={dictionary.about} />
      <CreateBand words={dictionary.band} />
      <StackMarquee label={dictionary.hero.stack.label} />
      <SelectedWork locale={locale} copy={dictionary.work} />
      <ServicesSection copy={dictionary.services} />
      <StatsSection copy={dictionary.stats} />
    </>
  );
}
