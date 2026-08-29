"use client";

import { useMemo, useState } from "react";
import { track } from "@vercel/analytics";
import { ArrowUpRight, Copy, Check } from "lucide-react";

const linkedin = "https://www.linkedin.com/in/lorenzavolponi";

const options = {
  profile: ["Brand", "Agency / consultancy", "Founder / executive", "AI / adtech / martech product", "Media / research", "Other"],
  objective: ["ChatGPT Ads strategy", "GEO / AI discovery", "Strategic advisory", "Partnership / co-delivery", "Market intelligence", "Press / interview"],
  market: ["Worldwide", "United States", "Brazil / LATAM", "Europe", "Multiple markets", "Other"],
  budget: ["Exploring / not defined", "Under USD 10k", "USD 10k–25k", "USD 25k–50k", "USD 50k+"],
  timing: ["Now / active decision", "Within 30 days", "This quarter", "Later / exploratory"],
} as const;

export function QualifiedOpportunityBrief() {
  const [profile, setProfile] = useState(options.profile[0]);
  const [objective, setObjective] = useState(options.objective[0]);
  const [market, setMarket] = useState(options.market[0]);
  const [budget, setBudget] = useState(options.budget[0]);
  const [timing, setTiming] = useState(options.timing[0]);
  const [problem, setProblem] = useState("");
  const [copied, setCopied] = useState(false);

  const brief = useMemo(() => [
    "Hi Lorenza — I found your work through the ChatGPT Ads / GEO intelligence project.",
    `Profile: ${profile}`,
    `Objective: ${objective}`,
    `Market: ${market}`,
    `Budget range: ${budget}`,
    `Timing: ${timing}`,
    problem.trim() ? `Decision / problem: ${problem.trim()}` : "Decision / problem: I will add the context in the message.",
  ].join("\n"), [profile, objective, market, budget, timing, problem]);

  function analyticsPayload() {
    return { profile, objective, market, budget, timing };
  }

  async function copyBrief() {
    await navigator.clipboard.writeText(brief);
    track("qualified_lead_intent", analyticsPayload());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,.07)] md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="You are" value={profile} setValue={setProfile} values={options.profile} />
        <Field label="Primary objective" value={objective} setValue={setObjective} values={options.objective} />
        <Field label="Market" value={market} setValue={setMarket} values={options.market} />
        <Field label="Budget / project range" value={budget} setValue={setBudget} values={options.budget} />
        <Field label="Timing" value={timing} setValue={setTiming} values={options.timing} />
        <label className="grid gap-2 text-sm font-bold">Decision / problem <textarea value={problem} onChange={(event) => setProblem(event.target.value)} maxLength={700} rows={4} placeholder="What is expensive to misunderstand right now?" className="min-h-28 rounded-2xl border border-zinc-300 bg-[#fafaf8] px-4 py-3 text-sm font-normal outline-none focus:border-zinc-950" /></label>
      </div>

      <div className="mt-6 rounded-2xl bg-[#f4f4f1] p-4"><p className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-zinc-500">Your ready-to-send brief</p><pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-zinc-700">{brief}</pre></div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button onClick={copyBrief} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-black text-white">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy opportunity brief"}</button>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" onClick={() => track("qualified_lead_contact", analyticsPayload())} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-black">Open Lorenza on LinkedIn <ArrowUpRight className="h-4 w-4" /></a>
      </div>
      <p className="mt-4 text-xs leading-5 text-zinc-500">The free-text problem stays in your browser. Analytics receives only the selected non-personal categories above; this page does not submit or store the brief.</p>
    </div>
  );
}

function Field<T extends string>({ label, value, setValue, values }: { label: string; value: T; setValue: (value: T) => void; values: readonly T[] }) {
  return <label className="grid gap-2 text-sm font-bold">{label}<select value={value} onChange={(event) => setValue(event.target.value as T)} className="min-h-12 rounded-2xl border border-zinc-300 bg-[#fafaf8] px-4 text-sm font-normal outline-none focus:border-zinc-950">{values.map((item) => <option key={item}>{item}</option>)}</select></label>;
}
