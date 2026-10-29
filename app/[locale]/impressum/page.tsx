import type { Metadata } from "next";
import Container from "@/components/Container";
import Markdown from "@/components/Markdown";
import { isLocale } from "@/lib/i18n";
import { readMarkdown } from "@/lib/markdown";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(isLocale(locale) ? locale : "en", "/impressum", "Impressum");
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const { source } = readMarkdown(locale, "impressum");
  return (
    <Container className="py-16 sm:py-24">
      {/* The Impressum is German by law, whatever the site language. */}
      <div lang="de">
        <Markdown source={source} />
      </div>
    </Container>
  );
}
