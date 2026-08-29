"use client";

import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

export function GrowthLink({ href, intent, placement, children, className }: { href: string; intent: string; placement: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={className}
      onClick={() => {
        track("organic_client_intent", { intent, placement, destination: href.startsWith("https://www.linkedin.com") ? "linkedin" : href.startsWith("https://volponi.tech") ? "volponi.tech" : "internal" });
      }}
    >
      {children}
    </a>
  );
}
