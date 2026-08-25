import { RADAR_CHECKED_AT, radarEntries } from "@/lib/radar-data";

export const SITE_URL = "https://openai-ads.volponi.tech";

export const latestRadarEntry = [...radarEntries].sort((a, b) =>
  b.date.localeCompare(a.date),
)[0];

export const LATEST_RADAR_DATE = latestRadarEntry?.date ?? RADAR_CHECKED_AT;
export const LATEST_RADAR_ISO = `${LATEST_RADAR_DATE}T12:00:00Z`;
export const LATEST_RADAR_DATE_OBJECT = new Date(LATEST_RADAR_ISO);

export const LAST_EDITORIAL_REVIEW_DATE =
  RADAR_CHECKED_AT.localeCompare(LATEST_RADAR_DATE) >= 0
    ? RADAR_CHECKED_AT
    : LATEST_RADAR_DATE;

export const LAST_EDITORIAL_REVIEW_ISO = `${LAST_EDITORIAL_REVIEW_DATE}T12:00:00-03:00`;
