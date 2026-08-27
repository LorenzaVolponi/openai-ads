import type { Metadata } from "next";

import { TopicArticle } from "@/components/topic-article";
import { SOURCES } from "@/lib/authority-data";
import { socialImageForPath } from "@/lib/seo";

const URL = "https://openai-ads.volponi.tech/como-anunciar-no-chatgpt";
const SOCIAL_IMAGE = socialImageForPath("/como-anunciar-no-chatgpt");
const REVIEWED_AT = "2026-08-27T12:00:00-03:00";

export const metadata: Metadata = {
  title: "Como anunciar no ChatGPT Ads no Brasil: passo a passo (2026)",
  description:
    "Como anunciar no ChatGPT no Brasil: Ads Manager, objetivos CPM/CPC/oCPC, mínimo de R$ 40/dia, iOS/Android/Web, landing page e OAI-AdsBot.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Como anunciar no ChatGPT Ads no Brasil: passo a passo (2026)",
    description: "Do Ads Manager à landing page: campanha, orçamento, plataformas, lançamento, mensuração e crawler readiness com fontes oficiais.",
    url: URL,
    type: "article",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Como anunciar no ChatGPT Ads no Brasil em 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Como anunciar no ChatGPT Ads no Brasil",
    description: "Passo a passo com Ads Manager, R$ 40/dia, CPM/CPC/oCPC, plataformas e landing page.",
    images: [SOCIAL_IMAGE],
  },
};

