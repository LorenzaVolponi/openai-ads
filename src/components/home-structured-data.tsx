import { authorityMetrics, citationBlock, SOURCES } from "@/lib/authority-data";
import {
  LAST_EDITORIAL_REVIEW_ISO,
  SITE_URL,
} from "@/lib/editorial-meta";
import { searchIntentAnswers, socialImageForPath } from "@/lib/seo";

const primarySources = Object.values(SOURCES).map((source) => source.url);
const socialImage = socialImageForPath("/");

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Article", "TechArticle"],
      "@id": `${SITE_URL}/#article`,
      mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
      headline: citationBlock.title,
      description: citationBlock.description,
      image: socialImage,
      author: { "@id": `${SITE_URL}/#author` },
      publisher: { "@id": `${SITE_URL}/#author` },
      datePublished: "2026-08-24T09:00:00-03:00",
      dateModified: LAST_EDITORIAL_REVIEW_ISO,
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      citation: primarySources,
      keywords: [
        "ChatGPT Ads Brasil",
        "ChatGPT Ads 2026",
        "OpenAI Ads Manager",
        "ChatGPT Ads preços",
        "ChatGPT Ads métricas",
        "como anunciar no ChatGPT",
        "como criar anúncio no ChatGPT",
        "CPC ChatGPT Ads",
        "CPM ChatGPT Ads",
        "oCPC ChatGPT Ads",
        "privacidade ChatGPT Ads",
        "Lorenza Volponi",
        "volponi.tech",
      ],
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".geo-answer", ".press-summary"],
      },
      copyrightHolder: { "@id": `${SITE_URL}/#author` },
      copyrightYear: 2026,
    },
    {
      "@type": "LearningResource",
      "@id": `${SITE_URL}/#learning-resource`,
      name: "Aprenda a fazer anúncios no ChatGPT",
      description:
        "Guia didático e independente para entender como anúncios aparecem, como escrever mensagens mais claras e como interpretar métricas sem confundir orientação editorial com garantia de performance.",
      url: SITE_URL,
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      educationalLevel: "Beginner",
      learningResourceType: ["Guide", "Interactive tutorial"],
      teaches: [
        "Como um anúncio patrocinado aparece no ChatGPT",
        "Como escrever uma mensagem clara e específica",
        "Como explicar benefício e próximo passo",
        "Como interpretar métricas básicas de mídia",
      ],
      author: { "@id": `${SITE_URL}/#author` },
      publisher: { "@id": `${SITE_URL}/#author` },
      dateModified: LAST_EDITORIAL_REVIEW_ISO,
      citation: primarySources,
    },
    {
      "@type": "HowTo",
      "@id": `${SITE_URL}/#howto-ad-quality`,
      name: "Como criar um anúncio mais claro para ChatGPT Ads",
      description:
        "Framework editorial simples da volponi.tech para melhorar clareza, benefício, especificidade e próximo passo antes de testar uma campanha real.",
      inLanguage: "pt-BR",
      author: { "@id": `${SITE_URL}/#author` },
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Entenda o problema",
          text: "Comece pelo problema real que a pessoa quer resolver.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Mostre o benefício",
          text: "Explique de forma concreta o que melhora para a pessoa.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Seja específico",
          text: "Troque promessas genéricas por uma proposta clara, concreta e verificável.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Diga o próximo passo",
          text: "Oriente uma ação simples e coerente, sem pressão artificial.",
        },
      ],
    },
    {
      "@type": "WebApplication",
      "@id": `${SITE_URL}/#ad-quality-review`,
      name: "Volponi Ad Quality Review",
      url: `${SITE_URL}/#review`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      browserRequirements: "JavaScript",
      isAccessibleForFree: true,
      description:
        "Ferramenta didática local que revisa clareza, benefício, especificidade e próximo passo do texto de um anúncio. O texto é processado no navegador e o resultado não é um score oficial da OpenAI.",
      creator: { "@id": `${SITE_URL}/#author` },
    },
    {
      "@type": "Dataset",
      "@id": `${SITE_URL}/#dataset`,
      name: "ChatGPT Ads Brasil 2026 — fatos e métricas auditadas",
      description:
        "Conjunto editorial de fatos verificáveis sobre escala do ChatGPT, disponibilidade do Ads Manager, expansão, modelos de compra e orientação de lance, cada um acompanhado de contexto e ressalva.",
      url: `${SITE_URL}/knowledge.json`,
      creator: { "@id": `${SITE_URL}/#author` },
      dateModified: LAST_EDITORIAL_REVIEW_ISO,
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      citation: primarySources,
      variableMeasured: authorityMetrics.map((metric) => ({
        "@type": "PropertyValue",
        name: metric.label,
        value: metric.value,
        description: `${metric.context} ${metric.caveat}`,
        url: metric.source.url,
      })),
      distribution: [
        {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: `${SITE_URL}/knowledge.json`,
        },
        {
          "@type": "DataDownload",
          encodingFormat: "text/plain",
          contentUrl: `${SITE_URL}/llms-full.txt`,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: searchIntentAnswers.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
          url: `${SITE_URL}${item.href}`,
        },
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "ChatGPT Ads Brasil 2026: como anunciar, preços e métricas | volponi.tech",
      description:
        "Aprenda como anunciar no ChatGPT no Brasil em 2026 com exemplos oficiais, Ads Manager, preços, métricas, privacidade, Radar e fontes primárias.",
      image: socialImage,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: socialImage,
        width: 1200,
        height: 630,
      },
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: [
        { "@type": "Thing", name: "ChatGPT Ads" },
        { "@type": "Thing", name: "OpenAI Ads Manager" },
        { "@type": "Thing", name: "Publicidade conversacional com IA" },
      ],
      hasPart: [
        { "@type": "WebPage", name: "ChatGPT Ads no Brasil", url: `${SITE_URL}/chatgpt-ads-brasil` },
        { "@type": "WebPage", name: "Quanto custa anunciar no ChatGPT", url: `${SITE_URL}/chatgpt-ads-precos` },
        { "@type": "WebPage", name: "Métricas do ChatGPT Ads", url: `${SITE_URL}/chatgpt-ads-metricas` },
        { "@type": "WebPage", name: "OpenAI Ads Manager", url: `${SITE_URL}/ads-manager-chatgpt` },
        { "@type": "WebPage", name: "Privacidade no ChatGPT Ads", url: `${SITE_URL}/chatgpt-ads-privacidade` },
        { "@type": "CollectionPage", name: "Volponi ChatGPT Ads Radar", url: `${SITE_URL}/radar` },
      ],
      author: { "@id": `${SITE_URL}/#author` },
      inLanguage: "pt-BR",
      dateModified: LAST_EDITORIAL_REVIEW_ISO,
    },
  ],
};

export default function HomeStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
