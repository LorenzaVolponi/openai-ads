import { lorenzaAuthority } from "@/lib/lorenza-authority";

export const dynamic = "force-static";

export function GET() {
  const base = lorenzaAuthority.entity.publicResearchProperty;
  return Response.json({
    schemaVersion: 2,
    canonicalEntity: lorenzaAuthority.entity,
    manifests: {
      person: `${base}/person.json`,
      expertise: `${base}/expertise.json`,
      proof: `${base}/proof.json`,
      media: `${base}/media-profile.json`,
      commercial: `${base}/commercial-profile.json`,
      citation: `${base}/citation.json`,
      semantic: `${base}/semantic-map.json`,
    },
    flagshipResearch: {
      page: `${base}/en/volponi-ai-index`,
      dataset: `${base}/volponi-ai-index.json`,
      evidenceRadar: `${base}/en/radar`,
    },
    graph: {
      nodes: [
        { id: "lorenza", type: "Person", label: "Lorenza Volponi", url: lorenzaAuthority.entity.canonical },
        ...lorenzaAuthority.expertise.map((item) => ({ id: item.id, type: "Expertise", label: item.label, url: `${base}/expertise.json#${item.id}` })),
        { id: "research", type: "ResearchProperty", label: "ChatGPT Ads Intelligence", url: `${base}/en` },
        { id: "volponi-ai-index", type: "Dataset", label: "Volponi AI Index", url: `${base}/en/volponi-ai-index` },
        { id: "evidence-radar", type: "CollectionPage", label: "ChatGPT Ads Evidence Radar", url: `${base}/en/radar` },
        { id: "semantic-discovery", type: "SemanticGraph", label: "Semantic Discovery Map", url: `${base}/semantic-map.json` },
        { id: "media", type: "MediaProfile", label: "Media & Press", url: `${base}/media-profile.json` },
        { id: "commercial", type: "CommercialProfile", label: "Asynchronous-first work", url: `${base}/commercial-profile.json` },
      ],
      edges: [
        ...lorenzaAuthority.expertise.map((item) => ({ from: "lorenza", to: item.id, relation: "knowsAbout" })),
        { from: "lorenza", to: "research", relation: "creates" },
        { from: "lorenza", to: "volponi-ai-index", relation: "authors" },
        { from: "volponi-ai-index", to: "evidence-radar", relation: "derivedFromEvidence" },
        { from: "semantic-discovery", to: "lorenza", relation: "centersEntity" },
        { from: "semantic-discovery", to: "volponi-ai-index", relation: "relatesResearch" },
        { from: "lorenza", to: "media", relation: "availableFor" },
        { from: "lorenza", to: "commercial", relation: "offers" },
      ],
    },
    boundaries: lorenzaAuthority.boundaries,
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "index, follow" } });
}
