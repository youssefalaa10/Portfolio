import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale, LOCALES } from "@/core/i18n/config";
import { getDictionary } from "@/core/i18n/dictionaries";
import { PROJECTS, type ProjectSlug } from "@/features/work/data/projects";
import { WorkDetailPage } from "@/features/work/components/work-detail-page";

type Props = { params: Promise<{ locale: string; slug: string }> };

function isProjectSlug(value: string): value is ProjectSlug {
  return PROJECTS.some((project) => project.slug === value);
}

/** Both locales, every project — prerendered, same rule as every other route. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    PROJECTS.map((project) => ({ locale, slug: project.slug })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProjectSlug(slug)) return {};

  const dictionary = await getDictionary(locale);
  const entry = dictionary.work.projects[slug];

  return {
    title: `${entry.title} — ${dictionary.meta.title}`,
    description: entry.summary,
  };
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProjectSlug(slug)) notFound();

  const dictionary = await getDictionary(locale);
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  const project = PROJECTS[index];
  const previousProject = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <WorkDetailPage
      locale={locale}
      project={project}
      entry={dictionary.work.projects[slug]}
      detail={dictionary.work.detail}
      whatsapp={dictionary.whatsapp}
      previous={{
        slug: previousProject.slug,
        title: dictionary.work.projects[previousProject.slug].title,
      }}
      next={{
        slug: nextProject.slug,
        title: dictionary.work.projects[nextProject.slug].title,
      }}
      spotlightLabels={{
        previous: dictionary.work.spotlight.previous,
        next: dictionary.work.spotlight.next,
      }}
    />
  );
}
