import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BadgeCheck, Database, Globe2, Network, ShieldCheck } from "lucide-react";

import { GrowthLink } from "@/components/growth-link";
import { SemanticRelatedLinks } from "@/components/semantic-related-links";
import type { GlobalGrowthPage } from "@/lib/global-growth-data";
import { RADAR_CHECKED_AT } from "@/lib/radar-data";
import { SITE_URL } from "@/lib/media-authority";

const linkedin = "https://www.linkedin.com/in/lorenzavolponi";
const github = "https://github.com/LorenzaVolponi";
const authoritySurfaces = [
  ["/en/volponi-ai-index", "Volponi AI Index", "Original research · source-linked evidence matrix"],
  ["/en/radar", "Evidence Radar", "Verified changes · primary sources · open data"],
  ["/en/press", "Press & Media", "Source room · citation · editorial fast path"],
  ["/en/lorenza-volponi", "Lorenza Volponi", "AI Specialist · AI Systems · AI Product & UX/UI · GEO & AI Search"],
] as const;

export function GlobalGrowthPageView({ page }: { page: GlobalGrowthPage }) {
  const currentPath = `/en/${page.slug}`;
  const canonical = `${SITE_URL}${currentPath}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#page`,
        url: canonical,
        name: page.title,
        description: page.description,
        inLanguage: "en",
        dateModified: `${RADAR_CHECKED_AT}T12:00:00Z`,
        author: { "@id": "https://volponi.tech/#lorenza-volponi" },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: ["Artificial Intelligence", "AI systems", "AI Product", "UX/UI", "GEO", "AI Search", "ChatGPT Ads", "automation", "evidence architecture"],
        subjectOf: [
          { "@type": "Dataset", url: `${SITE_URL}/en/volponi-ai-index`, name: "Volponi AI Index — AI Advertising & Discovery Readiness" },
          { "@type": "CollectionPage", url: `${SITE_URL}/en/radar`, name: "ChatGPT Ads Evidence Radar" },
        ],
      },
      {
        "@type": "Person",
        "@id": "https://volponi.tech/#lorenza-volponi",
        name: "Lorenza Volponi",
        url: "https://volponi.tech/",
        sameAs: [linkedin, github],
        knowsAbout: ["Artificial Intelligence", "AI systems", "AI Product", "UX/UI", "GEO", "AI Search", "AI discovery", "ChatGPT Ads", "conversational advertising", "automation", "agents", "evidence architecture", "information architecture"],
        subjectOf: [
          { "@type": "Dataset", url: `${SITE_URL}/en/volponi-ai-index`, name: "Volponi AI Index — AI Advertising & Discovery Readiness" },
          { "@type": "CollectionPage", url: `${SITE_URL}/en/radar`, name: "ChatGPT Ads Evidence Radar" },
          { "@type": "ProfilePage", url: `${SITE_URL}/en/press`, name: "Lorenza Volponi Press Room" },
        ],
      },
    ],
  };

  return (
    <main lang="en" className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <Link href="/en" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold"><ArrowLeft className="h-4 w-4" /> Global Intelligence</Link>
          <div className="flex items-center gap-2"><Link href="/en/lorenza-volponi" className="hidden rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-black sm:inline-flex">Lorenza Volponi</Link><GrowthLink href="/work-with-lorenza" intent={page.intent} placement={`header-${page.slug}`} className="rounded-full bg-zinc-950 px-4 py-2 text-xs font-black text-white">Send the opportunity</GrowthLink></div>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-[#fafaf8] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600"><Globe2 className="h-3.5 w-3.5" /> {page.eyebrow}</div>
          <h1 className="mt-6 max-w-6xl font-serif text-[clamp(3.4rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.055em]">{page.headline}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">{page.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GrowthLink href="/work-with-lorenza" intent={page.intent} placement={`hero-${page.slug}`} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-black text-white">Send the opportunity <ArrowRight className="h-4 w-4" /></GrowthLink>
            <Link href="/en/volponi-ai-index" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-black">Inspect the evidence <Database className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="mb-8 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500"><BadgeCheck className="h-4 w-4" /> Answer-first · evidence-linked · GEO-ready</div>
        <div className="grid gap-3 lg:grid-cols-3">
          {page.answers.map((item) => <article key={item.question} className="rounded-3xl border border-zinc-200 bg-white p-6"><h2 className="text-lg font-black leading-6">{item.question}</h2><p className="mt-4 text-sm leading-7 text-zinc-600">{item.answer}</p></article>)}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-[#f4f4f1]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-4 lg:grid-cols-3">
            {page.sections.map((section, index) => <article key={section.title} className="rounded-[2rem] border border-zinc-200 bg-white p-7"><span className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">0{index + 1}</span><h2 className="mt-4 text-2xl font-black tracking-[-0.03em]">{section.title}</h2><p className="mt-4 text-sm leading-7 text-zinc-600">{section.text}</p>{section.bullets ? <ul className="mt-4 space-y-2 text-sm text-zinc-600">{section.bullets.map((bullet) => <li key={bullet}>— {bullet}</li>)}</ul> : null}</article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">Evidence network</p>
        <h2 className="mt-4 max-w-4xl font-serif text-4xl leading-[0.95] tracking-[-0.04em] md:text-6xl">One Lorenza entity. Research, proof, media and commercial intent connected.</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {authoritySurfaces.map(([href, title, text]) => <Link key={href} href={href} className="rounded-3xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><p className="text-sm font-black">{title}</p><p className="mt-2 text-xs leading-5 text-zinc-500">{text}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-black">Open <ArrowUpRight className="h-3.5 w-3.5" /></span></Link>)}
        </div>
      </section>

      <SemanticRelatedLinks currentPath={currentPath} language="en" limit={5} />

      <section className="bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
          <div><div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400"><Network className="h-4 w-4" /> Authority → decision-ready opportunity</div><h2 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">{page.cta}</h2><p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400">Bring the actual problem, decision, market, product or partnership context. Public evidence is designed to remove the need for a discovery meeting just to establish capability.</p></div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6"><ShieldCheck className="h-5 w-5" /><p className="mt-5 text-lg font-black">Independent by design.</p><p className="mt-3 text-sm leading-6 text-zinc-400">Lorenza Volponi / volponi.tech is not affiliated with, sponsored by, endorsed by, certified by, operated by or maintained by OpenAI.</p><div className="mt-6 grid gap-2"><GrowthLink href="/work-with-lorenza" intent={page.intent} placement={`bottom-work-${page.slug}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black text-zinc-950">Send the opportunity <ArrowUpRight className="h-4 w-4" /></GrowthLink><GrowthLink href={linkedin} intent={page.intent} placement={`bottom-linkedin-${page.slug}`} className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-5 text-sm font-black">Lorenza on LinkedIn</GrowthLink></div></div>
        </div>
      </section>
    </main>
  );
}
