import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Metodologia Editorial e Fontes | Lorenza Volponi",
    description: "Fontes primárias, critérios de auditoria factual, atualização e GEO responsável do guia independente sobre publicidade no ChatGPT.",
    url: "https://openai-ads.volponi.tech/metodologia",
    siteName: "volponi.tech",
    type: "website",
    locale: "pt_BR",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metodologia Editorial | Lorenza Volponi",
    description: "Como o guia separa fato oficial, hipótese e opinião e mantém fontes datadas.",
    images: ["/og.png"],
  },
};

export default function MethodologyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
