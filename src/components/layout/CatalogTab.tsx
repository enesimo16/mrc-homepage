"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { trackEvent } from "@/lib/track";

export default function CatalogTab() {
  const { t } = useLanguage();

  return (
    <Link
      href="/catalog"
      onClick={() => trackEvent("catalog_tab_click")}
      className="fixed top-1/2 right-0 z-[55] -translate-y-1/2 no-underline transition-transform duration-300 hover:-translate-x-1.5"
    >
      <span className="btn-shimmer-wrap flex items-center gap-2 rounded-l-2xl bg-ink py-3.5 pr-4 pl-5 text-[12.5px] font-bold whitespace-nowrap text-ink-contrast shadow-[0_14px_34px_rgba(20,21,23,0.35)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
          <path
            d="M6 3.5h9l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M14.5 3.5V8h4.4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M8 13h8M8 16.5h5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <span className="max-w-[80px] leading-[1.25] sm:max-w-none">{t.catalog.tabLabel}</span>
      </span>
    </Link>
  );
}
