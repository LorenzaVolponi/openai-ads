import {
  Activity,
  BadgeCheck,
  Code2,
  Copy,
  Cpu,
  Database,
  EyeOff,
  FileSpreadsheet,
  FlaskConical,
  Footprints,
  Layers,
  Link2,
  MapPin,
  MonitorSmartphone,
  Package,
  PiggyBank,
  RefreshCw,
  Repeat,
  Rocket,
  ShoppingCart,
  Tag,
  Target,
  TrendingDown,
  TrendingUp,
  Type,
  Users,
  type LucideIcon,
} from "lucide-react";

// ============================================================
// Conteúdo do guia — fonte única de verdade da página e da
// Raposa IA (motor de respostas). Nada de dados duplicados.
// ============================================================

// ============================================================
// Navegação
// ============================================================

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "O que são", href: "#o-que-sao" },
  { label: "Por que", href: "#por-que" },
  { label: "Para quem", href: "#para-quem" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Comparativo", href: "#comparativo" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "API", href: "#api" },
  { label: "Medição", href: "#medicao" },
  { label: "Estratégias", href: "#estrategias" },
  { label: "Checklist", href: "#checklist" },
  { label: "Glossário", href: "#glossario" },
  { label: "FAQ", href: "#faq" },
];

// ============================================================
// TOC — "Neste guia" (âncoras clicáveis p/ sitelinks)
// ============================================================

export const tocItems = [
  { n: "01", label: "O que são", href: "#o-que-sao" },
  { n: "02", label: "Por que anunciar", href: "#por-que" },
  { n: "03", label: "Cronograma", href: "#cronograma" },
  { n: "04", label: "Para quem", href: "#para-quem" },
  { n: "05", label: "Como funciona", href: "#como-funciona" },
  { n: "06", label: "Comparativo", href: "#comparativo" },
  { n: "07", label: "Benchmarks", href: "#benchmarks" },
  { n: "08", label: "API e Ferramentas", href: "#api" },
  { n: "09", label: "Medição", href: "#medicao" },
  { n: "10", label: "Estratégias", href: "#estrategias" },
  { n: "11", label: "Erros comuns", href: "#erros" },
  { n: "12", label: "Checklist", href: "#checklist" },
  { n: "13", label: "Glossário", href: "#glossario" },
  { n: "14", label: "FAQ", href: "#faq" },
];

// Faixa de keywords (marquee SEO/GEO)
export const marqueeTerms = [
  "chatgpt ads",
  "gpt ads",
  "ads ia",
  "anunciar no chatgpt",
  "publicidade com ia",
  "Advertiser API",
  "Conversions API",
  "Product Feeds",
  "oCPC",
  "marketing com ia",
];

// Compartilhamento (off-page)
export const SHARE_URL = "https://openai-ads.volponi.tech";
export const SHARE_TEXT =
  "ChatGPT Ads: o guia completo em português — como anunciar no ChatGPT, com API, medição, benchmarks e estratégias. Por volponi.tech";

// ============================================================
// Dados — Seção G (Para quem é?)
// ============================================================

export type AudienceCard = { icon: LucideIcon; title: string; desc: string };
export type AudienceTab = { id: string; label: string; icon: LucideIcon; cards: AudienceCard[] };

