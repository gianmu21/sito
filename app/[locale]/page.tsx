import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import ArrowDiagonal from "@/components/icons/ArrowDiagonal";
import ArrowDownCurved from "@/components/icons/ArrowDownCurved";
import Starburst from "@/components/icons/Starburst";
import Sunburst from "@/components/icons/Sunburst";
import portrait from "@/public/images/gianni.jpg";
import { getHome, site } from "@/lib/content";
import { isLocale, localePath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import type { Logo } from "@/lib/types";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "/");
}

function LogoTiles({ logos, tile, listClass }: { logos: Logo[]; tile: string; listClass: string }) {
  return (
    <ul className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${listClass}`}>
      {logos.map((logo) => (
        <li key={logo.name} className={`relative flex h-[6.25rem] items-center justify-center sm:h-[10.1875rem] ${tile}`}>
          <div className="relative h-12 w-[60%] sm:h-20">
            <Image src={logo.src} alt={logo.name} fill sizes="180px" className="object-contain" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const { data: home, lang } = getHome(locale);
  const { hero, services, about, channels, whyMe, clients, testimonial, howItWorks } = home;
  const contactHref = localePath(locale, "/contact");

  return (
    <div lang={lang === locale ? undefined : lang}>
      {/* Hero: title block with the lime starburst spinning in at the top right */}
      <section className="relative overflow-hidden">
        <Starburst className="spin-in absolute right-4 top-20 h-[3.75rem] w-[3.75rem] text-lime sm:right-10 sm:h-24 sm:w-24 lg:right-[4.0625rem] lg:top-[9.6875rem] lg:h-[7.625rem] lg:w-[7.625rem]" />
        <Container className="pb-12 pt-24 sm:pt-28 lg:pb-[6.25rem] lg:pl-20 lg:pt-[11.25rem]">
          <h1 className="title-xl max-w-[47.5rem]">{hero.heading}</h1>
          <p className="mt-4 text-[clamp(1.25rem,0.775rem+1.952vw,2.53rem)] leading-tight lg:mt-5">{hero.subheading}</p>
          <div className="lead mt-5 max-w-[38.75rem] leading-[1.4] lg:mt-6">
            {hero.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Button href={contactHref} className="mt-10 min-w-[8.125rem] lg:mt-12 lg:min-w-[11.5rem]">
            {hero.cta}
          </Button>
        </Container>
      </section>

      {/* Bento grid, full bleed on desktop, 12px gutters on phones as on Wix */}
      <section className="space-y-3 px-3 sm:space-y-5 sm:px-0">
        <div className="grid gap-3 sm:gap-5 lg:min-h-[20.9375rem] lg:grid-cols-[635fr_270fr_503fr] lg:gap-4">
          <article className="rounded-t-block bg-lime px-6 py-8 sm:p-12 lg:rounded-none lg:rounded-tr-block">
            <h2 className="title-lg max-w-[23.75rem]">{services.strategy.heading}</h2>
            <div className="copy mt-4 max-w-[32.5rem] space-y-3 lg:mt-5">
              {services.strategy.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>
          <div className="rounded-tile hidden h-[13.4375rem] items-center justify-center self-end bg-[#d9d9d9] lg:flex">
            <ArrowDownCurved className="breathe h-[7.5rem] w-[4.375rem] text-blue" />
          </div>
          <article className="rounded-block bg-blue px-6 py-8 text-white sm:p-12 lg:rounded-none lg:rounded-tl-block">
            <h2 className="title-lg">{services.acquisition.heading}</h2>
            <div className="copy mt-4 space-y-3 lg:mt-5">
              {services.acquisition.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>
        </div>
        <div className="grid gap-3 sm:gap-5 lg:min-h-[26.5rem] lg:grid-cols-[318fr_627fr_462fr] lg:gap-4">
          {/* On phones Wix shows the analysis card before the photo */}
          <div className="rounded-block relative order-2 h-[18.125rem] overflow-hidden bg-[#d9d9d9] lg:order-none lg:h-auto lg:rounded-l-none">
            <Image
              src={portrait}
              alt={site.name}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 320px, 100vw"
              className="object-cover object-top"
            />
          </div>
          <article className="rounded-block order-1 bg-blue px-6 py-8 text-lime sm:p-12 lg:order-none lg:px-16 lg:py-14">
            <h2 className="title-lg">{services.analysis.heading}</h2>
            <div className="copy mt-4 max-w-[32.5rem] space-y-3 lg:mt-5">
              {services.analysis.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </article>
          <div className="rounded-block order-3 flex min-h-[10rem] flex-col items-center justify-center gap-4 bg-lime px-8 py-10 lg:order-none lg:items-end lg:rounded-r-none lg:px-12">
            {services.ctas.map((cta, i) => (
              // Wix shows only the second button on phones.
              <div key={cta.label} className={`w-full max-w-[20.625rem] ${i === 0 ? "hidden lg:block" : ""}`}>
                <Button href={localePath(locale, cta.href)} variant="pillBlue" className="w-full">
                  {cta.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stacking sections: each pins under the header and the next one slides over it */}
      <section className="stack rounded-t-block mt-3 bg-white sm:mt-5">
        <Container className="py-16 lg:min-h-[50rem] lg:py-[6.875rem]">
          <Reveal effect="fade">
            <p className="title-lg">{about.eyebrow}</p>
            <div className="mt-8 lg:ml-[11.875rem] lg:mt-12">
              <h2 className="title-xl-tight max-w-[48.75rem]">{about.heading}</h2>
              <div className="copy mt-8 max-w-[40rem] lg:mt-10">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="stack overflow-hidden bg-lime">
        <Container className="py-10 text-center lg:min-h-[34.375rem] lg:py-[6.25rem] lg:text-left">
          <Reveal effect="glide-half">
            <h2 className="title-lg">{channels.heading}</h2>
          </Reveal>
          <Reveal effect="glide" className="mt-8 lg:mt-20">
            <LogoTiles logos={channels.logos} tile="rounded-tile bg-black" listClass="lg:flex lg:justify-center lg:gap-6 lg:[&>li]:w-[10.625rem]" />
          </Reveal>
        </Container>
      </section>

      <section className="stack bg-blue text-white">
        <Container className="pb-10 pt-12 lg:min-h-[60.4375rem] lg:pb-24 lg:pt-[4.375rem]">
          <h2 className="title-lg max-w-[56.25rem] text-white">{whyMe.heading}</h2>
          {/* Wix lists the cards in reverse order on phones */}
          <ul className="mt-10 flex flex-col-reverse gap-4 sm:grid sm:grid-cols-2 sm:gap-6 lg:mt-[8.125rem] lg:grid-cols-4">
            {whyMe.items.map((item, i) => (
              <li
                key={item.title}
                className={`rounded-block sm:rounded-card min-h-[18.125rem] px-8 pb-10 pt-9 text-blue lg:min-h-[24.75rem] ${i % 2 === 0 ? "bg-lime" : "bg-canvas"}`}
              >
                <Sunburst className="h-8 w-8" />
                <h3 className="mt-6 text-2xl leading-[1.15] sm:text-[2rem]">{item.title}</h3>
                <p className="copy mt-4">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Everything below is positioned so it paints over the pinned sections */}
      <section className="relative overflow-hidden bg-canvas">
        <Container className="pb-10 pt-12 text-center lg:pb-16 lg:pt-[5.625rem] lg:text-left">
          <Reveal effect="glide-half">
            <h2 className="title-lg">{clients.heading}</h2>
          </Reveal>
          <Reveal effect="glide" className="mt-8 lg:mt-[10.625rem]">
            <LogoTiles logos={clients.logos} tile="rounded-tile sm:rounded-card bg-blue" listClass="lg:grid-cols-5 lg:gap-5" />
          </Reveal>
        </Container>
      </section>

      <section className="relative bg-canvas">
        <Container className="py-10 text-center lg:py-12 lg:text-left">
          <h2 className="title-lg">{testimonial.heading}</h2>
          <figure className="mx-auto mt-6 max-w-[63.75rem] text-center lg:mt-8">
            <blockquote className="copy-sm italic sm:text-base">{testimonial.quote}</blockquote>
            <figcaption className="copy mt-8 lg:mt-10">
              <p>{testimonial.author}</p>
              <p>{testimonial.role}</p>
              <p className="font-bold">{testimonial.company}</p>
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="relative bg-canvas pb-6 pt-6 lg:pb-4 lg:pt-10">
        <div className="rounded-block mx-3 bg-lime px-6 py-12 sm:mx-10 sm:px-12 lg:mx-24 lg:px-16 lg:py-[5.625rem]">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div>
              <h2 className="title-lg text-center lg:text-left">{howItWorks.heading}</h2>
              <ol className="mt-10 list-decimal space-y-7 pl-7 text-[clamp(1.125rem,1.02rem+0.43vw,1.4rem)] leading-[1.4]">
                {howItWorks.steps.map((step) => (
                  <li key={step.title}>
                    <span className="font-bold">{step.title}</span>
                    <br />
                    {step.text}
                  </li>
                ))}
              </ol>
            </div>
            {/* On phones Wix drops the arrow and the "Get in touch" line and centres the button */}
            <div className="text-center lg:pl-12 lg:pt-4 lg:text-left">
              <ArrowDiagonal className="hidden h-12 w-12 lg:block" />
              <p className="title-lg mt-10 hidden lg:block">{howItWorks.getInTouch}</p>
              <Button href={contactHref} variant="pillWhite" className="min-w-[13.25rem] lg:mt-8">
                {howItWorks.cta}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
