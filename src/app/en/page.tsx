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
  title: "ChatGPT Ads Intelligence: markets, pricing, metrics and verified changes",
  description: "Independent English briefing on ChatGPT Ads: market availability, Ads Manager, pricing, measurement, privacy and a source-linked change radar.",
  alternates: { canonical: URL, languages: { en: URL, "pt-BR": SITE_URL, "x-default": SITE_URL } },
  openGraph: { title: "ChatGPT Ads Intelligence by volponi.tech", description: "Markets, pricing, measurement and verified product changes.", url: URL, type: "website", locale: "en_US", images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "ChatGPT Ads Intelligence by volponi.tech" }] },
  twitter: { card: "summary_large_image", title: "ChatGPT Ads Intelligence", description: "An independent, source-linked briefing.", images: [SOCIAL_IMAGE] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${URL}#page`,
  url: URL,
  name: "ChatGPT Ads Intelligence",
  description: "Independent English briefing on ChatGPT Ads markets, buying, measurement and verified changes.",
  inLanguage: "en",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  author: { "@id": `${SITE_URL}/#author` },
  dateModified: `${RADAR_CHECKED_AT}T12:00:00Z`,
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
            <div><span className="block text-sm font-black">volponi.tech</span><span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500">ChatGPT Ads Intelligence</span></div>
          </Link>
          <nav className="hidden items-center gap-5 text-xs font-bold text-zinc-600 md:flex">
            <a href="#markets">Markets</a><a href="#radar">Radar</a><a href="#strategy">Strategy</a><a href="/imprensa">Press</a>
          </nav>
          <a href="/" className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-black">Português</a>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[0.72fr_0.28fr] lg:items-center">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Independent intelligence · sources first</p>
            <h1 className="mt-6 max-w-5xl font-serif text-[clamp(3.5rem,9vw,7.4rem)] leading-[0.88] tracking-[-0.06em]">Understand ChatGPT Ads before the market turns noise into certainty.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">Market availability, buying models, measurement, privacy and product changes — separated into confirmed facts, operational limits and strategic interpretation.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/chatgpt-ads-market" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-black text-white">Explore markets <ArrowRight className="h-4 w-4" /></a>
              <a href="/radar" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-black">Open Radar <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </div>
          <aside className="rounded-[2.25rem] border border-zinc-200 bg-[#f7f7f5] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,.08)]">
            <Image src="/fox-black.png" alt="volponi.tech fox mark" width={144} height={144} className="mx-auto h-36 w-36 rounded-[2rem] object-contain" />
            <p className="mt-6 font-serif text-2xl tracking-[-0.03em]">Evidence before excitement.</p>
            <p className="mt-3 text-sm leading-6 text-zinc-500">Editorial review: {RADAR_CHECKED_AT}</p>
          </aside>
        </div>
      </section>

      <section id="markets" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Market snapshot</p><h2 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">Availability is a fact. Performance is a hypothesis.</h2></div>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 lg:justify-self-end">The snapshot records the latest audited official surface. It does not promise account access, inventory, delivery or return.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-zinc-950 p-7 text-white"><Database className="h-5 w-5" /><p className="mt-8 text-6xl font-black">{available}</p><p className="mt-2 text-sm text-zinc-400">Ads Manager markets marked Available</p></div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-7"><p className="text-6xl font-black">{comingSoon}</p><p className="mt-2 text-sm text-zinc-500">markets marked Coming Soon</p></div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-7"><ShieldCheck className="h-5 w-5" /><p className="mt-8 text-2xl font-black">Primary-source linked</p><p className="mt-2 text-sm leading-6 text-zinc-500">Every status points back to the official source and review date.</p></div>
        </div>
      </section>

      <section id="radar" className="border-y border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">Verified change radar</p><h2 className="mt-4 font-serif text-5xl tracking-[-0.045em]">What changed recently.</h2></div>
            <a href="/radar" className="inline-flex items-center gap-2 text-sm font-black">Full timeline <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {latest.map((entry) => (
              <a key={entry.slug} href={`/radar/${entry.slug}`} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 transition hover:bg-white/[0.08]">
                <Newspaper className="h-4 w-4 text-zinc-400" />
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">{entry.date} · {entry.market}</p>
                <h3 className="mt-3 text-lg font-black leading-6">{entry.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{entry.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="strategy" className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Strategic layer</p>
        <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">Turn a new media surface into a governed decision.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["/chatgpt-ads-vs-google-ads", "ChatGPT Ads vs Google Ads", "Conversational context, declared search intent and complementary testing."],
            ["/chatgpt-ads-vs-meta-ads", "ChatGPT Ads vs Meta Ads", "Conversation, creative discovery, privacy and measurement."],
            ["/chatgpt-ads-para-agencias", "Agency operating playbook", "Eligibility, pilot design, reporting and scale criteria."],
          ].map(([href, title, text]) => (
            <a key={href} href={href} className="rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"><h3 className="text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-black">Read framework <ArrowUpRight className="h-3.5 w-3.5" /></span></a>
          ))}
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div><p className="font-serif text-3xl tracking-[-0.03em]">Independent editorial project by Lorenza Volponi.</p><p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-500">Not affiliated with, sponsored by, endorsed by, certified by, operated by or maintained by OpenAI. Automated translations may require human review.</p></div>
          <div className="flex flex-wrap gap-2 text-xs font-black"><a href="/imprensa" className="rounded-full border border-zinc-300 px-4 py-2">Press room</a><a href="/imprensa/dados" className="rounded-full border border-zinc-300 px-4 py-2">Media facts</a><a href="/metodologia" className="rounded-full border border-zinc-300 px-4 py-2">Methodology</a></div>
        </div>
      </footer>
    </main>
  );
}
