import type { Metadata } from "next";

export const metadata: Metadata = {
  openGraph: {
    title: "Privacidade e LGPD | volponi.tech",
    description: "Política de privacidade e transparência LGPD do guia editorial independente mantido por Lorenza Volponi / volponi.tech.",
    url: "https://openai-ads.volponi.tech/privacidade",
    siteName: "volponi.tech",
    type: "website",
    locale: "pt_BR",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacidade e LGPD | volponi.tech",
    description: "Transparência de dados e LGPD do projeto editorial independente.",
    images: ["/og.png"],
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
