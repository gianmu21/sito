import siteJson from "@/content/site.json";
import enCases from "@/content/en/cases.json";
import enContact from "@/content/en/contact.json";
import enCv from "@/content/en/cv.json";
import enHome from "@/content/en/home.json";
import enUi from "@/content/en/ui.json";
import deContact from "@/content/de/contact.json";
import deHome from "@/content/de/home.json";
import deUi from "@/content/de/ui.json";
import itContact from "@/content/it/contact.json";
import itHome from "@/content/it/home.json";
import itUi from "@/content/it/ui.json";
import { defaultLocale, type Locale } from "./i18n";
import type {
  CasesContent,
  ContactContent,
  CvContent,
  HomeContent,
  SiteContent,
  UiContent,
} from "./types";

export const site = siteJson as SiteContent;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://giannivindimian.com";

/**
 * Content per locale. A locale without its own file falls back to English,
 * which is what the Wix site did for the untranslated pages.
 */
type Localized<T> = Partial<Record<Locale, T>> & { en: T };

const ui: Localized<UiContent> = { en: enUi as UiContent, de: deUi as UiContent, it: itUi as UiContent };
const home: Localized<HomeContent> = { en: enHome as HomeContent, de: deHome as HomeContent, it: itHome as HomeContent };
const cv: Localized<CvContent> = { en: enCv as CvContent };
const cases: Localized<CasesContent> = { en: enCases as CasesContent };
const contact: Localized<ContactContent> = { en: enContact as ContactContent, de: deContact as ContactContent, it: itContact as ContactContent };

function pick<T>(map: Localized<T>, locale: Locale): { data: T; lang: Locale } {
  const data = map[locale];
  return data ? { data, lang: locale } : { data: map.en, lang: defaultLocale };
}

export const getUi = (locale: Locale) => pick(ui, locale).data;
export const getHome = (locale: Locale) => pick(home, locale);
export const getCv = (locale: Locale) => pick(cv, locale);
export const getCases = (locale: Locale) => pick(cases, locale);
export const getContact = (locale: Locale) => pick(contact, locale);
