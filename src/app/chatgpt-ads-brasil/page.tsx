import type { Metadata } from "next";

import { TopicArticle } from "@/components/topic-article";
import { SOURCES } from "@/lib/authority-data";
import { socialImageForPath } from "@/lib/seo";

const URL = "https://openai-ads.volponi.tech/chatgpt-ads-brasil";
const SOCIAL_IMAGE = socialImageForPath("/chatgpt-ads-brasil");

export const metadata: Metadata = {
  title: "ChatGPT Ads no Brasil: disponibilidade, planos e lançamento (2026)",
  description:
    "ChatGPT Ads no Brasil em 2026: lançamento, Ads Manager disponível, planos Free/Go com anúncios, limites atuais e fontes oficiais auditadas.",
  alternates: { canonical: URL },
  openGraph: {
    title: "ChatGPT Ads no Brasil: disponibilidade e lançamento (2026)",
    description: "Ads Manager, planos com anúncios, datas e limites atuais explicados com fontes primárias.",
    url: URL,
    type: "article",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "ChatGPT Ads no Brasil: disponibilidade e lançamento em 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT Ads no Brasil: disponibilidade e lançamento (2026)",
    description: "Ads Manager, planos com anúncios, datas e limites atuais com fontes primárias.",
    images: [SOCIAL_IMAGE],
  },
};

export default function ChatGPTAdsBrasilPage() {
  return (
    <TopicArticle
      canonical={URL}
      eyebrow="ChatGPT Ads Brasil · atualização 25/08/2026"
      title="ChatGPT Ads no Brasil: o estado atual, sem extrapolar o que a fonte diz."
      description="O Brasil já aparece como mercado disponível no Ads Manager. Isso abre uma frente real para anunciantes — mas disponibilidade, inventário, autosserviço, planos elegíveis e performance continuam sendo coisas diferentes."
      summary="Sim: o ChatGPT Ads foi lançado no Brasil em 11 de agosto de 2026 e, na auditoria de 25 de agosto, o Ads Manager oficial lista o Brasil como disponível. Anúncios podem aparecer nos planos Free e Go; Plus, Pro, Business, Enterprise e Edu permanecem sem anúncios."
      facts={[
        { label: "Lançamento no Brasil", value: "11/08/2026", note: "Data confirmada pela OpenAI na atualização oficial do produto." },
        { label: "Ads Manager", value: "Disponível", note: "Brasil consta como disponível na página oficial de países suportados." },
        { label: "Planos com anúncios", value: "Free + Go", note: "A exibição depende de elegibilidade e disponibilidade do produto." },
        { label: "Planos sem anúncios", value: "5", note: "Plus, Pro, Business, Enterprise e Edu permanecem sem anúncios." },
        { label: "Resposta do ChatGPT", value: "Independente", note: "Anúncios não alteram nem compram a resposta do modelo." },
        { label: "Revisão", value: "25/08/2026", note: "Produto beta: confirme novamente antes de operar mídia." },
      ]}
      sections={[
        {
          title: "O que mudou em agosto de 2026",
          paragraphs: [
            "Em 11 de agosto de 2026, a OpenAI informou que o ChatGPT Ads havia sido lançado no Reino Unido, México, Brasil, Japão e Coreia do Sul. O anúncio deu continuidade ao teste iniciado nos Estados Unidos em fevereiro e à expansão comunicada em maio.",
            "A mudança importante para o mercado brasileiro é dupla: existe presença formal do produto no país e o Brasil aparece como disponível na superfície de Ads Manager auditada em 25 de agosto. Isso é mais concreto do que uma lista de interesse ou previsão de lançamento.",
          ],
        },
        {
          title: "Quem pode ver anúncios",
          paragraphs: [
            "A documentação atual diz que anúncios podem aparecer para usuários dos planos Free e Go. Plus, Pro, Business, Enterprise e Edu permanecem sem anúncios. Contas identificadas como pertencentes a menores de 18 anos também não recebem anúncios.",
            "Isso significa que a base total de usuários do ChatGPT não deve ser tratada como audiência publicitária disponível. Elegibilidade de plano, mercado, inventário e controles do produto reduzem o universo potencial de veiculação.",
          ],
          bullets: [
            "Free e Go: podem receber anúncios.",
            "Plus, Pro, Business, Enterprise e Edu: sem anúncios na documentação atual.",
            "Menores de 18 anos identificados pela plataforma: sem anúncios.",
            "Disponibilidade operacional deve ser confirmada na conta antes da campanha.",
          ],
        },
        {
          title: "O que o anunciante não deve concluir",
          paragraphs: [
            "Estar disponível no Brasil não significa ter qualquer volume garantido, CPC previsível ou benchmark universal. Também não significa que todos os recursos liberados em outro mercado estejam automaticamente disponíveis na mesma configuração para toda conta brasileira.",
            "A forma mais responsável de entrar no canal é tratar disponibilidade como condição necessária, não como prova de performance: confirmar conta, instrumentar mensuração, definir hipótese, rodar teste controlado e reconciliar resultado com dados próprios.",
          ],
        },
      ]}
      sources={[
        SOURCES.adsLaunch,
        SOURCES.availability,
        SOURCES.generalAds,
      ]}
      related={[
        { label: "Preços e modelos de compra", href: "/chatgpt-ads-precos" },
        { label: "Métricas e fórmulas", href: "/chatgpt-ads-metricas" },
        { label: "Ads Manager", href: "/ads-manager-chatgpt" },
        { label: "Privacidade", href: "/chatgpt-ads-privacidade" },
      ]}
    />
  );
}
