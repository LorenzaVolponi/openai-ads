import Link from "next/link";

const links = [
  ["/en/chatgpt-ads", "ChatGPT Ads"],
  ["/en/chatgpt-ads-strategy", "Strategy"],
  ["/en/chatgpt-ads-for-agencies", "Agencies"],
  ["/en/chatgpt-ads-for-brands", "Brands"],
  ["/en/chatgpt-ads-partnerships", "Partnerships"],
  ["/en/geo-ai-strategy", "GEO"],
  ["/en/chatgpt-ads-consultant", "Consulting"],
  ["/en/press", "Press"],
  ["/en/partners", "Partner"],
  ["/en/lorenza-volponi", "Lorenza"],
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
    </>
  );
}
