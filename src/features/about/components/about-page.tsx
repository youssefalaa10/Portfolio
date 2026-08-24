"use client";

import { motion } from "motion/react";

import {
  ArrowRight,
  Cpu,
  Download,
  Layers,
  Shield,
} from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HangingIdCard } from "@/components/lightswind/hanging-id-card";
import { ScrollTimeline } from "@/components/lightswind/scroll-timeline";
import { LineReveal } from "@/core/components/line-reveal";
import { Reveal } from "@/core/components/reveal";
import { Shell } from "@/components/ui/shell";
import { SupportCard } from "./support-card";
import { TIMELINE_COMPANIES } from "../data/timeline";
import { CV_ASSET } from "@/core/config/assets";
import { SITE } from "@/core/config/site";
import type { Dictionary } from "@/core/i18n/dictionaries";
import { STAGGER } from "@/core/motion/springs";
import { fadeUp, ONCE_IN_VIEW } from "@/core/motion/variants";
import { useRequestModal } from "@/features/contact/components/request-modal-provider";

type AboutPageProps = {
  copy: Dictionary["about"];
};

export function AboutPage({ copy }: AboutPageProps) {
  const { open } = useRequestModal();
  const page = copy.page;

  const getPrincipleIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Shield className="text-2xl text-accent" />;
      case 1:
        return <Layers className="text-2xl text-accent" />;
      default:
        return <Cpu className="text-2xl text-accent" />;
    }
  };

  const timelineEvents = page.timeline.map((entry, index) => ({
    year: entry.year,
    title: entry.role,
    subtitle: TIMELINE_COMPANIES[index] ?? "",
    description: entry.description,
  }));

  return (
    <div className="bg-background text-foreground">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-line py-28 lg:py-36">
        <Shell className="flex flex-col gap-12">
          <Reveal preset="fade-up" distance={0.625} trigger="mount">
            <Eyebrow>{page.eyebrow}</Eyebrow>
          </Reveal>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-7">
              <LineReveal
                as="h1"
                lines={page.heading}
                trigger="mount"
                delay={0.1}
                stagger={STAGGER.line}
                className="text-4xl font-semibold leading-[1.06] tracking-[-0.02em] sm:text-5xl md:text-6xl"
              />

              <Reveal trigger="mount" delay={0.25} distance={0.75}>
                <p className="max-w-2xl text-base font-light leading-relaxed text-foreground/75 sm:text-lg">
                  {page.bio}
                </p>
              </Reveal>

              <Reveal trigger="mount" delay={0.35} distance={0.75}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => open()}
                    className="inline-flex items-center gap-2 rounded-control bg-ink px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105"
                  >
                    <span>{page.ctaButton}</span>
                    <ArrowRight className="text-sm rtl:-scale-x-100" />
                  </button>

                  <a
                    href={CV_ASSET.href}
                    download={CV_ASSET.downloadAs}
                    className="inline-flex items-center gap-2 rounded-control border border-line bg-surface px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-surface-2"
                  >
                    <Download className="text-sm" />
                    <span>{copy.downloadCv}</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Hanging ID card — replaces the earlier portrait treatment. */}
            <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <HangingIdCard
                  name={SITE.name}
                  role={copy.hangingCard.role}
                  badgeId={`FLT-${SITE.workingSince}`}
                  ropeLength={96}
                />
              </motion.div>
            </div>
          </div>
        </Shell>
      </section>

      {/* CORE PRINCIPLES BENTO */}
      <section className="border-b border-line py-20 lg:py-28">
        <Shell className="space-y-12">
          <div className="max-w-2xl">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {page.philosophyHeading}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {page.philosophy.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp(1.5)}
                initial="hidden"
                whileInView="visible"
                viewport={ONCE_IN_VIEW}
                transition={{ delay: index * 0.08 }}
                className="flex flex-col justify-between rounded-card border border-line bg-surface p-8 transition-colors hover:border-foreground/30"
              >
                <div className="space-y-4">
                  <div className="flex size-12 items-center justify-center rounded-control bg-white shadow-sm">
                    {getPrincipleIcon(index)}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-foreground/65">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Shell>
      </section>

      {/* JOURNEY & TIMELINE */}
      <section className="border-b border-line bg-surface/30 py-20 lg:py-28">
        <Shell>
          <ScrollTimeline
            events={timelineEvents}
            title={page.timelineHeading}
            subtitle={copy.eyebrow}
            progressIndicator
            cardAlignment="alternating"
            revealAnimation="fade"
          />
        </Shell>
      </section>

      {/* CORE SKILLS & CAPABILITIES */}
      <section className="border-b border-line py-20 lg:py-28">
        <Shell className="space-y-12">
          <div className="max-w-2xl">
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {page.skillsHeading}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {page.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col justify-between rounded-card-sm border border-line bg-surface p-5 text-center transition-colors hover:border-foreground/30"
              >
                <span className="text-sm font-medium text-foreground">
                  {skill.name}
                </span>
                <span className="mt-2 font-mono text-[11px] uppercase tracking-wider text-accent">
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </Shell>
      </section>

      {/* SUPPORT — renders only once SUPPORT_LINK is set. */}
      <section className="pb-20 lg:pb-28">
        <Shell>
          <Reveal distance={1.25}>
            <SupportCard copy={copy.support} className="mx-auto max-w-2xl" />
          </Reveal>
        </Shell>
      </section>

      {/* CTA STRIP */}
      <section className="bg-ink py-20 text-white lg:py-28">
        <Shell className="flex flex-col items-center gap-8 text-center">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {page.ctaHeading}
            </h2>
            <p className="text-sm text-white/60 sm:text-base">{page.ctaSub}</p>
          </div>
          <button
            type="button"
            onClick={() => open()}
            className="inline-flex items-center gap-2 rounded-control bg-accent px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-transform hover:scale-105"
          >
            <span>{page.ctaButton}</span>
            <ArrowRight className="text-sm rtl:-scale-x-100" />
          </button>
        </Shell>
      </section>
    </div>
  );
}
