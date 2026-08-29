import type { Metadata } from "next";

import { GlobalGrowthPageView } from "@/components/global-growth-page";
import type { GlobalGrowthPage } from "@/lib/global-growth-data";
import { SITE_URL } from "@/lib/media-authority";

const page: GlobalGrowthPage = {
  slug: "geo-ai-strategy",
  title: "GEO & AI Discovery Strategy Consultant: Lorenza Volponi",
  description: "GEO and AI discovery strategy with Lorenza Volponi: entity authority, evidence architecture, machine-readable content, search and commercial discovery systems.",
  eyebrow: "GEO · AI discovery · global advisory",
  headline: "Being online is not the same as being understood by AI systems.",
  lede: "GEO strategy for experts, brands and products that need to become discoverable, understandable and citable without replacing evidence with optimization theater.",
  intent: "consulting",
  answers: [
    { question: "What is GEO strategy?", answer: "GEO strategy designs the entity, evidence, information architecture, content and machine-readable surfaces that help generative and search systems understand a source and connect it to relevant questions." },
    { question: "Is GEO just schema markup?", answer: "No. Structured data is one layer. Authority also depends on coherent entities, useful primary content, crawlability, citations, distribution, external evidence and the consistency of what third parties can verify." },
    { question: "What does Lorenza build?", answer: "Systems that connect editorial authority, evidence ledgers, machine-readable datasets, crawler readiness, search intelligence and commercial conversion rather than optimizing each element in isolation." },
  ],
  sections: [
    { title: "Entity architecture", text: "Clarify who or what the source is, what it knows, which canonical properties represent it and how those relationships remain consistent across human and machine-readable surfaces." },
    { title: "Evidence architecture", text: "Make claims traceable to sources, dates, datasets and change history so authority can compound without relying on unverifiable self-description." },
    { title: "Discovery to revenue", text: "Connect search and AI visibility to commercial-intent pages, tracked actions and real opportunities while keeping impressions, clicks, leads and revenue as separate evidence states." },
  ],
  cta: "Need a GEO system that can survive verification?",
};

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `${SITE_URL}/en/geo-ai-strategy` },
};

export default function GeoAiStrategyPage() {
  return <GlobalGrowthPageView page={page} />;
}
