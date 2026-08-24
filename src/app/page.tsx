"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  MessageSquareText,
  Layers,
  Zap,
  Target,
  Lightbulb,
  TrendingUp,
  Settings,
  Code2,
  Users,
  CheckCircle2,
  X,
  Cpu,
  Search,
  BookOpen,
  Globe,
  Menu,
  ChevronDown,
  ChevronRight,
  ArrowDown,
  ArrowUp,
  Share2,
  Copy,
  Check,
  HelpCircle,
  CalendarClock,
  ListChecks,
  Clock,
  Repeat,
  RefreshCw,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  navItems,
  tocItems,
  marqueeTerms,
  SHARE_URL,
  SHARE_TEXT,
  audienceTabs,
  comparisonTabs,
  apiTools,
  measurementEvents,
  strategies,
  glossary,
  timeline,
  benchmarks,
  mistakes,
  checklistItems,
  faqs,
} from "@/lib/content";
import { AssistantChat } from "@/components/assistant-chat";


// ============================================================
// Variantes de animação (Framer Motion)
// ============================================================

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ============================================================
// Componentes utilitários
// ============================================================

function Section({
  id,
  title,
  subtitle,
  badge,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-16 md:scroll-mt-20 md:px-6 md:py-24"
    >
      {badge && (
        <Badge
          variant="secondary"
          className="border border-primary/30 bg-primary/10 text-primary"
        >
          {badge}
        </Badge>
      )}
      <h2 className="mt-4 text-2xl font-bold tracking-tight md:text-4xl" aria-label={title}>
        <SplitWords text={title} />
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">{subtitle}</p>
      )}
      <div className="mt-10 md:mt-12">{children}</div>
    </motion.section>
  );
}

function HoverCard({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(className, onClick && "cursor-pointer")}
      onClick={onClick}
    >
      <Tilt>
        <Card className="h-full transition-shadow duration-300 group-hover:shadow-[0_0_28px_-8px] group-hover:shadow-primary/30">
          {children}
        </Card>
      </Tilt>
    </motion.div>
  );
}

// Card com efeito de virar (flip 3D) — clica, vira, clica de novo e desvira
// Recebe 2 filhos (children): o primeiro é a frente, o segundo é o verso.
function FlipCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const faces = Array.isArray(children) ? children : [children];
  const front = faces[0];
  const back = faces.length > 1 ? faces[1] : faces[0];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("group", className)}
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        onClick={() => setFlipped((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((v) => !v);
          }
        }}
        className="h-full min-h-[300px] cursor-pointer rounded-xl [perspective:1200px] outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {/* Frente */}
          <div className="h-full [backface-visibility:hidden]">
            <Card className="flex h-full flex-col">{front}</Card>
          </div>
          {/* Verso */}
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <Card className="flex h-full flex-col border-primary/30 bg-primary/5">{back}</Card>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FlipHint({ back }: { back?: boolean }) {
  return (
    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-medium text-muted-foreground">
      <Repeat className="h-3.5 w-3.5 text-primary" />
      {back ? "Clique pra virar de volta" : "Clique pra virar o card"}
    </span>
  );
}

// ============================================================
// Animações premium (padrão Awwwards)
// ============================================================

