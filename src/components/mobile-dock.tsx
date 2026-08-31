"use client";

import { useEffect, useState } from "react";
import { BarChart3, BookOpen, MessageCircle, RadioTower, WandSparkles } from "lucide-react";

const items = [
  { id: "como-aparece", label: "Aprender", icon: BookOpen },
  { id: "review", label: "Revisar", icon: WandSparkles },
  { id: "dados", label: "Dados", icon: BarChart3 },
] as const;

export function MobileDock() {
  const [active, setActive] = useState<string>("como-aparece");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.65] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const openAssistant = () => {
    window.dispatchEvent(new Event("volponi:assistant-open"));
  };

  return (
    <nav
      aria-label="Navegação rápida no celular"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/96 px-2 pb-[calc(0.45rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_36px_rgba(0,0,0,.06)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const selected = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={selected ? "location" : undefined}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold transition ${selected ? "bg-zinc-950 text-white" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"}`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </a>
          );
        })}

        <a
          href="/radar"
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
        >
          <RadioTower className="h-4 w-4" />
          Radar
        </a>

        <button
          type="button"
          onClick={openAssistant}
          className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl bg-zinc-100 px-1 text-[10px] font-bold text-zinc-950 transition hover:bg-zinc-200"
        >
          <MessageCircle className="h-4 w-4" />
          Raposa
        </button>
      </div>
    </nav>
  );
}
