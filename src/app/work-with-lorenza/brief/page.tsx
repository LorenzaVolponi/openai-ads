import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import { QualifiedOpportunityBrief } from "@/components/qualified-opportunity-brief";
import { SITE_URL } from "@/lib/media-authority";

const URL = `${SITE_URL}/work-with-lorenza/brief`;

export const metadata: Metadata = {
  title: "Start with a Qualified Brief — Lorenza Volponi",
  description: "Structure a commercial, advisory, partnership or media opportunity for Lorenza Volponi before starting the conversation.",
  alternates: { canonical: URL },
};

export default function QualifiedBriefPage() {
  return (
    <main lang="en" className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white"><div className="mx-auto flex min-h-16 max-w-7xl items-center px-4 md:px-6"><Link href="/work-with-lorenza" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold"><ArrowLeft className="h-4 w-4" /> Work with Lorenza</Link></div></header>
      <section className="border-b border-zinc-200 bg-white"><div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20"><p className="font-mono text-[11px] font-black uppercase tracking-[0.18em] text-zinc-500">Qualified opportunity brief</p><h1 className="mt-5 max-w-6xl font-serif text-[clamp(3.4rem,8vw,7rem)] leading-[0.9] tracking-[-0.055em]">Skip the vague hello. Bring the decision.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600">Use the structure below to turn a discovery click into a useful commercial conversation — whether the opportunity is advisory, ChatGPT Ads, GEO, partnership, market intelligence or press.</p></div></section>
      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16"><QualifiedOpportunityBrief /><div className="mt-6 flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-5 text-sm leading-6 text-zinc-600"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" /><p>This qualifier is intentionally privacy-light. It does not create an account, upload the free-text brief or pretend a click is a lead. Contact only happens when you choose to message Lorenza.</p></div></section>
    </main>
  );
}
