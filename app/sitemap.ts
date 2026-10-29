import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";
import { locales, localePath } from "@/lib/i18n";

const paths = ["/", "/cv", "/cases", "/contact", "/privacy", "/impressum"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath(l, path)}`])),
      },
    })),
  );
}
