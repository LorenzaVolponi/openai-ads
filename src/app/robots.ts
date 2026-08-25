import type { MetadataRoute } from "next";

import { OPENAI_CRAWLER_USER_AGENTS } from "@/lib/oai-crawler-readiness";

// GEO (Generative Engine Optimization): explicitamente permite os principais
// crawlers de IA/GEO. Os crawlers da OpenAI vêm de uma única fonte de verdade
// compartilhada com os manifests e o endpoint de diagnóstico.
const AI_CRAWLERS = [
  ...OPENAI_CRAWLER_USER_AGENTS,
  "ChatGPT-User", // OpenAI — respostas em tempo real
  "ClaudeBot", // Anthropic
  "Claude-Web", // Anthropic — web
  "anthropic-ai", // Anthropic — legacy
  "PerplexityBot", // Perplexity
  "Perplexity-User", // Perplexity — respostas
  "Google-Extended", // Google — Gemini/API
  "Applebot-Extended", // Apple — Apple Intelligence
  "CCBot", // Common Crawl
  "Bytespider", // ByteDance
  "cohere-ai", // Cohere
  "Diffbot", // Diffbot
  "Omgilibot", // Webz.io
  "YouBot", // You.com
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: [
      "https://openai-ads.volponi.tech/sitemap.xml",
      "https://openai-ads.volponi.tech/news-sitemap.xml",
    ],
    host: "https://openai-ads.volponi.tech",
  };
}
