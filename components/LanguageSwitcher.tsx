"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localePath, stripLocale, type Locale } from "@/lib/i18n";

/* EN / DE / IT boxes. The active language has a lime background; hover inverts the box. */
export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const { path } = stripLocale(usePathname());
  return (
    <ul className="flex text-base">
      {locales.map((l) => (
        <li key={l}>
          <Link
            href={localePath(l, path)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? "true" : undefined}
            className={`block border border-blue px-1.5 leading-5 transition-colors duration-300 hover:bg-blue hover:text-canvas ${
              l === locale ? "bg-lime text-blue" : "bg-white text-blue"
            }`}
          >
            {l.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );
}
