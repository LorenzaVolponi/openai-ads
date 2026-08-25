import type { Metadata } from "next";

import { TopicArticle } from "@/components/topic-article";
import { SOURCES } from "@/lib/authority-data";
import { socialImageForPath } from "@/lib/seo";

const URL = "https://openai-ads.volponi.tech/chatgpt-ads-precos";
const SOCIAL_IMAGE = socialImageForPath("/chatgpt-ads-precos");

export const metadata: Metadata = {
  title: "Quanto custa anunciar no ChatGPT? CPC, CPM e oCPC (2026)",
  description:
    "Veja como funciona o preço do ChatGPT Ads: CPC, CPM, oCPC, leilão de segundo preço, lance inicial de US$ 3–5 e o que não é benchmark.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Quanto custa anunciar no ChatGPT? CPC, CPM e oCPC (2026)",
    description: "Modelos de compra oficiais, leilão e orientação de lance explicados sem benchmark inventado.",
    url: URL,
    type: "article",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Quanto custa anunciar no ChatGPT: CPC, CPM e oCPC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quanto custa anunciar no ChatGPT?",
    description: "CPC, CPM, oCPC, leilão e lance inicial explicados com fonte primária.",
    images: [SOCIAL_IMAGE],
  },
};

export default function ChatGPTAdsPrecosPage() {
  return (
    <TopicArticle
      canonical={URL}
      eyebrow="Preço e leilão · atualização 25/08/2026"
      title="ChatGPT Ads tem CPC, CPM e oCPC. O que ele não tem é um benchmark mágico universal."
      description="A documentação já é específica o suficiente para explicar como a compra funciona. O erro começa quando recomendação de lance vira ‘CPC médio’ ou quando um resultado isolado vira promessa de mercado."
      summary="O ChatGPT Ads oferece objetivos baseados em CPM, CPC e oCPC. Para campanhas CPC, a OpenAI recomenda começar com lance máximo de US$ 3–5 por clique. Isso é uma orientação de bid, não o CPC médio pago. A seleção usa um leilão de segundo preço ponderado por relevância."
      facts={[
        { label: "Modelo de alcance", value: "CPM", note: "Cobrança por mil impressões para objetivo de alcance/visibilidade." },
        { label: "Modelo de tráfego", value: "CPC", note: "Cobrança por clique válido para objetivo de cliques." },
        { label: "Modelo de conversão", value: "oCPC", note: "Otimiza cliques para conversão pós-clique; cobrança continua por clique válido." },
        { label: "Bid CPC inicial", value: "US$ 3–5", note: "Recomendação de lance máximo inicial publicada pela OpenAI." },
        { label: "Leilão", value: "2º preço", note: "Ponderado por relevância e resultados esperados." },
        { label: "Benchmark universal", value: "Não", note: "Não há uma faixa única responsável de CPC/CTR/ROAS para todos os mercados." },
      ]}
      sections={[
        {
          title: "Os três objetivos de compra",
          paragraphs: [
            "No objetivo CPM, o sistema otimiza para alcance e cobra pelas impressões servidas em blocos de mil. No objetivo CPC, otimiza para cliques e cobra por clique válido. No oCPC, a plataforma tenta encontrar cliques com maior probabilidade de gerar um evento de conversão configurado após o clique.",
            "O ponto que costuma gerar confusão é o oCPC: ele é otimizado para conversões, mas a documentação diz que a forma de cobrança continua sendo por clique válido, não por conversão realizada.",
          ],
          bullets: [
            "CPM: escala, alcance e reconhecimento.",
            "CPC: engajamento e tráfego.",
            "oCPC: ações pós-clique com otimização para evento de conversão.",
          ],
        },
        {
          title: "O que significa a recomendação de US$ 3–5",
          paragraphs: [
            "A OpenAI recomenda começar campanhas CPC com lance máximo de US$ 3 a US$ 5 por clique. Esse valor define o teto que o anunciante está disposto a ofertar, não o preço final que obrigatoriamente será pago.",
            "Transformar essa faixa em ‘CPC médio do ChatGPT Ads’ seria tecnicamente errado. O custo realizado depende do leilão, concorrência, relevância, inventário, mercado, objetivo e qualidade da campanha.",
          ],
        },
        {
          title: "Como funciona o leilão",
          paragraphs: [
            "A documentação descreve um leilão de segundo preço ponderado por relevância. Em termos práticos, o maior lance não é o único elemento importante: o sistema procura maximizar valor para usuário e anunciante, considerando relevância e resultados esperados.",
            "Entre os sinais descritos estão contexto e intenção da conversa atual, landing page, título e texto do anúncio, context hints fornecidos pelo anunciante e, quando a personalização está habilitada, sinais selecionados da experiência mais ampla do usuário.",
          ],
        },
        {
          title: "A regra financeira que evita comparação ruim",
          paragraphs: [
            "Compare canais por resultado de negócio numa mesma operação, não por prints de CPC de empresas diferentes. Um clique mais caro pode ser economicamente melhor se converter mais e gerar receita maior; um CPM baixo pode ser irrelevante se a exposição não acrescentar demanda incremental.",
            "Para decidir orçamento, reconcilie gasto, cliques, conversões, receita e qualidade do lead com analytics e CRM. Benchmark externo pode contextualizar; ele não substitui unit economics próprio.",
          ],
        },
      ]}
      sources={[
        SOURCES.adsBasics,
        SOURCES.campaignSetup,
      ]}
      related={[
        { label: "ChatGPT Ads no Brasil", href: "/chatgpt-ads-brasil" },
        { label: "Métricas e fórmulas", href: "/chatgpt-ads-metricas" },
        { label: "Ads Manager", href: "/ads-manager-chatgpt" },
        { label: "Observatório completo", href: "/" },
      ]}
    />
  );
}
