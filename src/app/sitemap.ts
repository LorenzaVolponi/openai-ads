import type { MetadataRoute } from "next";

import { LAST_EDITORIAL_REVIEW_ISO, SITE_URL } from "@/lib/editorial-meta";
import { radarEntries } from "@/lib/radar-data";

const LAST_REVIEW = new Date(LAST_EDITORIAL_REVIEW_ISO);
const INTELLIGENCE_REVIEW = new Date("2026-08-28T15:45:00-03:00");
const AUTHORITY_REVIEW = new Date("2026-08-29T14:30:00-03:00");
const GLOBAL_GROWTH_REVIEW = new Date("2026-08-29T15:00:00-03:00");
const AI_INDEX_REVIEW = new Date("2026-08-29T15:35:00-03:00");

const globalGrowthPaths = [
  "/en/chatgpt-ads",
  "/en/chatgpt-ads-strategy",
  "/en/chatgpt-ads-for-agencies",
  "/en/chatgpt-ads-for-brands",
  "/en/chatgpt-ads-consultant",
  "/en/chatgpt-ads-partnerships",
  "/en/geo-ai-strategy",
  "/en/lorenza-volponi",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: INTELLIGENCE_REVIEW, changeFrequency: "weekly", priority: 1, alternates: { languages: { "pt-BR": SITE_URL, en: `${SITE_URL}/en` } } },
    { url: `${SITE_URL}/en`, lastModified: GLOBAL_GROWTH_REVIEW, changeFrequency: "weekly", priority: 0.94, alternates: { languages: { "pt-BR": SITE_URL, en: `${SITE_URL}/en` } } },
    { url: `${SITE_URL}/en/volponi-ai-index`, lastModified: AI_INDEX_REVIEW, changeFrequency: "weekly", priority: 0.97 },
    { url: `${SITE_URL}/en/radar`, lastModified: LAST_REVIEW, changeFrequency: "daily", priority: 0.96, alternates: { languages: { en: `${SITE_URL}/en/radar`, "pt-BR": `${SITE_URL}/radar` } } },
    ...globalGrowthPaths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: GLOBAL_GROWTH_REVIEW, changeFrequency: "weekly" as const, priority: path === "/en/chatgpt-ads-consultant" || path === "/en/lorenza-volponi" || path === "/en/geo-ai-strategy" ? 0.93 : 0.9 })),
    { url: `${SITE_URL}/work-with-lorenza`, lastModified: GLOBAL_GROWTH_REVIEW, changeFrequency: "weekly", priority: 0.91 },
    { url: `${SITE_URL}/radar`, lastModified: LAST_REVIEW, changeFrequency: "daily", priority: 0.95, alternates: { languages: { "pt-BR": `${SITE_URL}/radar`, en: `${SITE_URL}/en/radar` } } },
    { url: `${SITE_URL}/oai-adsbot-searchbot`, lastModified: LAST_REVIEW, changeFrequency: "weekly", priority: 0.96 },
    ...radarEntries.map((entry) => ({ url: `${SITE_URL}/radar/${entry.slug}`, lastModified: new Date(`${entry.date}T12:00:00Z`), changeFrequency: "monthly" as const, priority: 0.78 })),
    ...["/como-anunciar-no-chatgpt", "/chatgpt-ads-brasil", "/chatgpt-ads-precos", "/chatgpt-ads-metricas", "/ads-manager-chatgpt", "/chatgpt-ads-privacidade"].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: path === "/como-anunciar-no-chatgpt" ? new Date("2026-08-27T12:00:00-03:00") : LAST_REVIEW, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...["/chatgpt-ads-market", "/chatgpt-ads-vs-google-ads", "/chatgpt-ads-vs-meta-ads", "/chatgpt-ads-para-agencias"].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: INTELLIGENCE_REVIEW, changeFrequency: "weekly" as const, priority: path === "/chatgpt-ads-market" ? 0.94 : 0.88 })),
    { url: `${SITE_URL}/autoridade`, lastModified: AUTHORITY_REVIEW, changeFrequency: "weekly", priority: 0.86 },
    { url: `${SITE_URL}/imprensa`, lastModified: LAST_REVIEW, changeFrequency: "weekly", priority: 0.82 },
    { url: `${SITE_URL}/imprensa/dados`, lastModified: INTELLIGENCE_REVIEW, changeFrequency: "weekly", priority: 0.84 },
    { url: `${SITE_URL}/metodologia`, lastModified: LAST_REVIEW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${SITE_URL}/privacidade`, lastModified: LAST_REVIEW, changeFrequency: "monthly", priority: 0.55 },
    { url: `${SITE_URL}/termos`, lastModified: LAST_REVIEW, changeFrequency: "monthly", priority: 0.55 },
  ];
}
