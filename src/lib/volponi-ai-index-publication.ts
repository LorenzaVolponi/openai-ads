import { createHash } from "node:crypto";

import {
  indexDimensions,
  indexMethodology,
  indexSnapshot,
  pressFindings,
  VOLPONI_AI_INDEX_CANONICAL,
  VOLPONI_AI_INDEX_EDITION,
  VOLPONI_AI_INDEX_NAME,
} from "@/lib/volponi-ai-index";
import { LORENZA_ENTITY_ID, LORENZA_LINKEDIN } from "@/lib/lorenza-authority";
import { SITE_URL } from "@/lib/media-authority";

export const VOLPONI_AI_INDEX_VERSIONED_PATH = "/research/volponi-ai-index/2026-08.json";
export const VOLPONI_AI_INDEX_VERSIONED_URL = `${SITE_URL}${VOLPONI_AI_INDEX_VERSIONED_PATH}`;
export const RESEARCH_MANIFEST_URL = `${SITE_URL}/research-manifest.json`;

export function buildVolponiAiIndexPublication() {
  return {
    schemaVersion: 2,
    publicationType: "independent editorial research dataset",
    name: VOLPONI_AI_INDEX_NAME,
    edition: VOLPONI_AI_INDEX_EDITION,
    canonical: VOLPONI_AI_INDEX_CANONICAL,
    latestDataset: `${SITE_URL}/volponi-ai-index.json`,
    versionedDataset: VOLPONI_AI_INDEX_VERSIONED_URL,
    researchManifest: RESEARCH_MANIFEST_URL,
    author: {
      name: "Lorenza Volponi",
      entityId: LORENZA_ENTITY_ID,
      canonical: "https://volponi.tech/",
      profile: `${SITE_URL}/en/lorenza-volponi`,
      linkedin: LORENZA_LINKEDIN,
    },
    snapshot: indexSnapshot,
    dimensions: indexDimensions,
    methodology: indexMethodology,
    mediaReadyFindings: pressFindings,
    evidenceBackbone: {
      radar: `${SITE_URL}/en/radar`,
      marketData: `${SITE_URL}/data/chatgpt-ads-markets.json`,
      evidence: `${SITE_URL}/evidence.json`,
      provenance: `${SITE_URL}/provenance.json`,
    },
    citation: `${VOLPONI_AI_INDEX_NAME}, Lorenza Volponi / volponi.tech, edition ${VOLPONI_AI_INDEX_EDITION}.`,
    boundary:
      "This index is independent editorial research. It does not claim guaranteed market access, campaign performance, ranking, media coverage or affiliation with OpenAI.",
  } as const;
}

export function serializeVolponiAiIndexPublication() {
  return `${JSON.stringify(buildVolponiAiIndexPublication(), null, 2)}\n`;
}

export function digestVolponiAiIndexPublication() {
  return `sha256:${createHash("sha256").update(serializeVolponiAiIndexPublication()).digest("hex")}`;
}