/** Reveal tipográfico: palavras sobem de máscaras ocultas, em stagger. */
function SplitWords({
  text,
  wordClassName,
  delay = 0,
  animateOnView = true,
}: {
  text: string;
  wordClassName?: string;
  delay?: number;
  animateOnView?: boolean;
}) {
  const words = text.split(" ");
  return (
    <span aria-hidden="true">
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom"
        >
          <motion.span
            className={cn("inline-block will-change-transform", wordClassName)}
            initial={{ y: "110%" }}
            {...(animateOnView
              ? { whileInView: { y: "0%" }, viewport: { once: true, margin: "-30px" } }
              : { animate: { y: "0%" } })}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Botão magnético: acompanha sutilmente o cursor (só desktop/pointer fino). */
function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [fine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  const onMove = (e: React.MouseEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

/** Tilt 3D: card inclina seguindo o mouse (só desktop/pointer fino). */
function Tilt({
  children,
  max = 5,
  className,
}: {
  children: React.ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ rx: 0, ry: 0 });
  const [fine] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  const onMove = (e: React.MouseEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setRot({ rx: -py * max * 2, ry: px * max * 2 });
  };

  return (
    <motion.div
      ref={ref}
      className={cn("h-full", className)}
      style={{ transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={() => setRot({ rx: 0, ry: 0 })}
      animate={{ rotateX: rot.rx, rotateY: rot.ry }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-primary md:text-5xl">
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function StepIndicator({
  step,
  title,
  desc,
  index,
}: {
  step: string;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="flex gap-4 md:gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-bold text-primary md:h-12 md:w-12">
          {step}
        </div>
        {index < 4 && (
          <div className="h-12 w-0.5 bg-gradient-to-b from-primary/60 to-primary/10 md:h-16" />
        )}
      </div>
      <Card className="flex-1">
        <CardContent className="p-4 md:p-5">
          <h3 className="font-semibold md:text-lg">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TimelineItem({
  date,
  title,
  desc,
  index,
}: {
  date: string;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="flex gap-4 md:gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 md:h-12 md:w-12">
          <CalendarClock className="h-5 w-5 text-primary" />
        </div>
        {index < timeline.length - 1 && (
          <div className="h-12 w-0.5 bg-gradient-to-b from-primary/60 to-primary/10 md:h-16" />
        )}
      </div>
      <Card className="flex-1">
        <CardContent className="p-4 md:p-5">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary"
          >
            {date}
          </Badge>
          <h3 className="mt-2 font-semibold md:text-lg">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Barra de progresso de leitura (sincronizada com o scroll real)
function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div
      className="fixed left-0 top-14 z-40 h-1 w-full md:top-16"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// Dock flutuante de acesso rápido — cards clicáveis
function FloatingDock({
  visible,
  onShare,
  onTop,
  onNavigate,
}: {
  visible: boolean;
  onShare: () => void;
  onTop: () => void;
  onNavigate: (href: string) => void;
}) {
  const items = [
    { icon: BookOpen, label: "Glossário", action: () => onNavigate("#glossario") },
    { icon: ListChecks, label: "Checklist", action: () => onNavigate("#checklist") },
    { icon: HelpCircle, label: "FAQ", action: () => onNavigate("#faq") },
    { icon: Share2, label: "Compartilhar guia", action: onShare },
    { icon: ArrowUp, label: "Voltar ao topo", action: onTop },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          aria-label="Acesso rápido"
          className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-4 z-40 flex items-center gap-1 rounded-full border border-border bg-card/90 p-1.5 shadow-lg backdrop-blur-md md:left-6"
        >
          <TooltipProvider delayDuration={200}>
            {items.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <button
                    onClick={item.action}
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary active:scale-90"
                  >
                    <item.icon className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// JSON-LD (injetados na página)
// ============================================================

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ChatGPT Ads: Guia Completo 2025 — Como Anunciar no ChatGPT",
  description:
    "Guia completo sobre ChatGPT Ads e GPT Ads: como anunciar no ChatGPT, Advertiser API, medição com Pixel e CAPI, Product Feeds e oCPC.",
  image: "https://openai-ads.volponi.tech/mark.png",
  author: {
    "@type": "Person",
    name: "Lorenza Volponi",
    url: "https://volponi.tech",
  },
  publisher: {
    "@type": "Organization",
    name: "volponi.tech",
    url: "https://volponi.tech",
    logo: {
      "@type": "ImageObject",
      url: "https://openai-ads.volponi.tech/mark.png",
    },
  },
  url: "https://openai-ads.volponi.tech",
  mainEntityOfPage: "https://openai-ads.volponi.tech",
  datePublished: "2025-11-20",
  dateModified: "2026-08-25",
  inLanguage: "pt-BR",
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Como anunciar no ChatGPT",
  description:
    "Passo a passo pra criar sua primeira campanha de ChatGPT Ads: da criação da conta à escala com Bulk API.",
  totalTime: "PT30M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Crie sua conta",
      text: "Acesse ads.openai.com e cadastre seu negócio. Processo simples e rápido.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Configure a campanha",
      text: "Defina objetivo, público, orçamento e criativo pelo Ads Manager ou pela Advertiser API.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Integre a medição",
      text: "Instale o Measurement Pixel e/ou a Conversions API pra rastrear conversões reais.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Otimize com dados",
      text: "O oCPC aprende com seus dados e otimiza a entrega automaticamente.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Escale os resultados",
      text: "Ajuste bids, teste criativos, use Product Feeds e Bulk API pra crescer.",
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://volponi.tech",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "ChatGPT Ads",
      item: "https://openai-ads.volponi.tech",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Guia",
      item: "https://openai-ads.volponi.tech",
    },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "volponi.tech",
  url: "https://volponi.tech",
  logo: "https://openai-ads.volponi.tech/mark.png",
  image: "https://openai-ads.volponi.tech/og.png",
  sameAs: ["https://volponi.tech"],
  founder: {
    "@type": "Person",
    name: "Lorenza Volponi",
    url: "https://volponi.tech",
  },
  description:
    "volponi.tech — inteligência artificial aplicada, estratégia e educação em IA, por Lorenza Volponi. Guias práticos em português sobre IA, marketing e tecnologia.",
  knowsLanguage: "pt-BR",
  areaServed: "BR",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Lorenza Volponi",
  jobTitle: "AI Strategist · Builder · Educator",
  description:
    "Estrategista de inteligência artificial, builder e educadora brasileira. Estuda e aplica IA em negócios reais e publica guias práticos em português na volponi.tech.",
  url: "https://volponi.tech",
  sameAs: ["https://volponi.tech", "https://www.linkedin.com/in/lorenza-volponi", "https://github.com/volponitech"],
  nationality: "Brazilian",
  knowsLanguage: ["pt-BR", "en"],
  worksFor: {
    "@type": "Organization",
    name: "volponi.tech",
    url: "https://volponi.tech",
  },
  knowsAbout: [
    "ChatGPT Ads",
    "GPT Ads",
    "Ads IA",
    "OpenAI Ads",
    "publicidade com inteligência artificial",
    "marketing com IA generativa",
    "Conversions API",
    "Product Feeds",
    "oCPC",
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://openai-ads.volponi.tech",
  name: "ChatGPT Ads: Guia Completo 2025 — Como Anunciar no ChatGPT",
  description:
    "Guia completo sobre ChatGPT Ads, GPT Ads e ads IA: como anunciar no ChatGPT, Advertiser API, medição com Pixel e CAPI, Product Feeds e oCPC.",
  inLanguage: "pt-BR",
  isFamilyFriendly: true,
  isAccessibleForFree: true,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2"],
  },
  keywords:
    "chatgpt ads, gpt ads, ads ia, anunciar no chatgpt, publicidade no chatgpt, OpenAI Ads, Advertiser API, Conversions API, Measurement Pixel, product feeds, oCPC",
  isPartOf: {
    "@type": "WebSite",
    name: "volponi.tech",
    url: "https://volponi.tech",
  },
  about: [
    {
      "@type": "Thing",
      name: "ChatGPT Ads",
      description: "Plataforma de publicidade nativa da OpenAI dentro do ChatGPT.",
    },
    {
      "@type": "Thing",
      name: "GPT Ads",
      description: "Anúncios no ecossistema GPT da OpenAI.",
    },
    {
      "@type": "Thing",
      name: "Ads IA",
      description: "Publicidade otimizada por inteligência artificial.",
    },
  ],
  author: {
    "@type": "Person",
    name: "Lorenza Volponi",
    url: "https://volponi.tech",
  },
  publisher: {
    "@type": "Organization",
    name: "volponi.tech",
    url: "https://volponi.tech",
  },
  significantLinks: [
    "https://ads.openai.com",
    "https://developers.openai.com/ads",
    "https://volponi.tech",
  ],
};

const glossaryJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Glossário de ChatGPT Ads e Ads IA",
  description:
    "Glossário em português com os termos essenciais de ChatGPT Ads, GPT Ads e publicidade com inteligência artificial.",
  inLanguage: "pt-BR",
  numberOfItems: glossary.length,
  itemListElement: glossary.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: g.term,
    description: g.desc,
  })),
};

// ============================================================
// Página
// ============================================================

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTab, setActiveTab] = useState("ecommerce");
  const [compareTab, setCompareTab] = useState("google");
  const [shareOpen, setShareOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [readingProgress, setReadingProgress] = useState(0);

  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 600);
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setReadingProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleChecklist = (i: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const checklistProgress = Math.round((checkedItems.size / checklistItems.length) * 100);

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // clipboard indisponível — link continua visível no diálogo
    }
  };

  const filteredGlossary = glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.desc.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* Grain sutil (textura premium, padrão Awwwards) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E")`,
        }}
      />
      {/* ================================================== */}
      {/* A. JSON-LD (oculto)                                */}
      {/* ================================================== */}
      <div aria-hidden="true" className="hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
        />
      </div>

      {/* ================================================== */}
      {/* B. Breadcrumb (sr-only)                             */}
      {/* ================================================== */}
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol>
          <li>
            <a href="https://volponi.tech" target="_blank" rel="noopener noreferrer">
              Home
            </a>
          </li>
          <li>
            <a href="/">ChatGPT Ads</a>
          </li>
          <li aria-current="page">Guia</li>
        </ol>
      </nav>

      {/* ================================================== */}
      {/* C. Sticky Navigation Bar                            */}
      {/* ================================================== */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16 md:px-6">
          <a
            href="https://volponi.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            { }
            <img src="/fox-black.png" alt="volponi.tech — raposa" width={32} height={32} className="h-8 w-8 rounded-lg" />
            <span className="font-bold">volponi.tech</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-b border-border bg-card/95 backdrop-blur-xl md:hidden"
              aria-label="Navegação mobile"
            >
              <div className="flex max-h-[70vh] flex-col gap-1 overflow-y-auto px-4 py-3">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className="rounded-lg px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ================================================== */}
      {/* D. Hero Section                                     */}
      {/* ================================================== */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Orbs de fundo — deriva lenta e orgânica */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="animate-float-a absolute left-1/2 top-0 h-[72rem] w-[72rem] -translate-x-1/2 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="animate-float-b absolute -right-32 top-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="animate-float-c absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 pt-16 text-center md:px-6 md:pb-28 md:pt-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge
              variant="secondary"
              className="border border-primary/25 bg-primary/10 px-3 py-1 text-primary"
            >
              Guia completo em português · Atualizado 2025
            </Badge>
          </motion.div>

          <h1
            className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl"
            aria-label="ChatGPT Ads"
          >
            <SplitWords
              text="ChatGPT Ads"
              animateOnView={false}
              delay={0.15}
              wordClassName="bg-gradient-to-br from-amber-600 via-amber-400 to-amber-600 bg-clip-text text-transparent"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-balance text-foreground/80 md:text-xl"
          >
            Seus anúncios no meio da conversa de 300 milhões de pessoas.
            Aprenda a criar, medir e escalar campanhas de ChatGPT Ads do zero —
            em português, sem enrolação.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3"
          >
            <motion.div variants={fadeUp}>
              <Counter target={300} suffix="M+" label="Usuários ativos" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Counter target={200} suffix="+" label="Países" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Counter target={2025} label="Ano de lançamento" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic>
              <Button
                size="lg"
                onClick={() => scrollTo("#o-que-sao")}
                className="bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
              >
                Quero aprender ChatGPT Ads
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </Magnetic>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("#checklist")}
              className="border-primary/30 font-medium hover:bg-primary/5 hover:text-primary"
            >
              <ListChecks className="mr-2 h-4 w-4" />
              Ir direto pro checklist
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 text-sm text-muted-foreground"
          >
            Por{" "}
            <a
              href="https://volponi.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              Lorenza Volponi
            </a>{" "}
            — volponi.tech
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
          >
            <Badge variant="outline" className="gap-1.5 border-border bg-card text-muted-foreground">
              <Clock className="h-3 w-3 text-primary" />
              ~15 min de leitura
            </Badge>
            <Badge variant="outline" className="gap-1.5 border-border bg-card text-muted-foreground">
              <RefreshCw className="h-3 w-3 text-primary" />
              Atualizado em ago/2026
            </Badge>
            <Badge variant="outline" className="gap-1.5 border-border bg-card text-muted-foreground">
              <BadgeCheck className="h-3 w-3 text-primary" />
              Guia gratuito e completo
            </Badge>
          </motion.div>
        </motion.div>
      </section>

      {/* Faixa de keywords (marquee SEO/GEO) */}
      <div className="overflow-hidden border-y border-border bg-card py-3" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-8">
          {[...marqueeTerms, ...marqueeTerms].map((term, i) => (
            <span key={i} className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
              {term}
              <span className="text-primary">·</span>
            </span>
          ))}
        </div>
      </div>

      <ScrollProgressBar progress={readingProgress} />

      <main className="flex-1">
        {/* Breadcrumb visível */}
        <nav
          aria-label="Você está aqui"
          className="mx-auto flex w-full max-w-6xl items-center gap-1.5 px-4 pt-8 text-sm text-muted-foreground md:px-6"
        >
          <a
            href="https://volponi.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary"
          >
            volponi.tech
          </a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">ChatGPT Ads — Guia Completo</span>
        </nav>

        {/* TOC — "Neste guia" (cards clicáveis) */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          aria-label="Neste guia"
          className="mx-auto w-full max-w-6xl px-4 pb-4 pt-6 md:px-6"
        >
          <Card>
            <CardContent className="p-5 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold md:text-xl">Neste guia</h2>
                <Badge
                  variant="secondary"
                  className="border border-primary/25 bg-primary/10 text-primary"
                >
                  14 seções · ~15 min
                </Badge>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
                {tocItems.map((t) => (
                  <button
                    key={t.href}
                    onClick={() => scrollTo(t.href)}
                    className="group flex items-center gap-2.5 rounded-lg border border-border p-2.5 text-left transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm"
                  >
                    <span className="font-mono text-xs font-semibold text-primary">{t.n}</span>
                    <span className="text-sm font-medium">{t.label}</span>
                    <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
        {/* ================================================== */}
        {/* E. O que são ChatGPT Ads?                          */}
        {/* ================================================== */}
        <Section
          id="o-que-sao"
          badge="Introdução"
          title="O que são ChatGPT Ads?"
          subtitle="A OpenAI abriu o ChatGPT pra publicidade — e o seu futuro cliente já está lá dentro, conversando e perguntando."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FlipCard>
              <CardContent className="group flex h-full flex-col p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MessageSquareText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Anúncios dentro do ChatGPT</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A OpenAI criou uma plataforma de publicidade que mostra anúncios
                  nativos dentro do ChatGPT. Pense como Google Ads, mas dentro da
                  IA mais usada do mundo.
                </p>
                <FlipHint />
              </CardContent>
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="text-lg font-semibold">Como funciona por dentro</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  O Ads Manager lembra o que você já conhece do Google e do Meta:
                  campanhas, conjuntos de anúncios, criativos e públicos. A
                  diferença é que seus anúncios aparecem no meio das conversas —
                  publicidade nativa, no contexto exato da pergunta, com o
                  formato conversacional como peça central.
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo("#cronograma");
                  }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Ver a linha do tempo
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <FlipHint back />
              </CardContent>
            </FlipCard>

            <FlipCard>
              <CardContent className="group flex h-full flex-col p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Ferramentas profissionais</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Ads Manager, API pra devs, pixel de conversão, product feeds —
                  tudo que você já usa no Google e Meta, agora no ecossistema
                  ChatGPT.
                </p>
                <FlipHint />
              </CardContent>
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="text-lg font-semibold">O arsenal completo</h3>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                  <li>• <strong className="text-foreground">Ads Manager</strong> — painel oficial, sem código</li>
                  <li>• <strong className="text-foreground">Advertiser + Bulk API</strong> — gestão programática em escala</li>
                  <li>• <strong className="text-foreground">Pixel + CAPI</strong> — medição navegador e servidor</li>
                  <li>• <strong className="text-foreground">Product Feeds</strong> — catálogo pra anúncios dinâmicos</li>
                </ul>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo("#api");
                  }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Ver API e ferramentas
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <FlipHint back />
              </CardContent>
            </FlipCard>

            <FlipCard>
              <CardContent className="group flex h-full flex-col p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Otimização por IA</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  O sistema oCPC (custo por clique otimizado) usa IA pra entregar
                  seus anúncios pra quem tem mais chance de converter. Menos
                  desperdício, mais resultado.
                </p>
                <FlipHint />
              </CardContent>
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="text-lg font-semibold">A IA trabalha por você</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  O oCPC analisa os sinais de conversão da sua conta e ajusta os
                  lances em tempo real, pra cada impressão. Quanto mais eventos
                  você envia (via pixel e CAPI), melhor ele aprende — a entrega
                  fica concentrada nas pessoas com maior probabilidade de
                  converter.
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo("#medicao");
                  }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Ver medição e conversões
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <FlipHint back />
              </CardContent>
            </FlipCard>
          </div>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* F. Por que anunciar no ChatGPT?                    */}
        {/* ================================================== */}
        <Section
          id="por-que"
          badge="Vantagens"
          title="Por que anunciar no ChatGPT?"
          subtitle="Quem chega primeiro paga menos e aprende mais rápido. Veja o que você ganha ao entrar agora."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FlipCard>
              <CardContent className="group flex h-full flex-col p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Audiência gigante e qualificada</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  300M+ usuários ativos por semana, engajados em conversas sobre
                  problemas, produtos e decisões de compra.
                </p>
                <FlipHint />
              </CardContent>
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="text-lg font-semibold">Por que isso importa</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  São 300M+ de usuários ativos semanais em mais de 200 países —
                  gente usando a IA pra pesquisar, comparar e decidir compras
                  reais. É tráfego pago com a qualidade de uma audiência
                  orgânica: alta intenção, baixo desperdício e engajamento
                  diário com o produto.
                </p>
                <FlipHint back />
              </CardContent>
            </FlipCard>

            <FlipCard>
              <CardContent className="group flex h-full flex-col p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Contexto de intenção</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  A pessoa pergunta e o seu anúncio aparece no momento exato da
                  decisão — não no meio de um scroll distraído.
                </p>
                <FlipHint />
              </CardContent>
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="text-lg font-semibold">O timing perfeito</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Num feed, a pessoa rola conteúdo sem querer nada. No ChatGPT,
                  ela pergunta — e a pergunta revela intenção explícita de
                  compra. Seu anúncio chega na resposta, convertido em entrega
                  relevante. É o melhor momento do funil: a decisão acontecendo.
                </p>
                <FlipHint back />
              </CardContent>
            </FlipCard>

            <FlipCard>
              <CardContent className="group flex h-full flex-col p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Primeiro a chegar = vantagem</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Plataforma nova, menos concorrência nos leilões e CPCs mais
                  baixos. Quem chega cedo colhe o melhor tráfego.
                </p>
                <FlipHint />
              </CardContent>
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="text-lg font-semibold">A janela de oportunidade</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  CPC estimado de R$ 0,80–2,50, contra R$ 2–8 no Google e R$
                  15–40 no LinkedIn. Enquanto a maioria ainda testa, os
                  primeiros anunciantes acumulam dados de conversão — e o oCPC
                  aprende mais rápido com eles. Quando a concorrência chegar,
                  você já tem histórico, criativos validados e custo menor.
                </p>
                <FlipHint back />
              </CardContent>
            </FlipCard>

            <FlipCard>
              <CardContent className="group flex h-full flex-col p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Ecossistema completo</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  API, medição com pixel e CAPI, product feeds e otimização por
                  IA. Tudo pronto desde o primeiro dia.
                </p>
                <FlipHint />
              </CardContent>
              <CardContent className="flex h-full flex-col p-6">
                <h3 className="text-lg font-semibold">Infraestrutura de grande</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Ads Manager pra operar sem código, Advertiser e Bulk API pra
                  escalar programaticamente, Pixel + CAPI pra medição confiável,
                  Product Feeds pro e-commerce e oCPC otimizando tudo com IA.
                  Você começa pequeno e cresce sem trocar de plataforma.
                </p>
                <FlipHint back />
              </CardContent>
            </FlipCard>
          </div>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* E2. Cronograma — linha do tempo                    */}
        {/* ================================================== */}
        <Section
          id="cronograma"
          badge="Linha do tempo"
          title="Como o ChatGPT Ads chegou até aqui"
          subtitle="De um chatbot sem anúncios a ecossistema completo de publicidade com IA — a evolução em cinco marcos."
        >
          <div className="mx-auto max-w-3xl">
            {timeline.map((t, i) => (
              <TimelineItem key={t.title} date={t.date} title={t.title} desc={t.desc} index={i} />
            ))}
          </div>
        </Section>

        <Separator className="mx-auto max-w-6xl" />
        {/* ================================================== */}
        {/* G. Para quem é o ChatGPT Ads?                      */}
        {/* ================================================== */}
        <Section
          id="para-quem"
          badge="Público-alvo"
          title="Para quem é o ChatGPT Ads?"
          subtitle="Não importa o seu modelo de negócio: se o seu cliente pergunta pra IA, você pode anunciar pra ele."
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex w-full gap-1 overflow-x-auto bg-muted/50 p-1 scrollbar-none">
              {audienceTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex-1 gap-2 whitespace-nowrap px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {audienceTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {tab.cards.map((card) => (
                      <HoverCard key={card.title}>
                        <CardContent className="group p-6">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <card.icon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {card.desc}
                          </p>
                        </CardContent>
                      </HoverCard>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* H. Como funciona na prática                        */}
        {/* ================================================== */}
        <Section
          id="como-funciona"
          badge="Passo a passo"
          title="Como anunciar no ChatGPT: o passo a passo"
          subtitle="Do zero à primeira campanha em cinco passos simples — sem enrolação e sem precisar de equipe."
        >
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col gap-0">
              <StepIndicator
                step="1"
                index={0}
                title="Crie sua conta"
                desc="Acesse ads.openai.com e cadastre seu negócio. Processo simples e rápido — em poucos minutos você já tem acesso ao Ads Manager."
              />
              <StepIndicator
                step="2"
                index={1}
                title="Configure a campanha"
                desc="Defina objetivo, público, orçamento e criativo pelo Ads Manager ou pela API. A interface lembra o que você já conhece de outras plataformas."
              />
              <StepIndicator
                step="3"
                index={2}
                title="Integre a medição"
                desc="Instale o Measurement Pixel e/ou a CAPI pra rastrear conversões reais. Sem medição confiável, a IA não tem com o que aprender."
              />
              <StepIndicator
                step="4"
                index={3}
                title="Otimize com dados"
                desc="O oCPC aprende com seus dados e otimiza a entrega automaticamente. Quanto mais eventos de conversão, melhor a otimização."
              />
              <StepIndicator
                step="5"
                index={4}
                title="Escale os resultados"
                desc="Ajuste bids, teste criativos, use Product Feeds e Bulk API pra crescer. Quando o modelo valida, é hora de acelerar."
              />
            </div>
          </div>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* I. ChatGPT Ads vs Outros                           */}
        {/* ================================================== */}
        <Section
          id="comparativo"
          badge="Comparativo"
          title="ChatGPT Ads vs Google, Meta e LinkedIn"
          subtitle="Onde o ChatGPT Ads ganha — e onde ainda perde. Sem fantasia, pra você decidir com clareza."
        >
          <Tabs value={compareTab} onValueChange={setCompareTab} className="w-full">
            <TabsList className="flex w-full gap-1 overflow-x-auto bg-muted/50 p-1 scrollbar-none">
              {comparisonTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex-1 whitespace-nowrap px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {comparisonTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Card>
                      <CardContent className="p-4 md:p-6">
                        <ul className="flex flex-col gap-4">
                          {tab.rows.map((row) => (
                            <li key={row.feature} className="flex items-start gap-3">
                              {row.advantage ? (
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                              ) : (
                                <X className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/60" />
                              )}
                              <div>
                                <span
                                  className={cn(
                                    "font-medium",
                                    row.advantage ? "text-foreground" : "text-muted-foreground"
                                  )}
                                >
                                  {row.feature}
                                </span>
                                <p className="mt-0.5 text-sm text-muted-foreground">{row.note}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* I2. Benchmarks — quanto custa                      */}
        {/* ================================================== */}
        <Section
          id="benchmarks"
          badge="Números"
          title="Benchmarks: quanto custa anunciar no ChatGPT?"
          subtitle="CPC, CTR e CPM estimados por plataforma — use como régua inicial de planejamento, não como promessa."
        >
          <div className="overflow-x-auto rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[160px]">Métrica</TableHead>
                  <TableHead className="bg-primary/10 font-semibold text-primary">
                    ChatGPT Ads
                  </TableHead>
                  <TableHead>Google Ads</TableHead>
                  <TableHead>Meta Ads</TableHead>
                  <TableHead>LinkedIn Ads</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benchmarks.map((b) => (
                  <TableRow key={b.metric}>
                    <TableCell className="font-medium">{b.metric}</TableCell>
                    <TableCell className="bg-primary/5 font-semibold text-foreground">
                      {b.chatgpt}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{b.google}</TableCell>
                    <TableCell className="text-muted-foreground">{b.meta}</TableCell>
                    <TableCell className="text-muted-foreground">{b.linkedin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Faixas estimadas de mercado em reais, com base na prática de agências
            e anunciantes — variam por nicho, segmentação, qualidade do criativo e
            momento da plataforma. Confira os valores reais da sua conta no Ads
            Manager.
          </p>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* J. API e Ferramentas                               */}
        {/* ================================================== */}
        <Section
          id="api"
          badge="Desenvolvedores"
          title="API e Ferramentas da OpenAI"
          subtitle="Tudo que a sua equipe técnica precisa pra ir além do painel — e escalar de verdade."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apiTools.map((tool) => (
              <Collapsible key={tool.title}>
                <Card className="h-full">
                  <CollapsibleTrigger className="w-full text-left">
                    <CardContent className="p-5 md:p-6">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                          <tool.icon className="h-5 w-5 text-primary" />
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                      </div>
                      <h3 className="mt-4 font-semibold">{tool.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {tool.desc}
                      </p>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pb-5 md:pb-6">
                      <Separator className="mb-4" />
                      <p className="text-sm leading-relaxed text-muted-foreground">{tool.detail}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
        </Section>

        <Separator className="mx-auto max-w-6xl" />
        {/* ================================================== */}
        {/* K. Medição e Conversões                            */}
        {/* ================================================== */}
        <Section
          id="medicao"
          badge="Analytics"
          title="Medição e Conversões: Pixel e CAPI"
          subtitle="Sem medição não existe otimização: é daqui que o oCPC tira os dados pra aprender."
        >
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Use o <strong className="text-foreground">Measurement Pixel</strong> pra rastreamento no
            navegador e a{" "}
            <strong className="text-foreground">Conversions API (CAPI)</strong> pra dados do
            servidor. Os dois métodos se complementam: o pixel captura o comportamento
            no site e a CAPI garante que as conversões mais importantes — como compras
            e cadastros — cheguem completas, mesmo com bloqueadores de anúncios.
          </p>

          <Collapsible>
            <Card>
              <CollapsibleTrigger className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-base md:text-lg">Tabela de Eventos</CardTitle>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-[180px]">Evento</TableHead>
                          <TableHead className="w-[120px]">Tipo</TableHead>
                          <TableHead>Descrição</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {measurementEvents.map((row) => (
                          <TableRow key={row.event}>
                            <TableCell className="font-mono text-sm">{row.event}</TableCell>
                            <TableCell>
                              <Badge
                                className={cn(
                                  "text-[11px] font-medium",
                                  row.type === "pixel" &&
                                    "border-teal-700/30 bg-teal-50 text-teal-700",
                                  row.type === "capi" &&
                                    "border-primary/30 bg-primary/10 text-primary",
                                  row.type === "both" &&
                                    "border-foreground/20 bg-muted text-foreground"
                                )}
                              >
                                {row.type === "pixel"
                                  ? "Pixel"
                                  : row.type === "capi"
                                    ? "CAPI"
                                    : "Ambos"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{row.desc}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* L. Estratégias Práticas                            */}
        {/* ================================================== */}
        <Section
          id="estrategias"
          badge="Dicas"
          title="Estratégias Práticas"
          subtitle="Seis táticas diretas pra você arrancar mais resultado das suas campanhas de ads IA."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {strategies.map((s) => (
              <HoverCard key={s.title}>
                <CardContent className="group p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </CardContent>
              </HoverCard>
            ))}
          </div>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* L2. Erros comuns                                   */}
        {/* ================================================== */}
        <Section
          id="erros"
          badge="Evite"
          title="Erros comuns ao anunciar no ChatGPT"
          subtitle="Os tropeços que custam dinheiro real — e como você sai deles de graça, aprendendo com o erro dos outros."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mistakes.map((m) => (
              <HoverCard key={m.title}>
                <CardContent className="group p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                    <m.icon className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                </CardContent>
              </HoverCard>
            ))}
          </div>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* L3. Checklist de lançamento (interativo)            */}
        {/* ================================================== */}
        <Section
          id="checklist"
          badge="Interativo"
          title="Checklist de lançamento"
          subtitle="Marque conforme for preparando sua primeira campanha — quando tudo estiver ticado, você está pronto pro ar."
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-[200px] flex-1">
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">Seu progresso</span>
                  <span className="text-muted-foreground">
                    {checkedItems.size} de {checklistItems.length} concluídos
                  </span>
                </div>
                <Progress value={checklistProgress} className="h-2" />
              </div>
              {checkedItems.size > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCheckedItems(new Set())}
                  className="text-muted-foreground"
                >
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Recomeçar
                </Button>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {checklistItems.map((item, i) => (
                <motion.button
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                  onClick={() => toggleChecklist(i)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-4 text-left transition-all hover:border-primary/40 hover:bg-primary/5",
                    checkedItems.has(i) && "border-primary/30 bg-primary/5"
                  )}
                >
                  <Checkbox
                    checked={checkedItems.has(i)}
                    onCheckedChange={() => toggleChecklist(i)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-0.5"
                    aria-label={item.title}
                  />
                  <div>
                    <span
                      className={cn(
                        "font-medium",
                        checkedItems.has(i) && "text-muted-foreground line-through"
                      )}
                    >
                      {item.title}
                    </span>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {checklistProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-6 rounded-lg border border-primary/30 bg-primary/10 p-4 text-center"
                >
                  <p className="font-semibold text-primary">
                    Tudo pronto! Sua primeira campanha de ChatGPT Ads tem tudo pra decolar.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* M. Glossário                                       */}
        {/* ================================================== */}
        <Section
          id="glossario"
          badge="Referência"
          title="Glossário: termos de ChatGPT Ads e Ads IA"
          subtitle="Travou em algum termo de ads IA? Busca rápida, resposta clara — em português."
        >
          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Buscar termo..."
                className="pl-9"
                aria-label="Buscar termo no glossário"
              />
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredGlossary.map((g) => (
                <motion.div
                  key={g.term}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  variants={fadeUp}
                >
                  <Card className="h-full">
                    <CardContent className="p-4 md:p-5">
                      <h3 className="font-bold text-primary">{g.term}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {g.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredGlossary.length === 0 && (
            <p className="mt-8 text-center text-muted-foreground">
              Nenhum termo encontrado para &quot;{glossarySearch}&quot;.
            </p>
          )}
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* N. Sobre a Autora                                  */}
        {/* ================================================== */}
        <section id="sobre" className="mx-auto w-full max-w-6xl scroll-mt-16 px-4 py-16 md:scroll-mt-20 md:px-6 md:py-24">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mx-auto max-w-lg"
          >
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center md:p-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mt-5 text-2xl font-bold">Lorenza Volponi</h2>
                <p className="mt-1 font-medium text-primary">AI Strategist · Builder · Educator</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Lorenza estuda e aplica inteligência artificial em negócios reais —
                  estrategista, builder e educadora. Na{" "}
                  <a
                    href="https://volponi.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    volponi.tech
                  </a>{" "}
                  ela publica guias práticos como este, sempre em português claro,
                  direto e sem enrolação.
                </p>
                <TooltipProvider delayDuration={200}>
                  <div className="mt-6 flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href="https://volponi.tech"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="volponi.tech"
                          className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>volponi.tech</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href="https://github.com/volponitech"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                        >
                          <Code2 className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>GitHub</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href="https://www.linkedin.com/in/lorenza-volponi"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                        >
                          <Users className="h-5 w-5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>LinkedIn</TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <Separator className="mx-auto max-w-6xl" />
        {/* ================================================== */}
        {/* O. FAQ                                             */}
        {/* ================================================== */}
        <Section
          id="faq"
          badge="FAQ"
          title="FAQ: Perguntas Frequentes sobre ChatGPT Ads"
          subtitle="As dúvidas que todo mundo tem antes de colocar o primeiro real no ChatGPT Ads."
        >
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`} className="rounded-lg border px-4 data-[state=open]:bg-card">
                  <AccordionTrigger className="text-sm md:text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        <Separator className="mx-auto max-w-6xl" />

        {/* ================================================== */}
        {/* P. CTA Final                                       */}
        {/* ================================================== */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16 md:px-6 md:pb-28 md:pt-24">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <Card className="relative overflow-hidden border-2 border-primary/25 shadow-lg shadow-primary/10">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/8 to-amber-400/8"
                aria-hidden="true"
              />
              <CardContent className="relative flex flex-col items-center gap-6 p-8 text-center md:p-12">
                <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
                  Pronto pra colocar seus anúncios no ChatGPT?
                </h2>
                <p className="max-w-2xl text-muted-foreground md:text-lg">
                  A janela de oportunidade está aberta agora: menos concorrência,
                  CPCs mais baixos e uma audiência gigante esperando você. Crie
                  sua conta, suba a primeira campanha e aprenda na prática.
                </p>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Magnetic>
                    <Button
                      size="lg"
                      asChild
                      className="bg-primary font-semibold text-primary-foreground shadow-md shadow-primary/25 hover:bg-primary/90"
                    >
                      <a href="https://ads.openai.com" target="_blank" rel="noopener noreferrer">
                        Acessar ads.openai.com
                      </a>
                    </Button>
                  </Magnetic>
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="https://developers.openai.com/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver documentação
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    onClick={() => setShareOpen(true)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar guia
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>

      {/* ================================================== */}
      {/* Q. Footer                                           */}
      {/* ================================================== */}
      <footer className="mt-auto border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-12">
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="https://volponi.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              { }
              <img src="/fox-black.png" alt="volponi.tech — raposa" width={24} height={24} className="h-6 w-6 rounded-md" />
              <span className="font-bold">volponi.tech</span>
            </a>
            <p className="text-sm text-muted-foreground">
              Inteligência artificial aplicada, estratégia e educação em IA.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 text-sm sm:grid-cols-3">
            <div>
              <h3 className="font-semibold">Navegação</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Recursos</h3>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <a
                    href="https://ads.openai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    ads.openai.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://developers.openai.com/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    developers.openai.com/ads
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Social</h3>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <a
                    href="https://github.com/volponitech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/lorenza-volponi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <p className="text-center text-sm text-muted-foreground">
            © 2026 Lorenza Volponi — volponi.tech. Guia independente sobre ChatGPT
            Ads e GPT Ads.
          </p>
        </div>
      </footer>

      {/* ================================================== */}
      {/* R. Botão Back-to-Top                                */}
      {/* ================================================== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ================================================== */}
      {/* S. Dock flutuante de acesso rápido                  */}
      {/* ================================================== */}
      <FloatingDock
        visible={showBackToTop}
        onShare={() => setShareOpen(true)}
        onTop={scrollToTop}
        onNavigate={scrollTo}
      />

      {/* ================================================== */}
      {/* U. Raposa IA — assistente em popup                    */}
      {/* ================================================== */}
      <AssistantChat onNavigate={scrollTo} />

      {/* ================================================== */}
      {/* T. Diálogo de compartilhamento (off-page)           */}
      {/* ================================================== */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhe este guia</DialogTitle>
            <DialogDescription>
              Ajude mais gente a descobrir como anunciar no ChatGPT — compartilhe
              no seu canal preferido.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col gap-2 border-border p-4 font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              <a
                href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " " + SHARE_URL)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquareText className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col gap-2 border-border p-4 font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Users className="h-5 w-5" />
                LinkedIn
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto flex-col gap-2 border-border p-4 font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-5 w-5" />
                X (Twitter)
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={copyShareLink}
              className="h-auto flex-col gap-2 border-border p-4 font-medium hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              {linkCopied ? (
                <Check className="h-5 w-5 text-primary" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
              {linkCopied ? "Link copiado!" : "Copiar link"}
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">{SHARE_URL}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

