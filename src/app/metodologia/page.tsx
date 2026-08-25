import type { Metadata } from "next";
import { LegalDocument, LegalSection } from "@/components/legal-document";
import { LAST_EDITORIAL_REVIEW_DATE } from "@/lib/editorial-meta";

const URL = "https://openai-ads.volponi.tech/metodologia";

export const metadata: Metadata = {
  title: "Metodologia Editorial e Fontes | Lorenza Volponi",
  description:
    "Metodologia de auditoria factual, atualização, monitoramento de fontes primárias e critérios editoriais do guia independente sobre publicidade no ChatGPT.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

const sources = [
  {
    label: "OpenAI Help Center — Anúncios no ChatGPT",
    href: "https://help.openai.com/pt-br/articles/20001047-ads-in-chatgpt",
  },
  {
    label: "OpenAI Help Center — Ads Manager Availability",
    href: "https://help.openai.com/en/articles/20001245-ads-manager-availability",
  },
  {
    label: "OpenAI — Testando anúncios no ChatGPT",
    href: "https://openai.com/pt-BR/index/testing-ads-in-chatgpt/",
  },
  {
    label: "OpenAI — New ways to buy ChatGPT ads",
    href: "https://openai.com/index/new-ways-to-buy-chatgpt-ads/",
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

      <LegalSection title="2. Estado factual da revisão atual">
        <p>
          A revisão editorial registrada em {LAST_EDITORIAL_REVIEW_DATE} mantém cada afirmação sensível ao
          tempo ligada a uma fonte primária e a uma data. Disponibilidade, mercados, recursos do Ads Manager,
          modelos de compra, métricas e controles de privacidade podem mudar rapidamente e devem ser
          rechecados antes de uma decisão operacional.
        </p>
        <p>
          O guia separa escala do ChatGPT de alcance publicitário, orientação de lance de benchmark de
          performance e anúncio oficial de disponibilidade efetiva. Essa separação é parte da metodologia,
          não apenas uma observação de rodapé.
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

      <LegalSection title="4. Monitoramento, revisão e publicação">
        <p>
          Um workflow diário no repositório monitora assinaturas de trechos relevantes das principais fontes
          oficiais usadas pelo Radar. Quando uma assinatura muda, o sistema abre ou atualiza uma pendência
          editorial com a fonte, o fingerprint anterior, o novo fingerprint e um trecho para triagem.
        </p>
        <p className="font-medium text-foreground">
          Detecção automática não significa publicação automática. Nenhum fato novo entra no Radar apenas
          porque uma página mudou: a alteração precisa ser interpretada e revisada antes de virar conteúdo.
        </p>
        <p>
          O RSS e o JSON Feed são gerados da mesma lista de eventos do Radar. A data de build do feed é
          derivada do evento mais recente, em vez de avançar artificialmente todos os dias. Se nenhuma
          mudança editorial for publicada, o feed não finge novidade.
        </p>
      </LegalSection>

      <LegalSection title="5. GEO / AI discovery responsável">
        <p>
          O site disponibiliza conteúdo semântico, sitemap, robots, dados estruturados, RSS, JSON Feed e
          arquivos llms.txt para facilitar descoberta por mecanismos de busca, leitores de feed, agentes e
          sistemas de IA. Esses mecanismos não são usados para esconder autoria, criar autoridade falsa,
          keyword stuffing ou simular afiliação com a OpenAI. A prioridade é tornar autoria, independência,
          fonte, data e ressalvas fáceis de verificar.
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