export const audienceTabs: AudienceTab[] = [
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingCart,
    cards: [
      {
        icon: Package,
        title: "Product Feeds",
        desc: "Conecte o catálogo da sua loja e crie anúncios dinâmicos no ChatGPT com o produto certo pra cada pessoa.",
      },
      {
        icon: Layers,
        title: "Catalog Ads",
        desc: "Anúncios gerados automaticamente a partir do feed, com imagem, preço e CTA direto pro produto.",
      },
      {
        icon: RefreshCw,
        title: "Remarketing com IA",
        desc: "Realcance quem viu, adicionou ao carrinho e não comprou, com a mensagem certa no momento certo.",
      },
    ],
  },
  {
    id: "saas",
    label: "SaaS",
    icon: Code2,
    cards: [
      {
        icon: Rocket,
        title: "Trial Campaigns",
        desc: "Campanhas focadas em ativar trials, com criativos que mostram o valor do produto logo de cara.",
      },
      {
        icon: TrendingUp,
        title: "Upgrade Funnels",
        desc: "Use eventos de uso pra criar comunicações que empurram o usuário do plano free pro plano pago.",
      },
      {
        icon: Link2,
        title: "CAPI pra Sign-ups",
        desc: "Rastreie cadastros server-to-server e deixe o oCPC otimizar a entrega pra quem realmente converte.",
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
        title: "Geração de Leads",
        desc: "Alcance decisores no momento em que pesquisam soluções, com ofertas e formulários diretos.",
      },
      {
        icon: Database,
        title: "Integração com CRM",
        desc: "Conecte seus leads ao CRM e feche o loop entre clique, lead e receita fechada.",
      },
      {
        icon: BadgeCheck,
        title: "Público Qualificado",
        desc: "Segmentação por contexto de intenção: quem pergunta sobre o problema que você resolve é lead quente.",
      },
    ],
  },
  {
    id: "local",
    label: "Local",
    icon: MapPin,
    cards: [
      {
        icon: MapPin,
        title: "Geo-targeting",
        desc: "Anuncie só pra quem está perto da sua loja, com raio de alcance configurável por campanha.",
      },
      {
        icon: Tag,
        title: "Promoções Locais",
        desc: "Ofertas relâmpago pra mover estoque e atrair movimento pro ponto físico no fim de semana.",
      },
      {
        icon: Footprints,
        title: "Foot Traffic",
        desc: "Meça quantas pessoas que viram o anúncio realmente apareceram na sua loja física.",
      },
    ],
  },
];

// ============================================================
// Dados — Seção I (Comparativo)
// ============================================================

export type CompareRow = { feature: string; advantage: boolean; note: string };
export type CompareTab = { id: string; label: string; rows: CompareRow[] };

export const comparisonTabs: CompareTab[] = [
  {
    id: "google",
    label: "Google Ads",
    rows: [
      {
        feature: "Contexto conversacional",
        advantage: true,
        note: "Seu anúncio aparece no meio da conversa, quando a intenção está explícita — não numa lista de links.",
      },
      {
        feature: "Concorrência",
        advantage: true,
        note: "Muito menor — plataforma nova, leilões bem menos disputados que a busca do Google.",
      },
      {
        feature: "Otimização nativa por IA",
        advantage: true,
        note: "O oCPC roda em cima do ecossistema GPT e aprende rápido com os seus dados de conversão.",
      },
      {
        feature: "Volume de tráfego",
        advantage: false,
        note: "O Google ainda tem muito mais buscas por dia — ChatGPT Ads é canal complementar, não substituto.",
      },
      {
        feature: "Custo por clique",
        advantage: true,
        note: "CPCs mais baixos por enquanto — a janela de oportunidade de quem chega cedo.",
      },
    ],
  },
  {
    id: "meta",
    label: "Meta Ads",
    rows: [
      {
        feature: "Intenção ativa vs scroll passivo",
        advantage: true,
        note: "No ChatGPT a pessoa está perguntando algo específico; no feed, ela só está rolando conteúdo.",
      },
      {
        feature: "Momento de decisão",
        advantage: true,
        note: "A entrega acontece no momento exato da decisão de compra — o melhor timing possível.",
      },
      {
        feature: "Audiência engajada",
        advantage: true,
        note: "300M+ usuários ativos conversando todo dia com a IA sobre problemas e produtos.",
      },
      {
        feature: "Formatos visuais",
        advantage: false,
        note: "O Meta tem muito mais formatos ricos (vídeo, carrossel, stories, reels) por enquanto.",
      },
      {
        feature: "Remarketing maduro",
        advantage: false,
        note: "O remarketing do ChatGPT Ads ainda está evoluindo — o do Meta é referência há uma década.",
      },
    ],
  },
  {
    id: "linkedin",
    label: "LinkedIn Ads",
    rows: [
      {
        feature: "Tamanho da audiência",
        advantage: true,
        note: "300M+ usuários ativos conversando diariamente, com engajamento real — não só perfis dormindo.",
      },
      {
        feature: "CPC mais baixo",
        advantage: true,
        note: "O LinkedIn é uma das plataformas mais caras por clique; o ChatGPT Ads custa bem menos.",
      },
      {
        feature: "Intenção de compra",
        advantage: true,
        note: "O contexto conversacional revela intenção explícita — muito mais que cargo no currículo.",
      },
      {
        feature: "Dados profissionais",
        advantage: false,
        note: "O LinkedIn tem dados de cargo, empresa e setor que o ChatGPT Ads não oferece (ainda).",
      },
      {
        feature: "Segmentação B2B",
        advantage: false,
        note: "Sem segmentação por empresa ou senioridade por enquanto — o contexto faz o trabalho.",
      },
    ],
  },
];

