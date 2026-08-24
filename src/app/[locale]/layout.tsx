import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Onest } from "next/font/google";
import { notFound } from "next/navigation";
import { MotionConfig } from "motion/react";

import { AdaptiveGrid } from "@/core/components/adaptive-grid";
import {
  getDirection,
  isLocale,
  LOCALES,
  type Locale,
} from "@/core/i18n/config";
import { getDictionary } from "@/core/i18n/dictionaries";
import { RequestModalProvider } from "@/features/contact/components/request-modal-provider";
import { WhatsAppFloatingButton } from "@/features/contact/components/whatsapp-floating-button";
import { SiteFooter } from "@/features/footer/components/site-footer";
import { SiteHeader } from "@/features/navigation/components/site-header";

import "../globals.css";

/**
 * This is the application's root layout. With every route nested under
 * `[locale]`, the locale segment is a root parameter — which is what lets `lang`
 * and `dir` be correct in the initial HTML rather than patched in on the client.
 */

const onest = Onest({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-onest",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-arabic",
});

type LocaleParams = { params: Promise<{ locale: string }> };

/** Both locales are prerendered; anything else is a 404 rather than a new page. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    // Both locales render at the same prefix-free URL now (the active
    // language is a `NEXT_LOCALE` cookie, not a path segment — see
    // `src/proxy.ts` and docs/code.md §4/§7) — so there is exactly one URL
    // per page and no `alternates.languages` to declare: a `hreflang` entry
    // per locale would point every language at the same href, which is not
    // what that annotation means. This is a deliberate SEO trade-off: a
    // crawler only ever sees the default-locale content, since it never
    // carries the cookie a real reader picks up from `Accept-Language` or the
    // switcher.
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const { locale: candidate } = await params;

  if (!isLocale(candidate)) notFound();
  const locale: Locale = candidate;

  const dictionary = await getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      // Next 16 no longer applies smooth scrolling implicitly.
      data-scroll-behavior="smooth"
      className={`${onest.variable} ${plexArabic.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        {/* `reducedMotion="user"` drops transform channels and keeps opacity for
            readers who ask for less motion, so no component needs its own guard. */}
        <MotionConfig reducedMotion="user">
          {/* One dialog for the whole page. Children stay server-rendered —
              wrapping them in a client provider does not change that. */}
          <RequestModalProvider copy={dictionary.request}>
            <AdaptiveGrid />

            <a
              href="#main"
              className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:start-4 focus-visible:top-4 focus-visible:z-120 focus-visible:rounded-control focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-white"
            >
              {dictionary.common.skipToContent}
            </a>

            <SiteHeader
              locale={locale}
              labels={dictionary.nav}
              copy={{
                brand: dictionary.common.brand,
                menu: dictionary.common.menu,
                close: dictionary.common.close,
                downloadCv: dictionary.common.downloadCv,
                tagline: dictionary.footer.tagline,
                switchLocale: dictionary.common.switchLocale,
                switchLocaleLabel: dictionary.common.switchLocaleLabel,
              }}
            />

            <main id="main" className="flex-1">
              {children}
            </main>

            <SiteFooter
              locale={locale}
              copy={dictionary.footer}
              navLabels={dictionary.nav}
            />

            {/* Global, singular — same "one shared instance" reasoning as the
                request dialog above (docs/code.md §13). */}
            <WhatsAppFloatingButton
              label={dictionary.whatsapp.floatingLabel}
              message={dictionary.whatsapp.messageGeneric}
            />
          </RequestModalProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
