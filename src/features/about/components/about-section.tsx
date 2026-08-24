import { AnimatedLink } from "@/components/ui/animated-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Download, GitHub, LinkedIn } from "@/components/ui/icons";
import { PillButton } from "@/components/ui/pill-button";
import { Shell } from "@/components/ui/shell";
import { Reveal } from "@/core/components/reveal";
import { WordReveal } from "@/core/components/word-reveal";
import { SupportCard } from "./support-card";
import { CV_ASSET } from "@/core/config/assets";
import {
  CONTACT_HREF,
  SECTION_ID,
  SITE,
  SOCIAL_LINKS,
} from "@/core/config/site";
import { localeHref, type Locale } from "@/core/i18n/config";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { cn } from "@/core/utils/cn";

type AboutSectionProps = {
  locale?: Locale;
  copy: Dictionary["about"];
  exploreLabel?: string;
};

/**
 * The statement. A word-by-word reveal with the second half muted, so the
 * sentence resolves into its own emphasis as it arrives.
 */
export function AboutSection({
  locale,
  copy,
  exploreLabel,
}: AboutSectionProps) {
  return (
    <section id={SECTION_ID.about} className="bg-background">
      <Shell className="grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        {/* Left: the eyebrow, then the working details. No background mark and
            no decorative badge here any more — the copy carries the section on
            its own, and a plain layout reads calmer next to the statement. */}
        <div className="relative flex min-h-56 flex-col justify-between gap-10 lg:min-h-80">
          <Reveal preset="fade-up" distance={0.625} className="relative">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal
            distance={0.75}
            delay={0.15}
            className="relative flex flex-col gap-4 border-s-2 border-accent/30 ps-5"
          >
            <span className="max-w-64 text-base text-foreground/70">
              {copy.location}
            </span>
            <span className="text-micro font-medium uppercase tracking-[0.08em] text-foreground/40">
              {`${SITE.workingSince} — ${new Date().getFullYear()}`}
            </span>
          </Reveal>

          <Reveal distance={0.75} delay={0.25} className="relative">
            <SupportCard copy={copy.support} />
          </Reveal>
        </div>

        {/* Right: the statement and its footer row. */}
        <div className="flex flex-col gap-10">
          <WordReveal
            as="h2"
            runs={copy.statement}
            className="text-2xl font-medium leading-[1.35] tracking-[-0.01em] sm:text-3xl"
          />

          <Reveal
            distance={0.75}
            delay={0.2}
            className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6"
          >
            <div className="flex flex-col gap-3">
              <span className="text-sm text-foreground/45">
                {copy.reachLabel}
              </span>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <AnimatedLink
                  href={CONTACT_HREF}
                  from={0.75}
                  className="text-foreground"
                >
                  {SITE.email}
                </AnimatedLink>

                <a
                  href={CV_ASSET.href}
                  download={CV_ASSET.downloadAs}
                  className="inline-flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
                >
                  <Download className="text-sm" />
                  {copy.downloadCv}
                </a>
              </div>

              {/* Renders only once real handles exist in core/config/site.ts. */}
              {SOCIAL_LINKS.length > 0 ? (
                <ul className="mt-1 flex gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={social.label}
                        className={cn(
                          "grid size-9 place-items-center rounded-pill text-base transition-transform hover:scale-110",
                          social.tone === "accent"
                            ? "bg-accent text-white"
                            : "bg-surface text-foreground/70",
                        )}
                      >
                        <SocialIcon label={social.label} />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {locale ? (
                <PillButton
                  href={localeHref(locale, "/about")}
                  variant="outline"
                  arrow="right"
                >
                  {exploreLabel || copy.page.eyebrow}
                </PillButton>
              ) : null}

              <PillButton
                href={CV_ASSET.href}
                download={CV_ASSET.downloadAs}
                variant="outline"
                arrow="right"
              >
                {copy.cta}
              </PillButton>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}

/** Maps a `SocialLink.label` to its glyph. Falls back to initials for a
 * platform that doesn't have one yet, so adding a handle never needs a code
 * change here first. */
function SocialIcon({ label }: { label: string }) {
  switch (label) {
    case "LinkedIn":
      return <LinkedIn />;
    case "GitHub":
      return <GitHub />;
    default:
      return <span aria-hidden>{label.slice(0, 2)}</span>;
  }
}