// ============================================================
// Dados — Seção J (API e Ferramentas)
// ============================================================

export type ApiTool = { icon: LucideIcon; title: string; desc: string; detail: string };

export const apiTools: ApiTool[] = [
  {
    icon: Code2,
    title: "Advertiser API",
    desc: "REST API pra gerenciar campanhas programaticamente.",
    detail:
      "Crie, atualize e busque campanhas, conjuntos de anúncios e criativos direto do seu sistema. Ideal pra quem roda volume grande de campanhas ou quer integrar o ChatGPT Ads com ferramentas internas de marketing.",
  },
  {
    icon: Link2,
    title: "Conversions API / CAPI",
    desc: "Envie conversões do seu servidor.",
    detail:
      "Mais confiável que o pixel sozinho: funciona com ad blockers, não depende de cookies de terceiros e garante que compras e sign-ups cheguem intactos pra plataforma otimizar a entrega.",
  },
  {
    icon: MonitorSmartphone,
    title: "Measurement Pixel",
    desc: "Pixel JavaScript pra rastreamento no navegador.",
    detail:
      "Rastreia page views, cliques e eventos no site com um snippet no head. Instalação simples e rápida — a base da medição de resultados do ChatGPT Ads.",
  },
  {
    icon: Package,
    title: "Product Feeds",
    desc: "Catálogo de produtos pra anúncios dinâmicos.",
    detail:
      "Ideal pra e-commerce: conecte seu catálogo com títulos, descrições, preços e imagens, e o ChatGPT Ads monta anúncios dinâmicos com o produto certo pra cada pessoa.",
  },
  {
    icon: FileSpreadsheet,
    title: "Bulk API",
    desc: "Operações em lote.",
    detail:
      "Criar, atualizar e pausar milhares de campanhas, conjuntos e anúncios numa única chamada. Essencial quando a operação de ads IA escala e o trabalho manual não dá mais conta.",
  },
  {
    icon: Cpu,
    title: "oCPC",
    desc: "Otimização automática de lances por IA.",
    detail:
      "O sistema aprende com seus dados de conversão e ajusta os lances em tempo real pra maximizar resultado dentro do seu orçamento. Quanto mais dados você envia, melhor ele fica.",
  },
];

// ============================================================
// Dados — Seção K (Medição e Conversões)
// ============================================================

export type MeasurementEvent = {
  event: string;
  type: "pixel" | "capi" | "both";
  desc: string;
};

export const measurementEvents: MeasurementEvent[] = [
  { event: "page_view", type: "pixel", desc: "Visualização de página" },
  { event: "click", type: "pixel", desc: "Clique no anúncio" },
  { event: "view_content", type: "both", desc: "Visualização de conteúdo/produto" },
  { event: "add_to_cart", type: "both", desc: "Adição ao carrinho" },
  { event: "purchase", type: "capi", desc: "Compra concluída" },
  { event: "sign_up", type: "capi", desc: "Cadastro realizado" },
  { event: "custom_event", type: "both", desc: "Evento customizado definido pelo anunciante" },
];

// ============================================================
// Dados — Seção L (Estratégias Práticas)
// ============================================================

export type Strategy = { icon: LucideIcon; title: string; desc: string };

