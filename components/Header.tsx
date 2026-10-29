import Link from "next/link";
import { getUi, site } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import LinkedInIcon from "./LinkedInIcon";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

export default function Header({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] bg-canvas">
      <div className="grid h-full grid-cols-[auto_1fr_auto] items-center px-5 sm:px-10 lg:px-[3.75rem]">
        <div className="lg:hidden">
          <MobileMenu locale={locale} items={ui.nav} openLabel={ui.menuOpen} closeLabel={ui.menuClose} />
        </div>
        <Link
          href={localePath(locale, "/")}
          className="justify-self-center text-[1.0625rem] tracking-[0.2em] text-blue sm:text-xl lg:justify-self-start"
        >
          {site.wordmark}
        </Link>
        <nav aria-label="Main" className="hidden justify-self-center lg:block">
          <NavLinks locale={locale} items={ui.nav} />
        </nav>
        <div className="flex items-center gap-5 justify-self-end">
          <LanguageSwitcher locale={locale} />
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={ui.linkedin}
            className="hidden text-black transition-colors hover:text-blue lg:block"
          >
            <LinkedInIcon className="h-7 w-7" />
          </a>
        </div>
      </div>
    </header>
  );
}
