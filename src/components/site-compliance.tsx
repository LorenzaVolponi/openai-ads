"use client";

import { usePathname } from "next/navigation";

export function SiteWatermark() {
  return <div className="brand-watermark" aria-hidden="true" />;
}

export function SiteComplianceStrip() {
  const pathname = usePathname();
  const english = pathname === "/en" || pathname.startsWith("/en/") || pathname === "/work-with-lorenza" || pathname.startsWith("/work-with-lorenza/");

  return (
    <aside
      className="relative z-40 border-t border-border bg-background/95 backdrop-blur"
      aria-label={english ? "Legal and editorial notices" : "Avisos legais e editoriais"}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 text-xs leading-relaxed text-muted-foreground md:grid-cols-[1fr_auto] md:items-center md:px-6">
        <p className="max-w-4xl">
          {english ? (
            <>
              <strong className="font-semibold text-foreground">Independent editorial project.</strong>{" "}
              This site is maintained by Lorenza Volponi / volponi.tech and is not affiliated with, sponsored by,
              certified by, endorsed by, operated by or maintained by OpenAI. OpenAI, ChatGPT, GPT and related marks
              belong to their respective owners. Content is informational and educational and does not constitute legal,
              financial or commercial advice.
            </>
          ) : (
            <>
              <strong className="font-semibold text-foreground">Projeto editorial independente.</strong>{" "}
              Este site é mantido por Lorenza Volponi / volponi.tech e não é afiliado, patrocinado,
              certificado, endossado, operado ou mantido pela OpenAI. OpenAI, ChatGPT, GPT e marcas
              relacionadas pertencem aos seus respectivos titulares. O conteúdo é exclusivamente
              informativo e educacional e não constitui aconselhamento jurídico, financeiro ou comercial.
            </>
          )}
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end" aria-label={english ? "Legal documents" : "Documentos legais"}>
          <a className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline" href="/privacidade">
            {english ? "Privacy & LGPD" : "Privacidade e LGPD"}
          </a>
          <a className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline" href="/termos">
            {english ? "Terms & disclaimer" : "Termos e isenção"}
          </a>
          <a className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline" href={english ? "/en/geo-ai-strategy" : "/metodologia"}>
            {english ? "Editorial methodology" : "Metodologia editorial"}
          </a>
        </nav>
      </div>
    </aside>
  );
}
