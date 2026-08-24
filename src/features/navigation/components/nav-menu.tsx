"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";

import { BrandMark, Close, Download } from "@/components/ui/icons";
import { Shell } from "@/components/ui/shell";
import { CV_ASSET } from "@/core/config/assets";
import { PRIMARY_NAV } from "@/core/config/site";
import { useFocusTrap } from "@/core/hooks/use-focus-trap";
import { useScrollLock } from "@/core/hooks/use-scroll-lock";
import type { Locale } from "@/core/i18n/config";
import { SPRING } from "@/core/motion/springs";

import { NavLink, type NavLabels } from "./nav-link";

type NavMenuProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  labels: NavLabels;
  copy: {
    brand: string;
    close: string;
    downloadCv: string;
    tagline: string;
  };
};

/**
 * Full-screen navigation for narrow viewports.
 *
 * Focus is trapped while it is open and returned to the Menu button on close, so
 * a keyboard reader is never tabbing through a page they cannot see. Escape and
 * the Close button do the same thing.
 */
export function NavMenu({
  open,
  onClose,
  locale,
  labels,
  copy,
}: NavMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useFocusTrap(open, panelRef, onClose);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          className="fixed inset-0 z-115 flex flex-col bg-ink text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={SPRING.reveal}
        >
          <Shell className="flex items-center justify-between py-5 sm:py-6">
            <span className="flex items-center gap-2 text-lg font-semibold">
              <BrandMark className="text-2xl text-white" />
              {copy.brand}
            </span>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-control border border-white/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.05em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <Close className="text-sm" />
              {copy.close}
            </button>
          </Shell>

          <nav className="flex flex-1 items-center">
            <Shell>
              <ul className="flex flex-col gap-1">
                {PRIMARY_NAV.map((item, index) => (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, y: "1rem" }}
                    animate={{ opacity: 1, y: "0rem" }}
                    transition={{ delay: 0.08 + index * 0.045, duration: 0.5 }}
                  >
                    <NavLink
                      item={item}
                      locale={locale}
                      onNavigate={onClose}
                      className="group flex w-full items-baseline gap-4 py-2 text-start text-4xl font-semibold tracking-[-0.02em] sm:text-6xl"
                    >
                      <span className="text-base font-normal text-white/30 transition-colors group-hover:text-accent-from">
                        {`0${index + 1}`}
                      </span>
                      <span className="text-white/70 transition-colors group-hover:text-white">
                        {labels[item.key]}
                      </span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </Shell>
          </nav>

          <Shell className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs uppercase tracking-[0.025em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <span className="normal-case tracking-normal">{copy.tagline}</span>
            <a
              href={CV_ASSET.href}
              download={CV_ASSET.downloadAs}
              className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
            >
              <Download className="text-sm" />
              {copy.downloadCv}
            </a>
          </Shell>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
