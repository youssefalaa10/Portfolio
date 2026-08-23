import { PillButton } from "@/components/ui/pill-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Shell } from "@/components/ui/shell";
import { Reveal } from "@/core/components/reveal";
import { SECTION_ID } from "@/core/config/site";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { localeHref, type Locale } from "@/core/i18n/config";

import { ProjectGrid } from "./project-grid";

type SelectedWorkProps = {
  locale: Locale;
  copy: Dictionary["work"];
};

/** Home-page work section. `/work` is the dedicated index it links out to. */
export function SelectedWork({ locale, copy }: SelectedWorkProps) {
  return (
    <section id={SECTION_ID.work} className="bg-background">
      <Shell className="flex flex-col gap-12 py-20 lg:py-28">
        <SectionHeading
          eyebrow={copy.eyebrow}
          lines={copy.heading}
          align="center"
          outlinedEyebrow
          className="mx-auto"
          headingClassName="text-center"
        />

        <ProjectGrid copy={copy.projects} />

        <Reveal delay={0.1} className="flex justify-center">
          <PillButton
            href={localeHref(locale, "/work")}
            variant="outline"
            arrow="right"
          >
            {copy.viewAll}
          </PillButton>
        </Reveal>
      </Shell>
    </section>
  );
}
