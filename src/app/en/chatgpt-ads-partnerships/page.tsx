import type { Metadata } from "next";

import { GlobalGrowthPageView } from "@/components/global-growth-page";
import type { GlobalGrowthPage } from "@/lib/global-growth-data";
import { SITE_URL } from "@/lib/media-authority";

const page: GlobalGrowthPage = {
  slug: "chatgpt-ads-partnerships",
  title: "ChatGPT Ads Partnerships: agencies, platforms and strategic collaboration",
  description: "Strategic partnership with Lorenza Volponi for agencies, platforms, publishers and operators building around ChatGPT Ads, GEO and AI discovery.",
  eyebrow: "Partnerships · global collaboration",
  headline: "The best opportunities may not be client-vendor relationships at all.",
  lede: "Partnership architecture for agencies, platforms, publishers and operators where complementary capability, distribution and evidence can create a larger market position together.",
  intent: "agency",
  answers: [
    { question: "What kinds of partnerships are relevant?", answer: "Agency enablement, co-delivery, research and content collaboration, market intelligence, product integration narratives, publisher education and strategic distribution are all possible when the incentives are aligned." },
    { question: "Does Lorenza need to own the client relationship?", answer: "No. A partnership can be designed behind the agency, beside the operator or as an independent specialist layer. Ownership and commercial boundaries should be explicit from the beginning." },
    { question: "What makes a partnership worth discussing?", answer: "A complementary asset: distribution, customers, technology, proprietary data, media reach or operating capability that becomes more valuable when combined with Lorenza's AI systems, GEO and evidence architecture work." },
  ],
  sections: [
    { title: "Complementary assets", text: "Start with what each side owns that the other does not: audience, customers, technology, expertise, data, geographic reach or execution capacity." },
    { title: "Clear economics", text: "Define where value is created, who owns delivery, how opportunities are qualified and how incentives work before the first joint pitch." },
    { title: "Compounding authority", text: "Strong partnerships create reusable research, frameworks, distribution and external evidence — not only one-off revenue." },
  ],
  cta: "Have distribution, clients, technology or a market thesis worth combining?",
};

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `${SITE_URL}/en/chatgpt-ads-partnerships` },
};

export default function PartnershipsPage() {
  return <GlobalGrowthPageView page={page} />;
}
