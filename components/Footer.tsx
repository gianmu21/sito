import Link from "next/link";
import { getUi, site } from "@/lib/content";
import { localePath, type Locale } from "@/lib/i18n";
import LinkedInIcon from "./LinkedInIcon";

export default function Footer({ locale }: { locale: Locale }) {
  const ui = getUi(locale);
  return (
    <footer className="relative z-10 bg-canvas">
      <div className="flex flex-col items-center gap-8 px-5 py-12 text-center sm:px-10 lg:grid lg:min-h-[8.8125rem] lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-[3.75rem] lg:py-0 lg:text-left">
        <p className="order-1 text-base text-blue sm:text-[1.4062rem] lg:order-none lg:justify-self-start">{site.wordmarkFooter}</p>
        <nav aria-label="Footer" className="order-3 lg:order-none">
          <ul className="flex flex-wrap justify-center gap-x-24 gap-y-3 text-sm text-blue">
            {ui.legal.map((item) => (
              <li key={item.href}>
                <Link href={localePath(locale, item.href)} className="hover:text-black">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={ui.linkedin}
          className="order-2 text-black transition-colors hover:text-blue lg:order-none lg:justify-self-end"
        >
          <LinkedInIcon className="h-7 w-7" />
        </a>
      </div>
    </footer>
  );
}
