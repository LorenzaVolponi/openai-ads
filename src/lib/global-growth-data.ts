export type GlobalGrowthPage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  lede: string;
  intent: "authority" | "consulting" | "agency" | "brand" | "strategy";
  answers: { question: string; answer: string }[];
  sections: { title: string; text: string; bullets?: string[] }[];
  cta: string;
};

export const globalGrowthPages: GlobalGrowthPage[] = [
  {
    slug: "chatgpt-ads",
    title: "ChatGPT Ads: global guide, markets, strategy and verified updates",
    description: "Independent global guide to ChatGPT Ads by Lorenza Volponi: markets, buying models, measurement, privacy, strategy and verified product changes.",
    eyebrow: "Global ChatGPT Ads intelligence",
    headline: "ChatGPT Ads without the noise: facts, markets, strategy and execution.",
    lede: "A source-linked English knowledge layer for brands, agencies and operators evaluating conversational advertising.",
    intent: "authority",
    answers: [
      { question: "What are ChatGPT Ads?", answer: "ChatGPT Ads are sponsored units shown separately from the model response in eligible ChatGPT experiences. Availability, buying options and account access can change by market and product stage." },
      { question: "Where should a company start?", answer: "Start with market eligibility, a measurable business objective, a crawler-accessible landing page and instrumentation that can reconcile platform metrics with first-party outcomes." },
      { question: "Who maintains this guide?", answer: "Lorenza Volponi, AI systems strategist and builder, maintains the independent volponi.tech ChatGPT Ads intelligence layer and Radar." },
    ],
    sections: [
      { title: "Treat availability as a fact, performance as a hypothesis", text: "A market being available does not guarantee account access, delivery, inventory or return. Each decision should separate official product status from the economics of a specific campaign." },
      { title: "Build the measurement chain before scale", text: "Impressions and clicks are diagnostic signals. Commercial decisions require conversion quality, revenue or another business outcome reconciled with first-party data." },
      { title: "Use the Radar as temporal memory", text: "Product documentation changes. The Volponi Radar stores material changes with date, source, prior state, observed state and impact so teams can distinguish current behavior from old assumptions." },
    ],
    cta: "Need a strategic view for your market or company?",
  },
  {
    slug: "chatgpt-ads-strategy",
    title: "ChatGPT Ads Strategy Consultant: market entry, pilots and measurement",
    description: "Strategic advisory for brands and operators evaluating ChatGPT Ads: market entry, pilot design, measurement, governance and decision criteria with Lorenza Volponi.",
    eyebrow: "Strategic advisory · worldwide",
    headline: "Turn ChatGPT Ads from novelty into a governed business decision.",
    lede: "Strategy for teams that need to decide whether, where and how to test conversational advertising without confusing platform novelty with business value.",
    intent: "strategy",
    answers: [
      { question: "What does a ChatGPT Ads strategy engagement solve?", answer: "It clarifies market readiness, commercial hypothesis, landing-page and measurement requirements, pilot design, governance and the evidence required to scale or stop." },
      { question: "Is this media buying?", answer: "The core offer is strategic architecture and decision support. Execution can be designed around the company or agency operating model rather than forcing a generic managed-media package." },
      { question: "What makes the approach different?", answer: "The work connects product documentation, AI discovery, information architecture, measurement and business strategy instead of treating ChatGPT Ads as an isolated ad channel." },
    ],
    sections: [
      { title: "Readiness", text: "Map availability, access, policy constraints, landing-page readiness, conversion events and decision ownership before budget enters the system." },
      { title: "Pilot architecture", text: "Define a testable commercial hypothesis, a narrow context, interpretable creative variants, a stop rule and a measurement window." },
      { title: "Scale or stop", text: "Scale follows evidence: quality, conversion economics, operational capacity and incremental contribution. A pilot that disproves a thesis is still a useful result." },
    ],
    cta: "Bring a market, product or growth problem.",
  },
  {
    slug: "chatgpt-ads-for-agencies",
    title: "ChatGPT Ads for Agencies: advisory, enablement and operating model",
    description: "ChatGPT Ads advisory for agencies: readiness, client qualification, pilot architecture, reporting, governance and partner enablement by Lorenza Volponi.",
    eyebrow: "Agency enablement · partnerships",
    headline: "Give your agency a ChatGPT Ads operating model before clients demand one.",
    lede: "A partner-oriented framework for agencies that want to build capability without selling certainty the platform cannot yet support.",
    intent: "agency",
    answers: [
      { question: "Can Lorenza work with agencies instead of competing with them?", answer: "Yes. The model is designed for advisory, enablement and strategic partnership where the agency keeps the client relationship and operating role." },
      { question: "What can be built together?", answer: "Client qualification, pilot frameworks, measurement standards, team enablement, thought leadership and a repeatable commercial narrative grounded in evidence." },
      { question: "Why does this matter now?", answer: "Agencies need a defensible answer before demand accelerates. A governed operating model is more valuable than a slide deck built after the first client request arrives." },
    ],
    sections: [
      { title: "Capability before pitch", text: "Create a shared language for eligibility, product limits, buying models, measurement and privacy before the sales team packages the offer." },
      { title: "Co-delivery without channel conflict", text: "Advisory can sit behind the agency, beside the team or inside a specific client pilot. The structure should preserve ownership and incentives explicitly." },
      { title: "Create reusable intellectual property", text: "Turn each engagement into better qualification rules, reporting templates, client education and evidence that compounds across the agency portfolio." },
    ],
    cta: "Looking for an AI advertising strategy partner?",
  },
  {
    slug: "chatgpt-ads-for-brands",
    title: "ChatGPT Ads for Brands: readiness, pilot strategy and governance",
    description: "Independent strategic advisory for brands evaluating ChatGPT Ads: readiness, pilot design, measurement, governance and AI discovery with Lorenza Volponi.",
    eyebrow: "Brand growth · strategic readiness",
    headline: "Your brand does not need another channel. It needs a reason to enter this one.",
    lede: "A decision framework for companies that want to test ChatGPT Ads with a clear commercial hypothesis, evidence standard and ownership model.",
    intent: "brand",
    answers: [
      { question: "When should a brand test ChatGPT Ads?", answer: "When the target market is operationally eligible, the offer has a measurable outcome, the landing experience is ready and the team can evaluate the test against a business threshold." },
      { question: "What should happen before budget approval?", answer: "Clarify the use case, audience/context hypothesis, conversion event, unit economics, privacy implications, governance owner and what evidence would justify expansion." },
      { question: "Can this connect to broader AI strategy?", answer: "Yes. Paid conversational discovery, organic AI discovery, entity authority and first-party measurement increasingly belong in the same strategic system." },
    ],
    sections: [
      { title: "Do not copy-paste a social or search plan", text: "Conversational context changes the job of the message. Keep the business offer comparable while adapting the creative logic to the surface." },
      { title: "Connect media to AI discovery", text: "The landing page should work for humans, crawlers and the commercial journey. Paid traffic does not compensate for weak information architecture or an unclear entity." },
      { title: "Govern the learning", text: "Document what was known at launch, what changed during the test and which conclusions are supported by platform data versus first-party outcomes." },
    ],
    cta: "Evaluating ChatGPT Ads for a brand?",
  },
  {
    slug: "chatgpt-ads-consultant",
    title: "ChatGPT Ads Consultant: Lorenza Volponi | global strategic advisory",
    description: "Lorenza Volponi provides strategic advisory on ChatGPT Ads, AI discovery, GEO, measurement and operating models for brands, agencies and partners worldwide.",
    eyebrow: "Consulting · advisory · partnership",
    headline: "Need someone who can connect ChatGPT Ads, GEO, systems and business strategy?",
    lede: "Lorenza Volponi works at the intersection of AI systems, discovery, evidence architecture and strategic execution — with an independent public research layer you can audit before starting a conversation.",
    intent: "consulting",
    answers: [
      { question: "Who is Lorenza Volponi?", answer: "Lorenza Volponi is an AI systems strategist and builder who researches AI discovery, GEO, conversational advertising, evidence systems and information architecture through volponi.tech." },
      { question: "Who is the work for?", answer: "Brands, agencies, founders, executives and partners facing a high-value decision around ChatGPT Ads, AI discovery, market entry or the systems required to support them." },
      { question: "How can I evaluate the work first?", answer: "Use the public Radar, datasets, methodology, source room and code. The research layer is intentionally auditable before any commercial conversation." },
    ],
    sections: [
      { title: "Strategic advisory", text: "Decision architecture for market entry, pilots, measurement, positioning and AI-driven distribution." },
      { title: "Systems thinking", text: "Connect front-end experience, structured data, crawlers, evidence, analytics and commercial workflow instead of optimizing each layer in isolation." },
      { title: "Partnerships", text: "Work with agencies, technology companies, publishers or operators where complementary distribution and capability create more value than a vendor relationship." },
    ],
    cta: "If there is a serious problem to solve, start there.",
  },
  {
    slug: "lorenza-volponi",
    title: "Lorenza Volponi: AI Systems Strategist, Builder and GEO strategist",
    description: "About Lorenza Volponi: AI systems strategist and builder focused on GEO, AI discovery, conversational advertising, evidence systems and strategic execution.",
    eyebrow: "Entity profile · Lorenza Volponi",
    headline: "Lorenza Volponi builds systems that make expertise discoverable, verifiable and commercially useful.",
    lede: "AI systems strategy, GEO, information architecture, conversational advertising, evidence infrastructure and the code required to make the strategy executable.",
    intent: "authority",
    answers: [
      { question: "What does Lorenza Volponi work on?", answer: "AI systems, GEO and AI discovery, conversational advertising, evidence architecture, information systems and strategy that connects technical execution to commercial outcomes." },
      { question: "What is the ChatGPT Ads Intelligence project?", answer: "An independent volponi.tech research property that tracks verified ChatGPT Ads changes, markets, measurement, privacy and operating implications using primary sources and audit-friendly data." },
      { question: "Is Lorenza affiliated with OpenAI?", answer: "No. The project is independent and is not affiliated with, sponsored by, endorsed by, certified by, operated by or maintained by OpenAI." },
    ],
    sections: [
      { title: "Builder", text: "Code, product, automation and systems are treated as strategic language, not a handoff that happens after the thinking." },
      { title: "AI discovery and GEO", text: "Design entities, evidence, content and machine-readable infrastructure so humans and AI systems can understand what a source knows and why it is credible." },
      { title: "Commercial strategy", text: "Translate new technology into decisions, experiments, partnerships and positioning without manufacturing certainty where evidence is still immature." },
    ],
    cta: "Explore the work, then decide if we should talk.",
  },
];

export function getGlobalGrowthPage(slug: string) {
  return globalGrowthPages.find((page) => page.slug === slug);
}
