import type { MetadataRoute } from "next";
import { blockedBots } from "@/lib/bots";
import { siteUrl } from "@/lib/content";

/* Search engines may crawl everything but the API; the crawlers in lib/bots.ts get nothing. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: blockedBots, disallow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
