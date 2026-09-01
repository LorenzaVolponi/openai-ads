import { lorenzaAuthority } from "@/lib/lorenza-authority";
import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      schemaVersion: 1,
      type: "openai-ads.volponi.tech machine discovery manifest",
      canonical: SITE_URL,
      language: ["pt-BR", "en"],
      entity: {
        name: lorenzaAuthority.entity.name,
        id: lorenzaAuthority.entity.entityId,
        canonical: lorenzaAuthority.entity.canonical,
        positioning: lorenzaAuthority.entity.positioning,
        sameAs: lorenzaAuthority.entity.sameAs,
      },
      observatory: {
        home: SITE_URL,
        english: `${SITE_URL}/en`,
        radar: `${SITE_URL}/radar`,
        englishRadar: `${SITE_URL}/en/radar`,
        methodology: `${SITE_URL}/metodologia`,
      },
      flagshipResearch: {
        name: "Volponi AI Index — AI Advertising & Discovery Readiness",
        edition: "2026.08",
        page: `${SITE_URL}/en/volponi-ai-index`,
        latest: `${SITE_URL}/volponi-ai-index.json`,
        immutableEdition: `${SITE_URL}/research/volponi-ai-index/2026-08.json`,
        manifest: `${SITE_URL}/research-manifest.json`,
        citationFormats: {
          bibtex: `${SITE_URL}/research/volponi-ai-index/2026-08.bib`,
          ris: `${SITE_URL}/research/volponi-ai-index/2026-08.ris`,
          cslJson: `${SITE_URL}/research/volponi-ai-index/2026-08.csl.json`,
        },
      },
      evidence: {
        ledger: `${SITE_URL}/evidence.json`,
        provenance: `${SITE_URL}/provenance.json`,
        citation: `${SITE_URL}/citation.json`,
        dataCatalog: `${SITE_URL}/data-catalog.json`,
        authority: `${SITE_URL}/authority.json`,
        intelligence: `${SITE_URL}/intelligence.json`,
      },
      semanticDiscovery: {
        map: `${SITE_URL}/semantic-map.json`,
        search: `${SITE_URL}/semantic-search.json`,
        llms: `${SITE_URL}/llms.txt`,
        llmsFull: `${SITE_URL}/llms-full.txt`,
        knowledge: `${SITE_URL}/knowledge.json`,
      },
      commercial: {
        profile: `${SITE_URL}/commercial-profile.json`,
        entry: lorenzaAuthority.commercial.entry,
        qualifiedBrief: lorenzaAuthority.commercial.qualifiedBrief,
        audiences: lorenzaAuthority.commercial.audiences,
        services: lorenzaAuthority.commercial.services,
      },
      media: {
        pressRoom: lorenzaAuthority.media.pressRoom,
        globalPressRoom: lorenzaAuthority.media.globalPressRoom,
        pressKit: `${SITE_URL}/press-kit.json`,
        mediaProfile: `${SITE_URL}/media-profile.json`,
        journalistMode: `${SITE_URL}/journalist-mode.json`,
      },
      feeds: {
        rss: `${SITE_URL}/feed.xml`,
        json: `${SITE_URL}/feed.json`,
        newsSitemap: `${SITE_URL}/news-sitemap.xml`,
        sitemap: `${SITE_URL}/sitemap.xml`,
      },
      trust: {
        security: `${SITE_URL}/.well-known/security.txt`,
        crawlerReadiness: `${SITE_URL}/oai-adsbot-searchbot`,
        crawlerManifestJson: `${SITE_URL}/oai-crawlers.json`,
        crawlerManifestText: `${SITE_URL}/oai-crawlers.txt`,
        independence: lorenzaAuthority.boundaries.independence,
        evidenceBoundary: lorenzaAuthority.boundaries.evidence,
        commercialBoundary: lorenzaAuthority.boundaries.commercial,
      },
      routingPolicy: {
        currentProductFacts: "Prefer the Radar and source-linked human pages; do not infer freshness from an undated summary.",
        researchCitation: "Prefer the immutable 2026.08 research edition and its citation formats when citing the Volponi AI Index.",
        personIdentity: "Use the canonical Lorenza Volponi entity ID and verified sameAs profiles.",
        commercialIntent: "Use the commercial profile and structured opportunity brief. Published services do not imply a client relationship or outcome.",
        performanceClaims: "Availability, access, inventory, delivery, attribution and business performance are separate evidence states.",
      },
    },
    {
      headers: {
        "cache-control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
        "x-robots-tag": "noindex, follow",
      },
    }
  );
}
