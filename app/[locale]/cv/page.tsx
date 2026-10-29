import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import AsteriskIcon from "@/components/icons/AsteriskIcon";
import { getCv, getUi } from "@/lib/content";
import { isLocale, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "/cv", "CV");
}

function LimeHeading({ children, marker = true }: { children: React.ReactNode; marker?: boolean }) {
  return (
    <h2 className="relative text-[clamp(2.25rem,1.94rem+1.286vw,3.1rem)] leading-tight tracking-[-0.02em] text-lime">
      {marker && <AsteriskIcon className="absolute -left-[2.875rem] top-1/2 h-7 w-7 -translate-y-1/2 text-lime" />}
      {children}
    </h2>
  );
}

export default async function CvPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const { data: cv, lang } = getCv(locale);
  const ui = getUi(locale);

  return (
    <div lang={lang === locale ? undefined : lang} className="mx-auto max-w-[1440px]">
      <Container className="pt-16 sm:pt-24">
        <h1 className="title-xl">{cv.heading}</h1>
        <p className="title-lg mt-4">{cv.subheading}</p>
        <p className="lead mt-6 max-w-[46.25rem]">{cv.summary}</p>
      </Container>

      <Container className="pb-20 pt-24 sm:pt-[15.625rem]">
        <div className="grid gap-20 lg:grid-cols-[1.9fr_1fr] lg:gap-16">
          {/* Experience: a lime timeline with an asterisk at every job */}
          <section className="relative ml-8 border-l-2 border-lime pl-10 sm:ml-10">
            <LimeHeading marker={false}>{cv.sections.experience}</LimeHeading>
            <ol className="mt-10 space-y-14">
              {cv.experience.map((job) => (
                <li key={`${job.company} ${job.period}`} className="relative">
                  <p className="lead">
                    {job.company} | {job.period}
                  </p>
                  <h3 className="title-md relative mt-1 font-bold">
                    <AsteriskIcon className="absolute -left-[3.375rem] top-1/2 h-6 w-6 -translate-y-1/2 text-lime" />
                    {job.title}
                  </h3>
                  <p className="copy mt-3 max-w-[47.5rem]">
                    {job.text}
                    {job.caseStudy && (
                      <>
                        {" "}
                        <Link
                          href={localePath(locale, job.caseStudy)}
                          className="underline underline-offset-2 hover:text-black"
                        >
                          {ui.caseStudy}
                        </Link>
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-14 text-xl font-bold">{cv.plus}</p>
          </section>

          <div className="ml-8 space-y-24 self-start border-l-2 border-lime pl-8 sm:ml-10">
            <section className="relative">
              <LimeHeading>{cv.sections.languages}</LimeHeading>
              <ul className="copy mt-10 space-y-2 leading-8">
                {cv.languages.map((language) => (
                  <li key={language.name}>
                    <span className="font-bold underline underline-offset-2">{language.name}</span> |{" "}
                    {language.level}
                  </li>
                ))}
              </ul>
            </section>
            <section className="relative">
              <LimeHeading>{cv.sections.sideProjects}</LimeHeading>
              <ul className="copy mt-10 space-y-5">
                {cv.sideProjects.map((project) => (
                  <li key={project.name}>
                    <p>{project.name}</p>
                    {project.text && <p>{project.text}</p>}
                    {project.items && (
                      <ul>
                        {project.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
