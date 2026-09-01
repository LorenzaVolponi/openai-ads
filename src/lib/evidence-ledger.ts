import { createHash } from "node:crypto";

import { SITE_URL } from "@/lib/editorial-meta";
import { RADAR_CHECKED_AT, radarEntries } from "@/lib/radar-data";
import { sourceRevision } from "@/lib/source-revision";

const sha256 = (value: string) =>
  createHash("sha256").update(value, "utf8").digest("hex");

const chronologicalEntries = [...radarEntries].sort(
  (a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug),
);

let previousChainSha256: string | null = null;

export const evidenceLedgerEntries = chronologicalEntries.map((entry, index) => {
  const normalizedRecord = {
    date: entry.date,
    slug: entry.slug,
    kind: entry.kind,
    market: entry.market,
    title: entry.title,
    summary: entry.summary,
    impact: entry.impact,
    previousState: entry.previousState,
    currentState: entry.currentState,
    confidence: entry.confidence,
    canonicalUrl: `${SITE_URL}/radar/${entry.slug}`,
    source: {
      label: entry.source.label,
      publisher: entry.source.publisher,
      url: entry.source.url,
    },
  };

  const recordSha256 = sha256(JSON.stringify(normalizedRecord));
  const chainInput = `${previousChainSha256 ?? "GENESIS"}\n${recordSha256}`;
  const chainSha256 = sha256(chainInput);
  const ledgerEntry = {
    sequence: index + 1,
    ...normalizedRecord,
    hashes: {
      algorithm: "sha-256",
      recordSha256,
      previousChainSha256,
      chainSha256,
    },
  };

  previousChainSha256 = chainSha256;
  return ledgerEntry;
});

export const EVIDENCE_LEDGER_ROOT_SHA256 = previousChainSha256 ?? sha256("EMPTY");

export const evidenceLedger = {
  schemaVersion: 2,
  name: "Volponi ChatGPT Ads Evidence Ledger",
  canonical: `${SITE_URL}/evidence.json`,
  publisher: "volponi.tech",
  author: "Lorenza Volponi",
  checkedAt: RADAR_CHECKED_AT,
  freshness: `${SITE_URL}/freshness.json`,
  freshnessBoundary:
    "checkedAt is the preserved editorial snapshot verification date. Automated source monitoring does not advance it; freshness.json computes review-window status separately.",
  methodology: `${SITE_URL}/metodologia`,
  sourceRevision,
  hashChain: {
    algorithm: "sha-256",
    construction:
      "recordSha256 = SHA-256(JSON.stringify(normalized editorial record)); chainSha256 = SHA-256(previousChainSha256 or GENESIS + newline + recordSha256)",
    rootSha256: EVIDENCE_LEDGER_ROOT_SHA256,
    caveat:
      "Hashes provide tamper-evident integrity for the published editorial records. They are not a digital signature and do not independently prove that a primary source was true at a given time.",
  },
  entries: evidenceLedgerEntries,
};
