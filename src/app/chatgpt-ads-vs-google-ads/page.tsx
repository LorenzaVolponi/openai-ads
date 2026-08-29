import type { Metadata } from "next";

import { TopicArticle } from "@/components/topic-article";
import { SOURCES } from "@/lib/authority-data";
import { SITE_URL } from "@/lib/media-authority";
import { RADAR_SOURCES } from "@/lib/radar-data";
import { socialImageForPath } from "@/lib/seo";

const URL = `${SITE_URL}/chatgpt-ads-vs-google-ads`;
const SOCIAL_IMAGE = socialImageForPath("/chatgpt-ads-vs-google-ads");

export const metadata: Metadata = {
  title: "ChatGPT Ads vs Google Ads: diferenças, estratégia e quando usar cada canal",
  description: "Comparação estratégica entre ChatGPT Ads e Google Ads: tipo de intenção, contexto, compra, mensuração, riscos e desenho de testes.",
  alternates: { canonical: URL },
  openGraph: { title: "ChatGPT Ads vs Google Ads", description: "Intenção conversacional e busca declarada: diferenças, complementaridade e teste.", url: URL, type: "article", images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "ChatGPT Ads vs Google Ads" }] },
  twitter: { card: "summary_large_image", title: "ChatGPT Ads vs Google Ads", description: "Diferenças estratégicas e desenho de testes.", images: [SOCIAL_IMAGE] },
};

export default function ChatGPTAdsVsGoogleAdsPage() {
  return (
    <TopicArticle
      canonical={URL}
      eyebrow="Comparativo estratégico · sem falsa equivalência"
      title="ChatGPT Ads vs Google Ads: não é substituição. É uma nova camada de intenção."
      description="A comparação útil não pergunta qual canal é melhor em abstrato. Ela pergunta em qual momento da decisão cada ambiente captura atenção, contexto e ação com menor desperdício."
      summary="Google Ads tende a capturar intenção expressa em busca e em suas superfícies de mídia; ChatGPT Ads entra em uma conversa contextual. A estratégia mais forte é testar complementaridade, não migrar orçamento por hype."
      facts={[
        { label: "Unidade de contexto", value: "Conversa", note: "No ChatGPT, a oportunidade nasce do contexto da interação, com resposta e anúncio mantidos separados." },
        { label: "Busca tradicional", value: "Consulta", note: "Em search, a consulta declarada organiza grande parte da intenção observável." },
        { label: "Context hints", value: "Não são exact match", note: "A documentação do ChatGPT Ads não trata sugestões de contexto como palavras-chave exatas." },
        { label: "Mensuração", value: "Em evolução", note: "O Ads Manager é beta e ainda não oferece benchmarks universais de performance." },
        { label: "Decisão correta", value: "Teste incremental", note: "Compare contribuição marginal, não apenas atribuição de último clique." },
        { label: "Papel no mix", value: "Complementar", note: "Uma nova superfície não invalida canais que já capturam demanda." },
      ]}
      sections={[
        { title: "A diferença começa antes do anúncio", paragraphs: ["Em uma busca, a pessoa formula uma consulta. Em uma conversa, ela desenvolve um problema, refina critérios e recebe uma resposta. Isso muda a unidade de contexto disponível para a veiculação.", "A documentação atual do ChatGPT Ads afirma que anúncios aparecem separados da resposta e não compram a resposta do modelo. Portanto, relevância publicitária e conteúdo da resposta devem ser analisados como sistemas distintos."] },
        { title: "Não transforme context hints em palavras-chave", paragraphs: ["Sugestões de contexto ajudam o sistema a compreender onde um anúncio pode fazer sentido, mas não funcionam como correspondência exata. Copiar mecanicamente uma estrutura de keywords para o ChatGPT reduz a qualidade do experimento.", "A landing page, a clareza da oferta, o texto e a instrumentação continuam centrais. O novo canal não elimina fundamentos de mídia e conversão."] },
        { title: "Como comparar sem se enganar", paragraphs: ["Use a mesma definição de conversão, reconcilie eventos com dados próprios e mantenha janelas de análise explícitas. Compare custo por resultado, qualidade do lead, velocidade de decisão e incrementalidade.", "CTR e CPC podem ajudar a diagnosticar, mas não provam valor de negócio. A pergunta executiva é quanto resultado adicional o canal trouxe em relação a um cenário comparável."], bullets: ["Separe campanha exploratória de campanha de eficiência.", "Defina hipótese de audiência e contexto antes do criativo.", "Use holdout ou testes geográficos quando o volume permitir.", "Documente diferenças de landing page e oferta.", "Não trate lance sugerido como benchmark realizado."] },
        { title: "Quando a complementaridade fica forte", paragraphs: ["Uma arquitetura possível usa canais maduros para capturar demanda explícita e o ChatGPT Ads para testar momentos de consideração contextual. O papel de cada canal deve ser definido por evidência observada, não por narrativa de substituição.", "A alocação aumenta somente depois que qualidade de tráfego, conversão e impacto incremental passam pelo critério de decisão do negócio."] },
      ]}
      sources={[SOURCES.adsBasics, SOURCES.campaignSetup, SOURCES.generalAds, RADAR_SOURCES.faq]}
      related={[
        { label: "ChatGPT Ads vs Meta Ads", href: "/chatgpt-ads-vs-meta-ads" },
        { label: "Playbook para agências", href: "/chatgpt-ads-para-agencias" },
        { label: "Métricas do ChatGPT Ads", href: "/chatgpt-ads-metricas" },
        { label: "Preços e modelos de compra", href: "/chatgpt-ads-precos" },
        { label: "Market Snapshot", href: "/chatgpt-ads-market" },
      ]}
    />
  );
}
