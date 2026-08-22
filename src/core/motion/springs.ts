import type { Transition } from "motion/react";

/**
 * Every spring in the project. Values are the design reference's react-spring
 * `{ tension, friction }` pairs mapped onto Motion's physics at mass 1, where
 * tension → stiffness and friction → damping.
 *
 * Components reference a named role (`SPRING.hover`), never a literal config —
 * that is what keeps twenty copies of the same transition object from existing.
 * See docs/code.md § Motion rules.
 */
function spring(stiffness: number, damping: number): Transition {
  return { type: "spring", stiffness, damping, mass: 1 };
}

export const SPRING = {
  /** Header entrance. 210/26 */
  header: spring(210, 26),
  /** Generic scroll/mount reveal. 200/24 */
  reveal: spring(200, 24),
  /** Large panels and cards settling in. 180/26 */
  panel: spring(180, 26),
  /** Slow, heavy watermark drift. 120/30 */
  watermark: spring(120, 30),
  /** Pointer hover on pills, badges and the logo. 320/18 */
  hover: spring(320, 18),
  /** Label and link lifts. 320/22 */
  lift: spring(320, 22),
  /** Small icon pops. 320/16 */
  pop: spring(320, 16),
  /** Stack / partner row items. 320/20 */
  chip: spring(320, 20),
  /** Carousel slide swap. 300/28 */
  carousel: spring(300, 28),
  /** Tile and arrow nudges. 300/18 */
  nudge: spring(300, 18),
} as const satisfies Record<string, Transition>;

/**
 * Entrance delays, in seconds, measured from the moment the hero mounts. Kept
 * together so the choreography can be read — and retimed — in one place.
 * Mirrors the reference's millisecond offsets.
 */
export const HERO_DELAY = {
  header: 0.15,
  eyebrow: 0.2,
  headline: 0.25,
  watermark: 0.3,
  card: 0.4,
  stack: 0.55,
  credential: 0.65,
  actions: 0.75,
  status: 0.9,
} as const;

/** Per-item stagger, in seconds. */
export const STAGGER = {
  line: 0.12,
  word: 0.035,
  chip: 0.04,
} as const;

/** Tween durations, in seconds, paired with the easings in globals.css. */
export const DURATION = {
  line: 0.9,
  word: 0.7,
} as const;
