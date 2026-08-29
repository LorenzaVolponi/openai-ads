import { lorenzaAuthority } from "@/lib/lorenza-authority";

export const dynamic = "force-static";

export function GET() {
  const base = lorenzaAuthority.entity.publicResearchProperty;
  return Response.json({
    schemaVersion: 1,
    canonicalEntity: lorenzaAuthority.entity,
    manifests: {
      person: `${base}/person.json`,
      expertise: `${base}/expertise.json`,
      proof: `${base}/proof.json`,
      media: `${base}/media-profile.json`,
      commercial: `${base}/commercial-profile.json`,
      citation: `${base}/citation.json`,
    },
    graph: {
      nodes: [
        { id: "lorenza", type: "Person", label: "Lorenza Volponi", url: lorenzaAuthority.entity.canonical },
        ...lorenzaAuthority.expertise.map((item) => ({ id: item.id, type: "Expertise", label: item.label, url: `${base}/expertise.json#${item.id}` })),
        { id: "research", type: "ResearchProperty", label: "ChatGPT Ads Intelligence", url: `${base}/en` },
        { id: "media", type: "MediaProfile", label: "Media & Press", url: `${base}/media-profile.json` },
        { id: "commercial", type: "CommercialProfile", label: "Asynchronous-first work", url: `${base}/commercial-profile.json` },
      ],
      edges: [
        ...lorenzaAuthority.expertise.map((item) => ({ from: "lorenza", to: item.id, relation: "knowsAbout" })),
        { from: "lorenza", to: "research", relation: "creates" },
        { from: "lorenza", to: "media", relation: "availableFor" },
        { from: "lorenza", to: "commercial", relation: "offers" },
      ],
    },
    boundaries: lorenzaAuthority.boundaries,
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "index, follow" } });
}
