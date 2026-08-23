"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { Close, LogoMark } from "@/components/ui/icons";
import { PillButton } from "@/components/ui/pill-button";
import { useFocusTrap } from "@/core/hooks/use-focus-trap";
import { useScrollLock } from "@/core/hooks/use-scroll-lock";
import { SPRING } from "@/core/motion/springs";

export type RequestModalCopy = {
  eyebrow: string;
  heading: string;
  close: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    project: { label: string; placeholder: string };
  };
  note: string;
  submit: string;
  submitting: string;
  success: {
    heading: string;
    body: string;
    close: string;
  };
};

type RequestModalProps = {
  open: boolean;
  onClose: () => void;
  copy: RequestModalCopy;
};

const FIELD_CLASS =
  "w-full rounded-control border border-line bg-surface/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-foreground/30 focus:bg-white";

const LABEL_CLASS =
  "text-xs font-medium uppercase tracking-[0.025em] text-foreground/50";

/**
 * Project request dialog.
 *
 * Submission is a local stub — there is no backend, and pretending otherwise
 * would silently drop what someone typed. It shows the success state so the flow
 * is complete and reviewable; wiring a real endpoint is one handler.
 */
export function RequestModal({ open, onClose, copy }: RequestModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"form" | "sending" | "sent">("form");
  const headingId = useId();

  useScrollLock(open);
  useFocusTrap(open, panelRef, onClose);

  // Reset after the exit animation, so the panel does not visibly flip back to
  // the form while it is still on screen.
  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => setStatus("form"), 300);
    return () => window.clearTimeout(timer);
  }, [open]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 600);
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-110 flex items-end justify-center bg-foreground/30 p-4 backdrop-blur-lg sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            tabIndex={-1}
            className="relative w-full max-w-lg overflow-hidden rounded-card bg-background p-6 shadow-2xl ring-1 ring-line sm:p-8"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={SPRING.panel}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={copy.close}
              className="absolute end-4 top-4 grid size-9 place-items-center rounded-pill bg-surface text-foreground/60 transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <Close className="text-sm" />
            </button>

            {status === "sent" ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <span className="grid size-14 place-items-center rounded-pill bg-ink text-2xl text-accent-from">
                  <LogoMark />
                </span>
                <h2 id={headingId} className="text-2xl font-semibold">
                  {copy.success.heading}
                </h2>
                <p className="max-w-[32ch] text-sm text-foreground/60">
                  {copy.success.body}
                </p>
                <PillButton onClick={onClose} variant="dark">
                  {copy.success.close}
                </PillButton>
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-col gap-1.5 pe-12">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60">
                    <span aria-hidden className="size-1.5 rounded-pill bg-accent" />
                    {copy.eyebrow}
                  </span>
                  <h2
                    id={headingId}
                    className="text-2xl font-semibold tracking-[-0.01em] sm:text-3xl"
                  >
                    {copy.heading}
                  </h2>
                </div>

                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                  <label className="flex flex-col gap-2">
                    <span className={LABEL_CLASS}>{copy.fields.name.label}</span>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder={copy.fields.name.placeholder}
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className={LABEL_CLASS}>{copy.fields.email.label}</span>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder={copy.fields.email.placeholder}
                      className={FIELD_CLASS}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className={LABEL_CLASS}>
                      {copy.fields.project.label}
                    </span>
                    <textarea
                      name="project"
                      required
                      rows={4}
                      placeholder={copy.fields.project.placeholder}
                      className={`${FIELD_CLASS} resize-none`}
                    />
                  </label>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs text-foreground/45">{copy.note}</p>
                    <PillButton type="submit" variant="dark" arrow="up-right">
                      {status === "sending" ? copy.submitting : copy.submit}
                    </PillButton>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
