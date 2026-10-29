import Link from "next/link";
import Container from "@/components/Container";
import { getUi } from "@/lib/content";
import { defaultLocale } from "@/lib/i18n";

/* Rendered for unknown paths. The locale is not available here, so the labels are English. */
export default function NotFound() {
  const ui = getUi(defaultLocale);
  return (
    <Container className="py-32 text-center">
      <p className="title-xl">404</p>
      <h1 className="title-lg mt-6">{ui.notFound.title}</h1>
      <Link href="/" className="lead mt-10 inline-block underline underline-offset-4">
        {ui.notFound.back}
      </Link>
    </Container>
  );
}
