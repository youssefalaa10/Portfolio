import Image from "next/image";

import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PillButton } from "@/components/ui/pill-button";
import { Shell } from "@/components/ui/shell";
import { TagChip } from "@/components/ui/tag-chip";
import { LineReveal } from "@/core/components/line-reveal";
import { Reveal } from "@/core/components/reveal";
import { localeHref, type Locale } from "@/core/i18n/config";
import { STAGGER } from "@/core/motion/springs";

import { WhatsAppCta, type WhatsAppCtaCopy } from "@/features/contact/components/whatsapp-cta";

import type { Project } from "../data/projects";
import { ProjectCapabilities } from "./project-capabilities";
import { ProjectFeatures } from "./project-features";
import { ProjectGallery } from "./project-gallery";

export type ProjectEntry = {
  title: string;
  summary: string;
  categoryLabel: string;
  overview: string;
  features: readonly string[];
  capabilities: readonly string[];
};

export type WorkDetailCopy = {
  overviewLabel: string;
  featuresLabel: string;
  capabilitiesLabel: string;
  techStackLabel: string;
  galleryLabel: string;
  back: string;
};

type WorkDetailPageProps = {
  locale: Locale;
  project: Project;
  entry: ProjectEntry;
  detail: WorkDetailCopy;
  whatsapp: WhatsAppCtaCopy;
  previous: { slug: string; title: string };
  next: { slug: string; title: string };
  spotlightLabels: { previous: string; next: string };
};

/**
 * A project's case-study page — hero, gallery, overview, features,
 * capabilities, tech stack, then the WhatsApp CTA, closing with prev/next
 * navigation. Sections alternate `bg-background` / `bg-surface/30` the same
 * way About's sections do, so the page reads as one rhythm rather than a
 * stack of unrelated blocks.
 */
export function WorkDetailPage({
  locale,
  project,
  entry,
  detail,
  whatsapp,
  previous,
  next,
  spotlightLabels,
}: WorkDetailPageProps) {
  return (
    <div className="bg-background text-foreground">
      {/* HERO */}
      <section className="border-b border-line py-20 lg:py-28">
        <Shell className="flex flex-col gap-10">
          <Reveal trigger="mount" distance={0.5}>
            <PillButton href={localeHref(locale, "/work")} variant="outline" arrow="right">
              {detail.back}
            </PillButton>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal preset="fade-up" distance={0.625} trigger="mount" delay={0.05}>
              <Eyebrow outlined>{entry.categoryLabel}</Eyebrow>
            </Reveal>

            <LineReveal
              as="h1"
              lines={[entry.title]}
              trigger="mount"
              delay={0.12}
              stagger={STAGGER.line}
              className="max-w-[20ch] text-4xl font-semibold leading-[1.04] tracking-[-0.02em] sm:text-5xl md:text-6xl"
            />

            <Reveal trigger="mount" delay={0.22}>
              <p className="max-w-[60ch] text-base text-foreground/65 sm:text-lg">
                {entry.summary}
              </p>
            </Reveal>

            {project.tags.length > 0 ? (
              <Reveal trigger="mount" delay={0.28}>
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <TagChip tone="dark">{tag}</TagChip>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>

          <Reveal preset="scale-in" trigger="mount" delay={0.32}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-line bg-surface sm:aspect-[21/10]">
              <Image
                src={project.cover}
                alt={entry.title}
                fill
                sizes="(min-width: 1024px) 80vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </Reveal>
        </Shell>
      </section>

      {/* GALLERY */}
      {project.gallery.length > 0 ? (
        <section className="border-b border-line bg-surface/30 py-16 lg:py-20">
          <Shell>
            <Reveal distance={1}>
              <ProjectGallery
                images={project.gallery}
                label={detail.galleryLabel}
                category={project.category}
              />
            </Reveal>
          </Shell>
        </section>
      ) : null}

      {/* OVERVIEW */}
      <section className="border-b border-line py-16 lg:py-20">
        <Shell className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal distance={0.75}>
              <Eyebrow>{detail.overviewLabel}</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal distance={1}>
              <p className="max-w-[65ch] text-lg font-light leading-relaxed text-foreground/75 sm:text-xl">
                {entry.overview}
              </p>
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* FEATURES + CAPABILITIES */}
      <section className="border-b border-line bg-surface/30 py-16 lg:py-20">
        <Shell className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal distance={1}>
            <ProjectFeatures heading={detail.featuresLabel} items={entry.features} />
          </Reveal>
          <div className="flex flex-col gap-12">
            <Reveal distance={1} delay={0.06}>
              <ProjectCapabilities
                heading={detail.capabilitiesLabel}
                items={entry.capabilities}
              />
            </Reveal>

            {project.tags.length > 0 ? (
              <Reveal distance={1} delay={0.12}>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {detail.techStackLabel}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li key={tag}>
                        <TagChip tone="dark">{tag}</TagChip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}
          </div>
        </Shell>
      </section>

      {/* WHATSAPP CTA */}
      <section className="bg-ink py-20 lg:py-28">
        <Shell>
          <WhatsAppCta copy={whatsapp} projectName={entry.title} />
        </Shell>
      </section>

      {/* PREV / NEXT */}
      <section className="py-12">
        <Shell className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PillButton
            href={localeHref(locale, `/work/${previous.slug}`)}
            variant="outline"
            className="justify-start"
          >
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="rtl:-scale-x-100" />
              <span className="flex flex-col items-start text-start">
                <span className="text-[10px] uppercase tracking-[0.08em] text-foreground/40">
                  {spotlightLabels.previous}
                </span>
                <span>{previous.title}</span>
              </span>
            </span>
          </PillButton>

          <PillButton href={localeHref(locale, `/work/${next.slug}`)} variant="outline">
            <span className="inline-flex items-center gap-2">
              <span className="flex flex-col items-end text-end">
                <span className="text-[10px] uppercase tracking-[0.08em] text-foreground/40">
                  {spotlightLabels.next}
                </span>
                <span>{next.title}</span>
              </span>
              <ArrowRight className="rtl:-scale-x-100" />
            </span>
          </PillButton>
        </Shell>
      </section>
    </div>
  );
}
