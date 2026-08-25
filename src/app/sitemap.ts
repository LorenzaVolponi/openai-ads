import type { MetadataRoute } from "next";

import { radarEntries } from "@/lib/radar-data";

const BASE_URL = "https://openai-ads.volponi.tech";
const LAST_REVIEW = new Date("2026-08-25T11:19:00-03:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LAST_REVIEW,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/radar`,
      lastModified: LAST_REVIEW,
      changeFrequency: "daily",
      priority: 0.95,
    },
    ...radarEntries.map((entry) => ({
      url: `${BASE_URL}/radar/${entry.slug}`,
      lastModified: new Date(`${entry.date}T12:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.78,
    })),
    ...[
      "/chatgpt-ads-brasil",
      "/chatgpt-ads-precos",
      "/chatgpt-ads-metricas",
      "/ads-manager-chatgpt",
      "/chatgpt-ads-privacidade",
    ].map((path) => ({
      url: `${BASE_URL}${path}`,
      lastModified: LAST_REVIEW,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${BASE_URL}/imprensa`,
      lastModified: LAST_REVIEW,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/metodologia`,
      lastModified: LAST_REVIEW,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/privacidade`,
      lastModified: LAST_REVIEW,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${BASE_URL}/termos`,
      lastModified: LAST_REVIEW,
      changeFrequency: "monthly",
      priority: 0.55,
    },
  ];
}
