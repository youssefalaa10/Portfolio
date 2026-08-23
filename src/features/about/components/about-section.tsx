import { AnimatedLink } from "@/components/ui/animated-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CircleDot, Download, Globe } from "@/components/ui/icons";
import { PillButton } from "@/components/ui/pill-button";
import { Shell } from "@/components/ui/shell";
import { Reveal } from "@/core/components/reveal";
import { WordReveal } from "@/core/components/word-reveal";
import { CV_ASSET } from "@/core/config/assets";
import { CONTACT_HREF, SECTION_ID, SITE, SOCIAL_LINKS } from "@/core/config/site";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { cn } from "@/core/utils/cn";

type AboutSectionProps = {
  copy: Dictionary["about"];
};

/**
 * The statement. A word-by-word reveal with the second half muted, so the
 * sentence resolves into its own emphasis as it arrives.
 */
export function AboutSection({ copy }: AboutSectionProps) {
  return (
    <section id={SECTION_ID.about} className="bg-background">
      <Shell className="grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        {/* Left: the globe motif. */}
        <div className="relative min-h-56 lg:min-h-80">
          <Globe
            aria-hidden
            className="pointer-events-none absolute top-1/2 -start-4 -translate-y-1/2 text-[12rem] text-foreground/10 sm:text-[16rem] lg:-start-6 lg:text-[20rem]"
          />

          <Reveal preset="fade-up" distance={0.625} className="relative">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal
            distance={0.75}
            delay={0.15}
            className="absolute bottom-0 start-0 flex items-center gap-3 text-sm text-foreground/70"
          >
            <Globe className="shrink-0 text-2xl text-foreground" />
            <span className="max-w-56">{copy.location}</span>
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
                          "grid size-9 place-items-center rounded-pill text-sm transition-transform hover:scale-110",
                          social.tone === "accent"
                            ? "bg-accent text-white"
                            : "bg-surface text-foreground/70",
                        )}
                      >
                        <CircleDot />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <PillButton
              href={CV_ASSET.href}
              download={CV_ASSET.downloadAs}
              variant="outline"
              arrow="right"
            >
              {copy.cta}
            </PillButton>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
