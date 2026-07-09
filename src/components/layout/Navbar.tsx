"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { NAV_IDS, SECTION_IDS, SECTION_TO_NAV } from "@/lib/constants";
import { LANGS, type Lang } from "@/lib/i18n";

function LogoChip({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center transition-all duration-300 hover:opacity-80 active:scale-98 ${className}`}>
      <Image
        src="/logo-new.png"
        alt="Cappafe"
        width={450}
        height={64}
        priority
        className="logo-theme-invert h-[14px] w-auto sm:h-[18px]"
      />
    </span>
  );
}

function LangDropdown() {
  const { t, lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languageNames: Record<Lang, string> = {
    tr: "Türkçe",
    en: "English",
    de: "Deutsch",
    fr: "Français",
    es: "Español",
    ru: "Русский",
    ar: "العربية",
  };

  const isRtl = t.dir === "rtl";

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t.nav.langAria}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-line bg-bg2 px-3.5 py-1.5 font-mono text-xs font-bold uppercase text-ink transition-colors hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <span>{lang}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
            className={`absolute z-[70] mt-2 w-36 rounded-2xl border border-line bg-glass py-1.5 shadow-[0_12px_30px_rgba(20,21,23,0.15)] backdrop-blur-md ${
              isRtl ? "left-0 origin-top-left" : "right-0 origin-top-right"
            }`}
          >
            <div className="flex flex-col gap-0.5 px-1">
              {LANGS.map((l) => {
                const isActive = l === lang;
                return (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setOpen(false);
                    }}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-left font-mono text-xs transition-colors focus:outline-none ${
                      isRtl ? "text-right flex-row-reverse" : "text-left"
                    } ${
                      isActive
                        ? "bg-accent/10 font-bold text-accent"
                        : "text-ink hover:bg-hair hover:text-accent"
                    }`}
                  >
                    <span>{languageNames[l]}</span>
                    <span className="text-[10px] opacity-60 uppercase">{l}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t, lang } = useLanguage();
  const { activeSection, progress } = useScrollSpy(SECTION_IDS);
  const activeNavIndex = SECTION_TO_NAV[activeSection];
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLabels: Record<string, string> = {
    top: t.nav.home,
    urunler: t.nav.products,
    akis: t.nav.about,
    grup: t.nav.group,
    ortaklik: t.nav.partner,
    iletisim: t.nav.contact,
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hair bg-navbg backdrop-blur-md transition-colors duration-[450ms]">
      <div className="mx-auto flex min-h-[56px] max-w-[1360px] items-center gap-3 px-4 py-2 sm:px-6 lg:gap-5 lg:px-10">
        <Link
          href="#top"
          aria-label="Cappafe"
          className="shrink-0 no-underline"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.pushState(null, "", "#top");
          }}
        >
          <LogoChip />
        </Link>

        <nav className="relative ml-auto hidden items-center gap-4 lg:flex xl:gap-6" aria-label={t.nav.menuAria}>
          {NAV_IDS.map((link) => {
            const isActive = link.navIndex === activeNavIndex;
            return (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className={`relative py-1.5 text-[13px] whitespace-nowrap no-underline transition-colors xl:text-sm ${
                  isActive ? "font-bold text-accent" : "font-medium text-muted hover:text-accent"
                }`}
              >
                {navLabels[link.id]}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-accent"
                    transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={toggleTheme}
          aria-label={t.nav.themeAria}
          className="ml-auto relative flex h-[34px] w-[62px] shrink-0 cursor-pointer items-center rounded-full border border-line bg-bg2 px-[5px] transition-all duration-300 hover:border-accent lg:ml-0"
        >
          {/* Track label */}
          <span className="absolute inset-0 flex items-center justify-between px-[9px] pointer-events-none">
            <span className="text-[11px] opacity-40">☀</span>
            <span className="text-[11px] opacity-40">☾</span>
          </span>
          {/* Sliding thumb with emoji */}
          <div
            className={`relative z-10 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-ink text-ink-contrast shadow-[0_2px_6px_rgba(20,21,23,0.25)] transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              theme === "dark" ? "translate-x-[28px]" : "translate-x-0"
            }`}
          >
            <span className="text-[11px] leading-none">
              {theme === "dark" ? "☾" : "☀"}
            </span>
          </div>
        </button>

        <div className="hidden shrink-0 md:block">
          <LangDropdown />
        </div>

        <Link
          href="#ortaklik"
          className="btn-shimmer-wrap hidden shrink-0 rounded-full bg-ink px-6 py-2.5 text-[13px] font-bold whitespace-nowrap text-ink-contrast no-underline transition-all hover:bg-accent lg:inline-block"
        >
          {t.nav.cta}
        </Link>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={t.nav.menuAria}
          aria-expanded={mobileOpen}
          className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full border border-line lg:hidden"
        >
          <span className={`block h-0.5 w-4 bg-ink transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-4 bg-ink transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-4 bg-ink transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-hair bg-bg lg:hidden"
            style={{ overflow: mobileOpen ? "visible" : "hidden" }}
            aria-label={t.nav.menuAria}
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_IDS.map((link) => (
                <Link
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm no-underline ${
                    link.navIndex === activeNavIndex ? "bg-hair font-bold text-accent" : "text-ink"
                  }`}
                >
                  {navLabels[link.id]}
                </Link>
              ))}
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-hair px-3 pt-3 pb-1 md:hidden">
                <LangDropdown />
                <Link
                  href="#ortaklik"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-ink px-5 py-2.5 text-[13px] font-bold text-ink-contrast no-underline"
                >
                  {t.nav.cta}
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <div
        className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-accent shadow-[0_0_8px_rgba(210,35,42,0.5)]"
        style={{ width: `${progress * 100}%` }}
      />
    </header>
  );
}
