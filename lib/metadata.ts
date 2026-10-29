import type { Metadata } from "next";
import { locales, localePath, type Locale } from "./i18n";
import { siteUrl } from "./content";

/** Canonical and hreflang alternates for one page in one locale. */
export function pageMetadata(locale: Locale, path: string, title?: string): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath(l, path)}`]));
  return {
    ...(title ? { title } : {}),
    alternates: {
      canonical: `${siteUrl}${localePath(locale, path)}`,
      languages: { ...languages, "x-default": `${siteUrl}${localePath("en", path)}` },
    },
  };
}
