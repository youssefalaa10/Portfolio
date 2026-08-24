"use client";

import { motion } from "motion/react";

import { WhatsApp } from "@/components/ui/icons";
import { whatsappHref } from "@/core/config/site";
import { SPRING } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

export type WhatsAppCtaCopy = {
  ctaHeading: string;
  ctaBody: string;
  ctaButton: string;
  /** Contains a literal `{project}` placeholder. */
  messageTemplate: string;
  messageGeneric: string;
};

type WhatsAppCtaProps = {
  copy: WhatsAppCtaCopy;
  /** When set, the pre-filled WhatsApp message names this project. */
  projectName?: string;
  className?: string;
};

/**
 * "Want an app like this?" — the CTA every project's case study ends with.
 * Opens WhatsApp with a pre-filled message built through `whatsappHref`
 * (`core/config/site.ts`), the same single source of truth the floating
 * button uses, so no surface ever hardcodes its own number.
 */
export function WhatsAppCta({ copy, projectName, className }: WhatsAppCtaProps) {
  const message = projectName
    ? copy.messageTemplate.replace("{project}", projectName)
    : copy.messageGeneric;

  return (
    <div className={cn("flex flex-col items-center gap-7 text-center", className)}>
      <div className="max-w-xl space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {copy.ctaHeading}
        </h2>
        <p className="text-sm text-white/60 sm:text-base">{copy.ctaBody}</p>
      </div>

      <motion.a
        href={whatsappHref(message)}
        target="_blank"
        rel="noreferrer noopener"
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
        transition={SPRING.hover}
        // WhatsApp's brand green: a documented one-off (docs/code.md §5) — it
        // is not part of this site's palette and identifies the action the
        // way the platform's own colour does everywhere else.
        className="inline-flex items-center gap-3 rounded-pill bg-[#25D366] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#0a0a0a]"
      >
        <WhatsApp className="text-base" />
        <span>{copy.ctaButton}</span>
      </motion.a>
    </div>
  );
}
