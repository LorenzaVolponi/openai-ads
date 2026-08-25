export const SITE_URL = "https://openai-ads.volponi.tech";
export const PRESS_URL = `${SITE_URL}/imprensa`;
export const AUTHOR_ID = `${PRESS_URL}#lorenza-volponi`;
export const PUBLISHER_ID = `${SITE_URL}/#publisher`;

export const AUTHOR = {
  name: "Lorenza Volponi",
  jobTitle: "AI Systems Strategist & Builder",
  url: PRESS_URL,
  personalSite: "https://volponi.tech",
  github: "https://github.com/LorenzaVolponi",
  linkedin: "https://www.linkedin.com/in/lorenzavolponi",
  sameAs: [
    "https://volponi.tech",
    "https://github.com/LorenzaVolponi",
    "https://www.linkedin.com/in/lorenzavolponi",
  ],
  knowsAbout: [
    "ChatGPT Ads",
    "OpenAI Ads Manager",
    "conversational advertising",
    "Generative Engine Optimization",
    "Search Engine Optimization",
    "Artificial Intelligence",
    "AI systems",
    "software development",
    "digital strategy",
    "AI discovery",
  ],
} as const;

export const PUBLISHER = {
  name: "volponi.tech",
  url: "https://volponi.tech",
} as const;

export const mediaAuthorStructuredData = {
  "@type": "Person",
  "@id": AUTHOR_ID,
  name: AUTHOR.name,
  jobTitle: AUTHOR.jobTitle,
  url: AUTHOR.url,
  sameAs: AUTHOR.sameAs,
  knowsAbout: AUTHOR.knowsAbout,
};

export const publisherStructuredData = {
  "@type": "Organization",
  "@id": PUBLISHER_ID,
  name: PUBLISHER.name,
  url: PUBLISHER.url,
  logo: `${SITE_URL}/fox-black.png`,
};
