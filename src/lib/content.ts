import {
  Activity,
  BadgeCheck,
  BookOpen,
  EyeOff,
  FileText,
  Globe,
  Layers,
  LockKeyhole,
  MessageSquareText,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

// Fonte única de verdade do guia e da Raposa IA.
// Regra editorial: fatos de produto devem ser sustentáveis por superfícies oficiais;
// estimativas, rumores ou recursos sem documentação pública não são apresentados como fatos.

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "O que são", href: "#o-que-sao" },
  { label: "Como aparecem", href: "#como-funciona" },
  { label: "Privacidade", href: "#privacidade" },
  { label: "Para anunciantes", href: "#api" },
  { label: "Medição", href: "#medicao" },
  { label: "Comparativo", href: "#comparativo" },
  { label: "Checklist", href: "#checklist" },
  { label: "Glossário", href: "#glossario" },
  { label: "FAQ", href: "#faq" },
];

export const tocItems = [
  { n: "01", label: "O que são", href: "#o-que-sao" },
  { n: "02", label: "Estado em 2026", href: "#cronograma" },
  { n: "03", label: "Para quem", href: "#para-quem" },
  { n: "04", label: "Como aparecem", href: "#como-funciona" },
  { n: "05", label: "Privacidade", href: "#privacidade" },
  { n: "06", label: "Comparativo", href: "#comparativo" },
  { n: "07", label: "Dados e custos", href: "#benchmarks" },
  { n: "08", label: "Recursos", href: "#api" },
  { n: "09", label: "Medição", href: "#medicao" },
  { n: "10", label: "Estratégias", href: "#estrategias" },
  { n: "11", label: "Erros comuns", href: "#erros" },
  { n: "12", label: "Checklist", href: "#checklist" },
  { n: "13", label: "Glossário", href: "#glossario" },
  { n: "14", label: "FAQ", href: "#faq" },
];

export const marqueeTerms = [
  "chatgpt ads 2026",
  "publicidade no chatgpt",
  "openai ads",
  "anúncios patrocinados",
  "privacidade em ads",
  "mensuração",
  "publicidade com IA",
  "marketing com IA",
];

export const SHARE_URL = "https://openai-ads.volponi.tech";
export const SHARE_TEXT =
  "ChatGPT Ads 2026: guia independente em português sobre publicidade no ChatGPT, privacidade, mensuração e boas práticas. Por volponi.tech";

export type AudienceCard = { icon: LucideIcon; title: string; desc: string };
export type AudienceTab = { id: string; label: string; icon: LucideIcon; cards: AudienceCard[] };

