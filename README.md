# giannivindimian.com

Portfolio site for Gianni Vindimian, Performance Marketing Consultant. Built with Next.js (App Router), TypeScript and Tailwind CSS, deployed on Vercel. Replaces the previous Wix Studio site and reproduces its design: grey canvas, blue type, lime and blue blocks, stacking sections and entrance animations.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional, only needed for the contact form
npm run dev                  # http://localhost:3000
```

`npm run lint` and `npm run build` must pass before deploying.

## Languages

English is the default and lives at the root (`/`, `/cv`). German and Italian live under `/de` and `/it`. `proxy.ts` rewrites unprefixed paths to the English pages internally and redirects `/en/...` to the unprefixed form, so every page has one URL per language. Pages set `hreflang` alternates and the sitemap lists all three.

Translations follow what the Wix site had: the home page and the contact intro exist in German and Italian, everything else falls back to English. To translate a page, add the file under `content/de/` or `content/it/` with the same name as the English one; nothing else needs to change.

## Where things live

| What | Where |
|---|---|
| Copy for every page, per language | `content/<locale>/*.json` and `content/<locale>/*.md` (privacy, impressum) |
| Shared facts (name, email, LinkedIn) | `content/site.json` |
| Labels (navigation, form, 404) | `content/<locale>/ui.json` |
| Design tokens (colours, radii, header height) | top of `app/globals.css` |
| Type scale, stacking sections, animations | `app/globals.css` (`.title-*`, `.stack`, `[data-reveal]`, `.spin-in`, `.breathe`) |
| Font (Questrial, via `next/font`) | `app/[locale]/layout.tsx` |
| Pages | `app/[locale]/` (`/`, `/cv`, `/cases`, `/contact`, `/privacy`, `/impressum`) |
| Shared UI | `components/`, decorative shapes in `components/icons/` |
| Images | `public/images/` (portrait, channel logos, client logos) |
| Contact form backend | `app/api/contact/route.ts` (sends through Resend) |

Pages never contain copy. To add a job or a case study, edit the JSON file. To restyle, edit the tokens.

## Wide screens

Wix scales the whole layout with the viewport above 1440px. `globals.css` does the same by scaling the root font size between 1440px and 1920px, and every layout measurement is in rem so it follows. The CV page is the exception and stays centred at 1440px, as on Wix.

## Animations

- Sections with the `stack` class pin under the header and the next section slides over them (About me, Channels, Why me?).
- `<Reveal effect="fade|glide|shape">` plays an entrance animation once the element scrolls into view.
- The hero starburst spins in on load (`.spin-in`); the curved arrow in the bento grid breathes (`.breathe`).
- All of it is disabled for visitors who prefer reduced motion.

## Contact form

The form posts to `/api/contact`, which emails the message through Resend, from `contact@giannivindimian.com` to the same mailbox with the visitor as reply-to. The domain is verified in Resend; its DNS records sit on the `send` and `resend._domainkey` subdomains, so the Hostinger mailbox records stay as they are. Without `RESEND_API_KEY` the form still renders, but sending returns a 503 with a message pointing to the email address. See `.env.example` for all variables. The hidden `company` field is a honeypot for bots.

## Bots

Search engines can crawl and index everything except `/api`. AI crawlers, SEO scrapers and script clients listed in `lib/bots.ts` are disallowed in `robots.txt` and, because most of them ignore that, also answered with a 403 by `proxy.ts` on every path. Requests without a User-Agent are refused too. Add or remove names in that one list.

## Deploy

Push to the connected Git repository and Vercel builds it. Set the environment variables from `.env.example` in the Vercel project. The domain is moved last, after the preview has been reviewed.
# sito
