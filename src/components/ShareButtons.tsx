"use client";

import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
  whatsappNumber: string;
}

export default function ShareButtons({ url, title, whatsappNumber }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const whatsappText = encodeURIComponent(`${title} — ${url}`);
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-meta text-swiss-gray">Compartir</span>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink transition-colors"
        aria-label="Compartir por WhatsApp"
      >
        WhatsApp
      </a>
      <button
        onClick={handleCopy}
        className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink transition-colors"
        aria-label="Copiar enlace del artículo"
      >
        {copied ? "Copiado" : "Copiar enlace"}
      </button>
    </div>
  );
}
