"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyTextButton({
  text,
  idleLabel = "Copy text",
  copiedLabel = "Copied",
}: {
  text: string;
  idleLabel?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const element = document.createElement("textarea");
      element.value = text;
      element.style.position = "fixed";
      element.style.opacity = "0";
      document.body.appendChild(element);
      element.select();
      document.execCommand("copy");
      element.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-4 text-xs font-black text-white transition hover:bg-zinc-800"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span aria-live="polite">{copied ? copiedLabel : idleLabel}</span>
    </button>
  );
}
