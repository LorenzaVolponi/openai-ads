import {
  VOLPONI_AI_INDEX_CANONICAL,
  VOLPONI_AI_INDEX_EDITION,
  VOLPONI_AI_INDEX_NAME,
} from "@/lib/volponi-ai-index";
import { VOLPONI_AI_INDEX_VERSIONED_URL } from "@/lib/volponi-ai-index-publication";
import { SITE_URL } from "@/lib/media-authority";

export const VOLPONI_AI_INDEX_BIBTEX_URL = `${SITE_URL}/research/volponi-ai-index/2026-08.bib`;
export const VOLPONI_AI_INDEX_RIS_URL = `${SITE_URL}/research/volponi-ai-index/2026-08.ris`;
export const VOLPONI_AI_INDEX_CSL_URL = `${SITE_URL}/research/volponi-ai-index/2026-08.csl.json`;

export const VOLPONI_AI_INDEX_CITATION_KEY = "volponi2026aiindex";

function bibtexValue(value: string) {
  return value.replace(/[{}]/g, "").replace(/&/g, "\\&");
}

export function buildVolponiAiIndexBibtex() {
  return [
    `@misc{${VOLPONI_AI_INDEX_CITATION_KEY},`,
    `  author = {Volponi, Lorenza},`,
    `  title = {${bibtexValue(VOLPONI_AI_INDEX_NAME)}},`,
    `  year = {2026},`,
    `  month = {8},`,
    `  publisher = {volponi.tech},`,
    `  howpublished = {Independent editorial research dataset},`,
    `  url = {${VOLPONI_AI_INDEX_VERSIONED_URL}},`,
    `  note = {Edition ${VOLPONI_AI_INDEX_EDITION}; methodology: ${VOLPONI_AI_INDEX_CANONICAL}#methodology}`, 
    `}`,
    "",
  ].join("\n");
}

export function buildVolponiAiIndexRis() {
  return [
    "TY  - DATA",
    "AU  - Volponi, Lorenza",
    `TI  - ${VOLPONI_AI_INDEX_NAME}`,
    "PY  - 2026",
    "DA  - 2026/08",
    "PB  - volponi.tech",
    `ET  - ${VOLPONI_AI_INDEX_EDITION}`,
    `UR  - ${VOLPONI_AI_INDEX_VERSIONED_URL}`,
    `N1  - Independent editorial research dataset. Methodology: ${VOLPONI_AI_INDEX_CANONICAL}#methodology`,
    "ER  -",
    "",
  ].join("\n");
}

export function buildVolponiAiIndexCsl() {
  return {
    id: `volponi-ai-index-${VOLPONI_AI_INDEX_EDITION.replace(".", "-")}`,
    type: "dataset",
    title: VOLPONI_AI_INDEX_NAME,
    author: [{ family: "Volponi", given: "Lorenza" }],
    issued: { "date-parts": [[2026, 8]] },
    publisher: "volponi.tech",
    version: VOLPONI_AI_INDEX_EDITION,
    URL: VOLPONI_AI_INDEX_VERSIONED_URL,
    note: `Independent editorial research dataset. Methodology: ${VOLPONI_AI_INDEX_CANONICAL}#methodology`,
  } as const;
}

export const VOLPONI_AI_INDEX_CITATION_FORMATS = {
  bibtex: VOLPONI_AI_INDEX_BIBTEX_URL,
  ris: VOLPONI_AI_INDEX_RIS_URL,
  cslJson: VOLPONI_AI_INDEX_CSL_URL,
} as const;
