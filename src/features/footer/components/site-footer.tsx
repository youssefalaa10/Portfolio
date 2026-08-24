import { AnimatedLink } from "@/components/ui/animated-link";
import { Download, LogoMark } from "@/components/ui/icons";
import { Shell } from "@/components/ui/shell";
import { LineReveal } from "@/core/components/line-reveal";
import { CV_ASSET } from "@/core/config/assets";
import {
  CONTACT_HREF,
  SECTION_ID,
  SITE,
  SOCIAL_LINKS,
} from "@/core/config/site";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { localeHref, type Locale } from "@/core/i18n/config";
import { STAGGER } from "@/core/motion/springs";

import { FooterRequestButton } from "./footer-request-button";

type SiteFooterProps = {
  locale: Locale;
  copy: Dictionary["footer"];
  navLabels: Dictionary["nav"];
};

const COLUMN_TITLE = "text-xs uppercase tracking-[0.025em] text-white/40";

export function SiteFooter({ locale, copy, navLabels }: SiteFooterProps) {
  const year = new Date().getFullYear();

  // Anchor destinations resolve locale-first so they still work from /work.
  const sectionLinks = [
    { key: "about", href: `${localeHref(locale)}#${SECTION_ID.about}` },
    { key: "work", href: localeHref(locale, "/work") },
    { key: "services", href: `${localeHref(locale)}#${SECTION_ID.services}` },
  ] as const;

  return (
    <footer className="relative overflow-hidden rounded-t-card bg-ink text-white">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-6 z-0 select-none text-center text-[3.5rem] font-bold leading-none tracking-[-0.03em] text-white/5 sm:text-[7rem] lg:text-watermark"
      >
        {copy.watermark}
      </span>

      <Shell className="relative z-10 pb-10 pt-20 lg:pt-24">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            as="h2"
            lines={copy.cta}
            stagger={STAGGER.line * 0.83}
            className="max-w-[16ch] text-4xl font-semibold tracking-[-0.02em] sm:text-5xl md:text-6xl"
          />
          <FooterRequestButton label={copy.ctaButton} />
        </div>

        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 text-lg font-semibold">
              <LogoMark className="text-xl text-accent-from" />
              {copy.brand}
            </span>
            <p className="max-w-80 text-sm text-white/55">{copy.tagline}</p>
          </div>

          <nav aria-labelledby="footer-explore">
            <h3 id="footer-explore" className={COLUMN_TITLE}>
              {copy.columns.explore}
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              {sectionLinks.map((link) => (
                <li key={link.key}>
                  <AnimatedLink href={link.href} from={0.65}>
                    {navLabels[link.key]}
                  </AnimatedLink>
                </li>
              ))}
              <li>
                <AnimatedLink href={CONTACT_HREF} from={0.65}>
                  {navLabels.contact}
                </AnimatedLink>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className={COLUMN_TITLE}>{copy.columns.reach}</h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <AnimatedLink href={CONTACT_HREF} from={0.65}>
                  {SITE.email}
                </AnimatedLink>
              </li>
              <li>
                <a
                  href={CV_ASSET.href}
                  download={CV_ASSET.downloadAs}
                  className="inline-flex items-center gap-2 text-white/65 transition-colors hover:text-white"
                >
                  <Download className="text-sm" />
                  {copy.columns.downloadCv}
                </a>
              </li>
            </ul>
          </div>

          {/* Renders only once real handles exist in core/config/site.ts. */}
          {SOCIAL_LINKS.length > 0 ? (
            <div>
              <h3 className={COLUMN_TITLE}>{copy.columns.social}</h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <AnimatedLink href={social.href} external from={0.65}>
                      {social.label}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row">
          <span>{copy.legal.replace("{year}", String(year))}</span>
          <span className="inline-flex items-center gap-2">
            {copy.builtWith}
          </span>
        </div>
      </Shell>
    </footer>
  );
}
