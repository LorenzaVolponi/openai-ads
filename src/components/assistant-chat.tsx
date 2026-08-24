"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  type PanInfo,
} from "framer-motion";
import { MessageCircle, X, Send, BookOpen, Sparkles, GripHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  askAssistant,
  STARTER_QUESTIONS,
  type ChatTurn,
} from "@/lib/assistant/engine";

type Msg = ChatTurn & {
  sources?: { label: string; href: string }[];
  followUps?: string[];
};

function greetingMessage(): Msg {
  return {
    role: "assistant",
    text: askAssistant("oi").text,
    followUps: STARTER_QUESTIONS.slice(0, 4),
  };
}

// ------------------------------------------------------------
// Efeito de digitação — revela o texto progressivamente
// ------------------------------------------------------------
function TypewriterText({
  text,
  onTick,
  onDone,
}: {
  text: string;
  onTick?: () => void;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState(() => {
    if (typeof window === "undefined") return 0;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? text.length
      : 0;
  });
  const doneRef = useRef(shown >= text.length);

  // Revela progressivamente (respeita prefers-reduced-motion via estado inicial)
  useEffect(() => {
    if (doneRef.current) return;
    const step = Math.max(2, Math.ceil(text.length / 90));
    let id = 0;
    id = window.setInterval(() => {
      setShown((prev) => {
        if (prev >= text.length) {
          window.clearInterval(id);
          return prev;
        }
        return Math.min(prev + step, text.length);
      });
      onTick?.();
    }, 24);
    return () => window.clearInterval(id);
     
  }, [text]);

  // Conclusão
  useEffect(() => {
    if (shown >= text.length && !doneRef.current) {
      doneRef.current = true;
      onDone?.();
    }
     
  }, [shown]);

  const complete = shown >= text.length;
  return (
    <>
      {text.slice(0, shown)}
      {!complete && (
        <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse rounded bg-primary align-middle" aria-hidden="true" />
      )}
    </>
  );
}

export function AssistantChat({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [open, setOpen] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  // Índice da mensagem sendo "digitada" (apenas a última da raposa)
  const [revealing, setRevealing] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Scroll lock do body quando o sheet está aberto (mobile-first)
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Autoscroll pra última mensagem
  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking, scrollToBottom]);

  const toggleOpen = useCallback(() => {
    if (!open && messages.length === 0) {
      setMessages([greetingMessage()]);
      setRevealing(0);
    }
    setOpen((v) => !v);
  }, [open, messages.length]);

  const send = useCallback(
    (raw?: string) => {
      const q = (raw ?? input).trim();
      if (!q || thinking) return;
      const userMsg: Msg = { role: "user", text: q };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setThinking(true);
      setRevealing(-1);

      window.setTimeout(
        () => {
          // Contexto multi-turn: turnos ANTERIORES (sem a mensagem atual)
          const history = messages
            .slice(-6)
            .map(({ role, text }) => ({ role, text }));
          const ans = askAssistant(q, history);
          setMessages((m) => [...m, { role: "assistant", ...ans }]);
          setRevealing(messages.length + 1);
          setThinking(false);
        },
        420 + Math.random() * 380
      );
    },
    [input, thinking, messages]
  );

  const dismissSheet = useCallback(() => setOpen(false), []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 90 || info.velocity.y > 600) dismissSheet();
  };

  const lastAssistantIdx = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  })();

  return (
    <>
      {/* Launcher — acima da safe area do iPhone */}
      <div className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 z-50 sm:right-6">
        <AnimatePresence>
          {!open && !hintDismissed && (
            <motion.button
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              onClick={() => setHintDismissed(true)}
              aria-hidden="true"
              tabIndex={-1}
              className="absolute -top-1 right-16 whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium shadow-lg"
            >
              Tire suas dúvidas com a Raposa IA
              <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleOpen}
          aria-label={open ? "Fechar assistente Raposa IA" : "Abrir assistente Raposa IA — perguntas sobre o guia"}
          aria-expanded={open}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition-colors hover:bg-primary/90"
        >
          {!open && (
            <span
              className="absolute inset-0 animate-ping rounded-full bg-primary/25"
              aria-hidden="true"
              style={{ animationDuration: "2.5s" }}
            />
          )}
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          {!open && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-card text-primary shadow-sm">
              <Sparkles className="h-3 w-3" />
            </span>
          )}
        </motion.button>
      </div>

      {/* Painel — bottom-sheet no mobile (iOS/Android), card flutuante no desktop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={onDragEnd}
            role="dialog"
            aria-label="Raposa IA — assistente do guia"
            className="fixed inset-x-0 bottom-0 z-50 flex h-[min(78dvh,620px)] flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[min(560px,calc(100dvh-7.5rem))] sm:w-[400px] sm:rounded-2xl"
          >
            {/* Drag handle (mobile) — arrasta pra baixo pra fechar */}
            <div
              className="flex cursor-grab touch-none justify-center pb-1 pt-2 active:cursor-grabbing sm:hidden"
              onPointerDown={(e) => dragControls.start(e)}
              aria-hidden="true"
            >
              <GripHorizontal className="h-5 w-10 text-muted-foreground/50" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-primary/10 to-transparent px-4 py-3">
              <img
                src="/fox-black.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight">Raposa IA</p>
                <p className="truncate text-xs text-muted-foreground">
                  Responde só com o conteúdo do guia — sem inventar
                </p>
              </div>
              <button
                onClick={dismissSheet}
                aria-label="Fechar assistente"
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Mensagens */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4"
              style={{ WebkitOverflowScrolling: "touch" }}
              role="log"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <div key={i} className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[88%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-muted"
                    )}
                  >
                    {m.role === "assistant" && i === revealing ? (
                      <TypewriterText
                        text={m.text}
                        onTick={scrollToBottom}
                        onDone={() => setRevealing(-1)}
                      />
                    ) : (
                      m.text
                    )}
                  </div>

                  {/* Fontes clicáveis (após a digitação terminar) */}
                  {m.role === "assistant" && m.sources && m.sources.length > 0 && i !== revealing && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {m.sources.map((s, j) => (
                        <button
                          key={j}
                          onClick={() => {
                            onNavigate(s.href);
                            dismissSheet();
                          }}
                          className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/20"
                        >
                          <BookOpen className="h-3 w-3" />
                          Ir para: {s.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Sugestões (apenas na última resposta, após digitar) */}
                  {m.role === "assistant" && m.followUps && m.followUps.length > 0 && i === lastAssistantIdx && i !== revealing && !thinking && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.followUps.map((f) => (
                        <button
                          key={f}
                          onClick={() => send(f)}
                          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Pensando... */}
              {thinking && (
                <div className="flex items-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input — 16px evita zoom automático no iOS */}
            <form
              className="flex items-center gap-2 border-t border-border bg-card p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:pb-3"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte sobre ChatGPT Ads..."
                aria-label="Digite sua pergunta sobre o guia"
                className="flex-1"
                style={{ fontSize: "16px" }}
                maxLength={200}
                autoComplete="off"
                enterKeyHint="send"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || thinking}
                aria-label="Enviar pergunta"
                className="h-10 w-10 shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
