import type { Metadata } from "next";
import Container from "@/components/Container";
import Markdown from "@/components/Markdown";
import { isLocale } from "@/lib/i18n";
import { readMarkdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "/privacy", "Privacy Policy");
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const { source, lang } = readMarkdown(locale, "privacy");
  return (
    <Container className="py-16 sm:py-24">
      <div lang={lang === locale ? undefined : lang}>
        <Markdown source={source} />
      </div>
    </Container>
  );
}
