import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import Container from "@/components/Container";
import portrait from "@/public/images/gianni.jpg";
import { getContact, getUi, site } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "/contact", "Contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const { data: contact } = getContact(locale);
  const ui = getUi(locale);

  return (
    <Container className="pb-24 pt-16 sm:pt-[12.5rem]">
      <h1 className="title-xl">{contact.heading}</h1>
      <p className="lead mt-10">{contact.intro}</p>
      <a
        href={`mailto:${site.email}`}
        className="lead mt-2 inline-block font-bold underline underline-offset-2 hover:text-black"
      >
        {site.email}
      </a>

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.72fr_1fr] lg:gap-5">
        <div className="rounded-block flex min-h-[26.25rem] items-center bg-blue px-8 py-10 sm:px-14 lg:min-h-[34.375rem] lg:rounded-r-none lg:px-24 lg:py-6">
          <ContactForm labels={ui.form} />
        </div>
        <Image
          src={portrait}
          alt={site.name}
          placeholder="blur"
          sizes="(min-width: 1024px) 480px, 100vw"
          className="rounded-block h-[26.25rem] w-full object-cover object-top lg:h-full lg:min-h-[34.375rem] lg:rounded-l-none"
        />
      </div>
    </Container>
  );
}
