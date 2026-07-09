"use client";

import Link from "next/link";
import Image from "next/image";
import Marquee from "@/components/ui/Marquee";
import { useLanguage } from "@/hooks/useLanguage";
import { NAV_IDS, COMPANY_ADDRESS, CONTACT_EMAIL } from "@/lib/constants";

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12.5" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.2 9.6 15.2 12.2 10.2 14.8Z" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16.6 3c.3 1.9 1.5 3.3 3.4 3.6v3c-1.3 0-2.5-.4-3.4-1.1v6.3c0 3.2-2.5 5.2-5.3 5.2-2.7 0-5.3-2-5.3-5.1 0-3.3 3-5.6 6.1-5.1v3.1c-.3-.1-.6-.2-1-.2-1.2 0-2.2 1-2.2 2.2 0 1.3 1 2.2 2.4 2.2 1.4 0 2.4-1 2.4-2.5V3h2.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13.5 21v-7h2.4l.4-2.8h-2.8V9.3c0-.8.3-1.4 1.5-1.4h1.4V5.4c-.6-.1-1.4-.2-2.3-.2-2.3 0-3.8 1.4-3.8 3.9v2.1H8v2.8h2.3v7h3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YouTubeIcon },
  { label: "TikTok", href: "#", Icon: TikTokIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
];

/** Two slightly-tilted overlapping ticker bands (dark + red). */
function BandTicker() {
  const { t } = useLanguage();

  return (
    <div className="relative h-32 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-[-4%] top-1/2 -translate-y-1/2 rotate-[-1.8deg] bg-panel py-3 shadow-[0_10px_30px_rgba(20,21,23,0.25)]">
        <Marquee durationSec={34} reverse>
          <span className="flex items-center gap-8 pr-8 font-mono text-xs tracking-[0.18em] whitespace-nowrap text-[#FBFAF8]/55">
            {t.hero.ticker.map((item) => (
              <span key={item} className="flex items-center gap-8">
                {item}
                <span className="text-accent-light/70">◆</span>
              </span>
            ))}
          </span>
        </Marquee>
      </div>
      <div className="absolute inset-x-[-4%] top-1/2 -translate-y-1/2 rotate-[1.1deg] bg-accent py-3.5 shadow-[0_14px_34px_rgba(210,35,42,0.4)]">
        <Marquee durationSec={24} pauseOnHover>
          <span className="flex items-center gap-8 pr-8 font-mono text-[13px] tracking-[0.18em] whitespace-nowrap text-white">
            {t.ticker.map((item) => (
              <span key={item} className="flex items-center gap-8">
                {item}
                <span className="opacity-60">✦</span>
              </span>
            ))}
          </span>
        </Marquee>
      </div>
    </div>
  );
}

export default function Footer() {
  const { t, lang } = useLanguage();

  const navLabels: Record<string, string> = {
    top: t.nav.home,
    urunler: t.nav.products,
    akis: t.nav.about,
    grup: t.nav.group,
    ortaklik: t.nav.partner,
    iletisim: t.nav.contact,
  };

  return (
    <>
      <BandTicker />

      <footer id="footer" aria-label={t.footer.menu} className="border-t border-hair bg-bg py-20 pb-10">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
          <div className="mb-14 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <div className="mb-4.5 inline-flex items-center">
                <Image
                  src="/logo-new.png"
                  alt="Cappafe"
                  width={450}
                  height={64}
                  className="logo-theme-invert h-[15px] w-auto sm:h-[17px]"
                />
              </div>
              <p className="mb-5 max-w-[280px] text-balance text-sm leading-[1.7] text-muted">
                {t.footer.about}
              </p>
              <div className="flex gap-2.5">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg2 text-ink transition-[background,color,border-color,transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:border-accent hover:bg-accent hover:text-white hover:shadow-[0_10px_24px_rgba(210,35,42,0.35)]"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
              
              {/* Marketplace Stores */}
              <div className="mt-5.5">
                <div className="mb-2 font-mono text-[9.5px] tracking-[0.14em] text-soft uppercase">
                  {lang === "tr" ? "Pazaryerlerimiz" : (lang === "de" ? "Marktplätze" : "Our Storefronts")}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["eBay", "Amazon", "Trendyol", "Hepsiburada", "n11"].map((store) => (
                    <span
                      key={store}
                      className="rounded border border-line bg-bg2 px-2 py-0.75 font-mono text-[10.5px] font-semibold text-muted"
                    >
                      {store}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4.5 font-mono text-[11px] tracking-[0.18em] text-soft">
                {t.footer.menu}
              </div>
              <div className="flex flex-col gap-3">
                {NAV_IDS.map((link) => (
                  <Link
                    key={link.id}
                    href={`#${link.id}`}
                    className="text-sm font-medium text-ink no-underline hover:text-accent"
                  >
                    {navLabels[link.id]}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4.5 font-mono text-[11px] tracking-[0.18em] text-soft">
                {t.footer.contactTitle}
              </div>
              <p className="mb-3 text-sm leading-[1.7] text-ink">
                {COMPANY_ADDRESS.line1}
                <br />
                {COMPANY_ADDRESS.line2}
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm font-semibold text-accent no-underline"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div>
              <div className="mb-4.5 font-mono text-[11px] tracking-[0.18em] text-soft">
                {t.footer.regions}
              </div>
              <p className="mb-3 text-sm leading-[1.7] text-ink">
                {t.footer.ukEurope}
                <br />
                <a href="https://uk.cappafe.com" className="font-semibold text-accent no-underline">
                  uk.cappafe.com
                </a>
              </p>
              <div className="font-mono text-[11px] tracking-[0.06em] text-soft">
                TR · EN · AR · DE · ES · FR · RU
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-4 border-t border-hair pt-7">
            <span className="font-mono text-[11px] tracking-[0.06em] text-soft">
              © {new Date().getFullYear()} CAPPAFE — {t.footer.rights}
            </span>
            <span className="font-mono text-[11px] tracking-[0.06em] text-soft">
              ISO 9001 · 14001 · 45001
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
