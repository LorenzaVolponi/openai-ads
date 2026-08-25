export type AuditedKnowledgeItem = {
  title: string;
  text: string;
  href: string;
  section: string;
  tags: string;
};

export const AUDITED_KNOWLEDGE: AuditedKnowledgeItem[] = [
  {
    title: "Independência da OpenAI",
    text:
      "Este site é um projeto editorial independente de Lorenza Volponi / volponi.tech. Não é afiliado, patrocinado, endossado, certificado, operado ou mantido pela OpenAI. OpenAI, ChatGPT, GPT e marcas relacionadas pertencem aos seus respectivos titulares.",
    href: "#faq",
    section: "FAQ",
    tags: "oficial openai afiliado parceria parceiro patrocinado endossado certificado marca trademark autoria independente lorenza volponi",
  },
  {
    title: "Planos com e sem anúncios",
    text:
      "Na auditoria factual de 25 de agosto de 2026, anúncios podem aparecer nos planos Free e Go. Plus, Pro, Business, Enterprise e Edu permanecem sem anúncios. Contas identificadas como pertencentes a menores de 18 anos também não recebem anúncios.",
    href: "#faq",
    section: "FAQ",
    tags: "free go plus pro business enterprise edu planos ads anuncios publicidade assinatura menor 18",
  },
  {
    title: "ChatGPT Ads no Brasil",
    text:
      "A OpenAI confirmou o lançamento de ChatGPT Ads no Brasil em 11 de agosto de 2026. Na auditoria de 25 de agosto, a página oficial do Ads Manager listava o Brasil entre nove países disponíveis. Produto e acesso continuam sujeitos à evolução do beta.",
    href: "#cronograma",
    section: "Linha do tempo",
    tags: "brasil brasileiro lançamento disponível disponibilidade pais mercado agosto 2026 ads manager nove 9",
  },
  {
    title: "Escala do ChatGPT não é alcance publicitário",
    text:
      "A OpenAI declarou mais de 900 milhões de usuários semanais do ChatGPT, mais de 9 milhões de usuários empresariais pagantes e mais de 50 milhões de assinantes consumidores em fevereiro de 2026. Esses números descrevem escala do produto; não equivalem a inventário de anúncios, usuários elegíveis, alcance de campanha ou audiência comprável.",
    href: "#dados-reais",
    section: "Dados reais",
    tags: "900m 900 milhões usuarios semanais audiência alcance inventário 9m business 50m assinantes escala",
  },
  {
    title: "Preços e modelos de compra",
    text:
      "O Ads Manager documenta compra por CPM, CPC e oCPC. Para campanhas CPC, a OpenAI recomenda começar com lance máximo de US$ 3 a US$ 5 por clique. Essa faixa é orientação de bid máximo inicial, não CPC médio realizado nem benchmark universal.",
    href: "#produto-real",
    section: "Produto real",
    tags: "preço preco custa custo cpc cpm ocpc bid lance 3 5 dolar dólares us$ benchmark",
  },
  {
    title: "Leilão e relevância",
    text:
      "A documentação descreve um leilão de segundo preço ponderado por relevância e resultados esperados. Sinais podem incluir contexto e intenção da conversa atual, landing page, título, texto e context hints. Context hints não são palavras-chave de correspondência exata e não garantem veiculação em conversas específicas.",
    href: "#produto-real",
    section: "Produto real",
    tags: "leilão auction segundo preço relevância context hints palavra chave keyword segmentação targeting intenção",
  },
  {
    title: "Métricas do Ads Manager",
    text:
      "O Ads Manager Beta reporta impressões, cliques, gasto, CTR, CPC médio, CPM médio e conversões quando a mensuração está configurada. Para negócio, complete a leitura com CVR, CPA, receita e ROAS e lembre que atribuição não é causalidade.",
    href: "#metricas",
    section: "Métricas",
    tags: "metricas dashboard impressões cliques gasto ctr cpc cpm conversões cvr cpa roas relatório reporting",
  },
  {
    title: "Expansão europeia",
    text:
      "A OpenAI anunciou expansão de ChatGPT Ads para 31 mercados europeus com entrada em operação em 24 de agosto de 2026. Presença de anúncios em um mercado e acesso autosserviço ao Ads Manager não devem ser tratados como a mesma coisa.",
    href: "#cronograma",
    section: "Linha do tempo",
    tags: "europa europeu 31 mercados expansão 24 agosto 2026 autosserviço self service ads manager",
  },
  {
    title: "Privacidade do ChatGPT Ads",
    text:
      "Anunciantes não recebem chats, histórico de conversas, memórias ou dados pessoais dos usuários. A documentação descreve dados agregados de desempenho. O sistema de ads pode usar contexto e intenção para relevância; isso não significa entregar a conversa ao anunciante. Anúncios não influenciam a resposta do ChatGPT.",
    href: "#privacidade",
    section: "Privacidade",
    tags: "privacidade conversa chat memória anunciante dados pessoais agregado resposta influencia contexto intenção",
  },
  {
    title: "Privacidade deste site e Raposa IA",
    text:
      "Na auditoria de código de 25 de agosto de 2026, esta implementação não continha formulário próprio de cadastro, login, pixel publicitário ou plataforma própria de analytics. A Raposa IA processa perguntas localmente no navegador usando conteúdo embarcado; infraestrutura de hospedagem e segurança ainda pode tratar dados técnicos necessários à entrega e proteção do serviço.",
    href: "#privacidade",
    section: "Privacidade",
    tags: "lgpd privacidade dados cookies analytics pixel cadastro login raposa ia assistente local navegador coleta formulario email",
  },
  {
    title: "Natureza informativa",
    text:
      "O conteúdo deste site é informativo, educacional e editorial. Não constitui aconselhamento jurídico, financeiro, contábil ou comercial, nem publicidade oficial ou proposta comercial da OpenAI. Para decisões operacionais, confirme sempre a documentação oficial vigente.",
    href: "#faq",
    section: "FAQ",
    tags: "informativo educacional aviso legal responsabilidade aconselhamento jurídico financeiro comercial decisão",
  },
];
