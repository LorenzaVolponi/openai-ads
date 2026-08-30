export const SITE_URL = "https://openai-ads.volponi.tech";
export const PRESS_URL = `${SITE_URL}/imprensa`;
export const AUTHOR_ID = "https://volponi.tech/#lorenza-volponi";
export const PUBLISHER_ID = `${SITE_URL}/#publisher`;

export const AUTHOR = {
  name: "Lorenza Volponi",
  jobTitle: "AI Systems Strategist & Builder",
  url: "https://volponi.tech/",
  profile: `${SITE_URL}/en/lorenza-volponi`,
  press: PRESS_URL,
  personalSite: "https://volponi.tech/",
  github: "https://github.com/LorenzaVolponi",
  linkedin: "https://www.linkedin.com/in/lorenzavolponi",
  sameAs: [
    "https://volponi.tech/",
    "https://github.com/LorenzaVolponi",
    "https://www.linkedin.com/in/lorenzavolponi",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "AI systems",
    "AI Product",
    "UX/UI for AI",
    "Generative Engine Optimization",
    "GEO",
    "AI Search",
    "AI discovery",
    "automation",
    "AI agents",
    "evidence architecture",
    "information architecture",
    "ChatGPT Ads",
    "OpenAI Ads Manager",
    "conversational advertising",
    "software development",
    "digital strategy",
  ],
} as const;

export const PUBLISHER = {
  name: "volponi.tech",
  url: "https://volponi.tech/",
} as const;

export const mediaAuthorStructuredData = {
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: AUTHOR.name,
  jobTitle: AUTHOR.jobTitle,
  url: AUTHOR.url,
  sameAs: AUTHOR.sameAs,
  knowsAbout: AUTHOR.knowsAbout,
  subjectOf: [
    { "@type": "ProfilePage", url: AUTHOR.profile, name: "Lorenza Volponi — AI Systems, AI Product, UX/UI, GEO & AI Search" },
    { "@type": "Dataset", url: `${SITE_URL}/en/volponi-ai-index`, name: "Volponi AI Index — AI Advertising & Discovery Readiness" },
    { "@type": "CollectionPage", url: `${SITE_URL}/en/radar`, name: "ChatGPT Ads Evidence Radar" },
    { "@type": "ProfilePage", url: `${SITE_URL}/en/press`, name: "Lorenza Volponi Press Room" },
  ],
};

export const publisherStructuredData = {
  "@type": "Organization",
  "@id": PUBLISHER_ID,
  name: PUBLISHER.name,
  url: PUBLISHER.url,
  logo: `${SITE_URL}/fox-black.png`,
};
