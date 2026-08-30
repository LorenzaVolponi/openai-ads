import Link from "next/link";
import { ArrowUpRight, Network } from "lucide-react";

import { getRelatedSemanticDocuments, type SemanticLanguage } from "@/lib/semantic-discovery";
import { SITE_URL } from "@/lib/media-authority";

export function SemanticRelatedLinks({
  currentPath,
  language,
  limit = 5,
}: {
  currentPath: string;
  language: SemanticLanguage;
  limit?: number;
}) {
  const related = getRelatedSemanticDocuments(currentPath, limit, language);
  if (!related.length) return null;

  const isEnglish = language === "en";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${currentPath}#semantic-related`,
    name: isEnglish ? "Semantically related intelligence" : "Conteúdo semanticamente relacionado",
    itemListElement: related.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}${item.path}`,
      name: item.title,
    })),
  };

  return (
    <section aria-label={isEnglish ? "Related intelligence" : "Conteúdo relacionado"} className="border-t border-zinc-200 bg-[#f7f7f5]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">
          <Network className="h-4 w-4" /> {isEnglish ? "Semantic discovery" : "Descoberta semântica"}
        </div>
        <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.04em] text-zinc-950 md:text-4xl">
          {isEnglish ? "Continue by meaning, not by menu." : "Continue pelo significado, não pelo menu."}
        </h2>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {related.map((item) => (
            <Link key={item.path} href={item.path} className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
              <p className="text-sm font-black leading-5 text-zinc-950">{item.title}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-500">{item.description}</p>
              <div className="mt-4 flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                <span>{item.sharedTopics.slice(0, 2).join(" · ")}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
