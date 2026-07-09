"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { WHATSAPP_URL } from "@/lib/constants";

export default function WhatsAppButton() {
  const { t } = useLanguage();

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener"
      aria-label={t.waAria}
      className="fixed bottom-6 left-6 z-[60] flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#25D366] transition-[transform,box-shadow,background-color] duration-300 hover:scale-110 active:scale-95 animate-wa-wobble-glow hover:[animation-play-state:paused]"
    >
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3.2a8.7 8.7 0 0 0-7.5 13.1L3.3 20.7l4.5-1.2A8.7 8.7 0 1 0 12 3.2Zm0 1.8a6.9 6.9 0 1 1-3.6 12.8l-.4-.2-2.5.7.7-2.4-.3-.4A6.9 6.9 0 0 1 12 5Zm-2.4 3c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.1 0 1.2.9 2.4 1 2.6.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.3-1.4-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a5.7 5.7 0 0 1-2.8-2.4c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.1-.3 0-.5l-.6-1.6c-.2-.4-.3-.4-.5-.4Z"
          fill="#fff"
        />
      </svg>
    </a>
  );
}
