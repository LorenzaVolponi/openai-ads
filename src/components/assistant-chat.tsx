"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  useReducedMotion,
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

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function greetingMessage(): Msg {
  return {
    role: "assistant",
    text: askAssistant("oi").text,
    followUps: STARTER_QUESTIONS.slice(0, 4),
  };
}

function TypewriterText({
  text,
  reducedMotion,
  onTick,
  onDone,
}: {
  text: string;
  reducedMotion: boolean;
  onTick?: () => void;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState(() => (reducedMotion ? text.length : 0));
  const doneRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setShown(text.length);
      return;
    }

    const step = Math.max(2, Math.ceil(text.length / 90));
    const id = window.setInterval(() => {
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
  }, [text, reducedMotion, onTick]);

  useEffect(() => {
    if (shown >= text.length && !doneRef.current) {
      doneRef.current = true;
      onDone?.();
    }
  }, [shown, text.length, onDone]);

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

export function AssistantChat() {
  const [open, setOpen] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [revealing, setRevealing] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const dragControls = useDragControls();
  const prefersReducedMotion = useReducedMotion();

  const dismissSheet = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismissSheet();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dismissSheet]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
      return () => window.cancelAnimationFrame(frame);
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      const previous = previousFocusRef.current;
      const target = previous?.isConnected ? previous : launcherRef.current;
      const frame = window.requestAnimationFrame(() => target?.focus());
      return () => window.cancelAnimationFrame(frame);
    }
  }, [open]);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking, scrollToBottom]);

  const openAssistant = useCallback(() => {
    if (!open) {
      const active = document.activeElement;
      previousFocusRef.current = active instanceof HTMLElement ? active : launcherRef.current;
    }
    if (messages.length === 0) {
      setMessages([greetingMessage()]);
      setRevealing(0);
    }
    setHintDismissed(true);
    setOpen(true);
  }, [messages.length, open]);

  useEffect(() => {
    const handler = () => openAssistant();
    window.addEventListener("volponi:assistant-open", handler);
    return () => window.removeEventListener("volponi:assistant-open", handler);
  }, [openAssistant]);

  const toggleOpen = useCallback(() => {
    if (open) {
      dismissSheet();
      return;
    }
    openAssistant();
  }, [open, openAssistant, dismissSheet]);

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
          const history = messages
            .slice(-6)
            .map(({ role, text }) => ({ role, text }));
          const ans = askAssistant(q, history);
          setMessages((m) => [...m, { role: "assistant", ...ans }]);
          setRevealing(messages.length + 1);
          setThinking(false);
        },
        prefersReducedMotion ? 0 : 420 + Math.random() * 380
      );
    },
    [input, thinking, messages, prefersReducedMotion]
  );

  const navigateTo = useCallback(
    (href: string) => {
      dismissSheet();
      window.requestAnimationFrame(() => {
        if (href.startsWith("#")) {
          document.getElementById(href.slice(1))?.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
          return;
        }
        window.location.assign(href);
      });
    },
    [dismissSheet, prefersReducedMotion]
  );

  const handleDialogKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismissSheet();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => element.tabIndex >= 0 && !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true"
      );

      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    },
    [dismissSheet]
  );

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
      <div className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-50 lg:bottom-[calc(1.25rem+env(safe-area-inset-bottom))] lg:right-6">
        <AnimatePresence>
          {!open && !hintDismissed && (
            <motion.button
              initial={prefersReducedMotion ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 8 }}
              onClick={() => setHintDismissed(true)}
              aria-hidden="true"
              tabIndex={-1}
              className="absolute -top-1 right-16 hidden whitespace-nowrap rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium shadow-lg sm:block"
            >
              Tire suas dúvidas com a Raposa IA
              <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          ref={launcherRef}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
          onClick={toggleOpen}
          aria-label={open ? "Fechar assistente Raposa IA" : "Abrir assistente Raposa IA — perguntas sobre o guia"}
          aria-expanded={open}
          aria-controls="raposa-assistant-dialog"
          aria-haspopup="dialog"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-black/15 transition-colors hover:bg-zinc-800"
        >
          {!open && !prefersReducedMotion && (
            <span
              className="absolute inset-0 animate-ping rounded-full bg-zinc-950/15"
              aria-hidden="true"
              style={{ animationDuration: "2.5s" }}
            />
          )}
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          {!open && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-zinc-950 shadow-sm">
              <Sparkles className="h-3 w-3" />
            </span>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialogRef}
            id="raposa-assistant-dialog"
            tabIndex={-1}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 60 }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 32 }}
            drag={prefersReducedMotion ? false : "y"}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={onDragEnd}
            onKeyDown={handleDialogKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="raposa-assistant-title"
            aria-describedby="raposa-assistant-description"
            className="fixed inset-x-3 bottom-[calc(4.9rem+env(safe-area-inset-bottom))] z-50 flex h-[min(68dvh,620px)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl lg:inset-x-auto lg:bottom-24 lg:right-6 lg:h-[min(560px,calc(100dvh-7.5rem))] lg:w-[400px] lg:rounded-2xl"
          >
            {!prefersReducedMotion && (
              <div
                className="flex cursor-grab touch-none justify-center pb-1 pt-2 active:cursor-grabbing lg:hidden"
                onPointerDown={(e) => dragControls.start(e)}
                aria-hidden="true"
              >
                <GripHorizontal className="h-5 w-10 text-muted-foreground/50" />
              </div>
            )}

            <div className="flex items-center gap-3 border-b border-border bg-zinc-50 px-4 py-3">
              <img
                src="/fox-black.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <p id="raposa-assistant-title" className="text-sm font-semibold leading-tight">Raposa IA</p>
                <p id="raposa-assistant-description" className="truncate text-xs text-muted-foreground">
                  Responde só com o conteúdo do guia — sem inventar
                </p>
              </div>
              <button
                onClick={dismissSheet}
                aria-label="Fechar assistente"
                className="min-h-10 min-w-10 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4"
              style={{ WebkitOverflowScrolling: "touch" }}
              role="log"
              aria-live="polite"
              aria-busy={thinking}
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
                        reducedMotion={Boolean(prefersReducedMotion)}
                        onTick={scrollToBottom}
                        onDone={() => setRevealing(-1)}
                      />
                    ) : (
                      m.text
                    )}
                  </div>

                  {m.role === "assistant" && m.sources && m.sources.length > 0 && i !== revealing && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {m.sources.map((s, j) => (
                        <button
                          key={j}
                          onClick={() => navigateTo(s.href)}
                          className="inline-flex min-h-9 items-center gap-1 rounded-full border border-zinc-300 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-800 transition-colors hover:bg-zinc-100"
                        >
                          <BookOpen className="h-3 w-3" />
                          Ir para: {s.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.role === "assistant" && m.followUps && m.followUps.length > 0 && i === lastAssistantIdx && i !== revealing && !thinking && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.followUps.map((f) => (
                        <button
                          key={f}
                          onClick={() => send(f)}
                          className="min-h-9 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-zinc-500 hover:text-zinc-950"
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {thinking && (
                <div className="flex items-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                    <span className="sr-only">A Raposa está preparando a resposta.</span>
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full bg-muted-foreground/60",
                          !prefersReducedMotion && "animate-bounce"
                        )}
                        style={prefersReducedMotion ? undefined : { animationDelay: `${d * 0.15}s` }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              className="flex items-center gap-2 border-t border-border bg-card p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte sobre ChatGPT Ads..."
                aria-label="Digite sua pergunta sobre o guia"
                className="min-h-11 flex-1"
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
                className="h-11 w-11 shrink-0 bg-primary text-primary-foreground hover:bg-zinc-800"
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
