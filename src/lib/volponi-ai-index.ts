import { marketStates, RADAR_CHECKED_AT, radarEntries, readinessDimensions, RADAR_SOURCES } from "@/lib/radar-data";

export const VOLPONI_AI_INDEX_EDITION = "2026.08";
export const VOLPONI_AI_INDEX_NAME = "Volponi AI Index — AI Advertising & Discovery Readiness";
export const VOLPONI_AI_INDEX_CANONICAL = "https://openai-ads.volponi.tech/en/volponi-ai-index";

export const indexSnapshot = {
  edition: VOLPONI_AI_INDEX_EDITION,
  checkedAt: RADAR_CHECKED_AT,
  availableMarkets: marketStates.filter((market) => market.adsManager === "Available").length,
  comingSoonMarkets: marketStates.filter((market) => market.adsManager === "Coming Soon").length,
  trackedChanges: radarEntries.length,
  evidenceDimensions: readinessDimensions.length,
};

export const indexDimensions = [
  {
    id: "market-access",
    label: "Market access",
    state: "Operational in selected markets",
    finding: `${indexSnapshot.availableMarkets} markets are listed as Available in the audited Ads Manager snapshot.`,
    interpretation: "Availability is an operational signal, not a guarantee of account access, inventory or performance.",
    source: RADAR_SOURCES.availability,
  },
  {
    id: "international-expansion",
    label: "International expansion",
    state: "Broadening",
    finding: `${indexSnapshot.comingSoonMarkets} European markets are listed as Coming Soon in the current snapshot.`,
    interpretation: "Geographic expansion is moving faster than self-serve parity across markets.",
    source: RADAR_SOURCES.europe,
  },
  {
    id: "buying-infrastructure",
    label: "Buying infrastructure",
    state: "Expanding",
    finding: "Self-serve Ads Manager beta and expanded buying models are part of the current platform direction.",
    interpretation: "The market is moving from negotiated pilots toward more repeatable operating infrastructure.",
    source: RADAR_SOURCES.newWays,
  },
  {
    id: "measurement",
    label: "Measurement",
    state: "Advancing",
    finding: "Pixel, Conversions API and third-party measurement capabilities are part of the documented measurement stack.",
    interpretation: "Measurement infrastructure is becoming more actionable, while incrementality and category benchmarks remain a separate question.",
    source: RADAR_SOURCES.europe,
  },
  {
    id: "performance-evidence",
    label: "Performance evidence",
    state: "Immature",
    finding: "Cross-advertiser performance benchmarks are not yet mature enough to be treated as a dependable market baseline.",
    interpretation: "Teams should avoid converting early platform availability into universal performance claims.",
    source: RADAR_SOURCES.faq,
  },
] as const;

export const indexMethodology = {
  principle: "No opaque composite score.",
  method: "Each dimension is assigned a descriptive state only when a primary source and an auditable observation support it.",
  rules: [
    "Availability, access, inventory and performance are separate states.",
    "Primary-source evidence outranks commentary and secondary reporting.",
    "A missing benchmark remains missing; it is not estimated.",
    "The edition date is part of every conclusion because product states can change.",
    "The index is editorial research by Lorenza Volponi / volponi.tech and is independent from OpenAI.",
  ],
};

export const pressFindings = [
  `${indexSnapshot.availableMarkets} markets were listed as Available in the audited Ads Manager snapshot dated ${RADAR_CHECKED_AT}.`,
  `${indexSnapshot.comingSoonMarkets} European markets were listed as Coming Soon in the same evidence layer.`,
  "The strongest maturity signals are platform access, buying infrastructure and measurement expansion; performance benchmarking remains comparatively immature.",
  "The index deliberately avoids a single score because platform readiness and business performance are not the same variable.",
];
