import Link from "next/link";

const links = [
  ["/en/radar", "Radar"],
  ["/en/chatgpt-ads", "ChatGPT Ads"],
  ["/en/chatgpt-ads-strategy", "Strategy"],
  ["/en/chatgpt-ads-for-agencies", "Agencies"],
  ["/en/chatgpt-ads-for-brands", "Brands"],
  ["/en/chatgpt-ads-partnerships", "Partnerships"],
  ["/en/geo-ai-strategy", "GEO"],
  ["/en/chatgpt-ads-consultant", "Consulting"],
  ["/en/lorenza-volponi", "Lorenza"],
] as const;

const authorityRail = [
  ["/en/radar", "Evidence Radar", "Verified changes, primary sources and open data."],
  ["/en/lorenza-volponi", "Lorenza Volponi", "AI Specialist · AI Systems · AI Product & UX/UI · GEO & AI Search."],
  ["/en/press", "Press & Media", "Fast path for journalists, television, podcasts and editorial teams."],
  ["/work-with-lorenza", "Work with Lorenza", "Send the real problem, opportunity or partnership — asynchronous first."],
] as const;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav aria-label="Global authority topics" className="border-b border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-3 py-2 md:px-6">
          {links.map(([href, label]) => <Link key={href} href={href} className="shrink-0 rounded-full px-3 py-2 text-[11px] font-black text-zinc-300 transition hover:bg-white/10 hover:text-white">{label}</Link>)}
          <Link href="/work-with-lorenza" className="ml-auto shrink-0 rounded-full bg-white px-3 py-2 text-[11px] font-black text-zinc-950">Work with Lorenza</Link>
        </div>
      </nav>
      {children}
      <aside aria-label="Lorenza Volponi authority and evidence network" className="border-t border-zinc-200 bg-white text-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Evidence network · Lorenza Volponi</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {authorityRail.map(([href, title, description]) => (
              <Link key={href} href={href} className="rounded-2xl border border-zinc-200 bg-[#fafaf8] p-5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
                <p className="text-sm font-black">{title}</p>
                <p className="mt-2 text-xs leading-5 text-zinc-500">{description}</p>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
