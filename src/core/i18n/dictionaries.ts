import type englishMessages from "../../../messages/en.json";

import type { Locale } from "./config";

/**
 * `messages/en.json` is the source of truth for the copy *shape*. Every other
 * locale is type-checked against it, so a missing or misspelled key fails the
 * build instead of rendering a blank string.
 */
export type Dictionary = typeof englishMessages;

/**
 * Server-only dictionary loader. Dynamic imports keep each locale's copy in its
 * own chunk, so a reader downloads one language, not both.
 */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("../../../messages/en.json").then((module) => module.default),
  ar: () => import("../../../messages/ar.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