export const strategies: Strategy[] = [
  {
    icon: Cpu,
    title: "Comece com oCPC",
    desc: "Deixe a IA otimizar os lances desde o primeiro dia. Quanto antes ela tiver dados de conversão, antes ela aprende e entrega resultado.",
  },
  {
    icon: FlaskConical,
    title: "Teste criativos",
    desc: "Varie títulos, descrições e CTAs. O que funciona no Google Ads pode não funcionar no contexto conversacional do ChatGPT.",
  },
  {
    icon: Package,
    title: "Use Product Feeds",
    desc: "Pra e-commerce, catálogos são essenciais: anúncios dinâmicos com o produto certo pra cada pessoa, sem trabalho manual.",
  },
  {
    icon: Link2,
    title: "Integre CAPI",
    desc: "Não dependa só do pixel: conversões server-to-server são mais confiáveis e alimentam o oCPC com dados de melhor qualidade.",
  },
  {
    icon: Activity,
    title: "Monitore o funil inteiro",
    desc: "Do clique à conversão. Entender onde o usuário sai do caminho é tão importante quanto acompanhar o CTR.",
  },
  {
    icon: Rocket,
    title: "Escale com Bulk API",
    desc: "Quando a operação crescer, use a Bulk API pra criar e atualizar milhares de campanhas em lote, sem cliques manuais.",
  },
];

// ============================================================
// Dados — Seção M (Glossário)
// ============================================================

export type GlossaryTerm = { term: string; desc: string };

export const glossary: GlossaryTerm[] = [
  {
    term: "oCPC",
    desc: "Custo por Clique Otimizado. O sistema de IA do ChatGPT Ads ajusta seus lances automaticamente pra entregar anúncios pra quem tem mais chance de converter.",
  },
  {
    term: "CAPI",
    desc: "Conversions API. Permite enviar eventos de conversão direto do seu servidor pra OpenAI, sem depender do navegador do usuário.",
  },
  {
    term: "Pixel",
    desc: "Measurement Pixel. Script JavaScript instalado no site pra rastrear page views, cliques e outros eventos no navegador.",
  },
  {
    term: "Product Feed",
    desc: "Arquivo com o catálogo de produtos da sua loja, usado pra criar anúncios dinâmicos no ChatGPT.",
  },
  {
    term: "Bulk API",
    desc: "API pra criar, atualizar e gerenciar milhares de campanhas, conjuntos e anúncios em lote.",
  },
  {
    term: "Ads Manager",
    desc: "Painel oficial da OpenAI pra criar e gerenciar campanhas de ChatGPT Ads, sem escrever uma linha de código.",
  },
  {
    term: "ChatGPT Ads",
    desc: "Plataforma de publicidade nativa da OpenAI que exibe anúncios dentro do ChatGPT.",
  },
  {
    term: "GPT Ads",
    desc: "Outro nome pros anúncios do ChatGPT — você vai ver os dois termos usados como sinônimos por aí.",
  },
  {
    term: "Ads IA",
    desc: "Publicidade otimizada por inteligência artificial, com entrega, lances e criativos potencializados por modelos de IA.",
  },
  {
    term: "Impressões",
    desc: "Quantas vezes seus anúncios foram exibidos na tela dos usuários.",
  },
  {
    term: "CPC",
    desc: "Cost Per Click. Quanto você paga, em média, por cada clique no seu anúncio.",
  },
  {
    term: "CPM",
    desc: "Cost Per Mille. Custo por mil impressões do anúncio.",
  },
  {
    term: "CTR",
    desc: "Click-Through Rate. Percentual de pessoas que viram o anúncio e clicaram nele.",
  },
  {
    term: "ROAS",
    desc: "Return On Ad Spend. Retorno sobre o investimento em publicidade — quanto você fatura pra cada real gasto.",
  },
  {
    term: "Conversão",
    desc: "Ação valiosa que você define: compra, cadastro, download, pedido de orçamento etc.",
  },
  {
    term: "Retargeting",
    desc: "Tática de reexibir anúncios pra quem já interagiu com você — visitou o site, viu um produto, abandonou o carrinho.",
  },
  {
    term: "Funil",
    desc: "A jornada do cliente, do primeiro contato até a conversão: topo (descoberta), meio (consideração) e fundo (decisão).",
  },
  {
    term: "KPI",
    desc: "Key Performance Indicator — a métrica que mostra se você está chegando onde quer (ROAS, CPA, CTR...).",
  },
  {
    term: "Leilão",
    desc: "A disputa que decide qual anúncio aparece e por quanto. Cada impressão passa por um leilão em tempo real.",
  },
  {
    term: "Frequência",
    desc: "Quantas vezes a mesma pessoa viu seu anúncio. Frequência alta demais cansa o público e queima o criativo.",
  },
];