export default function ComoAnunciarNoChatGPTPage() {
  return (
    <TopicArticle
      canonical={URL}
      dateModified={REVIEWED_AT}
      eyebrow="Como anunciar · fontes verificadas em 27/08/2026"
      title="Como anunciar no ChatGPT no Brasil: do Ads Manager à landing page."
      description="O fluxo já é operável no Brasil. A parte importante é separar o que a OpenAI documenta hoje do que ainda depende de conta, mercado, revisão e performance real."
      summary="Para anunciar no ChatGPT no Brasil, acesse o OpenAI Ads Manager, configure a conta, crie uma campanha, escolha CPM, CPC ou oCPC, defina orçamento e segmentação, crie grupos e anúncios, valide a landing page e lance a campanha. A documentação atual lista mínimo diário de R$ 40 no Brasil e permite segmentar iOS, Android e Web. OAI-AdsBot precisa conseguir acessar a landing page para o fluxo documentado de revisão de anúncios."
      facts={[
        { label: "Brasil", value: "Disponível", note: "O país consta como disponível na fonte oficial atual do Ads Manager." },
        { label: "Mínimo diário", value: "R$ 40", note: "Piso diário de campanha documentado para o Brasil; não é CPC nem benchmark." },
        { label: "Objetivos", value: "3", note: "CPM, CPC e oCPC na documentação atual de criação de campanhas." },
        { label: "Plataformas", value: "iOS + Android + Web", note: "A campanha pode incluir uma ou mais plataformas compatíveis." },
        { label: "Landing page", value: "OAI-AdsBot", note: "Crawler necessário para o fluxo documentado de validação e revisão da landing page." },
        { label: "Benchmark universal", value: "Não", note: "Orçamento e orientação de lance não equivalem a CPC, CTR, CPA ou ROAS garantidos." },
      ]}
      sections={[
        {
          title: "Passo a passo curto: como anunciar no ChatGPT",
          paragraphs: [
            "O fluxo oficial começa no Ads Manager Beta. A OpenAI descreve a plataforma como a superfície para criar, lançar, gerenciar e medir campanhas de ChatGPT Ads.",
            "No Brasil, o autosserviço está listado como disponível. Isso não elimina revisão de conta, cobrança, revisão de anúncios nem requisitos técnicos da landing page.",
          ],
          bullets: [
            "1. Acesse o OpenAI Ads Manager e configure a conta de anunciante.",
            "2. Crie uma campanha e escolha o objetivo: CPM, CPC ou oCPC.",
            "3. Defina orçamento, datas e países; no Brasil, o mínimo diário documentado é R$ 40.",
            "4. Escolha as plataformas compatíveis: iOS, Android e/ou Web.",
            "5. Crie grupos de anúncios, context hints e os anúncios da campanha.",
            "6. Garanta que a landing page esteja acessível ao OAI-AdsBot e cumpra as políticas aplicáveis.",
            "7. Lance, acompanhe impressões, cliques e gasto e reconcilie performance com analytics/CRM.",
          ],
        },
        {
          title: "1. Comece pelo Ads Manager — não pelo criativo",
          paragraphs: [
            "A visão geral oficial do Ads Manager Beta coloca conta, campanhas, reporting, permissões e billing na mesma operação. Antes de produzir dezenas de anúncios, confirme que sua conta está configurada, que o mercado está disponível e que a camada de cobrança está pronta.",
            "A página oficial de disponibilidade lista o Brasil como Available. Como o produto permanece beta, disponibilidade e recursos devem ser rechecados antes de uma operação relevante.",
          ],
        },
        {
          title: "2. Escolha o objetivo que corresponde ao que você quer comprar",
          paragraphs: [
            "A documentação atual oferece três objetivos: CPM para alcance/visibilidade, CPC para cliques e oCPC para otimizar cliques em direção a conversões pós-clique. No oCPC, a cobrança documentada continua sendo por clique válido.",
            "Objetivo de campanha não é detalhe cosmético: ele define cobrança e otimização. Se o objetivo estiver errado, a própria documentação orienta criar uma campanha com o objetivo correto em vez de tratar essa escolha como algo indiferente.",
          ],
          bullets: [
            "CPM: otimização para alcance, cobrança por mil impressões.",
            "CPC: otimização para cliques, cobrança por clique válido.",
            "oCPC: otimização para conversão pós-clique, com cobrança por clique válido segundo a documentação atual.",
          ],
        },
        {
          title: "3. Defina orçamento, país e plataforma",
          paragraphs: [
            "Na fonte oficial consultada em 27 de agosto de 2026, o Brasil aparece com gasto mínimo diário de R$ 40. Esse número é piso de orçamento de campanha, não preço de clique, CPM realizado nem promessa de entrega.",
            "A campanha também pode segmentar plataformas. A documentação atual lista aplicativo iOS, aplicativo Android e Web como superfícies compatíveis. A disponibilidade de segmentação geográfica mais granular pode variar por país e deve ser confirmada no seletor de localização da conta.",
          ],
        },
        {
          title: "4. Construa grupos e anúncios para contexto, não exact match",
          paragraphs: [
            "O produto usa sinais de contexto mais ricos do que a lógica clássica de palavra-chave exata. Context hints ajudam a orientar a correspondência, mas não garantem que o anúncio seja exibido numa conversa específica.",
            "Isso muda o trabalho criativo: landing page, título, texto e contexto precisam descrever com clareza o problema resolvido e a oferta. O anúncio não compra nem altera a resposta do ChatGPT; ele aparece separado da resposta.",
          ],
        },
        {
          title: "5. Trate a landing page como parte da campanha",
          paragraphs: [
            "A orientação oficial para anunciantes exige acesso do OAI-AdsBot à landing page para o fluxo documentado de validação e revisão. A OpenAI também informa que o conteúdo da página pode ajudar a determinar quando um anúncio é relevante.",
            "Robots.txt liberado sozinho não basta se WAF, CDN, bot mitigation, CAPTCHA, geoblocking ou rate limiting bloquearem o crawler. O observatório mantém um guia técnico específico para OAI-AdsBot e OAI-SearchBot porque uma campanha pode estar certa no painel e falhar na infraestrutura da página.",
          ],
          bullets: [
            "Permita OAI-AdsBot no robots.txt.",
            "Evite challenge de bot para o crawler da OpenAI.",
            "Revise 403, 429, regras de WAF/CDN e rate limits quando houver falha de acesso.",
            "Não trate crawler access como garantia de aprovação ou entrega.",
          ],
        },
        {
          title: "6. Lance e meça sem transformar um caso isolado em benchmark",
          paragraphs: [
            "Depois do lançamento, o Ads Manager documenta acompanhamento de impressões, cliques e gasto, com tabelas, gráficos e exportação CSV. Métricas derivadas e conversões dependem da configuração de mensuração e do objetivo.",
            "Resultados publicados por uma empresa ou agência podem ser úteis como estudo de caso, mas não viram benchmark universal. Para decisão de negócio, reconcilie mídia, analytics, conversão, CRM/receita e qualidade do lead na sua própria operação.",
          ],
        },
      ]}
      sources={[
        { label: "OpenAI Ads — página oficial para anunciantes", url: "https://ads.openai.com/pt-BR", publisher: "OpenAI" },
        { label: "Criar campanhas para o ChatGPT Ads", url: "https://help.openai.com/pt-br/articles/20001210-create-campaigns-for-chatgpt", publisher: "OpenAI Help Center" },
        { label: "Lançar campanhas", url: "https://help.openai.com/pt-br/articles/20001209-lan%C3%A7ar-campanhas", publisher: "OpenAI Help Center" },
        { label: "Visão geral do Ads Manager Beta", url: "https://help.openai.com/pt-br/articles/20001206", publisher: "OpenAI Help Center" },
        SOURCES.availability,
        { label: "OpenAI web crawlers for advertisers", url: "https://help.openai.com/pt-br/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers", publisher: "OpenAI Help Center" },
      ]}
      related={[
        { label: "Quanto custa anunciar no ChatGPT", href: "/chatgpt-ads-precos" },
        { label: "OpenAI Ads Manager", href: "/ads-manager-chatgpt" },
        { label: "ChatGPT Ads no Brasil", href: "/chatgpt-ads-brasil" },
        { label: "Crawler readiness: OAI-AdsBot + OAI-SearchBot", href: "/oai-adsbot-searchbot" },
        { label: "Métricas e fórmulas", href: "/chatgpt-ads-metricas" },
      ]}
    />
  );
}
