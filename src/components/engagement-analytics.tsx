"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

const observedSections = ["como-aparece", "review", "dados"] as const;

function safeTrack(name: string, data?: Record<string, string | number | boolean>) {
  try {
    track(name, data);
  } catch {
    // Analytics must never interfere with the educational experience.
  }
}

function normalizedText(element: Element | null) {
  return element?.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) ?? "";
}

export function EngagementAnalytics() {
  useEffect(() => {
    const seenSections = new Set<string>();
    const sectionElements = observedSections
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.35) return;
          const section = entry.target.id;
          if (seenSections.has(section)) return;
          seenSections.add(section);
          safeTrack("Editorial section viewed", { section });
        });
      },
      { threshold: [0.35, 0.6] },
    );

    sectionElements.forEach((element) => observer.observe(element));

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target;

      const learningTab = target.closest('#como-aparece [role="tab"]');
      if (learningTab) {
        safeTrack("Learning screen selected", { screen: normalizedText(learningTab) });
        return;
      }

      const deconstructButton = target.closest("#como-aparece button");
      const deconstructText = normalizedText(deconstructButton);
      if (deconstructButton && deconstructText.startsWith("Desmontar")) {
        safeTrack("Ad anatomy opened");
        return;
      }

      const anatomyButton = target.closest("#como-aparece button");
      const anatomyText = normalizedText(anatomyButton);
      if (anatomyButton && /^[1-6]\s/.test(anatomyText)) {
        safeTrack("Ad anatomy part selected", { part: anatomyText.slice(0, 48) });
        return;
      }

      const reviewButton = target.closest("#review button");
      if (reviewButton) {
        const label = normalizedText(reviewButton) || reviewButton.getAttribute("aria-label") || "review-action";
        if (label.includes("Exemplo ruim")) safeTrack("Ad review preset used", { preset: "bad" });
        else if (label.includes("Exemplo bom")) safeTrack("Ad review preset used", { preset: "good" });
        else if (label.toLocaleLowerCase("pt-BR").includes("limpar")) safeTrack("Ad review cleared");
      }

      const preferredSource = target.closest('a[href*="google.com/preferences/source"]');
      if (preferredSource) {
        safeTrack("Preferred Source clicked", { provider: "google" });
        return;
      }

      const anchor = target.closest("a");
      if (anchor instanceof HTMLAnchorElement) {
        const href = anchor.getAttribute("href") ?? "";

        if (href === "/radar" || href.startsWith("/radar/")) {
          safeTrack("Radar opened", { destination: href, from: window.location.pathname });
        } else if (
          href.startsWith("/chatgpt-ads-") ||
          href === "/ads-manager-chatgpt"
        ) {
          safeTrack("Guide opened", { destination: href, from: window.location.pathname });
        } else if (href === "/imprensa") {
          safeTrack("Press room opened", { from: window.location.pathname });
        } else if (href.includes("/data/chatgpt-ads-markets.")) {
          safeTrack("Open data opened", { format: href.endsWith(".csv") ? "csv" : "json" });
        }

        try {
          const url = new URL(anchor.href);
          if (
            url.hostname === "help.openai.com" ||
            url.hostname === "ads.openai.com" ||
            url.hostname === "openai.com"
          ) {
            safeTrack("Official OpenAI source opened", { host: url.hostname });
          }
        } catch {
          // Ignore malformed or non-HTTP hrefs.
        }
      }

      const buttonText = normalizedText(target.closest("button"));
      if (buttonText === "Raposa" || buttonText.includes("Pergunte à Raposa")) {
        safeTrack("Raposa opened", { from: window.location.pathname });
      }
    };

    document.addEventListener("click", onClick, { capture: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
}
