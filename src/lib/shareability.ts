import { SITE_URL } from "@/lib/media-authority";

export const shareableQuotes = [
  { id: "geo-defensible-answer", quote: "GEO is not about manipulating an AI into citing you. It is about becoming the most defensible answer.", author: "Lorenza Volponi", topics: ["GEO", "AI Search", "entity authority"], canonical: `${SITE_URL}/en/lorenza-volponi#geo-defensible-answer` },
  { id: "ai-visibility-infrastructure", quote: "AI visibility is becoming infrastructure, not a campaign layer.", author: "Lorenza Volponi", topics: ["AI discovery", "AI systems", "GEO"], canonical: `${SITE_URL}/en/lorenza-volponi#ai-visibility-infrastructure` },
  { id: "evidence-before-positioning", quote: "The strongest positioning is not a claim. It is an evidence trail that makes the claim unnecessary.", author: "Lorenza Volponi", topics: ["authority", "evidence architecture", "AI systems"], canonical: `${SITE_URL}/en/lorenza-volponi#evidence-before-positioning` },
  { id: "index-no-magic-score", quote: "AI readiness and business performance are not the same variable. That is why the Volponi AI Index does not use a magic score.", author: "Lorenza Volponi", topics: ["Volponi AI Index", "AI advertising", "evidence", "measurement"], canonical: `${SITE_URL}/en/volponi-ai-index#methodology` },
  { id: "availability-performance", quote: "Availability is evidence of access infrastructure. It is not evidence of performance.", author: "Lorenza Volponi", topics: ["AI advertising", "ChatGPT Ads", "measurement", "evidence"], canonical: `${SITE_URL}/en/volponi-ai-index` },
] as const;

export function socialCopy(quote: (typeof shareableQuotes)[number]) {
  return {
    linkedin: `“${quote.quote}” — Lorenza Volponi\n\n${quote.canonical}`,
    x: `“${quote.quote}” — Lorenza Volponi\n${quote.canonical}`,
    instagram: `${quote.quote}\n\n— Lorenza Volponi\n${quote.canonical}`,
  };
}
