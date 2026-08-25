import type { Metadata } from "next";

import { TopicArticle } from "@/components/topic-article";
import { SOURCES } from "@/lib/authority-data";

const URL = "https://openai-ads.volponi.tech/chatgpt-ads-metricas";

export const metadata: Metadata = {
  title: "ChatGPT Ads métricas 2026: CTR, CPC, CPM, conversões, CPA e ROAS | Lorenza Volponi",
  description:
    "Métricas oficiais do ChatGPT Ads e como interpretá-las: impressões, cliques, gasto, CTR, CPC médio, CPM médio, conversões, CPA, CVR e ROAS.",
  alternates: { canonical: URL },
  openGraph: {
    title: "ChatGPT Ads métricas 2026 — como ler o dashboard",
    description: "As métricas oficiais do Ads Manager Beta e a matemática para interpretar performance sem autoengano.",
    url: URL,
    type: "article",
  },
};

export default function ChatGPTAdsMetricasPage() {
  return (
    <TopicArticle
      eyebrow="Mensuração · atualização 25/08/2026"
      title="ChatGPT Ads mede sete sinais centrais. A decisão de negócio começa depois deles."
      description="O Ads Manager Beta já reporta impressões, cliques, gasto, CTR, CPC médio, CPM médio e conversões. A partir daí, você precisa ligar mídia a qualidade, receita e incrementalidade."
      summary="O relatório oficial inclui impressões, cliques, gasto, CTR, CPC médio, CPM médio e conversões quando a mensuração está configurada. CTR = cliques ÷ impressões; CPC = gasto ÷ cliques; CPM = gasto ÷ impressões × 1.000. Para negócio, complete a leitura com CVR, CPA, receita e ROAS."
      facts={[
        { label: "Métricas oficiais", value: "7", note: "Impressões, cliques, gasto, CTR, CPC médio, CPM médio e conversões." },
        { label: "CTR", value: "C/I × 100", note: "Percentual de impressões que resultaram em clique." },
        { label: "CPC", value: "Gasto/Clique", note: "Custo médio por clique válido registrado." },
        { label: "CPM", value: "G/I × 1.000", note: "Custo por mil impressões." },
        { label: "Conversões", value: "Configurável", note: "Dependem de mensuração de conversão corretamente implementada." },
        { label: "UTMs", value: "Suportadas", note: "Parâmetros estáticos podem ser adicionados à landing page para análise externa." },
      ]}
      sections={[
        {
          title: "O que aparece no Ads Manager Beta",
          paragraphs: [
            "A documentação oficial lista sete sinais de performance: impressões, cliques, gasto, taxa de cliques (CTR), CPC médio, CPM médio e conversões quando o acompanhamento de conversão foi configurado. Esses números podem ser analisados em tabelas, gráficos e relatórios CSV.",
            "Isso é suficiente para monitorar entrega e eficiência básica, mas não encerra a pergunta econômica. O dashboard sabe o que aconteceu dentro da cadeia de mídia; seu negócio precisa dizer se aquilo criou valor.",
          ],
        },
        {
          title: "Como ler CTR, CPC e CPM",
          paragraphs: [
            "CTR mede a proporção de impressões que viram cliques. CPC divide o gasto pelo número de cliques. CPM divide o gasto por impressões e multiplica por mil. Nenhuma das três métricas, isoladamente, prova retorno.",
            "CTR alto pode significar boa relevância ou apenas curiosidade. CPC baixo pode trazer tráfego fraco. CPM baixo pode comprar exposição sem efeito incremental. Métricas são sinais; a interpretação depende do objetivo e da qualidade do restante do funil.",
          ],
          bullets: [
            "CTR = cliques ÷ impressões × 100.",
            "CPC = gasto ÷ cliques.",
            "CPM = gasto ÷ impressões × 1.000.",
          ],
        },
        {
          title: "Complete o funil com CVR, CPA e ROAS",
          paragraphs: [
            "Para sair de métrica de mídia e chegar a negócio, calcule taxa de conversão (CVR), custo por aquisição/conversão (CPA) e retorno sobre gasto em anúncios (ROAS). Essas fórmulas são padrões de marketing, não métricas exclusivas do ChatGPT Ads.",
            "CVR = conversões ÷ cliques × 100. CPA = gasto ÷ conversões. ROAS = receita atribuída ÷ gasto em mídia. Quanto mais perto da receita, maior a necessidade de revisar qualidade de tracking e modelo de atribuição.",
          ],
        },
        {
          title: "Atribuição não é incrementalidade",
          paragraphs: [
            "Uma plataforma pode atribuir uma conversão a um clique e ainda assim não provar que aquela conversão só existiu por causa da mídia. Para decisões grandes, use testes de incremento, grupos comparáveis ou outras formas de contrafactual quando possível.",
            "A leitura madura é: o Ads Manager registra performance; analytics e CRM validam o caminho; experimentos ajudam a estimar quanto resultado foi realmente adicional.",
          ],
        },
      ]}
      sources={[
        SOURCES.adsBasics,
        SOURCES.campaignSetup,
      ]}
      related={[
        { label: "Preços e leilão", href: "/chatgpt-ads-precos" },
        { label: "ChatGPT Ads no Brasil", href: "/chatgpt-ads-brasil" },
        { label: "Ads Manager", href: "/ads-manager-chatgpt" },
        { label: "Observatório completo", href: "/" },
      ]}
    />
  );
}