export const audienceTabs: AudienceTab[] = [
  {
    id: "brands",
    label: "Marcas",
    icon: Target,
    cards: [
      {
        icon: MessageSquareText,
        title: "Relevância antes de volume",
        desc: "Trate o ChatGPT como um ambiente conversacional: a peça patrocinada precisa ser útil e claramente identificável, não imitar a resposta orgânica.",
      },
      {
        icon: ShieldCheck,
        title: "Brand safety",
        desc: "Defina categorias, páginas de destino, promessas e linguagem aprovadas antes de escalar investimento.",
      },
      {
        icon: SearchCheck,
        title: "Teste com evidência",
        desc: "Compare resultado incremental com seus canais atuais e só escale depois de observar dados reais da conta.",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: Layers,
    cards: [
      {
        icon: FileText,
        title: "Catálogo consistente",
        desc: "Se a sua conta oferecer integração de catálogo ou feed, mantenha título, preço, disponibilidade e URL atualizados na origem.",
      },
      {
        icon: Activity,
        title: "Medição de conversão",
        desc: "Valide eventos e atribuição antes de usar qualquer otimização automática disponível na plataforma.",
      },
      {
        icon: BadgeCheck,
        title: "Landing pages confiáveis",
        desc: "Preço, frete, estoque e política comercial precisam bater com o que o anúncio promete.",
      },
    ],
  },
  {
    id: "b2b",
    label: "B2B",
    icon: Users,
    cards: [
      {
        icon: Target,
        title: "Intenção comercial",
        desc: "Use ofertas objetivas e páginas de destino específicas; não suponha segmentações profissionais que sua conta não mostre explicitamente.",
      },
      {
        icon: SearchCheck,
        title: "Qualidade do lead",
        desc: "Meça lead qualificado e receita, não apenas clique. Um canal novo só é bom se melhorar o funil de verdade.",
      },
      {
        icon: LockKeyhole,
        title: "Dados mínimos",
        desc: "Evite enviar dados sensíveis ou desnecessários em parâmetros, URLs, criativos e eventos de mensuração.",
      },
    ],
  },
  {
    id: "agencies",
    label: "Agências",
    icon: Globe,
    cards: [
      {
        icon: BookOpen,
        title: "Documente a disponibilidade",
        desc: "Recursos podem variar por país, conta e estágio do produto. Registre o que está realmente habilitado para cada cliente.",
      },
      {
        icon: FileText,
        title: "Fonte oficial primeiro",
        desc: "Use documentação e interfaces oficiais como fonte primária; não venda como disponível aquilo que existe apenas em rumor ou print de terceiros.",
      },
      {
        icon: Sparkles,
        title: "Aprendizado disciplinado",
        desc: "Crie hipóteses, teste, meça e atualize playbooks conforme o produto evolui — sem transformar beta em promessa comercial.",
      },
    ],
  },
];

export type CompareRow = { feature: string; advantage: boolean; note: string };
export type CompareTab = { id: string; label: string; rows: CompareRow[] };

export const comparisonTabs: CompareTab[] = [
  {
    id: "google",
    label: "Google Ads",
    rows: [
      {
        feature: "Maturidade operacional",
        advantage: false,
        note: "Google Ads tem ecossistema, inventário, documentação e histórico muito mais maduros. ChatGPT Ads ainda deve ser tratado como canal em evolução.",
      },
      {
        feature: "Contexto de uso",
        advantage: true,
        note: "O ChatGPT é conversacional, o que cria um contexto diferente de busca. Isso é uma característica do ambiente, não garantia de conversão.",
      },
      {
        feature: "Benchmark próprio",
        advantage: false,
        note: "Não assuma CPC ou CTR melhores. Compare com dados reais da sua conta e do seu negócio.",
      },
    ],
  },
  {
    id: "meta",
    label: "Meta Ads",
    rows: [
      {
        feature: "Formatos e escala",
        advantage: false,
        note: "Meta possui formatos visuais e ferramentas de mídia consolidados; a experiência de ads no ChatGPT é mais recente.",
      },
      {
        feature: "Experiência conversacional",
        advantage: true,
        note: "O contexto é uma conversa, mas o conteúdo patrocinado permanece separado da resposta do assistente e deve ser claramente rotulado.",
      },
      {
        feature: "Planejamento",
        advantage: false,
        note: "Use ChatGPT Ads como experimento incremental até ter dados suficientes para justificar redistribuição de orçamento.",
      },
    ],
  },
  {
    id: "linkedin",
    label: "LinkedIn Ads",
    rows: [
      {
        feature: "Dados profissionais",
        advantage: false,
        note: "LinkedIn parte de uma rede profissional. Não presuma que o ChatGPT oferece as mesmas dimensões de segmentação.",
      },
      {
        feature: "Novo contexto de descoberta",
        advantage: true,
        note: "O ChatGPT abre um contexto adicional de descoberta e consideração; valide o fit para o seu ICP antes de escalar.",
      },
      {
        feature: "Custo",
        advantage: false,
        note: "Sem benchmark oficial universal, qualquer promessa de CPC menor é especulativa. Use o custo real observado na campanha.",
      },
    ],
  },
];

export type ApiTool = { icon: LucideIcon; title: string; desc: string; detail: string };

export const apiTools: ApiTool[] = [
  {
    icon: MessageSquareText,
    title: "Ads Manager / superfícies oficiais",
    desc: "Use somente interfaces oficiais disponibilizadas à sua conta.",
    detail:
      "Disponibilidade, formatos, mercados e controles podem mudar. A interface da sua conta e a documentação oficial são a fonte operacional de verdade.",
  },
  {
    icon: Activity,
    title: "Mensuração",
    desc: "Configure apenas métodos e eventos documentados para sua conta.",
    detail:
      "Valide disparos, atribuição, consentimento e qualidade do dado. Não envie dados sensíveis nem presuma nomes de eventos ou APIs sem documentação oficial.",
  },
  {
    icon: FileText,
    title: "Catálogo e feeds",
    desc: "Use integrações de produto quando estiverem disponíveis oficialmente.",
    detail:
      "Mantenha catálogo e landing page consistentes. Recursos de feed podem ter regras e disponibilidade diferentes por mercado ou conta.",
  },
  {
    icon: ShieldCheck,
    title: "Políticas de anúncios",
    desc: "Criativo, destino e oferta precisam obedecer às políticas vigentes.",
    detail:
      "Faça revisão de políticas antes do lançamento e novamente quando a OpenAI atualizar requisitos, categorias ou mercados.",
  },
  {
    icon: LockKeyhole,
    title: "Privacidade",
    desc: "Publicidade é separada das respostas e conversas são privadas dos anunciantes.",
    detail:
      "Não trate a conversa do usuário como dado do anunciante. A experiência de ads deve respeitar a separação entre resposta do assistente e conteúdo patrocinado.",
  },
  {
    icon: SearchCheck,
    title: "Verificação contínua",
    desc: "Produto novo exige documentação viva.",
    detail:
      "Antes de publicar uma afirmação sobre API, formato, preço ou disponibilidade, confirme em fonte oficial e registre a data da verificação.",
  },
];

export type MeasurementEvent = {
  event: string;
  type: "pixel" | "capi" | "both";
  desc: string;
};

export const measurementEvents: MeasurementEvent[] = [
  { event: "impression", type: "pixel", desc: "Exposição ao anúncio, quando disponibilizada pela plataforma." },
  { event: "click", type: "pixel", desc: "Clique ou visita originada do anúncio." },
  { event: "conversion", type: "both", desc: "Conversão definida pela operação e suportada pela configuração oficial da conta." },
  { event: "value", type: "both", desc: "Valor de negócio associado à conversão, quando suportado e necessário." },
];

export type Strategy = { icon: LucideIcon; title: string; desc: string };

export const strategies: Strategy[] = [
  {
    icon: SearchCheck,
    title: "Comece com uma hipótese",
    desc: "Defina o que o canal precisa provar: alcance incremental, lead qualificado, venda ou redução de custo. Sem hipótese, qualquer gráfico parece sucesso.",
  },
  {
    icon: Activity,
    title: "Meça antes de escalar",
    desc: "Confirme tracking, qualidade do lead e receita antes de aumentar orçamento. Clique é sinal intermediário, não resultado final.",
  },
  {
    icon: ShieldCheck,
    title: "Proteja a marca",
    desc: "Revise promessa, destino, política e contexto. Em um ambiente de confiança, incoerência custa mais que um CPC ruim.",
  },
  {
    icon: FileText,
    title: "Documente o que é oficial",
    desc: "Mantenha um registro datado de formatos, mercados e recursos disponíveis na conta. Produto beta muda rápido.",
  },
  {
    icon: LockKeyhole,
    title: "Minimize dados",
    desc: "Envie somente o necessário para mensuração e operação. Evite PII em URLs, parâmetros e eventos.",
  },
  {
    icon: Sparkles,
    title: "Atualize o playbook",
    desc: "Revisite premissas periodicamente. O que era beta, indisponível ou experimental pode mudar — e a documentação deve mudar junto.",
  },
];

export type GlossaryTerm = { term: string; desc: string };

export const glossary: GlossaryTerm[] = [
  { term: "ChatGPT Ads", desc: "Conteúdo publicitário exibido na experiência do ChatGPT, separado da resposta do assistente e claramente identificado como patrocinado." },
  { term: "Sponsored", desc: "Sinalização de conteúdo patrocinado. O anúncio é separado da mensagem do assistente." },
  { term: "Ads Manager", desc: "Superfície de gestão de anúncios quando disponibilizada pela OpenAI à conta do anunciante." },
  { term: "CPC", desc: "Custo por clique. Só use como benchmark depois de observar dados reais da campanha ou uma fonte confiável e datada." },
  { term: "CPM", desc: "Custo por mil impressões. A disponibilidade do modelo de compra depende da plataforma e da configuração vigente." },
  { term: "CTR", desc: "Taxa de cliques sobre impressões. É uma métrica intermediária e não substitui conversão ou receita." },
  { term: "Conversão", desc: "Ação de negócio definida pelo anunciante, como compra ou lead qualificado, desde que suportada pela mensuração configurada." },
  { term: "Atribuição", desc: "Regra usada para relacionar uma conversão a uma interação de mídia. Compare janelas e modelos antes de comparar canais." },
  { term: "Product Feed", desc: "Fonte estruturada de dados de produtos. Use somente integrações e campos oficialmente suportados pela sua conta." },
  { term: "PII", desc: "Informação pessoal identificável. Deve ser minimizada e nunca enviada por conveniência em URLs ou parâmetros de tracking." },
  { term: "Brand safety", desc: "Controles e práticas para proteger contexto, reputação, políticas e adequação da marca." },
  { term: "Incrementalidade", desc: "Quanto resultado adicional o canal gerou além do que ocorreria sem o investimento." },
  { term: "Beta", desc: "Produto ou recurso ainda em evolução. Disponibilidade, formato e comportamento podem mudar." },
  { term: "Free / Go", desc: "Planos nos quais a experiência com anúncios pode ser exibida, conforme disponibilidade e regras atuais do ChatGPT." },
  { term: "Ads-free", desc: "Experiência sem anúncios disponível em planos elegíveis ou opções de produto definidas pela OpenAI." },
];

export type TimelineEntry = { date: string; title: string; desc: string };

export const timeline: TimelineEntry[] = [
  {
    date: "Nov 2022",
    title: "ChatGPT é lançado",
    desc: "A OpenAI lança o ChatGPT, criando um novo comportamento de busca, descoberta e interação com informação.",
  },
  {
    date: "2025–2026",
    title: "Monetização e testes evoluem",
    desc: "A publicidade passa a integrar a discussão e a evolução do produto. Recursos e disponibilidade mudam conforme mercado, conta e estágio de lançamento.",
  },
  {
    date: "2026",
    title: "Anúncios fazem parte da experiência elegível",
    desc: "Na experiência atual, anúncios podem aparecer em planos elegíveis como Free e Go; planos pagos elegíveis permanecem sem anúncios. A publicidade é separada e rotulada.",
  },
  {
    date: "24 ago 2026",
    title: "Este guia é auditado",
    desc: "Conteúdo revisado para remover benchmarks sem fonte, datas futuras e recursos apresentados como oficiais sem confirmação pública suficiente.",
  },
];

export type Benchmark = {
  metric: string;
  chatgpt: string;
  google: string;
  meta: string;
  linkedin: string;
};

export const benchmarks: Benchmark[] = [
  {
    metric: "CPC médio",
    chatgpt: "Use o dado real da conta",
    google: "Varia por mercado",
    meta: "Varia por mercado",
    linkedin: "Varia por mercado",
  },
  {
    metric: "CTR médio",
    chatgpt: "Sem faixa universal confiável",
    google: "Varia por campanha",
    meta: "Varia por campanha",
    linkedin: "Varia por campanha",
  },
  {
    metric: "CPM médio",
    chatgpt: "Sem faixa universal confiável",
    google: "Varia por inventário",
    meta: "Varia por inventário",
    linkedin: "Varia por inventário",
  },
  {
    metric: "Maturidade",
    chatgpt: "Canal em evolução",
    google: "Alta",
    meta: "Alta",
    linkedin: "Alta",
  },
  {
    metric: "Regra de decisão",
    chatgpt: "Teste incremental",
    google: "Dados reais",
    meta: "Dados reais",
    linkedin: "Dados reais",
  },
];

export type Mistake = { icon: LucideIcon; title: string; desc: string };

export const mistakes: Mistake[] = [
  {
    icon: EyeOff,
    title: "Publicar rumor como recurso",
    desc: "API, formato, país ou modelo de compra só entra no playbook depois de confirmação oficial ou evidência direta na conta.",
  },
  {
    icon: Activity,
    title: "Prometer benchmark",
    desc: "Faixa de CPC ou CTR sem fonte datada cria falsa precisão. Use dados reais da operação e declare o período observado.",
  },
  {
    icon: LockKeyhole,
    title: "Mandar dados demais",
    desc: "Tracking não justifica coletar tudo. Minimize PII e mantenha consentimento, finalidade e retenção sob controle.",
  },
  {
    icon: Layers,
    title: "Copiar estratégia de outro canal",
    desc: "O contexto conversacional é diferente. Reaproveite princípios, não suposições de formato, segmentação ou performance.",
  },
  {
    icon: ShieldCheck,
    title: "Ignorar política e destino",
    desc: "A página de destino precisa cumprir o que o criativo promete e respeitar políticas atuais da plataforma.",
  },
  {
    icon: FileText,
    title: "Não datar a documentação",
    desc: "Em produto novo, conteúdo sem data envelhece rápido. Registre a última verificação e revise periodicamente.",
  },
];

export type ChecklistItem = { title: string; desc: string };

export const checklistItems: ChecklistItem[] = [
  { title: "Elegibilidade confirmada", desc: "A conta e o mercado têm acesso real à experiência de anúncios que você pretende usar." },
  { title: "Políticas revisadas", desc: "Oferta, categoria, criativo e destino atendem às regras vigentes." },
  { title: "Fonte oficial registrada", desc: "Recursos usados no plano têm referência oficial ou evidência direta na conta, com data." },
  { title: "Medição validada", desc: "Eventos e atribuição foram testados antes da campanha." },
  { title: "PII minimizada", desc: "URLs, parâmetros e eventos não carregam dados pessoais desnecessários." },
  { title: "Hipótese de teste definida", desc: "Existe uma pergunta clara que a campanha precisa responder." },
  { title: "Critério de sucesso definido", desc: "CPA, receita, lead qualificado ou outro KPI de negócio está acordado antes do lançamento." },
  { title: "Budget de teste separado", desc: "O experimento não depende de retirar verba de um canal comprovado antes de mostrar evidência." },
  { title: "Landing page auditada", desc: "Oferta, preço, disponibilidade e mensagem são consistentes com o anúncio." },
  { title: "Revisão agendada", desc: "Há uma rotina para revisar produto, políticas, dados e documentação." },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "O que são ChatGPT Ads?",
    a: "São anúncios exibidos na experiência do ChatGPT para usuários e planos elegíveis. O conteúdo patrocinado é separado da resposta do assistente e claramente identificado como anúncio.",
  },
  {
    q: "Os anúncios influenciam as respostas do ChatGPT?",
    a: "Não. Anúncios são separados das respostas do assistente e não determinam o conteúdo das respostas.",
  },
  {
    q: "Anunciantes podem ler minhas conversas?",
    a: "Não. As conversas são mantidas privadas dos anunciantes, e os dados do usuário não são vendidos a anunciantes.",
  },
  {
    q: "Quais planos podem mostrar anúncios?",
    a: "Na experiência atual, anúncios podem ser exibidos em planos Free e Go quando relevantes. Planos Enterprise, Plus e Pro permanecem sem anúncios; opções de experiência sem anúncios também podem existir conforme o produto vigente.",
  },
  {
    q: "Como sei que algo é um anúncio?",
    a: "O item patrocinado aparece separado da mensagem do assistente e com indicação clara de que é conteúdo patrocinado.",
  },
  {
    q: "Posso ocultar um anúncio irrelevante?",
    a: "Sim. A interface pode oferecer opções como ocultar, marcar como não relevante ou reportar o anúncio; a nomenclatura pode variar.",
  },
  {
    q: "Quanto custa anunciar no ChatGPT?",
    a: "Não existe uma faixa universal que este guia possa prometer com responsabilidade. Preço, modelo de compra e resultado dependem da disponibilidade da conta, mercado, inventário e campanha. Use o valor mostrado na superfície oficial e os dados reais do seu teste.",
  },
  {
    q: "ChatGPT Ads é mais barato que Google ou Meta?",
    a: "Não assuma isso. Sem dados comparáveis da mesma operação, qualquer afirmação de CPC menor é especulativa. Compare custo por resultado, qualidade e incrementalidade.",
  },
  {
    q: "Existe uma API pública de anúncios?",
    a: "Este guia não afirma a existência de uma API pública genérica sem documentação oficial suficiente. Use apenas endpoints e integrações explicitamente disponibilizados para sua conta e documentados pela OpenAI.",
  },
  {
    q: "Como medir resultados?",
    a: "Use os recursos de mensuração oficialmente disponibilizados à sua conta e valide o funil até o resultado de negócio. Não confunda impressão ou clique com conversão incremental.",
  },
  {
    q: "Posso usar catálogo de produtos?",
    a: "Integrações de catálogo ou feed devem ser usadas apenas quando estiverem disponíveis e documentadas para sua conta. Mantenha preço, estoque, URL e disponibilidade consistentes.",
  },
  {
    q: "Está disponível no Brasil?",
    a: "Disponibilidade de anúncios e ferramentas pode variar por plano, conta e mercado. Confirme na superfície oficial da OpenAI no momento da campanha, porque o produto evolui rapidamente.",
  },
  {
    q: "Qual é a principal regra para um anunciante em 2026?",
    a: "Trate ChatGPT Ads como produto em evolução: confirme disponibilidade, documente a fonte, teste com orçamento controlado, proteja dados e só escale depois de evidência real.",
  },
  {
    q: "Este site é oficial da OpenAI?",
    a: "Não. Este é um guia educacional independente da volponi.tech, escrito por Lorenza Volponi. Para decisões operacionais, confirme sempre nas superfícies oficiais da OpenAI.",
  },
];
