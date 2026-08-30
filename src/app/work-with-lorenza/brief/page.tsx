import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";

import { CopyTextButton } from "@/components/copy-text-button";
import { GrowthLink } from "@/components/growth-link";
import { LORENZA_ENTITY_ID, LORENZA_LINKEDIN } from "@/lib/lorenza-authority";
import { SITE_URL } from "@/lib/media-authority";

const URL = `${SITE_URL}/work-with-lorenza/brief`;

const briefTemplate = `Opportunity brief for Lorenza Volponi

1. Decision or problem
What decision is expensive to misunderstand?

2. Context
Company, project, market and current stage.

3. What is already true
Known facts, evidence, constraints and links.

4. What is blocked
What is unclear, slow, risky or not working today?

5. Desired outcome
What should be materially different after the engagement?

6. Timing
Deadline, launch window or reason this matters now.

7. Constraints
Budget range if useful, team constraints, compliance, technology or operating limits.

8. Engagement shape
Advisory, architecture, audit, AI product/UX, GEO/AI Search, evidence system, partnership or other.

9. Useful material
Links, documents, screenshots, current stack or prior work.

10. Contact
Name, role and best channel for a direct reply.`;

export const metadata: Metadata = {
  title: "Send Lorenza Volponi an opportunity brief | AI systems, GEO and AI product",
  description:
    "A concise asynchronous brief for serious AI systems, AI product/UX, GEO, AI Search, evidence architecture, advisory and partnership opportunities with Lorenza Volponi.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Send Lorenza Volponi an opportunity brief",
    description: "Bring the decision, evidence, constraint and desired outcome. No discovery-call theater required.",
    url: URL,
    type: "website",
  },
};

const fields = [
  ["Decision or problem", "What decision is expensive to misunderstand?"],
  ["Context", "Company, project, market and current stage."],
  ["What is already true", "Known facts, evidence, constraints and useful links."],
  ["What is blocked", "What is unclear, slow, risky or not working today?"],
  ["Desired outcome", "What should be materially different after the engagement?"],
  ["Timing", "Deadline, launch window or reason this matters now."],
  ["Constraints", "Budget range if useful, team, compliance, technology or operating limits."],
  ["Engagement shape", "Advisory, architecture, audit, AI product/UX, GEO/AI Search, evidence system or partnership."],
] as const;

export default function OpportunityBriefPage() {
  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": URL,
    url: URL,
    name: "Opportunity brief for Lorenza Volponi",
    about: { "@id": LORENZA_ENTITY_ID },
    mainEntity: { "@id": LORENZA_ENTITY_ID },
    inLanguage: "en",
  };

  return (
    <main lang="en" className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page).replace(/</g, "\\u003c") }} />

      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/work-with-lorenza" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold">
            <ArrowLeft className="h-4 w-4" /> Work with Lorenza
          </Link>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">asynchronous first</span>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-600">
            <FileText className="h-3.5 w-3.5" /> Qualified opportunity brief
          </div>
          <h1 className="mt-6 max-w-5xl font-serif text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] tracking-[-0.055em]">Give me the decision, not a sales preamble.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600 md:text-xl">
            This page turns a serious opportunity into enough context to evaluate it asynchronously. No form submission, no hidden CRM and no forced discovery call.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CopyTextButton text={briefTemplate} idleLabel="Copy brief template" copiedLabel="Brief copied" />
            <GrowthLink href={LORENZA_LINKEDIN} intent="consulting" placement="brief-hero-linkedin" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 text-xs font-black">
              Send it on LinkedIn <ArrowUpRight className="h-4 w-4" />
            </GrowthLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map(([title, text], index) => (
            <article key={title} className="rounded-[2rem] border border-zinc-200 bg-white p-6">
              <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">0{index + 1}</p>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.035em]">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-[#f4f4f1]">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
          <article className="rounded-[2rem] border border-zinc-200 bg-white p-7">
            <CheckCircle2 className="h-5 w-5" />
            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em]">What makes the brief useful</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600">Specific evidence, the real constraint, the decision owner, a meaningful outcome and enough context to reject a weak assumption early.</p>
          </article>
          <article className="rounded-[2rem] border border-zinc-200 bg-white p-7">
            <ShieldCheck className="h-5 w-5" />
            <h2 className="mt-5 text-3xl font-black tracking-[-0.04em]">Privacy boundary</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600">Nothing is submitted or stored by this page. The template is copied locally in your browser; you choose what to send and through which channel.</p>
          </article>
        </div>
      </section>

      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6 md:py-24">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-400">Serious opportunity</p>
          <h2 className="mx-auto mt-4 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">Context first. Then we decide if the work deserves to exist.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CopyTextButton text={briefTemplate} idleLabel="Copy brief template" copiedLabel="Brief copied" />
            <GrowthLink href={LORENZA_LINKEDIN} intent="consulting" placement="brief-bottom-linkedin" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-xs font-black text-zinc-950">
              Message Lorenza <ArrowUpRight className="h-4 w-4" />
            </GrowthLink>
          </div>
        </div>
      </section>
    </main>
  );
}
