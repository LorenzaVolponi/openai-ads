import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Database, Newspaper, ShieldCheck } from "lucide-react";

import { SITE_URL } from "@/lib/media-authority";
import { marketStates, RADAR_CHECKED_AT, radarEntries } from "@/lib/radar-data";
import { socialImageForPath } from "@/lib/seo";

const URL = `${SITE_URL}/en`;
const SOCIAL_IMAGE = socialImageForPath("/en");
const available = marketStates.filter((market) => market.adsManager === "Available").length;
const comingSoon = marketStates.filter((market) => market.adsManager === "Coming Soon").length;

export const metadata: Metadata = {
  title: "AI, ChatGPT Ads, GEO & AI Search Intelligence | Lorenza Volponi",
  description: "Independent English intelligence by Lorenza Volponi on AI systems, ChatGPT Ads, GEO, AI Search, AI product/UX/UI, market readiness and source-linked evidence.",
  authors: [{ name: "Lorenza Volponi", url: `${SITE_URL}/en/lorenza-volponi` }],
  alternates: { canonical: URL, languages: { en: URL, "pt-BR": SITE_URL, "x-default": URL } },
  openGraph: { title: "AI & ChatGPT Ads Intelligence by Lorenza Volponi", description: "Original research, verified changes, AI discovery and evidence-backed strategy.", url: URL, type: "website", locale: "en_US", images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "AI and ChatGPT Ads Intelligence by Lorenza Volponi" }] },
  twitter: { card: "summary_large_image", title: "AI & ChatGPT Ads Intelligence — Lorenza Volponi", description: "Original research and source-linked AI intelligence.", images: [SOCIAL_IMAGE] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL}#page`,
      url: URL,
      name: "AI & ChatGPT Ads Intelligence",
      description: "Independent English intelligence on AI systems, ChatGPT Ads, GEO, AI Search and evidence-backed product strategy.",
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      author: { "@id": "https://volponi.tech/#lorenza-volponi" },
      dateModified: `${RADAR_CHECKED_AT}T12:00:00Z`,
      hasPart: [
        { "@type": "Dataset", url: `${SITE_URL}/en/volponi-ai-index`, name: "Volponi AI Index — AI Advertising & Discovery Readiness" },
        { "@type": "CollectionPage", url: `${SITE_URL}/en/radar`, name: "ChatGPT Ads Evidence Radar" },
        { "@type": "ProfilePage", url: `${SITE_URL}/en/press`, name: "Lorenza Volponi Press Room" },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://volponi.tech/#lorenza-volponi",
      name: "Lorenza Volponi",
      url: "https://volponi.tech/",
      sameAs: ["https://www.linkedin.com/in/lorenzavolponi", "https://github.com/LorenzaVolponi"],
      knowsAbout: ["Artificial Intelligence", "AI systems", "AI Product", "UX/UI", "GEO", "AI Search", "ChatGPT Ads", "automation", "agents", "evidence architecture"],
    },
  ],
};

