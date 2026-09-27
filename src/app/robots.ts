import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/admin", "/cms-api/"] },
      // Explicit per-bot rules for AI crawlers. Most of these (OAI-SearchBot, ChatGPT-User,
      // Claude-SearchBot, PerplexityBot, Bingbot, and Googlebot via "*" above) drive citations
      // in AI search/answers (GEO). GPTBot, ClaudeBot and Google-Extended are model-*training*
      // crawlers, not search/citation crawlers — allowing them is a separate, deliberate
      // decision about training data, not a GEO requirement. All get the same rule here.
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Bingbot"], allow: "/", disallow: ["/api/", "/admin", "/cms-api/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // No `host` directive: it was a Yandex-only extension, deprecated by Yandex itself since
    // 2018, and unrecognized by Google/Bing — the canonical <link> tags do this job instead.
  };
}
