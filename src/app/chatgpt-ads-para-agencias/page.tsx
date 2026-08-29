import type { Metadata } from "next";

import { TopicArticle } from "@/components/topic-article";
import { SOURCES } from "@/lib/authority-data";
import { SITE_URL } from "@/lib/media-authority";
import { RADAR_SOURCES } from "@/lib/radar-data";
import { socialImageForPath } from "@/lib/seo";

const URL = `${SITE_URL}/chatgpt-ads-para-agencias`;
const SOCIAL_IMAGE = socialImageForPath("/chatgpt-ads-para-agencias");

export const metadata: Metadata = {
  title: "ChatGPT Ads para agências: playbook de operação, governança e piloto",
  description: "Playbook para agências operarem ChatGPT Ads com governança: elegibilidade, landing page, mensuração, piloto, reporting e critérios de escala.",
  alternates: { canonical: URL },
  openGraph: { title: "ChatGPT Ads para agências", description: "Da elegibilidade ao piloto: operação, governança, mensuração e escala.", url: URL, type: "article", images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "ChatGPT Ads para agências" }] },
  twitter: { card: "summary_large_image", title: "ChatGPT Ads para agências", description: "Playbook operacional e critérios de escala.", images: [SOCIAL_IMAGE] },
};

export default function ChatGPTAdsParaAgenciasPage() {
  return (
    <TopicArticle
      canonical={URL}
      eyebrow="Agency operating playbook · versão 2026"
      title="ChatGPT Ads para agências: transforme novidade em operação governada."
      description="O diferencial da agência não será apenas abrir campanha. Será traduzir produto beta em hipótese, instrumentação, evidência e decisão de investimento."
      summary="Comece confirmando elegibilidade e prontidão técnica, construa um piloto pequeno com conversão mensurável, reporte limites com transparência e escale somente depois de evidência de qualidade e incrementalidade."
      facts={[
        { label: "Brasil", value: "Available", note: "Status no snapshot oficial auditado; confirme a conta antes de vender operação." },
        { label: "Mínimo diário", value: "R$ 40", note: "Mínimo documentado por campanha no Brasil, não recomendação de orçamento total." },
        { label: "Compra", value: "CPM · CPC · oCPC", note: "Modelos documentados na configuração atual do produto." },
        { label: "Landing page", value: "Crawler-ready", note: "A página precisa permanecer acessível ao fluxo documentado de revisão." },
        { label: "Reporting", value: "Sem conversa do usuário", note: "Anunciantes recebem performance agregada, não chats ou memórias." },
        { label: "Escala", value: "Após evidência", note: "Beta e ausência de benchmarks universais exigem teste controlado." },
      ]}
      sections={[
        { title: "1. Qualificação antes da proposta", paragraphs: ["A agência deve validar mercado, acesso à conta, categoria permitida, objetivo, landing page e capacidade de mensuração antes de prometer prazo ou volume.", "Disponibilidade do país não garante que toda conta tenha o mesmo fluxo, inventário ou recurso. A proposta comercial precisa registrar essa dependência explicitamente."], bullets: ["Confirmar país e acesso ao Ads Manager.", "Revisar políticas e categoria do anunciante.", "Validar domínio, oferta e página de destino.", "Mapear evento de conversão e fonte de verdade.", "Definir responsável por aprovação e incidentes."] },
        { title: "2. Arquitetura do piloto", paragraphs: ["O piloto deve responder a uma hipótese, não apenas gerar primeiras impressões. Escolha uma oferta compreensível, uma conversão verificável e um recorte de contexto suficientemente claro.", "Use orçamento compatível com aprendizado, mas não confunda o mínimo diário documentado com orçamento estatisticamente suficiente. O volume necessário depende da taxa de evento e da variabilidade do negócio."], bullets: ["Uma hipótese de contexto por conjunto de teste.", "Poucas variações com diferença interpretável.", "UTMs e eventos validados antes da ativação.", "Janela de aprendizado e regra de interrupção.", "Registro do estado da plataforma na data do teste."] },
        { title: "3. Reporting que protege confiança", paragraphs: ["Separe métricas entregues pela plataforma, dados próprios do cliente e interpretações da agência. Atribuição, estimativa e causalidade não podem aparecer como sinônimos.", "O relatório deve destacar limitações do beta, mudanças de produto, qualidade do tráfego, conversões reconciliadas e decisões recomendadas. Transparência é parte do produto da agência."] },
        { title: "4. Critérios de escala", paragraphs: ["Escalar significa aumentar investimento sem destruir qualidade marginal. Exija sinais consistentes de aderência, conversão, economia unitária e capacidade operacional do cliente.", "Quando o resultado não sustenta escala, a decisão correta pode ser reformular oferta, página, mensuração ou contexto — e não simplesmente elevar lance."], bullets: ["CPA ou custo por resultado dentro do limite econômico.", "Qualidade de lead ou receita reconciliada.", "Estabilidade mínima em mais de uma janela.", "Sem regressão material na experiência da landing page.", "Plano de contingência para mudanças da plataforma."] },
      ]}
      sources={[SOURCES.availability, SOURCES.campaignSetup, SOURCES.adsBasics, SOURCES.generalAds, RADAR_SOURCES.faq]}
      related={[
        { label: "Como anunciar no ChatGPT", href: "/como-anunciar-no-chatgpt" },
        { label: "Market Snapshot", href: "/chatgpt-ads-market" },
        { label: "ChatGPT Ads vs Google Ads", href: "/chatgpt-ads-vs-google-ads" },
        { label: "ChatGPT Ads vs Meta Ads", href: "/chatgpt-ads-vs-meta-ads" },
        { label: "Crawler readiness", href: "/oai-adsbot-searchbot" },
      ]}
    />
  );
}
