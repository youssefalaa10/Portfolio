/**
 * Hero tuning constants. Every number the cursor relight and the portrait
 * composition depend on lives here, so the canvas and the CSS cannot drift apart.
 */

/**
 * `object-position` for the portrait, as fractions of the container box.
 *
 * CRITICAL: the CSS class on the `<Image>` and the canvas's cover maths both read
 * from this. If you change one, change both — they must describe the same
 * rectangle or the light will not land on the subject.
 */
export const PORTRAIT_OBJECT_POSITION = { x: 0.5, y: 0.04 } as const;

/** Tailwind class encoding the value above. Kept adjacent on purpose. */
export const PORTRAIT_OBJECT_POSITION_CLASS = "object-[50%_4%]";

/** Brush and trail behaviour, matching the design reference's mechanics. */
export const REVEAL = {
  /** Brush radius in CSS px. */
  brushRadius: 143,
  /** Trail alpha removed per frame while painting. */
  decay: 0.016,
  /** Device pixel ratio ceiling — above 2 the cost buys nothing visible. */
  maxDpr: 2,
  /** Frames of stillness before the trail is hard-cleared. */
  idleFrames: 120,
  /** Extra fade added per idle frame, so a paused trail dissolves. */
  idleFadeStep: 0.004,
  /** Ceiling for the combined fade. */
  maxFade: 0.5,
  /** Interpolation step as a fraction of the brush radius. */
  stepRatio: 0.3,
  /** Cap on interpolated points per pointer event. */
  maxInterpolatedPoints: 60,
} as const;

/**
 * Filter applied to the *base* portrait, so the cursor has colour to restore.
 *
 * Kept as a Tailwind class next to the reveal constants because it is half of
 * the effect: the canvas paints the same photograph unfiltered, and the contrast
 * between these two states is the whole reveal. Weaken this and the effect
 * disappears; strengthen it and the resting hero looks like a mistake.
 */
export const PORTRAIT_BASE_FILTER =
  "saturate-[0.12] contrast-[1.06] brightness-[1.02]";
