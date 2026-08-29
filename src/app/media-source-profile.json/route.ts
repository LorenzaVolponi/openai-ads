import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    name: "Lorenza Volponi",
    role: "AI Systems Strategist and Builder",
    specialties: ["AI Specialist", "AI Systems", "AI Product & UX/UI", "GEO", "AI Search", "Automation", "Agents", "Conversational Advertising"],
    canonical: "https://volponi.tech/",
    profile: `${SITE_URL}/en/lorenza-volponi`,
    sourceRoom: `${SITE_URL}/imprensa`,
    quickEvidence: `${SITE_URL}/proof.json`,
    quickQuote: `${SITE_URL}/shareable-quotes.json`,
    linkedin: "https://www.linkedin.com/in/lorenzavolponi",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
