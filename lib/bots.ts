/**
 * Crawlers that get nothing from this site: AI training and answer engines,
 * SEO scrapers and generic script clients. Search engines (Googlebot, Bingbot,
 * DuckDuckBot, Applebot, YandexBot) are deliberately absent so the site stays
 * indexable. Matching is a case-insensitive substring test on the User-Agent.
 */
export const blockedBots = [
  // AI crawlers
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "PerplexityBot",
  "FacebookBot",
  "meta-externalagent",
  "Diffbot",
  "cohere-ai",
  "omgili",
  "YouBot",
  "ImagesiftBot",
  "Timpibot",
  // SEO and link scrapers
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
  "DataForSeoBot",
  "PetalBot",
  "BLEXBot",
  // Script clients
  "Scrapy",
  "python-requests",
  "python-urllib",
  "Go-http-client",
  "libwww-perl",
  "HTTrack",
  "Wget",
];

const pattern = new RegExp(blockedBots.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "i");

/** True for a missing User-Agent or one on the blocklist. */
export function isBlockedBot(userAgent: string | null): boolean {
  if (!userAgent || !userAgent.trim()) return true;
  return pattern.test(userAgent);
}
