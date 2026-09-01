import { AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";

import { buildSourceLifecycle } from "@/lib/source-lifecycle";

type FreshnessStatusProps = {
  language?: "pt-BR" | "en";
  dark?: boolean;
};

export function FreshnessStatus({ language = "pt-BR", dark = false }: FreshnessStatusProps) {
  const freshness = buildSourceLifecycle(new Date());
  const due = freshness.summary.reviewDueSources > 0;
  const Icon = due ? AlertTriangle : CheckCircle2;
  const copy = language === "en"
    ? {
        label: due ? "operational recheck recommended" : "inside editorial review window",
        detail: due
          ? `${freshness.summary.reviewDueSources} mutable source(s) reached the configured editorial recheck window. The published snapshot remains preserved historical evidence.`
          : "Mutable sources are still inside the configured editorial review window for this published snapshot.",
        link: "Freshness status",
      }
    : {
        label: due ? "rechecagem operacional recomendada" : "dentro da janela editorial",
        detail: due
          ? `${freshness.summary.reviewDueSources} fonte(s) mutável(is) atingiram a janela configurada de rechecagem editorial. O snapshot publicado continua preservado como evidência histórica.`
          : "As fontes mutáveis ainda estão dentro da janela editorial configurada para este snapshot publicado.",
        link: "Status de atualização",
      };

  return (
    <div
      className={
        dark
          ? "mt-5 max-w-3xl rounded-2xl border border-white/15 bg-white/[0.06] p-4"
          : "mt-5 max-w-3xl rounded-2xl border border-zinc-200 bg-zinc-50 p-4"
      }
    >
      <div className="flex items-start gap-3">
        <Icon className={dark ? "mt-0.5 h-4 w-4 shrink-0 text-zinc-200" : "mt-0.5 h-4 w-4 shrink-0 text-zinc-700"} />
        <div>
          <p className={dark ? "text-xs font-black uppercase tracking-[0.12em] text-zinc-200" : "text-xs font-black uppercase tracking-[0.12em] text-zinc-700"}>
            {copy.label}
          </p>
          <p className={dark ? "mt-2 text-sm leading-6 text-zinc-300" : "mt-2 text-sm leading-6 text-zinc-600"}>
            {copy.detail}
          </p>
          <a
            href="/freshness.json"
            className={dark ? "mt-3 inline-flex min-h-10 items-center gap-2 text-xs font-bold text-white underline underline-offset-4" : "mt-3 inline-flex min-h-10 items-center gap-2 text-xs font-bold text-zinc-950 underline underline-offset-4"}
          >
            <RefreshCw className="h-3.5 w-3.5" /> {copy.link}
          </a>
        </div>
      </div>
    </div>
  );
}
