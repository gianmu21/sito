import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import Emphasis from "@/components/Emphasis";
import Reveal from "@/components/Reveal";
import CompassIcon from "@/components/icons/CompassIcon";
import { getCases } from "@/lib/content";
import { isLocale, localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import type { CaseStudy, CaseTone } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "/cases", "Cases");
}

/* Colours per band, as on the Wix site: white and lime bands use blue text, the blue band white text. */
const tones: Record<
  CaseTone,
  { band: string; block: string; text: string; icon: string; pill: string; tile: string; tileText: string }
> = {
  white: { band: "", block: "bg-white", text: "text-blue", icon: "text-lime", pill: "bg-lime text-blue", tile: "bg-lime", tileText: "text-blue" },
  lime: { band: "bg-lime", block: "bg-lime", text: "text-blue", icon: "text-white", pill: "bg-white text-blue", tile: "bg-white", tileText: "text-blue" },
  blue: { band: "bg-blue", block: "bg-blue", text: "text-white", icon: "text-white", pill: "bg-lime text-blue", tile: "bg-lime", tileText: "text-blue" },
};

function Column({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <div>
      <h3 className="title-md">{title}</h3>
      <div className="copy-sm mt-6 space-y-4">
        {paragraphs.map((p) => (
          <p key={p}>
            <Emphasis text={p} />
          </p>
        ))}
      </div>
    </div>
  );
}

function Case({ study, labels }: { study: CaseStudy; labels: { client: string; challenges: string; actions: string; results: string } }) {
  const t = tones[study.tone];
  return (
    <section id={study.slug} className={`scroll-mt-[var(--header-h)] ${t.band}`}>
      <div className={`${t.block} ${t.text} rounded-tr-block px-5 py-16 sm:px-10 sm:py-20 lg:mr-[7.1875rem] lg:px-[3.75rem] lg:pb-[27.5rem] lg:pt-[4.6875rem]`}>
        <Reveal effect="shape" className="w-fit">
          <CompassIcon className={`h-16 w-16 ${t.icon}`} />
        </Reveal>
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-4 lg:gap-9">
          <div>
            <p className="copy-sm">{labels.client}</p>
            <h2 className="title-lg">{study.client}</h2>
            <p className={`mt-3 inline-block rounded-full px-5 py-1 text-base ${t.pill}`}>{study.industry}</p>
            <p className="copy-sm mt-8">{study.about}</p>
          </div>
          <Column title={labels.challenges} paragraphs={study.challenges} />
          <Column title={labels.actions} paragraphs={study.actions} />
          <div>
            <Column title={labels.results} paragraphs={study.results} />
            <ul className="mt-10 space-y-6">
              {study.metrics.map((metric, i) => (
                <li
                  key={metric.label}
                  className={`rounded-card flex w-fit max-w-[20rem] flex-col items-center justify-center px-8 py-6 text-center ${i === 0 ? "min-w-[15rem] lg:min-h-[9.625rem] lg:min-w-[17.625rem]" : "min-w-[10.625rem] lg:min-h-[7.5rem]"} ${t.tile} ${t.tileText}`}
                >
                  <span className={`font-bold leading-none ${i === 0 ? "text-[3.875rem]" : "text-[2.8125rem]"} ${metric.value.length > 6 ? "!text-[1.75rem] leading-tight" : ""}`}>
                    {metric.value}
                  </span>
                  <span className="copy-sm mt-3 font-bold">{metric.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Intro({ text, locale }: { text: string; locale: Locale }) {
  // Supports one [label](/path) link per paragraph, used for "contact me".
  const match = text.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!match) return <>{text}</>;
  const [full, label, href] = match;
  const [before, after] = text.split(full);
  return (
    <>
      {before}
      <Link href={localePath(locale, href)} className="underline underline-offset-2 hover:text-black">
        {label}
      </Link>
      {after}
    </>
  );
}

export default async function CasesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const { data: cases, lang } = getCases(locale);

  return (
    <div lang={lang === locale ? undefined : lang}>
      <Container className="pb-24 pt-10 sm:pb-32 sm:pt-16">
        <h1 className="title-xl">{cases.heading}</h1>
        <p className="title-lg mt-4">{cases.subheading}</p>
        <div className="lead mt-6 max-w-[51.25rem] space-y-1">
          {cases.intro.map((p) => (
            <p key={p}>
              <Intro text={p} locale={locale} />
            </p>
          ))}
        </div>
      </Container>
      {cases.cases.map((study) => (
        <Case key={study.slug} study={study} labels={cases.labels} />
      ))}
    </div>
  );
}