// ============================================================
// Dados — Cronograma (linha do tempo)
// ============================================================

export type TimelineEntry = { date: string; title: string; desc: string };

export const timeline: TimelineEntry[] = [
  {
    date: "Nov 2022",
    title: "O ChatGPT nasce",
    desc: "A OpenAI lança o ChatGPT e bate recordes de adoção: 100 milhões de usuários em dois meses — o produto que cresceu mais rápido da história da internet.",
  },
  {
    date: "2024",
    title: "Monetização em debate",
    desc: "Com custos de computação bilionários, a OpenAI fortalece as assinaturas e estuda novos modelos de receita. Anúncios entram na mesa — com resistência inicial.",
  },
  {
    date: "Mar 2025",
    title: "OpenAI confirma publicidade",
    desc: "Sam Altman declara que a empresa está aberta a anúncios como caminho complementar. O mercado de ads IA esquenta e os primeiros testes começam.",
  },
  {
    date: "2025",
    title: "Lançamento do ChatGPT Ads",
    desc: "A plataforma de publicidade nativa entra no ar: anúncios contextuais dentro das conversas, com Ads Manager, Measurement Pixel e Conversions API.",
  },
  {
    date: "2026",
    title: "Ecossistema completo e expansão",
    desc: "Advertiser API, Bulk API, Product Feeds e oCPC amadurecem. A expansão avança pra novos países — incluindo o Brasil — e novos formatos de anúncio.",
  },
];

// ============================================================
// Dados — Benchmarks (custos por plataforma)
// ============================================================

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
    chatgpt: "R$ 0,80 – 2,50",
    google: "R$ 2 – 8",
    meta: "R$ 1 – 4",
    linkedin: "R$ 15 – 40",
  },
  {
    metric: "CTR médio",
    chatgpt: "3 – 6%",
    google: "2 – 5%",
    meta: "0,9 – 1,5%",
    linkedin: "0,4 – 0,6%",
  },
  {
    metric: "CPM médio",
    chatgpt: "R$ 8 – 20",
    google: "R$ 20 – 60",
    meta: "R$ 10 – 30",
    linkedin: "R$ 80 – 200",
  },
  {
    metric: "Concorrência nos leilões",
    chatgpt: "Baixa",
    google: "Altíssima",
    meta: "Alta",
    linkedin: "Média",
  },
  {
    metric: "Momento da entrega",
    chatgpt: "Intenção ativa",
    google: "Intenção ativa",
    meta: "Scroll passivo",
    linkedin: "Contexto profissional",
  },
];

// ============================================================
// Dados — Erros comuns
// ============================================================

export type Mistake = { icon: LucideIcon; title: string; desc: string };

export const mistakes: Mistake[] = [
  {
    icon: EyeOff,
    title: "Pular a medição",
    desc: "Subir campanha sem pixel nem CAPI é dirigir de olhos fechados: o oCPC não tem com o que aprender e você não sabe o que funcionou. Instale a medição antes do primeiro real gasto.",
  },
  {
    icon: Copy,
    title: "Copiar e colar do Google",
    desc: "O que performa numa página de resultados não performa no meio de uma conversa. Criativos pro ChatGPT precisam responder à pergunta, não interromper.",
  },
  {
    icon: PiggyBank,
    title: "Orçamento de fome",
    desc: "O oCPC precisa de volume pra aprender. Um orçamento que gera 2 cliques por dia nunca sai do lugar — planeje pelo menos duas semanas de aprendizado.",
  },
  {
    icon: Type,
    title: "Criativo sem contexto",
    desc: "Textos genéricos de varejo ignoram o maior diferencial da plataforma: o contexto conversacional. Fale a língua de quem acabou de perguntar.",
  },
  {
    icon: TrendingDown,
    title: "Desistir antes da curva",
    desc: "IA otimizada não é mágica instantânea: a primeira semana é aprendizado. Quem corta a campanha no dia 3 joga fora o investimento em dados.",
  },
  {
    icon: Repeat,
    title: "Nunca testar nada",
    desc: "Um criativo só, repetido pra sempre, estagna. Rode sempre dois em A/B e gradue o orçamento pro vencedor — teste, prove, escale.",
  },
];

