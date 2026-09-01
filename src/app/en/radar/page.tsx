import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Database, Download, RadioTower, ShieldCheck, UserRound } from "lucide-react";

import { FreshnessStatus } from "@/components/freshness-status";
import { SemanticRelatedLinks } from "@/components/semantic-related-links";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AUTHOR, AUTHOR_ID, PUBLISHER_ID, SITE_URL, mediaAuthorStructuredData, publisherStructuredData } from "@/lib/media-authority";
import { marketStates, RADAR_CHECKED_AT, radarEntries } from "@/lib/radar-data";

const URL = `${SITE_URL}/en/radar`;
const PT_URL = `${SITE_URL}/radar`;
const availableCount = marketStates.filter((market) => market.adsManager === "Available").length;
const comingSoonCount = marketStates.filter((market) => market.adsManager === "Coming Soon").length;

export const metadata: Metadata = {
  title: "ChatGPT Ads Radar: verified market changes, availability and evidence | Lorenza Volponi",
  description: "Independent English intelligence hub by Lorenza Volponi tracking verified ChatGPT Ads changes, market availability, Ads Manager readiness, measurement and primary-source evidence.",
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  alternates: {
    canonical: URL,
    languages: { en: URL, "pt-BR": PT_URL, "x-default": URL },
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
      "application/feed+json": `${SITE_URL}/feed.json`,
      "application/json": `${SITE_URL}/data/chatgpt-ads-markets.json`,
      "text/csv": `${SITE_URL}/data/chatgpt-ads-markets.csv`,
    },
  },
  openGraph: {
    title: "ChatGPT Ads Radar — verified intelligence by Lorenza Volponi",
    description: "Verified changes, market availability, open data and primary-source evidence for ChatGPT Ads.",
    url: URL,
    type: "website",
    locale: "en_US",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT Ads Radar — Lorenza Volponi",
    description: "Verified ChatGPT Ads changes, markets and evidence.",
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${URL}#page`,
      url: URL,
      name: "ChatGPT Ads Radar",
      description: "Independent English intelligence hub tracking verified ChatGPT Ads market and product changes with primary-source evidence.",
      inLanguage: "en",
      dateModified: RADAR_CHECKED_AT,
      author: { "@id": AUTHOR_ID },
      publisher: { "@id": PUBLISHER_ID },
      about: ["ChatGPT Ads", "AI advertising", "conversational advertising", "AI discovery", "GEO", "AI Search"],
      mainEntity: { "@id": `${URL}#dataset` },
      relatedLink: [`${SITE_URL}/en/volponi-ai-index`, `${SITE_URL}/semantic-map.json`, `${SITE_URL}/freshness.json`, `${SITE_URL}/en/lorenza-volponi`],
    },
    {
      "@type": "Dataset",
      "@id": `${URL}#dataset`,
      name: "ChatGPT Ads market availability and change ledger — snapshot 2026-08-25",
      description: "Editorial snapshot of ChatGPT Ads market availability and verified changes, maintained by Lorenza Volponi with primary-source references and an explicit freshness lifecycle.",
      creator: { "@id": AUTHOR_ID },
      publisher: { "@id": PUBLISHER_ID },
      dateModified: RADAR_CHECKED_AT,
      keywords: ["ChatGPT Ads", "OpenAI Ads", "AI advertising", "Ads Manager", "GEO", "AI Search", "conversational advertising"],
      distribution: [
        { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${SITE_URL}/data/chatgpt-ads-markets.json` },
        { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE_URL}/data/chatgpt-ads-markets.csv` },
      ],
      isBasedOn: "https://help.openai.com/en/articles/20001245-ads-manager-availability",
    },
    mediaAuthorStructuredData,
    publisherStructuredData,
  ],
};

