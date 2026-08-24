"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { ArrowLeft, ArrowRight, Close } from "@/components/ui/icons";
import { useFocusTrap } from "@/core/hooks/use-focus-trap";
import { useScrollLock } from "@/core/hooks/use-scroll-lock";
import { SPRING } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

import type { ProjectCategory } from "../data/projects";

type ProjectGalleryProps = {
  images: readonly string[];
  label: string;
  category: ProjectCategory;
  previousLabel: string;
  nextLabel: string;
  closeLabel: string;
};

/**
 * A horizontally-scrolling strip of case-study screenshots, plus a full-screen
 * preview opened by clicking one. Renders nothing when a project has no extra
 * gallery shots beyond its cover — an empty section is worse than no section.
 *
 * Aspect ratio follows the project's category: mobile screenshots are phone
 * captures (portrait), web screenshots are browser captures (landscape) — one
 * fixed ratio for both would badly crop whichever category it did not fit.
 *
 * The preview's own image strip is a native horizontal scroll-snap track —
 * scrolling or swiping moves between shots directly, with the arrow buttons and
 * arrow keys as an equivalent, keyboard-reachable path to the same motion. It is
 * pinned `dir="ltr"` regardless of the page's direction: it holds images, which
 * have no reading direction, and `scrollLeft` semantics diverge across browsers
 * under `dir="rtl"` in a way that is not worth chasing for a media viewer.
 */
export function ProjectGallery({
  images,
  label,
  category,
  previousLabel,
  nextLabel,
  closeLabel,
}: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingId = useId();

  const open = openIndex !== null;

  useScrollLock(open);
  useFocusTrap(open, panelRef, () => setOpenIndex(null));

  // Jump the track to the opened image without an animated scroll — the panel
  // itself already animates in, a second motion on top of it would fight it.
  // `activeIndex` itself is set where `openIndex` is (the thumbnail's
  // onClick), not here: an effect should touch the DOM or an external system,
  // not mirror state that a plain event handler already has in hand.
  useEffect(() => {
    if (openIndex === null) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: openIndex * track.clientWidth, behavior: "instant" });
  }, [openIndex]);

  // Tracks which shot is centred while the reader scrolls or swipes freely.
  useEffect(() => {
    const track = trackRef.current;
    if (!open || !track) return;

    const onScroll = () => {
      const index = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      setActiveIndex(Math.min(Math.max(index, 0), images.length - 1));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [open, images.length]);

  const step = (delta: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: delta * track.clientWidth, behavior: "smooth" });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  };

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <span className="text-micro font-medium uppercase tracking-[0.08em] text-foreground/45">
        {label}
      </span>

      <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => {
              setOpenIndex(index);
              setActiveIndex(index);
            }}
            aria-label={`${label} ${index + 1}`}
            className={cn(
              "relative shrink-0 overflow-hidden rounded-card-sm border border-line bg-surface transition-transform hover:scale-[1.02]",
              category === "mobile"
                ? "aspect-[9/18] w-56 sm:w-64"
                : "aspect-[16/10] w-80 sm:w-96",
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 640px) 24rem, 16rem"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-110 flex items-center justify-center bg-ink/90 p-4 backdrop-blur-lg sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              tabIndex={-1}
              onKeyDown={onKeyDown}
              className="relative flex w-full max-w-4xl flex-col gap-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={SPRING.panel}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span
                  id={headingId}
                  className="font-mono text-xs text-white/60"
                >
                  {activeIndex + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  aria-label={closeLabel}
                  className="grid size-9 place-items-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <Close className="text-sm" />
                </button>
              </div>

              <div
                dir="ltr"
                ref={trackRef}
                className={cn(
                  "flex w-full snap-x snap-mandatory overflow-x-auto rounded-card [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                  category === "mobile" ? "max-h-[70vh]" : "",
                )}
              >
                {images.map((src, index) => (
                  <div
                    key={src}
                    className={cn(
                      "relative w-full shrink-0 snap-center bg-surface",
                      category === "mobile" ? "aspect-[9/18]" : "aspect-[16/10]",
                    )}
                  >
                    <Image
                      src={src}
                      alt={`${label} ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-contain"
                      priority={index === openIndex}
                    />
                  </div>
                ))}
              </div>

              {images.length > 1 ? (
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={previousLabel}
                    className="grid size-10 place-items-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={nextLabel}
                    className="grid size-10 place-items-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <ArrowRight />
                  </button>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
