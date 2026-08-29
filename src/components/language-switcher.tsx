"use client";

import { Globe2, Languages, X } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "volponi-language-preference";

type LanguagePreference = "pt" | "en" | "auto";

function detectedLanguage() {
  if (typeof navigator === "undefined") return "pt";
  return (navigator.languages?.[0] || navigator.language || "pt").toLowerCase();
}

function isLikelyBot() {
  if (typeof navigator === "undefined") return true;
  return /bot|crawler|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegram|discord/i.test(navigator.userAgent);
}

function isTranslationProxy() {
  if (typeof window === "undefined") return false;
  return window.location.hostname === "translate.google.com" || window.location.hostname.endsWith(".translate.goog");
}

function isEnglishEdition() {
  if (typeof window === "undefined") return false;
  return window.location.pathname === "/en" || window.location.pathname.startsWith("/en/");
}

function translatedUrl(targetLanguage: string) {
  const target = targetLanguage.split("-")[0] || "en";
  const source = isEnglishEdition() ? "en" : "pt";
  return `https://translate.google.com/translate?sl=${source}&tl=${encodeURIComponent(target)}&u=${encodeURIComponent(window.location.href)}`;
}

function goToLanguage(language: string, replace = false) {
  if (typeof window === "undefined" || isTranslationProxy()) return;

  const target = language.split("-")[0];
  const currentPath = window.location.pathname;
  let destination: string | null = null;

  if (target === "pt") {
    destination = isEnglishEdition() ? "/" : null;
  } else if (target === "en") {
    destination = currentPath === "/" ? "/en" : isEnglishEdition() ? null : translatedUrl("en");
  } else {
    destination = translatedUrl(target);
  }

  if (!destination) return;
  if (replace) window.location.replace(destination);
  else window.location.href = destination;
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [detected, setDetected] = useState("pt");
  const [edition, setEdition] = useState<"pt" | "en">("pt");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const translationProxy = isTranslationProxy();
    const language = detectedLanguage();
    const englishEdition = isEnglishEdition();
    const saved = window.localStorage.getItem(STORAGE_KEY) as LanguagePreference | null;

    const uiTimer = window.setTimeout(() => {
      setDisabled(translationProxy);
      if (!translationProxy) {
        setDetected(language);
        setEdition(englishEdition ? "en" : "pt");
      }
    }, 0);

    if (translationProxy) {
      return () => window.clearTimeout(uiTimer);
    }

    document.documentElement.lang = englishEdition ? "en" : "pt-BR";

    if (isLikelyBot()) {
      return () => window.clearTimeout(uiTimer);
    }

    if (saved === "auto") {
      goToLanguage(language, true);
      return () => window.clearTimeout(uiTimer);
    }

    if (saved === "en") {
      goToLanguage("en", true);
      return () => window.clearTimeout(uiTimer);
    }

    if (saved === "pt") {
      goToLanguage("pt", true);
      return () => window.clearTimeout(uiTimer);
    }

    let redirectTimer: number | undefined;
    if (!language.startsWith("pt")) {
      window.localStorage.setItem(STORAGE_KEY, "auto");
      redirectTimer = window.setTimeout(() => goToLanguage(language, true), 350);
    }

    return () => {
      window.clearTimeout(uiTimer);
      if (redirectTimer !== undefined) window.clearTimeout(redirectTimer);
    };
  }, []);

  const choose = (preference: LanguagePreference) => {
    window.localStorage.setItem(STORAGE_KEY, preference);
    setOpen(false);
    goToLanguage(preference === "auto" ? detectedLanguage() : preference);
  };

  if (disabled) return null;

  const deviceLabel = detected.split("-")[0]?.toUpperCase() || "AUTO";

  return (
    <div className="fixed bottom-[calc(5.8rem+env(safe-area-inset-bottom))] left-3 z-[90] lg:bottom-5 lg:left-5">
      {open ? (
        <div className="mb-3 w-[min(22rem,calc(100vw-1.5rem))] rounded-3xl border border-zinc-200 bg-white p-4 text-zinc-950 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                <Languages className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-black">Leia no seu idioma</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Detectamos {detected}. A edição em inglês é autoral; os demais idiomas usam tradução automática da página atual.
                </p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-zinc-100" aria-label="Fechar seletor de idioma">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid gap-2">
            <button type="button" onClick={() => choose("auto")} className="rounded-2xl bg-zinc-950 px-4 py-3 text-left text-xs font-bold text-white">
              Usar o idioma do dispositivo · {deviceLabel}
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => choose("pt")} className="rounded-2xl border border-zinc-200 px-4 py-3 text-left text-xs font-bold hover:border-zinc-400">Português</button>
              <button type="button" onClick={() => choose("en")} className="rounded-2xl border border-zinc-200 px-4 py-3 text-left text-xs font-bold hover:border-zinc-400">English</button>
            </div>
          </div>
          <p className="mt-3 text-[10px] leading-4 text-zinc-400">A preferência fica salva neste navegador. Traduções automáticas podem exigir revisão humana para uso editorial.</p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 text-xs font-black text-zinc-800 shadow-lg transition hover:border-zinc-500"
        aria-label="Escolher idioma"
        aria-expanded={open}
      >
        <Globe2 className="h-4 w-4" /> {edition.toUpperCase()}
      </button>
    </div>
  );
}
