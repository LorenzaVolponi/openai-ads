import type { Metadata } from "next";

import { TopicArticle } from "@/components/topic-article";
import { SOURCES } from "@/lib/authority-data";
import { SITE_URL } from "@/lib/media-authority";
import { RADAR_SOURCES } from "@/lib/radar-data";
import { socialImageForPath } from "@/lib/seo";

const URL = `${SITE_URL}/chatgpt-ads-vs-meta-ads`;
const SOCIAL_IMAGE = socialImageForPath("/chatgpt-ads-vs-meta-ads");

export const metadata: Metadata = {
  title: "ChatGPT Ads vs Meta Ads: conversa, descoberta, criativo e mensuração",
  description: "Comparação estratégica entre ChatGPT Ads e Meta Ads: contexto conversacional, descoberta em feed, criativos, funil e desenho de testes.",
  alternates: { canonical: URL },
  openGraph: { title: "ChatGPT Ads vs Meta Ads", description: "Conversa contextual e descoberta criativa: como decidir o papel de cada canal.", url: URL, type: "article", images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "ChatGPT Ads vs Meta Ads" }] },
  twitter: { card: "summary_large_image", title: "ChatGPT Ads vs Meta Ads", description: "Diferenças estratégicas e complementaridade.", images: [SOCIAL_IMAGE] },
};

export default function ChatGPTAdsVsMetaAdsPage() {
  return (
    <TopicArticle
      canonical={URL}
      eyebrow="Comparativo estratégico · conversa vs descoberta"
      title="ChatGPT Ads vs Meta Ads: dois mecanismos diferentes de ganhar atenção."
      description="Em vez de copiar uma campanha de feed para uma conversa, a comparação deve separar descoberta visual, contexto textual, intenção e prova de valor."
      summary="Meta Ads opera fortemente em ambientes de descoberta e criatividade; ChatGPT Ads entra em um contexto conversacional. O melhor desenho usa criativos e hipóteses próprios para cada superfície e mede resultado incremental."
      facts={[
        { label: "Ambiente", value: "Conversa", note: "ChatGPT Ads aparece associado a um contexto conversacional e abaixo da resposta." },
        { label: "Descoberta", value: "Feed e superfícies sociais", note: "Campanhas sociais frequentemente disputam atenção antes de uma intenção explicitamente formulada." },
        { label: "Criativo", value: "Contexto primeiro", note: "No ChatGPT, clareza semântica e aderência ao momento importam mais do que transportar uma peça sem adaptação." },
        { label: "Resposta do modelo", value: "Independente", note: "A documentação afirma que o anúncio não altera a resposta do ChatGPT." },
        { label: "Dados ao anunciante", value: "Agregados", note: "Anunciantes não recebem conversas, memórias ou histórico dos usuários." },
        { label: "Critério de escala", value: "Resultado marginal", note: "Escala vem depois do teste de qualidade, conversão e incrementalidade." },
      ]}
      sections={[
        { title: "A criatividade muda de função", paragraphs: ["Em superfícies sociais, o criativo frequentemente precisa interromper o padrão e construir interesse. Em uma conversa, o anúncio precisa parecer pertinente ao problema em curso sem fingir que faz parte da resposta.", "Isso exige headline, proposta e landing page mais explícitas. Um anúncio que funciona visualmente em feed pode ficar genérico quando deslocado para uma interface de decisão textual."] },
        { title: "Privacidade não é um detalhe do comparativo", paragraphs: ["A documentação do ChatGPT Ads informa que anunciantes recebem dados agregados de performance e não veem chats, histórico, memórias ou dados pessoais do usuário. A estratégia deve ser desenhada sem pressupor acesso ao conteúdo da conversa.", "A mensuração depende da instrumentação do anunciante, dos eventos configurados e da reconciliação com dados próprios. Contexto de veiculação não é sinônimo de exposição de conversa."] },
        { title: "Um teste correto usa criativos diferentes", paragraphs: ["Não compare canais usando simplesmente a mesma peça. Preserve a mesma oferta e o mesmo evento de conversão, mas adapte a mensagem à lógica de cada superfície.", "No ChatGPT, teste clareza, utilidade e aderência contextual. Em social, teste ângulo criativo, atenção e descoberta. Depois compare qualidade do resultado, não apenas clique."], bullets: ["Mantenha a mesma definição de conversão.", "Separe variação de canal de variação de oferta.", "Registre custos de produção criativa.", "Avalie qualidade e velocidade do lead.", "Use atribuição como sinal, não como prova causal."] },
        { title: "O portfólio vence a guerra de narrativas", paragraphs: ["A tese não é que a conversa substitui o feed, nem que o feed torna a conversa irrelevante. Cada superfície pode ocupar uma etapa diferente da criação e captura de demanda.", "A decisão de escala precisa seguir a contribuição marginal para receita, margem, retenção ou outro resultado estratégico definido antes do teste."] },
      ]}
      sources={[SOURCES.generalAds, SOURCES.adsBasics, SOURCES.campaignSetup, RADAR_SOURCES.faq]}
      related={[
        { label: "ChatGPT Ads vs Google Ads", href: "/chatgpt-ads-vs-google-ads" },
        { label: "Playbook para agências", href: "/chatgpt-ads-para-agencias" },
        { label: "Privacidade", href: "/chatgpt-ads-privacidade" },
        { label: "Métricas", href: "/chatgpt-ads-metricas" },
        { label: "Radar", href: "/radar" },
      ]}
    />
  );
}
