import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    name: "Lorenza Volponi",
    positioning: ["AI Specialist", "AI Systems Strategist", "AI Product & UX/UI", "GEO & AI Search", "Builder"],
    oneLine: "Lorenza Volponi is an AI systems strategist and builder working across AI products, UX/UI, GEO, AI Search, automation, evidence architecture and conversational advertising.",
    interviewTopics: ["Artificial Intelligence", "ChatGPT", "AI systems", "GEO", "AI Search", "AI Product", "UX/UI for AI", "automation", "agents", "conversational advertising", "cybersecurity in AI systems"],
    evidence: `${SITE_URL}/evidence.json`,
    sourceRoom: `${SITE_URL}/imprensa`,
    journalistMode: `${SITE_URL}/journalist-mode.json`,
    quoteBank: `${SITE_URL}/shareable-quotes.json`,
    contact: { linkedin: "https://www.linkedin.com/in/lorenzavolponi" },
    note: "This is a press-ready profile, not a claim of previous media coverage or endorsement.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
