import type { Dictionary } from "@/core/i18n/dictionaries";
import type { Locale } from "@/core/i18n/config";
import { AboutSection } from "@/features/about/components/about-section";
import { Hero } from "@/features/hero/components/hero";
import { SelectedWork } from "@/features/work/components/selected-work";
import { ServicesSection } from "@/features/services/components/services-section";
import { AppBand } from "@/features/showcase/components/app-band";
import { PhoneShowcase } from "@/features/showcase/components/phone-showcase";
import { StatsSection } from "@/features/stats/components/stats-section";

import { CreateBand } from "./create-band";
import { PhilosophyBento } from "./philosophy-bento";
import { ProcessSection } from "./process-section";
import { StackMarquee } from "./stack-marquee";
import { TechShowcase } from "./tech-showcase";

type HomePageProps = {
  locale: Locale;
  dictionary: Dictionary;
};

/**
 * Home route composition — rich editorial and interactive sections.
 */
export function HomePage({ locale, dictionary }: HomePageProps) {
  return (
    <>
      <Hero locale={locale} copy={dictionary.hero} />
      {/* Sits immediately after the hero and overlaps up into it, so the two
          read as one continuous view rather than two stacked blocks. */}
      <PhoneShowcase copy={dictionary.showcase} />
      {/* The accent at full strength, once per page. */}
      <AppBand copy={dictionary.appBand} />
      <AboutSection
        locale={locale}
        copy={dictionary.about}
        exploreLabel={dictionary.common.viewAll}
      />
      <PhilosophyBento copy={dictionary.home.bento} />
      <CreateBand words={dictionary.band} />
      <StackMarquee label={dictionary.hero.stack.label} />
      <SelectedWork locale={locale} copy={dictionary.work} />
      <ServicesSection
        locale={locale}
        copy={dictionary.services}
        exploreLabel={dictionary.common.viewAll}
      />
      <ProcessSection copy={dictionary.home.process} />
      <TechShowcase copy={dictionary.home.techShowcase} />
      <StatsSection copy={dictionary.stats} />
    </>
  );
}
