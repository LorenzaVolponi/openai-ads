import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Handshake, Network, RadioTower, Sparkles } from "lucide-react";

import { SITE_URL } from "@/lib/media-authority";

const URL = `${SITE_URL}/en/partners`;
const linkedin = "https://www.linkedin.com/in/lorenzavolponi";

export const metadata: Metadata = {
  title: "Partnerships with Lorenza Volponi | AI, GEO, ChatGPT Ads and Market Intelligence",
  description: "Partnership pathways with Lorenza Volponi for agencies, AI products, adtech, media companies and advisory teams working across GEO, ChatGPT Ads and AI discovery.",
  alternates: { canonical: URL },
};

const models = [
  ["Agency co-delivery", "Research, strategy and senior advisory added to an existing client relationship without replacing the agency."],
  ["Product / adtech intelligence", "Market interpretation, evidence architecture and category education for teams entering AI-mediated discovery and advertising."],
  ["Media & research collaboration", "Source-linked commentary, datasets, explainers and editorial collaboration built around verifiable evidence."],
  ["Strategic advisory", "Focused work with founders, executives or specialist teams on GEO, AI systems and new advertising surfaces."],
] as const;

export default function PartnersPage() {
  return (
    <main lang="en" className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500">Partnerships · Lorenza Volponi</p>
          <h1 className="mt-5 max-w-5xl font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.055em]">Bring distribution, product or clients. I bring the intelligence layer.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600">Built for agencies, AI products, adtech, media companies and advisory teams that want a credible specialist layer around GEO, ChatGPT Ads, AI discovery and evidence-led systems.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href={linkedin} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white">Discuss a partnership <ArrowUpRight className="h-4 w-4" /></a><a href="/partner-opportunities.json" className="rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-black">Machine-readable partnership map</a></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-4 md:grid-cols-2">{models.map(([title, text], index) => <article key={title} className="rounded-[2rem] border border-zinc-200 bg-white p-7">{index === 0 ? <Handshake className="h-5 w-5" /> : index === 1 ? <Network className="h-5 w-5" /> : index === 2 ? <RadioTower className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}<h2 className="mt-5 text-2xl font-black">{title}</h2><p className="mt-3 text-sm leading-7 text-zinc-600">{text}</p></article>)}</div>
      </section>

      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20"><p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">Fit signal</p><h2 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">The best partnership has a real market problem, a clear audience and a reason to combine capabilities.</h2><p className="mt-6 max-w-3xl text-base leading-7 text-zinc-400">No artificial exclusivity, no fake logos and no invented case studies. The public research is the proof layer; the partnership starts when there is a concrete opportunity worth structuring.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/work-with-lorenza" className="font-black underline underline-offset-4">Work with Lorenza</Link><Link href="/en/press" className="font-black underline underline-offset-4">Press room</Link></div></div>
      </section>
    </main>
  );
}
