import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Database, ShieldCheck } from "lucide-react";

import { SemanticRelatedLinks } from "@/components/semantic-related-links";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AUTHOR_ID, PUBLISHER_ID, SITE_URL, mediaAuthorStructuredData, publisherStructuredData } from "@/lib/media-authority";
import { indexDimensions, indexMethodology, indexSnapshot, pressFindings, VOLPONI_AI_INDEX_CANONICAL, VOLPONI_AI_INDEX_NAME } from "@/lib/volponi-ai-index";

export const metadata: Metadata = {
  title: "Volponi AI Index 2026: AI Advertising & Discovery Readiness | Lorenza Volponi",
  description: "Independent evidence-based AI market research by Lorenza Volponi tracking ChatGPT Ads availability, buying infrastructure, measurement maturity and performance evidence.",
  authors: [{ name: "Lorenza Volponi", url: `${SITE_URL}/en/lorenza-volponi` }],
  alternates: { canonical: VOLPONI_AI_INDEX_CANONICAL },
  openGraph: {
    title: "Volponi AI Index 2026",
    description: "AI Advertising & Discovery Readiness — primary-source evidence, open methodology and media-ready findings by Lorenza Volponi.",
    url: VOLPONI_AI_INDEX_CANONICAL,
    type: "article",
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Dataset", "CreativeWork"],
      "@id": `${VOLPONI_AI_INDEX_CANONICAL}#index`,
      name: VOLPONI_AI_INDEX_NAME,
      url: VOLPONI_AI_INDEX_CANONICAL,
      description: "Evidence-based research on AI advertising and discovery readiness using primary-source product and market observations.",
      creator: { "@id": AUTHOR_ID },
      publisher: { "@id": PUBLISHER_ID },
      dateModified: indexSnapshot.checkedAt,
      inLanguage: "en",
      keywords: ["AI Index", "AI advertising", "AI discovery", "ChatGPT Ads", "GEO", "AI Search", "Lorenza Volponi"],
      about: ["AI advertising", "ChatGPT Ads", "market readiness", "measurement", "GEO", "AI Search", "evidence architecture"],
      relatedLink: [`${SITE_URL}/en/radar`, `${SITE_URL}/semantic-map.json`, `${SITE_URL}/en/lorenza-volponi`, `${SITE_URL}/en/press`],
      isBasedOn: indexDimensions.map((dimension) => dimension.source.url),
      distribution: { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${SITE_URL}/volponi-ai-index.json` },
    },
    mediaAuthorStructuredData,
    publisherStructuredData,
  ],
};

export default function VolponiAIIndexPage() {
  return (
    <main lang="en" className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <Badge variant="outline">Volponi AI Index · edition {indexSnapshot.edition}</Badge>
          <h1 className="mt-6 max-w-6xl font-serif text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] tracking-[-0.055em]">AI readiness without a magic score.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">Independent research by Lorenza Volponi tracking observable signals across AI advertising access, international expansion, buying infrastructure, measurement and performance evidence.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild><a href="/volponi-ai-index.json"><Database className="mr-2 h-4 w-4" /> Open dataset</a></Button>
            <Button asChild variant="outline"><Link href="/en/radar">Evidence Radar</Link></Button>
            <Button asChild variant="outline"><Link href="/en/press">Press & media</Link></Button>
            <Button asChild variant="outline"><Link href="/en/lorenza-volponi">About Lorenza</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 md:grid-cols-4">
          {[
            [String(indexSnapshot.availableMarkets), "Available markets"],
            [String(indexSnapshot.comingSoonMarkets), "Coming Soon markets"],
            [String(indexSnapshot.trackedChanges), "Tracked changes"],
            [String(indexSnapshot.evidenceDimensions), "Evidence dimensions"],
          ].map(([value, label]) => <div key={label} className="bg-white p-7"><p className="text-5xl font-black tracking-[-0.05em]">{value}</p><p className="mt-2 text-sm font-bold">{label}</p></div>)}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-[#f4f4f1]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="mb-8 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500"><BarChart3 className="h-4 w-4" /> Evidence matrix</div>
          <div className="grid gap-4 lg:grid-cols-5">
            {indexDimensions.map((dimension) => (
              <article key={dimension.id} className="rounded-3xl border border-zinc-200 bg-white p-6">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-zinc-400">{dimension.label}</p>
                <h2 className="mt-3 text-xl font-black">{dimension.state}</h2>
                <p className="mt-4 text-sm leading-6 text-zinc-600">{dimension.finding}</p>
                <p className="mt-4 text-xs leading-5 text-zinc-500">{dimension.interpretation}</p>
                <a href={dimension.source.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 text-xs font-black">Primary source <ArrowUpRight className="h-3.5 w-3.5" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-zinc-500">Methodology</p>
          <h2 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.04em]">Evidence before score.</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-600">{indexMethodology.method}</p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-600">{indexMethodology.rules.map((rule) => <li key={rule}>— {rule}</li>)}</ul>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 md:p-9">
          <ShieldCheck className="h-5 w-5" />
          <p className="mt-4 font-mono text-xs font-black uppercase tracking-[0.16em] text-zinc-500">Media-ready findings</p>
          <div className="mt-5 space-y-5">{pressFindings.map((finding) => <p key={finding} className="text-lg font-black leading-7">{finding}</p>)}</div>
          <p className="mt-7 text-xs leading-5 text-zinc-500">Citation: Volponi AI Index — AI Advertising & Discovery Readiness, Lorenza Volponi / volponi.tech, edition {indexSnapshot.edition}.</p>
        </div>
      </section>

      <SemanticRelatedLinks currentPath="/en/volponi-ai-index" language="en" limit={5} />
    </main>
  );
}
