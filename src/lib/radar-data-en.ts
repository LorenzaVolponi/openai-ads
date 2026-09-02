import { radarEntries, type RadarEntry } from "@/lib/radar-data";

type EnglishRadarCopy = Pick<
  RadarEntry,
  "market" | "title" | "summary" | "impact" | "previousState" | "currentState"
>;

const englishCopyBySlug: Record<string, EnglishRadarCopy> = {
  "ads-manager-nine-markets": {
    market: "Global / self-serve",
    title: "Ads Manager is listed as available in nine markets",
    summary: "The latest official snapshot lists Australia, Brazil, Canada, Japan, South Korea, Mexico, New Zealand, the United Kingdom and the United States as Available.",
    impact: "This turns availability into an auditable operating snapshot. Status can change and should be rechecked before media decisions.",
    previousState: "Availability varied by market and localized documentation could diverge.",
    currentState: "9 markets listed as Available in the snapshot reviewed on August 25, 2026.",
  },
  "chatgpt-ads-europe-31-markets": {
    market: "Europe",
    title: "ChatGPT Ads expands to 31 European markets",
    summary: "The European expansion takes effect on August 24. Initial access is through Ads Solutions, agencies and partners; self-serve access through Ads Manager follows later.",
    impact: "This significantly expands geographic reach, but it should not be confused with simultaneous self-serve access in every market.",
    previousState: "Europe was not yet part of the broadly announced footprint.",
    currentState: "Expansion announced across 31 European markets, effective August 24, 2026.",
  },
  "chatgpt-ads-brasil-launch": {
    market: "Brazil, United Kingdom, Mexico, Japan and South Korea",
    title: "ChatGPT Ads launches in Brazil and four additional markets",
    summary: "OpenAI reports the launch in the United Kingdom, Mexico, Brazil, Japan and South Korea, continuing the expansion that began in the United States.",
    impact: "Brazil moves from an announced expansion market into the active ChatGPT Ads rollout.",
    previousState: "Expansion had been announced but was not yet launched.",
    currentState: "Brazil and four additional markets officially launched.",
  },
  "brazil-expansion-announced": {
    market: "Brazil, United Kingdom, Mexico, Japan and South Korea",
    title: "OpenAI announces the next international ads expansion wave",
    summary: "OpenAI announces plans to expand the pilot to five additional markets in the following weeks.",
    impact: "This creates the first official Brazil-specific milestone before the August launch.",
    previousState: "The international pilot remained concentrated in other markets.",
    currentState: "Brazil is formally included in the expansion roadmap.",
  },
  "ads-manager-cpc-measurement": {
    market: "Platform",
    title: "Ads Manager beta and CPC expand the advertising infrastructure",
    summary: "OpenAI introduces a self-serve Ads Manager beta, CPC buying and expanded measurement tools, alongside partner access.",
    impact: "This marks the transition from a more directly negotiated pilot toward a repeatable buying, management and measurement infrastructure.",
    previousState: "Buying was concentrated among a smaller advertiser set with more limited formats.",
    currentState: "Self-serve beta, CPC and expanded measurement enter the platform.",
  },
  "canada-australia-new-zealand-expansion": {
    market: "Canada, Australia and New Zealand",
    title: "The ads pilot starts expanding beyond the United States",
    summary: "OpenAI announces that international expansion would begin with Canada, Australia and New Zealand.",
    impact: "This is the first official signal that the advertising product would be tested across multiple markets and regulatory environments.",
    previousState: "Testing was restricted to the United States.",
    currentState: "The first international expansion is announced.",
  },
  "us-pilot-starts": {
    market: "United States",
    title: "Advertising tests begin in ChatGPT",
    summary: "OpenAI begins testing in the United States for signed-in adults on Free and Go plans, while keeping ads separate from model responses.",
    impact: "This establishes the public starting point for the ChatGPT advertising product timeline.",
    previousState: "No public advertising pilot was running in production.",
    currentState: "The U.S. pilot begins for a subset of Free and Go users.",
  },
};

export const radarEntriesEn: RadarEntry[] = radarEntries.map((entry) => {
  const copy = englishCopyBySlug[entry.slug];
  if (!copy) throw new Error(`Missing English Radar copy for ${entry.slug}`);
  return { ...entry, ...copy };
});
