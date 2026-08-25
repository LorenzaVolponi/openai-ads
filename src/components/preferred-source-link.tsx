import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";

const PREFERRED_SOURCE_URL =
  "https://www.google.com/preferences/source?q=openai-ads.volponi.tech";

export function PreferredSourceLink({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Button asChild variant="outline">
        <a
          href={PREFERRED_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Adicionar openai-ads.volponi.tech como fonte preferida no Google"
        >
          <Star className="mr-2 h-4 w-4" /> Fonte preferida no Google
        </a>
      </Button>
      <p className="mt-2 max-w-md text-xs leading-5 text-muted-foreground">
        Abre a ferramenta oficial do Google somente quando você clicar. Este site não carrega o script do Google automaticamente.
      </p>
    </div>
  );
}
