import { SITE_URL } from "@/lib/media-authority";

export type ReputationSignalType = "press" | "citation" | "backlink" | "podcast" | "social" | "ai-citation" | "search";

export type ReputationSignal = {
  type: ReputationSignalType;
  source: string;
  url: string;
  observedAt: string;
  evidenceUrl?: string;
  note?: string;
};

export const reputationBoundary = {
  canonicalEntity: "Lorenza Volponi",
  canonicalUrl: "https://volponi.tech/",
  policy: "Only externally verifiable reputation signals may be published. Absence of evidence is not converted into a claim.",
  evidenceStates: ["observed", "verified", "published"],
  forbiddenInferences: ["mention = endorsement", "click = lead", "lead = client", "citation = recommendation", "ranking = authority"],
};

export const reputationSignals: ReputationSignal[] = [];

export const reputationEndpoints = {
  manifest: `${SITE_URL}/reputation-signals.json`,
  citations: `${SITE_URL}/citation.json`,
  evidence: `${SITE_URL}/evidence.json`,
  authority: `${SITE_URL}/authority.json`,
};
