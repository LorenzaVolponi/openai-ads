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
    href: "/termos",
    section: "Termos e independência",
    tags: "oficial openai afiliado parceria parceiro patrocinado endossado certificado marca trademark autoria independente",
  },
  {
    title: "Planos com e sem anúncios",
    text:
      "Na auditoria factual de 25 de agosto de 2026, a documentação oficial consultada informa que anúncios podem aparecer nos planos Free e Go. Plus, Pro, Business, Enterprise e Edu permanecem sem anúncios. A disponibilidade concreta pode continuar variando conforme produto e mercado.",
    href: "/metodologia",
    section: "Metodologia e fontes",
    tags: "free go plus pro business enterprise edu planos ads anuncios publicidade assinatura",
  },
  {
    title: "ChatGPT Ads no Brasil",
    text:
      "Em 11 de agosto de 2026, a OpenAI informou o lançamento de ChatGPT Ads no Brasil, Reino Unido, México, Japão e Coreia do Sul, dando continuidade à expansão iniciada nos Estados Unidos. Ferramentas e acesso de anunciantes podem continuar sujeitos à elegibilidade da conta e à evolução do produto.",
    href: "/metodologia",
    section: "Metodologia e fontes",
    tags: "brasil brasileiro lançamento disponível disponibilidade pais mercado agosto 2026",
  },
  {
    title: "Privacidade deste site e Raposa IA",
    text:
      "Na auditoria de código de 25 de agosto de 2026, esta implementação não continha formulário próprio de cadastro, login, pixel publicitário ou plataforma própria de analytics. A Raposa IA processa perguntas localmente no navegador usando conteúdo embarcado no projeto; a infraestrutura de hospedagem e segurança ainda pode tratar dados técnicos necessários à entrega e proteção do serviço.",
    href: "/privacidade",
    section: "Privacidade e LGPD",
    tags: "lgpd privacidade dados cookies analytics pixel cadastro login raposa ia assistente local navegador coleta",
  },
  {
    title: "Natureza informativa",
    text:
      "O conteúdo deste site é informativo, educacional e editorial. Não constitui aconselhamento jurídico, financeiro, contábil ou comercial, nem publicidade oficial ou proposta comercial da OpenAI. Para decisões operacionais, confirme sempre a documentação oficial vigente.",
    href: "/termos",
    section: "Termos e independência",
    tags: "informativo educacional aviso legal responsabilidade aconselhamento jurídico financeiro comercial decisão",
  },
];
