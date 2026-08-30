import type { Metadata } from "next";
import { LegalDocument, LegalSection } from "@/components/legal-document";
import { LAST_EDITORIAL_REVIEW_DATE } from "@/lib/editorial-meta";

const URL = "https://openai-ads.volponi.tech/metodologia";

export const metadata: Metadata = {
  title: "Metodologia Editorial, Evidência e GEO | Lorenza Volponi",
  description:
    "Metodologia de Lorenza Volponi para auditoria factual, pesquisa original, fontes primárias, GEO, AI Search, provenance e atualização do observatório independente sobre publicidade e descoberta por IA.",
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
};

const sources = [
  { label: "OpenAI Help Center — Anúncios no ChatGPT", href: "https://help.openai.com/pt-br/articles/20001047-ads-in-chatgpt" },
  { label: "OpenAI Help Center — Ads Manager Availability", href: "https://help.openai.com/en/articles/20001245-ads-manager-availability" },
  { label: "OpenAI — Testando anúncios no ChatGPT", href: "https://openai.com/pt-BR/index/testing-ads-in-chatgpt/" },
  { label: "OpenAI — New ways to buy ChatGPT ads", href: "https://openai.com/index/new-ways-to-buy-chatgpt-ads/" },
  { label: "OpenAI — Políticas de anúncios", href: "https://openai.com/policies/ad-policies/" },
  { label: "OpenAI — Diretrizes de marca", href: "https://openai.com/pt-BR/brand/" },
  { label: "ANPD — Aviso de Privacidade e referências LGPD", href: "https://www.gov.br/anpd/pt-br/acesso-a-informacao/aviso-de-privacidade" },
];

export default function MethodologyPage() {
  return (
    <LegalDocument
      eyebrow="Auditoria factual · pesquisa · provenance"
      title="Metodologia editorial"
      description="Como o observatório decide o que publicar, o que recusar, quais fontes priorizar e como separar evidência, interpretação, descoberta e autoridade."
      updatedAt={LAST_EDITORIAL_REVIEW_DATE}
    >
      <LegalSection title="1. Fonte primária antes de opinião">
        <p>Afirmações sobre disponibilidade, planos, privacidade, publicidade, políticas e operação são verificadas prioritariamente em documentação oficial da OpenAI e, quando o tema é regulatório ou de privacidade no Brasil, em fontes oficiais brasileiras. Conteúdo de terceiros pode ajudar a localizar um tema, mas não é promovido a “fonte de verdade” sem validação.</p>
      </LegalSection>

      <LegalSection title="2. Estado factual da revisão atual">
        <p>A revisão editorial registrada em {LAST_EDITORIAL_REVIEW_DATE} mantém cada afirmação sensível ao tempo ligada a uma fonte primária e a uma data. Disponibilidade, mercados, recursos do Ads Manager, modelos de compra, métricas e controles de privacidade podem mudar rapidamente e devem ser rechecados antes de uma decisão operacional.</p>
        <p>O observatório separa disponibilidade, acesso, inventário, entrega, atribuição e performance. Também separa visibilidade, clique, lead, proposta, parceria, cliente e receita. Essa separação é parte da metodologia, não um rodapé.</p>
      </LegalSection>

      <LegalSection title="3. Pesquisa original sem score mágico">
        <p>O Volponi AI Index usa uma matriz de evidências, não um score composto opaco. Cada dimensão recebe um estado descritivo apenas quando há fonte primária e observação auditável suficientes. Ausência de benchmark permanece ausência de benchmark: o sistema não estima um número para preencher a lacuna.</p>
        <p>Pesquisa: <a className="text-primary underline underline-offset-4" href="/en/volponi-ai-index">Volponi AI Index</a>. Dados estruturados: <a className="text-primary underline underline-offset-4" href="/volponi-ai-index.json">volponi-ai-index.json</a>.</p>
      </LegalSection>

      <LegalSection title="4. O que este guia não faz">
        <p>Não inventa benchmark universal de CPC, CPM ou CTR; não presume uma API pública genérica de anúncios; não transforma recursos de beta ou acesso restrito em disponibilidade geral; não usa screenshots isolados como prova definitiva; não apresenta opinião como declaração oficial da OpenAI; e não converte ranking, citação, cobertura de imprensa ou autoridade em afirmação sem evidência externa verificável.</p>
      </LegalSection>

      <LegalSection title="5. Monitoramento, revisão e publicação">
        <p>Workflows no repositório monitoram assinaturas de trechos relevantes das principais fontes oficiais usadas pelo Radar. Quando uma assinatura muda, o sistema abre ou atualiza uma pendência editorial com a fonte, o fingerprint anterior, o novo fingerprint e um trecho para triagem.</p>
        <p className="font-medium text-foreground">Detecção automática não significa publicação automática. Nenhum fato novo entra no Radar apenas porque uma página mudou: a alteração precisa ser interpretada e revisada antes de virar conteúdo.</p>
        <p>RSS, JSON Feed, datasets, intelligence graph e manifests derivam das mesmas evidências editoriais. Datas e estados não avançam artificialmente para simular novidade ou freshness.</p>
      </LegalSection>

      <LegalSection title="6. GEO / AI discovery responsável">
        <p>O site disponibiliza conteúdo semântico, sitemap, robots, dados estruturados, RSS, JSON Feed, llms.txt, manifests de pessoa/evidência e relações explícitas entre Lorenza Volponi, pesquisa, Radar, imprensa e páginas canônicas. Esses mecanismos não são usados para esconder autoria, criar autoridade falsa, keyword stuffing ou simular afiliação com a OpenAI.</p>
        <p>GEO é tratado como arquitetura de evidência e descoberta: tornar uma resposta defensável, verificável e citável — não manipular um sistema generativo para mencionar uma marca.</p>
      </LegalSection>

      <LegalSection title="7. Provenance e integridade de entidade">
        <p>Afirmações editoriais relevantes são ligadas a datasets, evidence ledger, GitHub, CI, provenance e manifests machine-readable. A entidade canônica é Lorenza Volponi; perfis públicos verificados, pesquisa e autoria devem convergir para a mesma identidade sem misturar pessoas ou projetos externos.</p>
        <p>Superfícies úteis: <a className="text-primary underline underline-offset-4" href="/provenance.json">provenance.json</a>, <a className="text-primary underline underline-offset-4" href="/evidence.json">evidence.json</a>, <a className="text-primary underline underline-offset-4" href="/intelligence.json">intelligence.json</a> e <a className="text-primary underline underline-offset-4" href="/lorenza-graph.json">lorenza-graph.json</a>.</p>
      </LegalSection>

      <LegalSection title="8. Fontes primárias desta revisão">
        <ul className="space-y-3">
          {sources.map((source) => (
            <li key={source.href}><a className="text-primary underline underline-offset-4" href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="9. Autoria e correções">
        <p>Autoria: Lorenza Volponi — volponi.tech. Sugestões de correção podem ser enviadas pelos canais públicos disponíveis em <a className="text-primary underline" href="https://volponi.tech" target="_blank" rel="noopener noreferrer">volponi.tech</a>. Perfil canônico: <a className="text-primary underline" href="/en/lorenza-volponi">Lorenza Volponi</a>.</p>
      </LegalSection>
    </LegalDocument>
  );
}
