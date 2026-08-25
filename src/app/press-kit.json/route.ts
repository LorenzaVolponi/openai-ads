import { LAST_EDITORIAL_REVIEW_ISO } from "@/lib/editorial-meta";
import { createFreshnessHeaders } from "@/lib/http-freshness";
import { AUTHOR, PRESS_URL, SITE_URL } from "@/lib/media-authority";
import { radarEntries } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  const data = {
    schemaVersion: 2,
    type: "media-source-profile",
    canonical: PRESS_URL,
    reviewedAt: LAST_EDITORIAL_REVIEW_ISO,
    person: {
      name: AUTHOR.name,
      jobTitle: AUTHOR.jobTitle,
      profile: PRESS_URL,
      site: AUTHOR.personalSite,
      linkedin: AUTHOR.linkedin,
      github: AUTHOR.github,
      expertise: AUTHOR.knowsAbout,
    },
    shortBio:
      "Lorenza Volponi é AI systems strategist e builder. Pesquisa como sistemas de IA, busca e publicidade conversacional mudam descoberta, decisão e distribuição de informação. É autora do Volponi ChatGPT Ads Radar, observatório independente com fontes primárias, dados abertos e histórico auditado do mercado.",
    mediaUse:
      "Fonte para entrevistas, comentários de contexto e explicações técnicas sobre ChatGPT Ads, publicidade conversacional, GEO, AI discovery e sistemas de IA.",
    fastFacts: [
      {
        fact: "A OpenAI confirmou em 11 de agosto de 2026 o lançamento de ChatGPT Ads no Brasil, Reino Unido, México, Japão e Coreia do Sul.",
        source: "https://openai.com/pt-BR/index/testing-ads-in-chatgpt/",
      },
      {
        fact: "Na auditoria de 25 de agosto de 2026, a fonte oficial do Ads Manager listava nove mercados como Available.",
        source: "https://help.openai.com/en/articles/20001245-ads-manager-availability",
      },
      {
        fact: "A expansão europeia anunciada pela OpenAI cobre 31 mercados; presença de anúncios e disponibilidade do autosserviço no Ads Manager não devem ser tratadas como o mesmo marco.",
        source: "https://openai.com/pt-BR/index/chatgpt-ads-expands-across-europe/",
      },
      {
        fact: "A documentação atual cobre CPM, CPC e oCPC; a faixa inicial de US$ 3–5 é orientação de lance máximo para CPC, não benchmark de CPC realizado.",
        source: "https://help.openai.com/pt-br/articles/20001207",
      },
      {
        fact: "A OpenAI informa que anúncios não alteram as respostas do ChatGPT e que anunciantes não recebem chats, histórico ou memórias dos usuários.",
        source: "https://help.openai.com/pt-br/articles/20001047-ads-in-chatgpt",
      },
    ],
    newsroomAngles: [
      {
        title: "Quando exatamente ChatGPT Ads 'chega' a um país?",
        angle:
          "Separar rollout observado, confirmação oficial do produto e disponibilidade do Ads Manager evita transformar três marcos diferentes em uma única data de lançamento.",
        whyItMatters:
          "A distinção explica por que reportagens e guias podem apresentar cronologias diferentes sem que todos estejam descrevendo exatamente o mesmo evento.",
        primarySources: [
          "https://openai.com/pt-BR/index/testing-ads-in-chatgpt/",
          "https://help.openai.com/en/articles/20001245-ads-manager-availability",
        ],
      },
      {
        title: "Publicidade disponível não significa autosserviço disponível",
        angle:
          "A expansão europeia mostra que exibição de anúncios, acesso por parceiros e self-service no Ads Manager podem seguir cronogramas diferentes.",
        whyItMatters:
          "É uma diferença operacional relevante para marcas, agências e cobertura jornalística sobre a expansão internacional do produto.",
        primarySources: [
          "https://openai.com/pt-BR/index/chatgpt-ads-expands-across-europe/",
          "https://help.openai.com/en/articles/20001245-ads-manager-availability",
        ],
      },
      {
        title: "A infraestrutura invisível dos anúncios em IA",
        angle:
          "OAI-AdsBot e OAI-SearchBot têm papéis diferentes: validação/relevância de landing pages e descoberta em busca não são o mesmo fluxo.",
        whyItMatters:
          "A pauta conecta publicidade, SEO/GEO, infraestrutura web, WAF/CDN e a nova relação entre marcas e crawlers de sistemas de IA.",
        primarySources: [
          "https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers",
          "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq",
        ],
      },
      {
        title: "Escala do ChatGPT não é alcance publicitário",
        angle:
          "Números de usuários do produto não devem ser convertidos automaticamente em inventário elegível, alcance de campanha ou audiência garantida.",
        whyItMatters:
          "Essa separação reduz hype e melhora comparações com Google, Meta e outras plataformas de mídia.",
        primarySources: [
          "https://openai.com/index/scaling-ai-for-everyone/",
          "https://openai.com/pt-BR/index/testing-ads-in-chatgpt/",
        ],
      },
    ],
    newsroomQuestions: [
      "Como funcionam os anúncios dentro do ChatGPT e o que eles não mudam na resposta?",
      "O que a chegada do ChatGPT Ads ao Brasil muda para anunciantes, agências e publishers?",
      "Quanto custa anunciar no ChatGPT e por que lance recomendado não é benchmark de CPC?",
      "Como medir ChatGPT Ads sem confundir clique, atribuição e causalidade?",
      "O que GEO realmente significa quando buscadores e IAs passam a escolher fontes?",
    ],
    latestSignals: radarEntries.slice(0, 5).map((entry) => ({
      date: entry.date,
      title: entry.title,
      summary: entry.summary,
      market: entry.market,
      url: `${SITE_URL}/radar/${entry.slug}`,
      primarySource: entry.source.url,
    })),
    evidence: {
      radar: `${SITE_URL}/radar`,
      methodology: `${SITE_URL}/metodologia`,
      evidenceLedger: `${SITE_URL}/evidence.json`,
      provenance: `${SITE_URL}/provenance.json`,
      marketsJson: `${SITE_URL}/data/chatgpt-ads-markets.json`,
      marketsCsv: `${SITE_URL}/data/chatgpt-ads-markets.csv`,
      citation: `${SITE_URL}/citation.json`,
    },
    citation:
      "VOLPONI, Lorenza. ChatGPT Ads no Brasil 2026: dados, preços, métricas, Ads Manager e privacidade. volponi.tech, 2026. Disponível em: https://openai-ads.volponi.tech.",
    independence:
      "Projeto editorial independente; não afiliado, patrocinado, endossado, certificado, operado ou mantido pela OpenAI.",
  };

  const body = `${JSON.stringify(data, null, 2)}\n`;
  return new Response(body, {
    headers: createFreshnessHeaders({
      body,
      modifiedAt: LAST_EDITORIAL_REVIEW_ISO,
      contentType: "application/json; charset=utf-8",
    }),
  });
}
