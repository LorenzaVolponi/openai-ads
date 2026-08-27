import type { Metadata } from "next";

import { TopicArticle } from "@/components/topic-article";
import { SOURCES } from "@/lib/authority-data";
import { socialImageForPath } from "@/lib/seo";

const URL = "https://openai-ads.volponi.tech/ads-manager-chatgpt";
const SOCIAL_IMAGE = socialImageForPath("/ads-manager-chatgpt");

export const metadata: Metadata = {
  title: "OpenAI Ads Manager: como funciona, países e recursos (2026)",
  description:
    "Guia do OpenAI Ads Manager Beta: países, campanhas, CPM/CPC/oCPC, mínimo diário de 40 BRL no Brasil, segmentação por iOS/Android/Web, métricas e limites atuais.",
  alternates: { canonical: URL },
  openGraph: {
    title: "OpenAI Ads Manager: como funciona, países e recursos (2026)",
    description: "Campanhas, orçamento, segmentação por plataforma, reporting, países disponíveis e limites atuais do Ads Manager Beta.",
    url: URL,
    type: "article",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "OpenAI Ads Manager: como funciona, países e recursos em 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenAI Ads Manager: como funciona em 2026",
    description: "Campanhas, orçamento, plataformas, métricas, países, CSV e limites atuais do beta.",
    images: [SOCIAL_IMAGE],
  },
};

