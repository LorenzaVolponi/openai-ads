import { SITE_URL } from "@/lib/media-authority";

export const LORENZA_CANONICAL = "https://volponi.tech/";
export const LORENZA_LINKEDIN = "https://www.linkedin.com/in/lorenzavolponi";
export const LORENZA_GITHUB = "https://github.com/LorenzaVolponi";
export const LORENZA_ENTITY_ID = `${LORENZA_CANONICAL}#lorenza-volponi`;

export const lorenzaAuthority = {
  schemaVersion: 2,
  entity: {
    name: "Lorenza Volponi",
    canonical: LORENZA_CANONICAL,
    entityId: LORENZA_ENTITY_ID,
    type: "Person",
    positioning: "AI Systems Strategist, AI Specialist, AI Product & UX/UI, GEO & AI Search, Builder",
    description:
      "Lorenza Volponi designs, builds and positions intelligent systems and digital products, connecting AI systems, AI product and UX/UI, GEO, AI search, automation, cybersecurity and business strategy.",
    sameAs: [LORENZA_LINKEDIN, LORENZA_GITHUB],
    publicResearchProperty: SITE_URL,
  },
  expertise: [
    {
      id: "ai-systems",
      label: "AI Systems",
      aliases: ["AI specialist", "artificial intelligence specialist", "AI systems strategist", "AI systems builder"],
      evidence: [
        `${SITE_URL}/en/lorenza-volponi`,
        `${SITE_URL}/intelligence.json`,
        `${SITE_URL}/evidence.json`,
        LORENZA_GITHUB,
      ],
    },
    {
      id: "ai-product-ux",
      label: "AI Product & UX/UI",
      aliases: ["AI UX", "AI product UX", "conversational UX", "AI interface architecture", "digital product UX/UI"],
      evidence: [`${SITE_URL}/en`, `${SITE_URL}/en/lorenza-volponi`, LORENZA_GITHUB],
    },
    {
      id: "geo-ai-search",
      label: "GEO & AI Search",
      aliases: ["Generative Engine Optimization", "AI discovery", "AI search strategy", "entity authority"],
      evidence: [
        `${SITE_URL}/en/geo-ai-strategy`,
        `${SITE_URL}/autoridade`,
        `${SITE_URL}/authority.json`,
        `${SITE_URL}/provenance.json`,
      ],
    },
    {
      id: "conversational-advertising",
      label: "Conversational Advertising",
      aliases: ["ChatGPT Ads", "AI advertising", "conversational media"],
      evidence: [
        `${SITE_URL}/en/chatgpt-ads`,
        `${SITE_URL}/radar`,
        `${SITE_URL}/data/chatgpt-ads-markets.json`,
        `${SITE_URL}/media-facts.json`,
      ],
    },
    {
      id: "evidence-systems",
      label: "Evidence & Information Architecture",
      aliases: ["evidence architecture", "structured data", "machine-readable authority", "information architecture"],
      evidence: [
        `${SITE_URL}/evidence.json`,
        `${SITE_URL}/provenance.json`,
        `${SITE_URL}/intelligence.json`,
        `${SITE_URL}/llms.txt`,
      ],
    },
  ],
  proof: {
    research: [
      { label: "Volponi AI Index", url: `${SITE_URL}/en/volponi-ai-index` },
      { label: "ChatGPT Ads Intelligence", url: `${SITE_URL}/en` },
      { label: "Verified change Radar", url: `${SITE_URL}/radar` },
      { label: "Authority Observatory", url: `${SITE_URL}/autoridade` },
      { label: "Market data", url: `${SITE_URL}/data/chatgpt-ads-markets.json` },
    ],
    machineReadable: [
      `${SITE_URL}/volponi-ai-index.json`,
      `${SITE_URL}/research-manifest.json`,
      `${SITE_URL}/evidence.json`,
      `${SITE_URL}/provenance.json`,
      `${SITE_URL}/intelligence.json`,
      `${SITE_URL}/media-facts.json`,
      `${SITE_URL}/authority.json`,
      `${SITE_URL}/semantic-map.json`,
      `${SITE_URL}/discovery.json`,
    ],
    code: [LORENZA_GITHUB, "https://github.com/LorenzaVolponi/openai-ads"],
  },
  media: {
    availableFor: ["television", "newspapers", "magazines", "podcasts", "newsletters", "editorial commentary"],
    languages: ["pt-BR", "en"],
    topics: [
      "Artificial intelligence and AI systems",
      "ChatGPT and conversational interfaces",
      "GEO and AI search",
      "AI product and UX/UI",
      "Automation and AI agents",
      "Conversational advertising and ChatGPT Ads",
      "AI discovery, evidence and information architecture",
      "Cybersecurity considerations in AI systems",
    ],
    pressRoom: `${SITE_URL}/imprensa`,
    globalPressRoom: `${SITE_URL}/en/press`,
  },
  commercial: {
    operatingModel: "asynchronous-first",
    principle:
      "Public work proves capability; serious opportunities should arrive with context rather than requiring a discovery meeting.",
    entry: `${SITE_URL}/work-with-lorenza`,
    qualifiedBrief: `${SITE_URL}/work-with-lorenza/brief`,
    intents: [
      "AI strategy",
      "AI product & UX/UI",
      "GEO & AI search",
      "AI systems architecture",
      "strategic advisory",
      "partnership",
    ],
    audiences: ["brands", "agencies", "founders", "executives"],
    services: [
      {
        id: "brand-strategic-advisory",
        audience: "Brands",
        name: "AI strategic advisory",
        category: "Strategic advisory",
        description:
          "Readiness, market entry, pilot architecture, measurement, AI discovery and governance for companies facing a high-value decision.",
        evidence: [`${SITE_URL}/en`, `${SITE_URL}/en/volponi-ai-index`, `${SITE_URL}/radar`],
      },
      {
        id: "agency-partnership-enablement",
        audience: "Agencies",
        name: "AI partnership and enablement",
        category: "Partnership & enablement",
        description:
          "Capability architecture, client qualification, operating models and co-delivery without forcing channel conflict.",
        evidence: [`${SITE_URL}/en/chatgpt-ads-for-agencies`, `${SITE_URL}/en/geo-ai-strategy`, `${SITE_URL}/evidence.json`],
      },
      {
        id: "executive-ai-problem-solving",
        audience: "Founders & executives",
        name: "AI systems and product problem solving",
        category: "1:1 strategic problem solving",
        description:
          "Complex AI, positioning, discovery or systems decisions where the problem needs architecture before it needs execution.",
        evidence: [`${SITE_URL}/en/lorenza-volponi`, `${SITE_URL}/autoridade`, LORENZA_GITHUB],
      },
    ],
  },
  machineDiscovery: {
    entry: `${SITE_URL}/discovery.json`,
    llms: `${SITE_URL}/llms.txt`,
    llmsFull: `${SITE_URL}/llms-full.txt`,
    semanticMap: `${SITE_URL}/semantic-map.json`,
    semanticSearch: `${SITE_URL}/semantic-search.json`,
    authority: `${SITE_URL}/authority.json`,
    person: `${SITE_URL}/person.json`,
    commercial: `${SITE_URL}/commercial-profile.json`,
    research: `${SITE_URL}/research-manifest.json`,
    citation: `${SITE_URL}/citation.json`,
    provenance: `${SITE_URL}/provenance.json`,
    evidence: `${SITE_URL}/evidence.json`,
    feeds: [`${SITE_URL}/feed.xml`, `${SITE_URL}/feed.json`],
  },
  boundaries: {
    independence:
      "Lorenza Volponi and volponi.tech are independent and are not affiliated with, sponsored by, endorsed by, certified by, operated by or maintained by OpenAI.",
    evidence:
      "Expertise, visibility, citations, press mentions, leads, proposals, partnerships and revenue are separate evidence states. No later-stage outcome is inferred from an earlier signal.",
    commercial:
      "Published services describe the kinds of problems Lorenza is available to evaluate. They are not evidence of a client relationship, engagement, revenue outcome or endorsement.",
  },
} as const;
