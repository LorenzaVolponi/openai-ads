import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Globe2, Handshake, Sparkles } from "lucide-react";

import { GrowthLink } from "@/components/growth-link";
import { SITE_URL } from "@/lib/media-authority";

const URL = `${SITE_URL}/work-with-lorenza`;
const linkedin = "https://www.linkedin.com/in/lorenzavolponi";

export const metadata: Metadata = {
  title: "Work with Lorenza Volponi: AI systems, GEO and ChatGPT Ads strategy",
  description: "Strategic advisory and partnership with Lorenza Volponi for brands, agencies and operators working on ChatGPT Ads, GEO, AI discovery and AI systems.",
  alternates: { canonical: URL },
};

const offers = [
  { icon: Building2, title: "Brands", label: "Strategic advisory", text: "Readiness, market entry, pilot architecture, measurement, AI discovery and governance for companies facing a high-value decision." },
  { icon: Handshake, title: "Agencies", label: "Partnership & enablement", text: "Build capability, client qualification, operating models and co-delivery without forcing channel conflict." },
  { icon: Sparkles, title: "Founders & executives", label: "1:1 strategic problem solving", text: "Complex AI, positioning, discovery or systems decisions where the problem needs architecture before it needs execution." },
];

export default function WorkWithLorenzaPage() {
  const person = { "@context": "https://schema.org", "@type": "Person", "@id": `${SITE_URL}/#author`, name: "Lorenza Volponi", url: "https://volponi.tech/", sameAs: [linkedin, "https://github.com/LorenzaVolponi"], jobTitle: "AI Systems Strategist and Builder", knowsAbout: ["AI systems", "GEO", "AI discovery", "ChatGPT Ads", "conversational advertising", "evidence architecture"] };
  return (
    <main lang="en" className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <header className="border-b border-zinc-200 bg-white"><div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 md:px-6"><Link href="/en" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold"><ArrowLeft className="h-4 w-4" /> Global Intelligence</Link><span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">Lorenza Volponi · worldwide</span></div></header>
      <section className="border-b border-zinc-200 bg-white"><div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24"><div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-600"><Globe2 className="h-3.5 w-3.5" /> Work together</div><h1 className="mt-6 max-w-6xl font-serif text-[clamp(3.6rem,9vw,8rem)] leading-[0.88] tracking-[-0.06em]">Bring me the problem that is expensive to misunderstand.</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">I work where AI systems, GEO, discovery, conversational advertising, evidence and business strategy collide. The goal is not another deck. It is a better decision and an executable architecture.</p><div className="mt-8 flex flex-wrap gap-3"><GrowthLink href={linkedin} intent="consulting" placement="work-hero-linkedin" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-black text-white">Start a conversation <ArrowUpRight className="h-4 w-4" /></GrowthLink><GrowthLink href="https://volponi.tech/?utm_source=openai-ads&utm_medium=organic&utm_campaign=work-with-lorenza" intent="consulting" placement="work-hero-volponi" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-black">See the wider ecosystem <ArrowRight className="h-4 w-4" /></GrowthLink></div></div></section>
      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><div className="grid gap-4 lg:grid-cols-3">{offers.map(({ icon: Icon, title, label, text }) => <article key={title} className="rounded-[2rem] border border-zinc-200 bg-white p-7"><Icon className="h-5 w-5" /><p className="mt-6 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">{label}</p><h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">{title}</h2><p className="mt-4 text-sm leading-7 text-zinc-600">{text}</p></article>)}</div></section>
      <section className="border-y border-zinc-200 bg-[#f4f4f1]"><div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">Good fit</p><h2 className="mt-4 max-w-5xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">You have a real decision, not a vague desire to “do AI”.</h2><div className="mt-8 grid gap-3 md:grid-cols-2"><div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm leading-7 text-zinc-600">You are deciding where to invest, how to position, what to test, how to prove value or how to build a defensible operating model.</div><div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm leading-7 text-zinc-600">You value evidence, speed and strategic challenge — and you are comfortable killing a weak assumption before spending money to protect it.</div></div></div></section>
      <section className="bg-zinc-950 text-white"><div className="mx-auto max-w-7xl px-4 py-16 text-center md:px-6 md:py-24"><p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">No funnel theater</p><h2 className="mx-auto mt-4 max-w-5xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">If there is a serious opportunity, say what it is.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400">No hidden lead magnet. No fake urgency. Use the public work to decide whether the thinking is useful — then bring the opportunity directly.</p><div className="mt-8 flex justify-center"><GrowthLink href={linkedin} intent="consulting" placement="work-bottom-linkedin" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-black text-zinc-950">Message Lorenza on LinkedIn <ArrowUpRight className="h-4 w-4" /></GrowthLink></div></div></section>
    </main>
  );
}