export default function EnglishPage() {
  const latest = radarEntries.slice(0, 3);

  return (
    <main lang="en" className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.lang="en";' }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-[#fafaf8]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <Link href="/en" className="flex min-w-0 items-center gap-3">
            <Image src="/fox-black.png" alt="volponi.tech" width={36} height={36} className="h-9 w-9 rounded-xl" />
            <div><span className="block text-sm font-black">volponi.tech</span><span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">AI Intelligence · Lorenza Volponi</span></div>
          </Link>
          <nav className="hidden items-center gap-5 text-xs font-bold text-zinc-600 md:flex">
            <Link href="/en/volponi-ai-index">AI Index</Link><Link href="/en/radar">Radar</Link><Link href="/en/lorenza-volponi">Lorenza</Link><Link href="/en/press">Press</Link>
          </nav>
          <Link href="/" className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-black">Português</Link>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[0.72fr_0.28fr] lg:items-center">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Independent AI intelligence · original research · sources first</p>
            <h1 className="mt-6 max-w-5xl font-serif text-[clamp(3.5rem,9vw,7.4rem)] leading-[0.88] tracking-[-0.06em]">AI systems, discovery and advertising — before the market turns noise into certainty.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">Original research and verified evidence on AI systems, ChatGPT Ads, GEO, AI Search, AI product/UX/UI and the changing infrastructure of discovery and decision.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/en/volponi-ai-index" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-black text-white">Open the AI Index <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/en/radar" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-black">Open Evidence Radar <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
          <aside className="rounded-[2.25rem] border border-zinc-200 bg-[#f7f7f5] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,.08)]">
            <Image src="/fox-black.png" alt="volponi.tech fox mark" width={144} height={144} className="mx-auto h-36 w-36 rounded-[2rem] object-contain" />
            <p className="mt-6 font-serif text-2xl tracking-[-0.03em]">Evidence before positioning.</p>
            <p className="mt-3 text-sm leading-6 text-zinc-500">Editorial evidence review: {RADAR_CHECKED_AT}</p>
          </aside>
        </div>
      </section>

      <section id="markets" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Evidence snapshot</p><h2 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">Availability is a fact. Performance is a different evidence state.</h2></div>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 lg:justify-self-end">The current evidence layer records official availability and product change without pretending that access, inventory, delivery or business outcomes are the same thing.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-zinc-950 p-7 text-white"><Database className="h-5 w-5" /><p className="mt-8 text-6xl font-black">{available}</p><p className="mt-2 text-sm text-zinc-400">Ads Manager markets marked Available</p></div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-7"><p className="text-6xl font-black">{comingSoon}</p><p className="mt-2 text-sm text-zinc-500">markets marked Coming Soon</p></div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-7"><ShieldCheck className="h-5 w-5" /><p className="mt-8 text-2xl font-black">Primary-source linked</p><p className="mt-2 text-sm leading-6 text-zinc-500">Every sensitive state is tied to source, date and editorial boundary.</p></div>
        </div>
      </section>

      <section id="radar" className="border-y border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Verified change radar</p><h2 className="mt-4 font-serif text-5xl tracking-[-0.045em]">What changed recently.</h2></div>
            <Link href="/en/radar" className="inline-flex items-center gap-2 text-sm font-black">Full English Radar <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {latest.map((entry) => (
              <Link key={entry.slug} href={`/radar/${entry.slug}`} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 transition hover:bg-white/[0.08]">
                <Newspaper className="h-4 w-4 text-zinc-400" />
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">{entry.date} · {entry.market}</p>
                <h3 className="mt-3 text-lg font-black leading-6">{entry.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{entry.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Authority backbone</p>
        <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">Research → evidence → Lorenza → media or commercial decision.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {[
            ["/en/volponi-ai-index", "Volponi AI Index", "Original research with an auditable evidence matrix."],
            ["/en/radar", "Evidence Radar", "Verified product and market changes with primary sources."],
            ["/en/lorenza-volponi", "Lorenza Volponi", "AI Specialist · AI Systems · AI Product & UX/UI · GEO & AI Search."],
            ["/en/press", "Press & Media", "Source-ready facts, citation and editorial context."],
          ].map(([href, title, text]) => (
            <Link key={href} href={href} className="rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"><h3 className="text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-black">Open <ArrowUpRight className="h-3.5 w-3.5" /></span></Link>
          ))}
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="font-serif text-3xl tracking-[-0.03em]">Independent editorial research by Lorenza Volponi.</p><p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-500">Not affiliated with, sponsored by, endorsed by, certified by, operated by or maintained by OpenAI.</p></div>
          <div className="flex flex-wrap gap-2 text-xs font-black"><Link href="/en/press" className="rounded-full border border-zinc-300 px-4 py-2">Press room</Link><Link href="/en/lorenza-volponi" className="rounded-full border border-zinc-300 px-4 py-2">Lorenza</Link><Link href="/metodologia" className="rounded-full border border-zinc-300 px-4 py-2">Methodology</Link></div>
        </div>
      </footer>
    </main>
  );
}
