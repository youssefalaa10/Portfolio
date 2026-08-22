/**
 * Hero tuning constants. Every number the liquid reveal and the portrait
 * composition depend on lives here, so the canvas and the CSS cannot drift apart.
 */

/**
 * `object-position` for the portrait, as fractions of the container box.
 *
 * CRITICAL: the CSS class on the `<Image>` (`object-[50%_8%]`) and the canvas's
 * cover maths both read from this. If you change one, change both — they must
 * describe the same rectangle or the revealed layer will not register with the
 * base layer underneath it.
 */
export const PORTRAIT_OBJECT_POSITION = { x: 0.5, y: 0.08 } as const;

/** Tailwind classes encoding the value above. Kept adjacent on purpose. */
export const PORTRAIT_OBJECT_POSITION_CLASS = "object-[50%_8%]";

/** Brush and trail behaviour, matching the design reference. */
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
 * The relight applied to the portrait to produce the revealed layer.
 *
 * These are not invented: they were fitted offline against a reference render of
 * the intended warm grade (RMSE 0.065 over the subject's pixels), so the browser
 * reproduces that grade from the single shipped asset instead of downloading a
 * second photograph. `accent` is `--color-accent` (#b15f2c) in linear 0–1.
 */
export const REVEAL_GRADE = {
  /** Midtone lift. <1 brightens. */
  gamma: 0.9,
  /** Overall gain, applied after gamma. */
  gain: 1,
  /** Strength of the accent tint in the shadows. */
  warm: 0.3,
  accent: [0.694, 0.373, 0.173],
  /** BT.709 luminance weights. */
  luma: [0.2126, 0.7152, 0.0722],
} as const;
