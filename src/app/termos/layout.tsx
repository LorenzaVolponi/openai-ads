import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Termos, Independência e Isenção | volponi.tech",
    description: "Declaração de independência da OpenAI, uso de marcas de terceiros e limites editoriais do guia mantido por Lorenza Volponi / volponi.tech.",
    url: "https://openai-ads.volponi.tech/termos",
    siteName: "volponi.tech",
    type: "website",
    locale: "pt_BR",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Termos e independência | volponi.tech",
    description: "Projeto editorial independente, sem afiliação, patrocínio ou endosso da OpenAI.",
    images: ["/og.png"],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
