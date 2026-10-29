import fs from "node:fs";
import path from "node:path";
import { defaultLocale, type Locale } from "./i18n";

/** Reads content/<locale>/<name>.md at build time, falling back to English. */
export function readMarkdown(locale: Locale, name: string): { source: string; lang: Locale } {
  const dir = path.join(process.cwd(), "content");
  const localized = path.join(dir, locale, `${name}.md`);
  if (fs.existsSync(localized)) return { source: fs.readFileSync(localized, "utf8"), lang: locale };
  return { source: fs.readFileSync(path.join(dir, defaultLocale, `${name}.md`), "utf8"), lang: defaultLocale };
}
