import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { isLocale } from "@/core/i18n/config";
import { getDictionary } from "@/core/i18n/dictionaries";
import { ServicesPage } from "@/features/services/components/services-page";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.meta.servicesTitle,
    description: dictionary.meta.servicesDescription,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return <ServicesPage copy={dictionary.services} />;
}
