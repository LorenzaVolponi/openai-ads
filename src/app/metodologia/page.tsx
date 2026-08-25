import type { Metadata } from "next";
import { LegalDocument, LegalSection } from "@/components/legal-document";

const URL = "https://openai-ads.volponi.tech/metodologia";

export const metadata: Metadata = {
  title: "Metodologia Editorial e Fontes | Lorenza Volponi",
  description:
    "Metodologia de auditoria factual, atualização, fontes primárias e critérios editoriais do guia independente sobre publicidade no ChatGPT.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

const sources = [
  {
    label: "OpenAI Help Center — Anúncios no ChatGPT",
    href: "https://help.openai.com/pt-br/articles/20001047-ads-in-chatgpt",
  },
  {
    label: "OpenAI — Testando anúncios no ChatGPT",
    href: "https://openai.com/pt-BR/index/testing-ads-in-chatgpt/",
  },
  {
    label: "OpenAI — Políticas de anúncios",
    href: "https://openai.com/policies/ad-policies/",
  },
  {
    label: "OpenAI — Diretrizes de marca",
    href: "https://openai.com/pt-BR/brand/",
  },
  {
    label: "ANPD — Aviso de Privacidade e referências LGPD",
    href: "https://www.gov.br/anpd/pt-br/acesso-a-informacao/aviso-de-privacidade",
  },
];

export default function MethodologyPage() {
  return (
    <LegalDocument
      eyebrow="Auditoria factual"
      title="Metodologia editorial"
      description="Como o guia decide o que publicar, o que recusar, quais fontes priorizar e como sinalizar mudanças de produto."
      updatedAt="25 de agosto de 2026"
    >
      <LegalSection title="1. Fonte primária antes de opinião">
        <p>
          Afirmações sobre disponibilidade, planos, privacidade, publicidade, políticas e operação são
          verificadas prioritariamente em documentação oficial da OpenAI e, quando o tema é regulatório ou
          de privacidade no Brasil, em fontes oficiais brasileiras. Conteúdo de terceiros pode ajudar a
          localizar um tema, mas não é promovido a “fonte de verdade” sem validação.
        </p>
      </LegalSection>

      <LegalSection title="2. Estado factual em 25 de agosto de 2026">
        <p>
          A revisão atual registra que anúncios podem aparecer nos planos Free e Go; Plus, Pro, Business,
          Enterprise e Edu permanecem sem anúncios. A OpenAI informa que anúncios não influenciam as
          respostas, ficam separados da resposta do assistente e que conversas não são disponibilizadas aos
          anunciantes nem dados de usuários são vendidos a anunciantes.
        </p>
        <p>
          A OpenAI informou em 11 de agosto de 2026 que ChatGPT Ads havia sido lançado no Brasil, Reino
          Unido, México, Japão e Coreia do Sul, além da expansão iniciada anteriormente nos Estados Unidos.
          A disponibilidade de ferramentas para anunciantes continua sujeita a mercado, conta e estágio de
          produto; por isso este guia não trata todo recurso comercial como universal.
        </p>
      </LegalSection>

      <LegalSection title="3. O que este guia não faz">
        <p>
          Não inventa benchmark universal de CPC, CPM ou CTR; não presume uma API pública genérica de
          anúncios; não transforma recursos de beta ou acesso restrito em disponibilidade geral; não usa
          screenshots isolados como prova definitiva; e não apresenta opinião como declaração oficial da
          OpenAI.
        </p>
      </LegalSection>

      <LegalSection title="4. Atualização e datação">
        <p>
          Informações sensíveis ao tempo recebem data de revisão. Quando uma fonte oficial muda, a regra é
          atualizar o conteúdo, a FAQ, o material para crawlers de IA e os metadados relacionados. Datas de
          “última revisão” não devem ser alteradas sem revisão material correspondente.
        </p>
      </LegalSection>

      <LegalSection title="5. GEO / AI discovery responsável">
        <p>
          O site disponibiliza conteúdo semântico, sitemap, robots, dados estruturados e arquivos llms.txt
          para facilitar descoberta por mecanismos de busca e sistemas de IA. Esses mecanismos não são
          usados para esconder autoria, criar autoridade falsa, keyword stuffing ou simular afiliação com
          a OpenAI. A prioridade é tornar autoria, independência, fonte e data fáceis de verificar.
        </p>
      </LegalSection>

      <LegalSection title="6. Fontes primárias desta revisão">
        <ul className="space-y-3">
          {sources.map((source) => (
            <li key={source.href}>
              <a className="text-primary underline underline-offset-4" href={source.href} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="7. Autoria e correções">
        <p>
          Autoria: Lorenza Volponi — volponi.tech. Sugestões de correção podem ser enviadas pelos canais
          públicos disponíveis em <a className="text-primary underline" href="https://volponi.tech" target="_blank" rel="noopener noreferrer">volponi.tech</a>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
