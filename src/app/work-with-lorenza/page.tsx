import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Database,
  FileText,
  Globe2,
  Handshake,
  Radar,
  Sparkles,
  UserRoundSearch,
} from "lucide-react";

import { GrowthLink } from "@/components/growth-link";
import {
  LORENZA_ENTITY_ID,
  LORENZA_GITHUB,
  LORENZA_LINKEDIN,
  lorenzaAuthority,
} from "@/lib/lorenza-authority";
import { SITE_URL } from "@/lib/media-authority";

const URL = `${SITE_URL}/work-with-lorenza`;

export const metadata: Metadata = {
  title: "Work with Lorenza Volponi: AI systems, GEO and ChatGPT Ads strategy",
  description:
    "Strategic advisory and partnership with Lorenza Volponi for brands, agencies and operators working on AI systems, AI product/UX, GEO, AI discovery and conversational advertising.",
  alternates: { canonical: URL },
};

const iconByServiceId = {
  "brand-strategic-advisory": Building2,
  "agency-partnership-enablement": Handshake,
  "executive-ai-problem-solving": Sparkles,
} as const;

const proofLinks = [
  {
    href: "/en/volponi-ai-index",
    label: "Volponi AI Index",
    detail: "Versioned research, methodology and immutable citation formats.",
    icon: Database,
  },
  {
    href: "/en/radar",
    label: "Evidence Radar",
    detail: "Source-linked change tracking for fast-moving AI advertising evidence.",
    icon: Radar,
  },
  {
    href: "/en/lorenza-volponi",
    label: "Lorenza authority profile",
    detail: "Canonical expertise, evidence surfaces and public identity graph.",
    icon: UserRoundSearch,
  },
] as const;

export default function WorkWithLorenzaPage() {
  const services = lorenzaAuthority.commercial.services;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": URL,
        url: URL,
        name: "Work with Lorenza Volponi",
        inLanguage: "en",
        about: { "@id": LORENZA_ENTITY_ID },
        mainEntity: { "@id": `${URL}#services` },
      },
      {
        "@type": "Person",
        "@id": LORENZA_ENTITY_ID,
        name: "Lorenza Volponi",
        url: "https://volponi.tech/",
        sameAs: [LORENZA_LINKEDIN, LORENZA_GITHUB],
        jobTitle: "AI Systems Strategist and Builder",
        knowsAbout: lorenzaAuthority.expertise.map((item) => item.label),
      },
      {
        "@type": "OfferCatalog",
        "@id": `${URL}#services`,
        name: "Lorenza Volponi strategic AI services",
        url: URL,
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": `${URL}#${service.id}`,
            name: service.name,
            description: service.description,
            category: service.category,
            provider: { "@id": LORENZA_ENTITY_ID },
            audience: {
              "@type": "Audience",
              audienceType: service.audience,
            },
            subjectOf: service.evidence.map((url) => ({ "@type": "CreativeWork", url })),
          },
        })),
      },
    ],
  };

  return (
    <main lang="en" className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
      />

      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/en" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold">
            <ArrowLeft className="h-4 w-4" /> Global Intelligence
          </Link>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
            Lorenza Volponi · worldwide
          </span>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-600">
            <Globe2 className="h-3.5 w-3.5" /> Work together
          </div>
          <h1 className="mt-6 max-w-6xl font-serif text-[clamp(3.6rem,9vw,8rem)] leading-[0.88] tracking-[-0.06em]">
            Bring me the problem that is expensive to misunderstand.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">
            I work where AI systems, GEO, discovery, conversational advertising, evidence and business strategy collide. The goal is not another deck. It is a better decision and an executable architecture.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <GrowthLink
              href="/work-with-lorenza/brief"
              intent="consulting"
              placement="work-hero-brief"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-black text-white"
            >
              <FileText className="h-4 w-4" /> Send a structured brief
            </GrowthLink>
            <GrowthLink
              href={LORENZA_LINKEDIN}
              intent="consulting"
              placement="work-hero-linkedin"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-black"
            >
              Message Lorenza <ArrowUpRight className="h-4 w-4" />
            </GrowthLink>
            <GrowthLink
              href="https://volponi.tech/?utm_source=openai-ads&utm_medium=organic&utm_campaign=work-with-lorenza"
              intent="consulting"
              placement="work-hero-volponi"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-black"
            >
              See the wider ecosystem <ArrowRight className="h-4 w-4" />
            </GrowthLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-4 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconByServiceId[service.id];
            return (
              <article key={service.id} id={service.id} className="rounded-[2rem] border border-zinc-200 bg-white p-7">
                <Icon className="h-5 w-5" />
                <p className="mt-6 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">
                  {service.category}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em]">{service.audience}</h2>
                <p className="mt-4 text-sm leading-7 text-zinc-600">{service.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-[#f4f4f1]">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">Proof before pitch</p>
          <h2 className="mt-4 max-w-5xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">
            Inspect the work before you send the opportunity.
          </h2>
          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {proofLinks.map(({ href, label, detail, icon: Icon }) => (
              <Link key={href} href={href} className="rounded-3xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-400">
                <Icon className="h-5 w-5" />
                <h3 className="mt-5 text-xl font-black tracking-[-0.03em]">{label}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{detail}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-black">
                  Inspect evidence <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">Good fit</p>
        <h2 className="mt-4 max-w-5xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">
          You have a real decision, not a vague desire to “do AI”.
        </h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm leading-7 text-zinc-600">
            You are deciding where to invest, how to position, what to test, how to prove value or how to build a defensible operating model.
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm leading-7 text-zinc-600">
            You value evidence, speed and strategic challenge — and you are comfortable killing a weak assumption before spending money to protect it.
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center md:px-6 md:py-24">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">No funnel theater</p>
          <h2 className="mx-auto mt-4 max-w-5xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">
            If there is a serious opportunity, say what it is.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400">
            No hidden lead magnet. No fake urgency. Use the public work to decide whether the thinking is useful — then bring the opportunity directly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <GrowthLink
              href="/work-with-lorenza/brief"
              intent="consulting"
              placement="work-bottom-brief"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-black text-zinc-950"
            >
              <FileText className="h-4 w-4" /> Open the opportunity brief
            </GrowthLink>
            <GrowthLink
              href={LORENZA_LINKEDIN}
              intent="consulting"
              placement="work-bottom-linkedin"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-700 px-6 text-sm font-black text-white"
            >
              Message Lorenza on LinkedIn <ArrowUpRight className="h-4 w-4" />
            </GrowthLink>
          </div>
        </div>
      </section>
    </main>
  );
}