// ============================================================
// Dados — Checklist de lançamento
// ============================================================

export type ChecklistItem = { title: string; desc: string };

export const checklistItems: ChecklistItem[] = [
  {
    title: "Conta criada no Ads Manager",
    desc: "Cadastro completo do negócio em ads.openai.com, com faturamento configurado.",
  },
  {
    title: "Measurement Pixel instalado",
    desc: "Snippet no site validado, disparando page_view nas páginas-chave.",
  },
  {
    title: "Conversions API configurada",
    desc: "Eventos do servidor chegando, com deduplicação em relação ao pixel.",
  },
  {
    title: "Eventos de conversão mapeados",
    desc: "Você sabe exatamente qual ação conta como sucesso — e como rastreá-la.",
  },
  {
    title: "Campanha com oCPC ativo",
    desc: "Otimização por IA ligada desde o primeiro dia de veiculação.",
  },
  {
    title: "Criativos com CTA claro",
    desc: "Textos escritos pro contexto conversacional, com chamada pra ação óbvia.",
  },
  {
    title: "Orçamento diário definido",
    desc: "Valor confortável pra sustentar pelo menos duas semanas de aprendizado.",
  },
  {
    title: "Teste A/B planejado",
    desc: "Dois criativos (ou duas ofertas) rodando em paralelo pra comparar.",
  },
  {
    title: "Product Feed conectado",
    desc: "Catálogo sincronizado — obrigatório se você é e-commerce.",
  },
  {
    title: "Rotina de acompanhamento",
    desc: "Dia e hora marcados no calendário pra ler os números e decidir.",
  },
];

