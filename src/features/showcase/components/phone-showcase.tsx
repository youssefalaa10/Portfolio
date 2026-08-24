"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Shell } from "@/components/ui/shell";
import { LineReveal } from "@/core/components/line-reveal";
import { Reveal } from "@/core/components/reveal";
import { STAGGER } from "@/core/motion/springs";

import { ANNOTATIONS } from "../data/annotations";
import { AnnotationLabel } from "./annotation-label";
import { PhoneFrame } from "./phone-frame";

export type PhoneShowcaseCopy = {
  eyebrow: string;
  heading: readonly string[];
  body: string;
  screenLabel: string;
  labels: Record<string, string>;
};

/**
 * The device that bridges the hero and the page below it.
 *
 * The section is pulled up with a negative margin so the phone's upper third
 * overlaps the hero's rounded bottom edge — one continuous visual rather than
 * two stacked blocks. Because this is a *sibling* of the hero and not a child,
 * the hero's `overflow-hidden` cannot clip it.
 *
 * Motion budget, deliberately small:
 *
 *   - One scroll subscription (`useScroll`), which Motion backs with a single
 *     passive listener. No scroll handlers of our own.
 *   - Only `transform` and `opacity` animate. Nothing here can trigger layout.
 *   - The device's `y`, `rotate` and `scale` are driven through one spring, so
 *     the value settles instead of tracking the wheel one-to-one.
 *   - Labels reveal once and stop.
 *
 * Under reduced motion the device renders in its settled state and the scroll
 * mapping is skipped entirely.
 */
export function PhoneShowcase({ copy }: { copy: PhoneShowcaseCopy }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "center center"],
  });

  // Smoothing keeps the device from twitching on a trackpad. Low stiffness on
  // purpose: the phone should feel heavy, not reactive.
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  const y = useTransform(progress, [0, 1], ["14%", "0%"]);
  const rotate = useTransform(progress, [0, 1], [-7, 0]);
  const scale = useTransform(progress, [0, 1], [0.92, 1]);
  const glow = useTransform(progress, [0, 1], [0, 0.5]);

  const still = { y: "0%", rotate: 0, scale: 1 };
  const motionStyle = reduced ? still : { y, rotate, scale };

  return (
    <section className="relative z-30 -mt-24 bg-transparent sm:-mt-32 lg:-mt-40">
      <Shell>
        <div
          ref={stageRef}
          className="relative mx-auto flex w-full max-w-5xl flex-col items-center"
        >
          {/* Stage. The phone sits in the middle; annotations hang off the edges. */}
          <div className="relative flex w-full justify-center">
            {ANNOTATIONS.map((annotation, index) => (
              <AnnotationLabel
                key={annotation.key}
                annotation={annotation}
                label={copy.labels[annotation.key] ?? annotation.key}
                index={index}
              />
            ))}

            {/* Accent bloom behind the device, tied to the same progress so the
                device appears to settle onto the page rather than over it. */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-[6%] mx-auto h-[46%] w-[58%] rounded-[50%] bg-accent/25 blur-3xl"
              style={reduced ? { opacity: 0.5 } : { opacity: glow }}
            />

            <motion.div
              className="relative z-10 w-[62%] max-w-[19rem] sm:w-[46%] lg:w-[30%]"
              style={motionStyle}
            >
              <PhoneFrame label={copy.screenLabel} />
            </motion.div>
          </div>

          {/* The claim the device is illustrating, stated in words. The heading
              gets a wider measure than the body on purpose — at the new type
              scale a shared 46ch container broke each authored line in half. */}
          <div className="mt-14 flex w-full flex-col items-center gap-5 text-center lg:mt-16">
            <Reveal preset="fade-up" distance={0.625}>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
            </Reveal>

            <LineReveal
              as="h2"
              lines={copy.heading}
              delay={0.1}
              stagger={STAGGER.line}
              className="max-w-[26ch] text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl"
            />

            <Reveal delay={0.2}>
              <p className="max-w-[52ch] text-base text-foreground/60">
                {copy.body}
              </p>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
