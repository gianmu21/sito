"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";
import type { Cta } from "@/lib/types";
import CloseIcon from "./icons/CloseIcon";
import MenuIcon from "./icons/MenuIcon";

/* Hamburger menu: a blue overlay with a black panel and large white links, lime for the current page. */
export default function MobileMenu({
  locale,
  items,
  openLabel,
  closeLabel,
}: {
  locale: Locale;
  items: Cta[];
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const { path } = stripLocale(usePathname());

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={openLabel}
        aria-expanded={open}
        className="text-blue"
      >
        <MenuIcon className="h-4 w-8" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-blue/80" onClick={() => setOpen(false)}>
          <nav
            aria-label={openLabel}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full flex-col bg-black px-8 py-10 md:w-1/2"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className="self-start text-white"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <ul className="mt-16 space-y-4">
              {items.map((item) => {
                const current = item.href === path;
                return (
                  <li key={item.href}>
                    <Link
                      href={localePath(locale, item.href)}
                      aria-current={current ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`block text-[3.375rem] leading-[1.4] ${current ? "text-lime" : "text-white"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
