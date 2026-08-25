import type { MetadataRoute } from "next";

const BASE_URL = "https://openai-ads.volponi.tech";
const LAST_REVIEW = new Date("2026-08-25T09:10:00-03:00");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: LAST_REVIEW,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/metodologia`,
      lastModified: LAST_REVIEW,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacidade`,
      lastModified: LAST_REVIEW,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/termos`,
      lastModified: LAST_REVIEW,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
