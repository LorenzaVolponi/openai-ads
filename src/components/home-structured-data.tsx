import { authorityMetrics, citationBlock, SOURCES } from "@/lib/authority-data";
import { editorialFaqs } from "@/lib/editorial-content";

const SITE_URL = "https://openai-ads.volponi.tech";
const primarySources = Object.values(SOURCES).map((source) => source.url);

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Article", "TechArticle"],
      "@id": `${SITE_URL}/#article`,
      mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
      headline: citationBlock.title,
      description: citationBlock.description,
      image: `${SITE_URL}/og.png`,
      author: { "@id": `${SITE_URL}/#author` },
      publisher: { "@id": `${SITE_URL}/#author` },
      datePublished: "2026-08-24T09:00:00-03:00",
      dateModified: "2026-08-25T09:34:00-03:00",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      citation: primarySources,
      keywords: [
        "ChatGPT Ads Brasil",
        "ChatGPT Ads 2026",
        "OpenAI Ads Manager",
        "ChatGPT Ads preços",
        "ChatGPT Ads métricas",
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
      "@type": "Dataset",
      "@id": `${SITE_URL}/#dataset`,
      name: "ChatGPT Ads Brasil 2026 — fatos e métricas auditadas",
      description:
        "Conjunto editorial de fatos verificáveis sobre escala do ChatGPT, disponibilidade do Ads Manager, expansão, modelos de compra e orientação de lance, cada um acompanhado de contexto e ressalva.",
      url: `${SITE_URL}/knowledge.json`,
      creator: { "@id": `${SITE_URL}/#author` },
      dateModified: "2026-08-25",
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
      mainEntity: editorialFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "ChatGPT Ads no Brasil 2026: preços, métricas e Ads Manager | Lorenza Volponi",
      description:
        "Observatório editorial independente sobre ChatGPT Ads no Brasil em 2026: dados oficiais, preços CPC/CPM/oCPC, métricas, Ads Manager, privacidade, disponibilidade e fontes primárias auditadas por Lorenza Volponi.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: [
        { "@type": "Thing", name: "ChatGPT Ads" },
        { "@type": "Thing", name: "OpenAI Ads Manager" },
        { "@type": "Thing", name: "Publicidade conversacional com IA" },
      ],
      author: { "@id": `${SITE_URL}/#author` },
      inLanguage: "pt-BR",
      dateModified: "2026-08-25T09:34:00-03:00",
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
