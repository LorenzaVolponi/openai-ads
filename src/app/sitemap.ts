import type { MetadataRoute } from "next";

import {
  LAST_EDITORIAL_REVIEW_ISO,
  SITE_URL,
} from "@/lib/editorial-meta";
import { radarEntries } from "@/lib/radar-data";

const LAST_REVIEW = new Date(LAST_EDITORIAL_REVIEW_ISO);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_REVIEW,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/radar`,
      lastModified: LAST_REVIEW,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/oai-adsbot-searchbot`,
      lastModified: LAST_REVIEW,
      changeFrequency: "weekly",
      priority: 0.96,
    },
    ...radarEntries.map((entry) => ({
      url: `${SITE_URL}/radar/${entry.slug}`,
      lastModified: new Date(`${entry.date}T12:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.78,
    })),
    ...[
      "/como-anunciar-no-chatgpt",
      "/chatgpt-ads-brasil",
      "/chatgpt-ads-precos",
      "/chatgpt-ads-metricas",
      "/ads-manager-chatgpt",
      "/chatgpt-ads-privacidade",
    ].map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: path === "/como-anunciar-no-chatgpt" ? new Date("2026-08-27T12:00:00-03:00") : LAST_REVIEW,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/imprensa`,
      lastModified: LAST_REVIEW,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/metodologia`,
      lastModified: LAST_REVIEW,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/privacidade`,
      lastModified: LAST_REVIEW,
      changeFrequency: "monthly",
      priority: 0.55,
    },
    {
      url: `${SITE_URL}/termos`,
      lastModified: LAST_REVIEW,
      changeFrequency: "monthly",
      priority: 0.55,
    },
  ];
}
