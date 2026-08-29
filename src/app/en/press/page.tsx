import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Database, Newspaper, Quote, ShieldCheck, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/media-authority";
import { indexCitation, indexEdition, indexFindings } from "@/lib/volponi-ai-index";

const URL = `${SITE_URL}/en/press`;
const linkedin = "https://www.linkedin.com/in/lorenzavolponi";

export const metadata: Metadata = {
  title: "Lorenza Volponi Press Room | AI expert, AI systems, GEO, AI Search and UX/UI",
  description: "English press room for Lorenza Volponi: AI specialist and source for artificial intelligence, AI systems, GEO, AI Search, AI product/UX/UI, ChatGPT and conversational advertising.",
  alternates: { canonical: URL, languages: { en: URL, "pt-BR": `${SITE_URL}/imprensa`, "x-default": URL } },
  openGraph: { title: "Lorenza Volponi — Press & Media", description: "Fast source room for journalists, television, podcasts and editorial teams covering AI.", url: URL, type: "profile", locale: "en_US", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Lorenza Volponi — Press & Media", description: "AI specialist, original research and source-ready evidence.", images: ["/og.png"] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "ProfilePage", "@id": `${URL}#page`, url: URL, name: "Lorenza Volponi Press Room", inLanguage: "en", mainEntity: { "@id": "https://volponi.tech/#lorenza-volponi" } },
    { "@type": "Person", "@id": "https://volponi.tech/#lorenza-volponi", name: "Lorenza Volponi", url: "https://volponi.tech/", sameAs: [linkedin, "https://github.com/LorenzaVolponi"], jobTitle: ["AI Systems Strategist", "AI Specialist", "AI Product & UX/UI Specialist", "GEO & AI Search Strategist"], knowsAbout: ["Artificial Intelligence", "AI systems", "AI Product", "UX/UI", "GEO", "AI Search", "ChatGPT", "automation", "AI agents", "conversational advertising"] },
    { "@type": "Dataset", "@id": `${SITE_URL}/en/volponi-ai-index#dataset`, name: "Volponi AI Index — AI Advertising & Discovery Readiness", creator: { "@id": "https://volponi.tech/#lorenza-volponi" }, url: `${SITE_URL}/en/volponi-ai-index` },
  ],
};

export default function EnglishPressRoom() {
  return (
    <main lang="en" className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500"><Newspaper className="h-4 w-4" /> Press · television · podcasts · editorial</div>
          <h1 className="mt-6 max-w-6xl font-serif text-[clamp(3.6rem,8vw,7rem)] leading-[0.9] tracking-[-0.055em]">Need an AI source? Start with the evidence.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">Lorenza Volponi is available as a source on artificial intelligence, AI systems, GEO and AI Search, AI product & UX/UI, ChatGPT, automation, agents and conversational advertising. The public research layer exists so editorial teams can verify the work before reaching out.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild><a href={linkedin} target="_blank" rel="noopener noreferrer">Contact Lorenza on LinkedIn <ArrowUpRight className="ml-2 h-4 w-4" /></a></Button><Button asChild variant="outline"><Link href="/journalist-mode.json">Journalist fast path</Link></Button></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-8 text-white md:p-10">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-zinc-400">Flagship research · edition {indexEdition}</p>
          <h2 className="mt-4 max-w-5xl font-serif text-4xl leading-[0.95] tracking-[-0.04em] md:text-6xl">Volponi AI Index — AI Advertising & Discovery Readiness</h2>
          <p className="mt-5 max-w-3xl leading-7 text-zinc-400">A source-linked evidence matrix covering market access, international expansion, buying infrastructure, measurement and performance-evidence maturity.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button asChild className="bg-white text-zinc-950 hover:bg-zinc-200"><Link href="/en/volponi-ai-index">Open the Index</Link></Button><Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-zinc-950"><a href="/volponi-ai-index.json"><Database className="mr-2 h-4 w-4" /> Open dataset</a></Button></div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-[#f4f4f1]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Media-ready findings</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">{indexFindings.map((finding) => <article key={finding.id} className="rounded-3xl border border-zinc-200 bg-white p-6"><h2 className="text-xl font-black tracking-[-0.025em]">{finding.headline}</h2><p className="mt-3 text-sm leading-7 text-zinc-600">{finding.detail}</p><a href={finding.source.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-black">Primary source <ArrowUpRight className="h-3.5 w-3.5" /></a></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-3xl border border-zinc-200 bg-white p-7"><UserRound className="h-5 w-5" /><h2 className="mt-4 text-2xl font-black">Source topics</h2><p className="mt-3 text-sm leading-7 text-zinc-600">Artificial Intelligence · AI systems · AI Product & UX/UI · GEO · AI Search · ChatGPT · automation · agents · conversational advertising · digital product strategy.</p></article>
          <article className="rounded-3xl border border-zinc-200 bg-white p-7"><Quote className="h-5 w-5" /><h2 className="mt-4 text-2xl font-black">Citation</h2><p className="mt-3 text-sm leading-7 text-zinc-600">{indexCitation}</p><Link href="/citation.json" className="mt-4 inline-flex text-xs font-black hover:underline">Citation guide</Link></article>
          <article className="rounded-3xl border border-zinc-200 bg-white p-7"><ShieldCheck className="h-5 w-5" /><h2 className="mt-4 text-2xl font-black">Editorial boundary</h2><p className="mt-3 text-sm leading-7 text-zinc-600">Independent research. Availability, access, inventory and campaign performance remain separate claims. Lorenza Volponi / volponi.tech is not affiliated with or endorsed by OpenAI.</p></article>
        </div>
      </section>
    </main>
  );
}
