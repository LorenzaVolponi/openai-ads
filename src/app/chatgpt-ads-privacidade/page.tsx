import type { Metadata } from "next";

import { TopicArticle } from "@/components/topic-article";
import { SOURCES } from "@/lib/authority-data";

const URL = "https://openai-ads.volponi.tech/chatgpt-ads-privacidade";

export const metadata: Metadata = {
  title: "ChatGPT Ads privacidade 2026: conversas, personalização e anunciantes | Lorenza Volponi",
  description:
    "Como funciona a privacidade no ChatGPT Ads: anúncios separados das respostas, anunciantes sem acesso a chats e memórias, personalização e controles do usuário.",
  alternates: { canonical: URL },
  openGraph: {
    title: "ChatGPT Ads e privacidade — o que anunciantes veem e não veem",
    description: "Conversas, memória, personalização, dados agregados e separação entre anúncio e resposta.",
    url: URL,
    type: "article",
  },
};

export default function ChatGPTAdsPrivacidadePage() {
  return (
    <TopicArticle
      eyebrow="Privacidade · atualização 25/08/2026"
      title="O sistema de anúncios pode usar contexto. O anunciante não recebe sua conversa."
      description="A nuance mais importante da privacidade do ChatGPT Ads é separar o que o sistema usa para selecionar anúncios daquilo que é efetivamente compartilhado com o anunciante."
      summary="Segundo a documentação oficial, anunciantes não veem chats, histórico, memórias ou dados pessoais. Anúncios são separados das respostas e não as influenciam. O sistema de ads pode considerar contexto e intenção da conversa atual e, quando a personalização está habilitada, sinais selecionados da experiência mais ampla do usuário."
      facts={[
        { label: "Anunciantes veem chats?", value: "Não", note: "A documentação diz que conversas, histórico e memórias não são expostos a anunciantes." },
        { label: "Anúncio muda a resposta?", value: "Não", note: "Os sistemas de ads e de resposta são descritos como separados." },
        { label: "Dados de performance", value: "Agregados", note: "Anunciantes recebem sinais agregados como visualizações e cliques." },
        { label: "Contexto atual", value: "Pode ser usado", note: "O sistema de ads pode considerar intenção e contexto para relevância." },
        { label: "Personalização", value: "Controlável", note: "Controles do usuário alteram como sinais mais amplos podem ser usados." },
        { label: "Menores de 18", value: "Sem anúncios", note: "Contas identificadas como menores não recebem anúncios." },
      ]}
      sections={[
        {
          title: "O que o sistema de ads pode considerar",
          paragraphs: [
            "A documentação descreve seleção baseada em relevância e resultados esperados. Entre os sinais citados estão contexto e intenção da conversa atual, landing page, título e texto do anúncio, context hints fornecidos pelo anunciante e sinais adicionais da experiência do usuário quando a personalização de anúncios está habilitada.",
            "Isso significa que contexto pode participar da decisão de veiculação sem que o conteúdo integral da conversa seja entregue ao anunciante. Sistema de seleção e compartilhamento de dados são etapas diferentes.",
          ],
        },
        {
          title: "O que o anunciante não recebe",
          paragraphs: [
            "A OpenAI afirma que anunciantes não veem chats, histórico de conversas, memórias ou dados pessoais dos usuários. O que é compartilhado para fins de performance é descrito em termos agregados, como número total de visualizações ou cliques.",
            "Essa distinção é central para governança de mídia: não trate ‘contexto conversacional’ como se fosse uma lista de prompts disponível para exportação ou segmentação direta por terceiros.",
          ],
        },
        {
          title: "Personalização não é a mesma coisa que presença de anúncios",
          paragraphs: [
            "Desativar personalização altera como anúncios são escolhidos; não necessariamente remove a publicidade. A documentação também descreve uma opção de experiência Free sem anúncios com limites reduzidos, além de planos pagos sem anúncios.",
            "O usuário continua tendo controles sobre anúncios e pode, conforme a interface, ocultar, indicar irrelevância, reportar ou consultar por que um anúncio foi exibido.",
          ],
        },
        {
          title: "Privacidade deste observatório",
          paragraphs: [
            "Este projeto não exige cadastro, não solicita e-mail e não foi desenhado como funil de captura. A política própria do site detalha o estado técnico auditado, infraestrutura, cookies, logs técnicos e direitos LGPD aplicáveis.",
            "A ausência de coleta comercial é uma escolha de produto: o objetivo aqui é publicar uma peça de referência e evidência autoral, não transformar leitura em lead.",
          ],
        },
      ]}
      sources={[
        SOURCES.generalAds,
        SOURCES.adsBasics,
        SOURCES.adPolicies,
      ]}
      related={[
        { label: "Política de privacidade/LGPD deste site", href: "/privacidade" },
        { label: "ChatGPT Ads no Brasil", href: "/chatgpt-ads-brasil" },
        { label: "Ads Manager", href: "/ads-manager-chatgpt" },
        { label: "Observatório completo", href: "/" },
      ]}
    />
  );
}