// ============================================================
// Dados — Seção O (FAQ)
// ============================================================

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "O que são ChatGPT Ads?",
    a: "ChatGPT Ads é a plataforma de publicidade nativa da OpenAI, que exibe anúncios dentro do ChatGPT. Funciona como o Google Ads, mas em vez de links patrocinados numa página de resultados, seus anúncios aparecem no meio das conversas, com todo o contexto de quem está perguntando. A plataforma inclui Ads Manager, API pra desenvolvedores, pixel de conversão e product feeds — ou seja, publicidade com IA de ponta a ponta.",
  },
  {
    q: "Como anunciar no ChatGPT?",
    a: "O processo é simples: acesse ads.openai.com, crie sua conta de anunciante e cadastre seu negócio. Depois configure a campanha (objetivo, público, orçamento e criativo) pelo Ads Manager ou pela API, instale o Measurement Pixel e/ou a Conversions API pra rastrear conversões e ative. O oCPC cuida da otimização automática da entrega a partir daí.",
  },
  {
    q: "Quanto custa anunciar no ChatGPT?",
    a: "O modelo de cobrança é por CPC (custo por clique), como no Google Ads. Os preços variam por nicho e concorrência, mas por ser uma plataforma recente, a concorrência nos leilões é menor e os CPCs tendem a ser mais baixos que em plataformas maduras. Você define seu orçamento diário e nunca gasta além dele.",
  },
  {
    q: "O que é oCPC?",
    a: "oCPC (Custo por Clique Otimizado) é o sistema de otimização por IA do ChatGPT Ads. Ele analisa os sinais de conversão da sua conta e ajusta os lances automaticamente pra mostrar seus anúncios pras pessoas com maior probabilidade de converter. Quanto mais dados de conversão você envia (via pixel e CAPI), melhor a IA otimiza a entrega.",
  },
  {
    q: "O que é a CAPI?",
    a: "A Conversions API (CAPI) é a API server-to-server da OpenAI pra enviar eventos de conversão. Em vez de depender do navegador do usuário, você envia compras, cadastros e outras conversões direto do seu servidor. É mais confiável que o pixel sozinho porque funciona mesmo com bloqueadores de anúncios e restrições de cookies.",
  },
  {
    q: "ChatGPT Ads é melhor que Google Ads?",
    a: "Não é melhor nem pior — são canais complementares. O Google tem volume de busca gigante, mas o ChatGPT Ads tem contexto conversacional: você alcança a pessoa no momento exato da decisão, com muito menos concorrência e CPCs mais baixos. A estratégia recomendada é testar o ChatGPT Ads como canal adicional, alocando parte do orçamento e comparando o custo por resultado.",
  },
  {
    q: "Quem pode anunciar no ChatGPT?",
    a: "Qualquer negócio pode se cadastrar: e-commerce, SaaS, B2B, negócios locais, infoprodutores e afiliados. Os casos com melhores resultados iniciais tendem a ser e-commerce (com Product Feeds e remarketing), SaaS (com CAPI pra rastrear trials e sign-ups) e B2B (geração de leads qualificados pelo contexto de intenção).",
  },
  {
    q: "Como medir resultados?",
    a: "Com o Measurement Pixel no navegador e a Conversions API no servidor. Juntos, eles rastreiam page views, cliques, visualizações de produto, adições ao carrinho, compras, cadastros e eventos customizados. O ideal é sempre enviar conversões pelos dois métodos, com a CAPI como fonte principal de verdade — assim o oCPC otimiza com dados completos.",
  },
  {
    q: "O que são Product Feeds?",
    a: "São arquivos estruturados com o catálogo de produtos da sua loja: títulos, descrições, preços, imagens e URLs. Com o feed conectado, o ChatGPT Ads cria anúncios dinâmicos que mostram o produto certo pra pessoa certa — é o mesmo conceito do Shopping do Google e do catálogo do Meta, agora dentro do ChatGPT.",
  },
  {
    q: "Existe API para desenvolvedores?",
    a: "Sim, e o ecossistema é completo: a Advertiser API permite gerenciar campanhas programaticamente, a Bulk API cuida de operações em lote, a Conversions API envia conversões do servidor e o Measurement Pixel rastreia eventos no navegador. Tudo documentado em developers.openai.com/ads.",
  },
  {
    q: "Está disponível no Brasil?",
    a: "A OpenAI está expandindo o ChatGPT Ads gradualmente pra novos países e formatos, e o Brasil é um mercado prioritário — mas a disponibilidade pode variar conforme o tipo de conta e o momento. O recomendado é verificar diretamente em ads.openai.com se sua conta já tem acesso ao país de veiculação desejado.",
  },
  {
    q: "Como otimizar campanhas?",
    a: "Comece com oCPC ativado pra IA otimizar a entrega desde o início, faça testes A/B de criativos (títulos, descrições e CTAs), integre a CAPI pra ter dados confiáveis, use Product Feeds se for e-commerce e monitore o funil completo — do clique à conversão. Quando escalar, a Bulk API ajuda a gerenciar tudo em lote.",
  },
  {
    q: "Onde aprender mais?",
    a: "Aqui mesmo: este guia cobre desde o básico de ChatGPT Ads e GPT Ads até estratégias avançadas de ads IA, medição e API. Pra documentação oficial, acesse developers.openai.com/ads. E pra mais conteúdo sobre inteligência artificial aplicada a negócios, acompanhe a Lorenza Volponi em volponi.tech.",
  },
  {
    q: "ChatGPT Ads funciona pra pequenos negócios?",
    a: "Sim — e é justamente aí que está a maior oportunidade. Os CPCs mais baixos e a baixa concorrência permitem testar com orçamentos que seriam inviáveis no Google ou no LinkedIn. Comece com uma campanha simples, oCPC ativo e um orçamento diário com que você se sinta confortável; deixe a IA concentrar a entrega nas pessoas com maior chance de converter e escale aos poucos.",
  },
  {
    q: "Quais formatos de anúncio existem no ChatGPT?",
    a: "O formato central é o anúncio conversacional: uma unidade discreta e relevante que aparece dentro da resposta do ChatGPT, respeitando o contexto da conversa. Complementando, existem anúncios dinâmicos gerados a partir de Product Feeds (com imagem, preço e CTA direto pro produto) e formatos expandidos em teste — sempre priorizando a experiência do usuário.",
  },
  {
    q: "Como funciona o leilão de anúncios no ChatGPT?",
    a: "Como em qualquer plataforma de leilão: combina-se o lance (bid) com a relevância estimada do anúncio praquela conversa específica. O oCPC automatiza o lance e o sistema pondera o contexto da conversa, a qualidade do criativo e os sinais de conversão pra decidir qual anúncio mostrar — e por quanto. Menos concorrentes significa leilões mais baratos, por enquanto.",
  },
];
