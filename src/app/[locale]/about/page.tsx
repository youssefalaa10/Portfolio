import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/core/i18n/config";
import { getDictionary } from "@/core/i18n/dictionaries";
import { AboutPage } from "@/features/about/components/about-page";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.meta.aboutTitle,
    description: dictionary.meta.aboutDescription,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return <AboutPage locale={locale} copy={dictionary.about} />;
}
