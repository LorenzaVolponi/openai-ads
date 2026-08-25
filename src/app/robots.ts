import type { MetadataRoute } from "next";

// GEO (Generative Engine Optimization): explicitamente permite os principais
// crawlers de IA/GEO — incluindo os crawlers oficiais da OpenAI para Search e Ads.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI — treinamento
  "OAI-SearchBot", // OpenAI — ChatGPT Search / descoberta publica
  "OAI-AdsBot", // OpenAI — validacao de landing pages de ChatGPT Ads
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
