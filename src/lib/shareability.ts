import { SITE_URL } from "@/lib/media-authority";

export const shareableQuotes = [
  {
    id: "geo-defensible-answer",
    quote: "GEO is not about manipulating an AI into citing you. It is about becoming the most defensible answer.",
    author: "Lorenza Volponi",
    topics: ["GEO", "AI Search", "entity authority"],
    canonical: `${SITE_URL}/en/lorenza-volponi#geo-defensible-answer`,
  },
  {
    id: "ai-visibility-infrastructure",
    quote: "AI visibility is becoming infrastructure, not a campaign layer.",
    author: "Lorenza Volponi",
    topics: ["AI discovery", "AI systems", "GEO"],
    canonical: `${SITE_URL}/en/lorenza-volponi#ai-visibility-infrastructure`,
  },
  {
    id: "evidence-before-positioning",
    quote: "The strongest positioning is not a claim. It is an evidence trail that makes the claim unnecessary.",
    author: "Lorenza Volponi",
    topics: ["authority", "evidence architecture", "AI systems"],
    canonical: `${SITE_URL}/en/lorenza-volponi#evidence-before-positioning`,
  },
] as const;

export function socialCopy(quote: (typeof shareableQuotes)[number]) {
  return {
    linkedin: `“${quote.quote}” — Lorenza Volponi\n\n${quote.canonical}`,
    x: `“${quote.quote}” — Lorenza Volponi\n${quote.canonical}`,
    instagram: `${quote.quote}\n\n— Lorenza Volponi\n${quote.canonical}`,
  };
}
