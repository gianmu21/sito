"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";
import type { Cta } from "@/lib/types";

/* Header navigation. The current page is black, the rest blue, as on the Wix site. */
export default function NavLinks({ locale, items }: { locale: Locale; items: Cta[] }) {
  const { path } = stripLocale(usePathname());
  return (
    <ul className="flex items-center gap-[4.75rem] text-sm tracking-[0.05em]">
      {items.map((item) => {
        const current = item.href === path;
        return (
          <li key={item.href}>
            <Link
              href={localePath(locale, item.href)}
              aria-current={current ? "page" : undefined}
              className={`transition-colors duration-300 hover:text-black ${current ? "text-black" : "text-blue"}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
