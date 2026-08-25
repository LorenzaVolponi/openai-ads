export function SiteWatermark() {
  return <div className="brand-watermark" aria-hidden="true" />;
}

export function SiteComplianceStrip() {
  return (
    <aside className="relative z-40 border-t border-border bg-background/95 backdrop-blur" aria-label="Avisos legais e editoriais">
      <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 text-xs leading-relaxed text-muted-foreground md:grid-cols-[1fr_auto] md:items-center md:px-6">
        <p className="max-w-4xl">
          <strong className="font-semibold text-foreground">Projeto editorial independente.</strong>{" "}
          Este site é mantido por Lorenza Volponi / volponi.tech e não é afiliado, patrocinado,
          certificado, endossado, operado ou mantido pela OpenAI. OpenAI, ChatGPT, GPT e marcas
          relacionadas pertencem aos seus respectivos titulares. O conteúdo é exclusivamente
          informativo e educacional e não constitui aconselhamento jurídico, financeiro ou comercial.
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end" aria-label="Documentos legais">
          <a className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline" href="/privacidade">
            Privacidade e LGPD
          </a>
          <a className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline" href="/termos">
            Termos e isenção
          </a>
          <a className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline" href="/metodologia">
            Metodologia editorial
          </a>
        </nav>
      </div>
    </aside>
  );
}
