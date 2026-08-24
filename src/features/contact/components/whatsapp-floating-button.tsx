"use client";

import { motion } from "motion/react";

import { WhatsApp } from "@/components/ui/icons";
import { whatsappHref } from "@/core/config/site";
import { SPRING } from "@/core/motion/springs";

type WhatsAppFloatingButtonProps = {
  label: string;
  message: string;
};

/**
 * Site-wide floating WhatsApp button, fixed to the bottom end corner on every
 * page. Mounted once in the locale layout — the same "one shared instance"
 * reasoning docs/code.md §13 gives for the request dialog — never re-declared
 * per page. `z-40` keeps it under the nav overlay (`z-115`) and the request
 * dialog (`z-110`) but above ordinary page content, and the safe-area inset is
 * added to the offset (not as internal padding) so it never crowds notched
 * phones without distorting the circle.
 */
export function WhatsAppFloatingButton({ label, message }: WhatsAppFloatingButtonProps) {
  return (
    <motion.a
      href={whatsappHref(message)}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={SPRING.panel}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
      // WhatsApp's brand green: same documented one-off as `WhatsAppCta`.
      className="fixed end-6 z-40 grid size-14 place-items-center rounded-pill bg-[#25D366] text-2xl text-[#0a0a0a] shadow-xl"
    >
      <WhatsApp />
    </motion.a>
  );
}
