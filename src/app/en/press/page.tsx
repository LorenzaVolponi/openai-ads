import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Database, FileText, Quote, Radio } from "lucide-react";

import { SITE_URL } from "@/lib/media-authority";

const URL = `${SITE_URL}/en/press`;
const linkedin = "https://www.linkedin.com/in/lorenzavolponi";

export const metadata: Metadata = {
  title: "Press Room — Lorenza Volponi | ChatGPT Ads, GEO and AI Discovery",
  description: "English press room for Lorenza Volponi with interview topics, source-linked research, data surfaces and citation guidance on ChatGPT Ads, GEO and AI discovery.",
  alternates: { canonical: URL },
};

const topics = [
  ["ChatGPT Ads", "Markets, buying models, measurement, privacy and verified product changes."],
  ["GEO & AI discovery", "How brands become understandable, extractable and citable across AI-assisted search surfaces."],
  ["AI systems strategy", "Evidence architecture, machine-readable publishing and governed decision systems."],
  ["Brazil & LATAM", "Local market interpretation without turning availability into a performance claim."],
] as const;

export default function PressPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${URL}#page`,
    url: URL,
    name: "Lorenza Volponi — Press Room",
    inLanguage: "en",
    mainEntity: { "@type": "Person", "@id": `${SITE_URL}/#author`, name: "Lorenza Volponi", url: "https://volponi.tech/", sameAs: [linkedin, "https://github.com/LorenzaVolponi"] },
  };

  return (
    <main lang="en" className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500">Global press room · Lorenza Volponi</p>
          <h1 className="mt-5 max-w-5xl font-serif text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.055em]">Research first. Quote second.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600">A source-ready room for journalists, editors, podcast hosts and researchers covering ChatGPT Ads, GEO, AI discovery and evidence-led AI systems.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="/global-media-kit.json" className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white">Machine-readable media kit</a><a href={linkedin} className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-black">Contact Lorenza <ArrowUpRight className="h-4 w-4" /></a></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {topics.map(([title, text]) => <article key={title} className="rounded-[2rem] border border-zinc-200 bg-white p-7"><Radio className="h-5 w-5" /><h2 className="mt-5 text-2xl font-black">{title}</h2><p className="mt-3 text-sm leading-7 text-zinc-600">{text}</p></article>)}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-[#f4f4f1]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-16 md:grid-cols-3 md:px-6 md:py-20">
          <a href="/media-facts.json" className="rounded-3xl bg-white p-6"><Database className="h-5 w-5" /><h2 className="mt-5 text-xl font-black">Media facts</h2><p className="mt-3 text-sm leading-6 text-zinc-600">Structured facts and editorial caveats prepared for citation workflows.</p></a>
          <a href="/evidence.json" className="rounded-3xl bg-white p-6"><FileText className="h-5 w-5" /><h2 className="mt-5 text-xl font-black">Evidence ledger</h2><p className="mt-3 text-sm leading-6 text-zinc-600">Primary-source-linked evidence surfaces with provenance and review boundaries.</p></a>
          <a href="/citation.json" className="rounded-3xl bg-white p-6"><Quote className="h-5 w-5" /><h2 className="mt-5 text-xl font-black">Citation guidance</h2><p className="mt-3 text-sm leading-6 text-zinc-600">Canonical project and author references for journalists, researchers and machines.</p></a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">Editorial boundary</p>
        <p className="mt-4 max-w-4xl text-base leading-7 text-zinc-600">This is an independent editorial and research property by Lorenza Volponi. It is not affiliated with, sponsored by, endorsed by, certified by, operated by or maintained by OpenAI. Availability, access, inventory and performance remain separate claims.</p>
        <div className="mt-8 flex gap-3"><Link href="/en/lorenza-volponi" className="font-black underline underline-offset-4">About Lorenza</Link><Link href="/en/partners" className="font-black underline underline-offset-4">Partnerships</Link></div>
      </section>
    </main>
  );
}
