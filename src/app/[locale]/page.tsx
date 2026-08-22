import { isLocale } from "@/core/i18n/config";
import { getDictionary } from "@/core/i18n/dictionaries";
import { HomePage } from "@/features/home/components/home-page";
import { notFound } from "next/navigation";

/**
 * Route composition only. Everything the page is made of lives in `features/`;
 * `app/` owns routing, metadata and boundaries. See docs/code.md § app.
 */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return <HomePage locale={locale} dictionary={dictionary} />;
}
