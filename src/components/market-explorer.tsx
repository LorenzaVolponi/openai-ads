"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { marketStates } from "@/lib/radar-data";

type StatusFilter = "all" | "Available" | "Coming Soon";

export function MarketExplorer() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return marketStates.filter((market) => {
      const matchesQuery = !normalized || market.country.toLowerCase().includes(normalized) || market.code.toLowerCase().includes(normalized);
      const matchesStatus = status === "all" || market.adsManager === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div>
      <div className="grid gap-3 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto]">
        <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-zinc-200 px-4">
          <Search className="h-4 w-4 text-zinc-400" />
          <span className="sr-only">Buscar mercado</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque país ou código" className="w-full bg-transparent text-sm outline-none" />
        </label>
        <div className="flex flex-wrap gap-2" aria-label="Filtrar por status">
          {(["all", "Available", "Coming Soon"] as StatusFilter[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value)}
              className={`min-h-12 rounded-2xl px-4 text-xs font-black transition ${status === value ? "bg-zinc-950 text-white" : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"}`}
            >
              {value === "all" ? "Todos" : value}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs font-semibold text-zinc-500">{filtered.length} mercados encontrados</p>

      <div className="mt-4 overflow-hidden rounded-3xl border border-zinc-200 bg-white">
        <div className="hidden grid-cols-[0.18fr_0.42fr_0.25fr_0.15fr] gap-4 border-b border-zinc-200 bg-zinc-50 px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500 md:grid">
          <span>Código</span><span>Mercado</span><span>Ads Manager</span><span>Revisão</span>
        </div>
        <div className="divide-y divide-zinc-200">
          {filtered.map((market) => (
            <a key={market.code} href={market.source} target="_blank" rel="noopener noreferrer" className="grid gap-2 px-5 py-4 transition hover:bg-zinc-50 md:grid-cols-[0.18fr_0.42fr_0.25fr_0.15fr] md:items-center md:gap-4">
              <span className="font-mono text-xs font-black">{market.code}</span>
              <span className="text-sm font-bold">{market.country}</span>
              <span className={`w-fit rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${market.adsManager === "Available" ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-700"}`}>{market.adsManager}</span>
              <span className="text-xs text-zinc-500">{market.checkedAt}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