export default function AdsManagerChatGPTPage() {
  return (
    <TopicArticle
      canonical={URL}
      eyebrow="Ads Manager Beta · atualização 27/08/2026"
      title="OpenAI Ads Manager: já é uma plataforma operável — e ainda é beta."
      description="A ferramenta já cria, lança, mede e gerencia campanhas. O que exige cuidado é transformar uma plataforma em evolução numa lista de recursos permanentes sem data e sem verificação."
      summary="Na documentação auditada até 27 de agosto de 2026, o Ads Manager está disponível em nove países, incluindo o Brasil. Campanhas podem usar CPM, CPC e oCPC, segmentar iOS, Android ou Web e, no Brasil, a tabela oficial de gasto mínimo lista 40 BRL como mínimo diário de campanha."
      facts={[
        { label: "Países disponíveis", value: "9", note: "Austrália, Brasil, Canadá, Japão, Coreia, México, Nova Zelândia, Reino Unido e EUA." },
        { label: "Status", value: "Beta", note: "Recursos e disponibilidade continuam evoluindo." },
        { label: "Objetivos", value: "3", note: "CPM, CPC e oCPC na documentação atual." },
        { label: "Mínimo diário · Brasil", value: "40 BRL", note: "Gasto mínimo diário de campanha listado na documentação oficial atual." },
        { label: "Plataformas", value: "iOS + Android + Web", note: "A campanha pode incluir uma ou mais superfícies compatíveis." },
        { label: "Relatórios", value: "Tabela + gráfico + CSV", note: "Performance pode ser vista e exportada para análise externa." },
        { label: "Conta", value: "Permissões + API keys", note: "Configurações incluem membros, permissões, chaves, billing e change logs." },
        { label: "Brasil", value: "Disponível", note: "Consta na lista oficial auditada em 25/08/2026." },
      ]}
      sections={[
        {
          title: "O que o Ads Manager Beta faz hoje",
          paragraphs: [
            "A visão oficial descreve um fluxo de ponta a ponta: criar e gerenciar campanhas individualmente ou em escala, acompanhar desempenho, ajustar configurações da conta e administrar elementos operacionais em uma única superfície.",
            "Na camada de reporting, a plataforma oferece tabelas, gráficos e exportação CSV. Isso permite tirar o dado do dashboard e reconciliar com analytics, CRM, data warehouse ou planilhas sem depender apenas da visualização nativa.",
          ],
          bullets: [
            "Criar e gerenciar campanhas e grupos de anúncios.",
            "Criar anúncios e usar fluxos em massa quando disponíveis.",
            "Monitorar impressões, cliques, gasto e métricas derivadas.",
            "Exportar dados em CSV.",
            "Gerenciar membros, permissões, chaves de API, billing e logs de alteração.",
          ],
        },
        {
          title: "Orçamento mínimo e segmentação por plataforma",
          paragraphs: [
            "A documentação oficial de criação de campanhas consultada em 27 de agosto de 2026 lista o Brasil com gasto mínimo diário de 40 BRL. Esse valor é um requisito de orçamento diário da campanha e não deve ser confundido com CPC médio, CPM realizado ou com a recomendação separada de lance máximo CPC inicial.",
            "A mesma configuração permite selecionar uma ou mais plataformas compatíveis: aplicativo para iOS, aplicativo para Android ou Web. A opção Web cobre computador e web móvel. Isso torna a escolha de superfície uma decisão explícita de campanha, não apenas uma dimensão de relatório.",
          ],
          bullets: [
            "Brasil: mínimo diário oficial de campanha de 40 BRL na tabela atual.",
            "Plataformas compatíveis documentadas: iOS, Android e Web.",
            "Disponibilidade de segmentação geográfica mais granular varia por mercado e deve ser confirmada no seletor de locais.",
          ],
        },
        {
          title: "Onde está disponível",
          paragraphs: [
            "Na versão auditada em 25 de agosto de 2026, a página de disponibilidade lista nove países como disponíveis: Austrália, Brasil, Canadá, Japão, Coreia do Sul, México, Nova Zelândia, Reino Unido e Estados Unidos.",
            "A mesma página mostra diversos países europeus com status de ‘em breve’. Isso reforça uma distinção importante: uma expansão de inventário ou presença de anúncios no mercado não significa necessariamente autosserviço imediato no Ads Manager para toda empresa localizada naquele país.",
          ],
        },
        {
          title: "Landing page também faz parte da operação",
          paragraphs: [
            "O Ads Manager é a superfície de compra, mas a landing page continua fazendo parte do sistema de mídia. A orientação oficial da OpenAI diz que OAI-AdsBot deve poder acessar páginas submetidas como anúncios para validação de segurança e políticas, e que o conteúdo da landing page também pode participar da avaliação de relevância do anúncio.",
            "Por isso, readiness não termina no dashboard: robots.txt, WAF, CDN, bot mitigation, CAPTCHA, geoblocking e rate limiting podem decidir se a landing page é realmente alcançável pelo crawler. O observatório mantém um guia técnico dedicado para testar OAI-AdsBot e OAI-SearchBot sem confundir acesso técnico com garantia de aprovação ou entrega.",
          ],
        },
        {
          title: "Por que o status beta importa",
          paragraphs: [
            "Beta não significa improvisado; significa mutável. Sistemas de veiculação, inventário, formatos, compra, gestão e mensuração podem ser ajustados enquanto a plataforma aprende com uso real.",
            "Para operação profissional, documente a versão usada na campanha, tire screenshots de configurações relevantes, registre fontes e mantenha um changelog próprio. Assim, uma mudança futura não apaga o contexto de por que uma decisão foi tomada.",
          ],
        },
        {
          title: "A camada de API existe, mas precisa de escopo",
          paragraphs: [
            "A visão geral do Ads Manager cita chaves de API nas configurações da conta e a coleção oficial já documenta integrações de mensuração e fluxos específicos. Isso não deve ser traduzido automaticamente como ‘API pública genérica para tudo’.",
            "Antes de automatizar criação, reporting ou mensuração, confirme o endpoint e o escopo oficialmente disponíveis para sua conta. A melhor prática é programar contra documentação concreta, não contra suposição de paridade com Google ou Meta Ads.",
          ],
        },
      ]}
      sources={[
        SOURCES.availability,
        { label: "Visão geral do Ads Manager Beta", url: "https://help.openai.com/pt-br/articles/20001206", publisher: "OpenAI Help Center" },
        { label: "Criar campanhas para o ChatGPT Ads", url: "https://help.openai.com/pt-br/articles/20001210-create-campaigns-for-chatgpt", publisher: "OpenAI Help Center" },
        { label: "OpenAI web crawlers for advertisers", url: "https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers", publisher: "OpenAI Help Center" },
      ]}
      related={[
        { label: "ChatGPT Ads no Brasil", href: "/chatgpt-ads-brasil" },
        { label: "Preços e leilão", href: "/chatgpt-ads-precos" },
        { label: "Métricas", href: "/chatgpt-ads-metricas" },
        { label: "Crawler readiness: OAI-AdsBot + OAI-SearchBot", href: "/oai-adsbot-searchbot" },
        { label: "Privacidade", href: "/chatgpt-ads-privacidade" },
      ]}
    />
  );
}