export default function EnglishRadarPage() {
  return (
    <main lang="en" className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/en" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-zinc-600"><ArrowLeft className="h-4 w-4" /> Global Intelligence</Link>
          <Link href="/radar" className="text-xs font-bold text-muted-foreground hover:text-zinc-950">PT-BR Radar</Link>
        </div>
      </header>

      <section className="border-b border-border bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <Badge className="border border-white/20 bg-white/10 text-white hover:bg-white/10">verified snapshot · {RADAR_CHECKED_AT}</Badge>
          <div className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-zinc-400"><RadioTower className="h-4 w-4" /> Volponi ChatGPT Ads Radar</div>
          <h1 className="mt-5 max-w-6xl text-5xl font-black leading-[0.94] tracking-[-0.055em] md:text-7xl">ChatGPT Ads changes fast. <span className="block text-zinc-400">The Radar keeps the evidence.</span></h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">An independent intelligence layer maintained by Lorenza Volponi for brands, agencies, journalists and AI operators tracking ChatGPT Ads, AI advertising, market availability, measurement and product change.</p>
          <FreshnessStatus language="en" dark />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-white text-zinc-950 hover:bg-zinc-200"><a href="/data/chatgpt-ads-markets.json"><Database className="mr-2 h-4 w-4" /> Open dataset</a></Button>
            <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-zinc-950"><a href="/data/chatgpt-ads-markets.csv"><Download className="mr-2 h-4 w-4" /> CSV</a></Button>
            <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-zinc-950"><Link href="/en/lorenza-volponi"><UserRound className="mr-2 h-4 w-4" /> Lorenza Volponi</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {[[String(availableCount), "Available markets", `editorial snapshot · ${RADAR_CHECKED_AT}`], [String(comingSoonCount), "Coming Soon markets", `editorial snapshot · ${RADAR_CHECKED_AT}`], [String(radarEntries.length), "Verified change records", "each connected to source and date"]].map(([value, label, note]) => <div key={label} className="bg-background p-7"><p className="text-5xl font-black tracking-[-0.05em]">{value}</p><p className="mt-2 font-bold">{label}</p><p className="mt-1 text-sm text-muted-foreground">{note}</p></div>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.62fr_0.38fr]">
          <div className="rounded-3xl border border-border bg-background p-8 md:p-10">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">Why this Radar exists</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] md:text-5xl">Availability is a fact. Performance is a hypothesis.</h2>
            <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">The Radar separates what is documented from what is inferred. Market availability, account access, inventory, delivery and business performance are different evidence states. This makes the archive useful for strategy, reporting, journalism and AI search systems that need source-linked context.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Button asChild><Link href="/en/chatgpt-ads">Global ChatGPT Ads guide</Link></Button><Button asChild variant="outline"><Link href="/en/geo-ai-strategy">GEO & AI Search strategy</Link></Button></div>
          </div>
          <aside className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
            <ShieldCheck className="h-5 w-5" />
            <h2 className="mt-4 text-2xl font-black">Evidence backbone</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Use the public ledger to verify dates, primary sources, source freshness and observed changes before citing a claim.</p>
            <div className="mt-5 grid gap-2 text-sm font-bold"><Link href="/proof.json" className="hover:underline">Proof manifest</Link><Link href="/citation.json" className="hover:underline">Citation guide</Link><Link href="/freshness.json" className="hover:underline">Freshness lifecycle</Link><Link href="/semantic-map.json" className="hover:underline">Semantic map</Link><Link href="/en/press" className="hover:underline">English press room</Link></div>
          </aside>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]">Latest evidence records</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] md:text-5xl">A public memory of product change.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {radarEntries.slice(0, 6).map((entry) => <article key={entry.slug} className="rounded-3xl border border-border bg-background p-6"><div className="flex flex-wrap gap-2"><Badge variant="outline">{entry.kind}</Badge><Badge variant="secondary">{entry.market}</Badge></div><p className="mt-5 font-mono text-xs font-bold">{entry.date}</p><h3 className="mt-3 text-xl font-black tracking-[-0.025em]">{entry.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Verified change record with previous state, observed state, impact and primary source.</p><Link href={`/radar/${entry.slug}`} className="mt-5 inline-flex items-center gap-1 text-sm font-bold hover:underline">Open evidence record <ArrowUpRight className="h-3.5 w-3.5" /></Link></article>)}
          </div>
        </div>
      </section>

      <SemanticRelatedLinks currentPath="/en/radar" language="en" limit={5} />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="rounded-3xl bg-zinc-950 p-8 text-white md:p-12">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">Source, cite, decide</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.045em] md:text-6xl">Need the person behind the evidence?</h2>
          <p className="mt-5 max-w-3xl leading-7 text-zinc-400">Lorenza Volponi works across AI systems, AI product & UX/UI, GEO, AI Search and conversational advertising. The public evidence layer exists so journalists and commercial teams can evaluate the work before reaching out.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button asChild className="bg-white text-zinc-950 hover:bg-zinc-200"><Link href="/en/lorenza-volponi">Who is Lorenza Volponi?</Link></Button><Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-zinc-950"><Link href="/work-with-lorenza">Send the opportunity</Link></Button></div>
        </div>
      </section>
    </main>
  );
}
