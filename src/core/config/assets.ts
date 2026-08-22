/**
 * Every asset URL in the project resolves through here. Components import the
 * descriptor, never a raw string, so a re-crop or a format change is one edit.
 */

export type ImageAsset = {
  /** Optimised source handed to `next/image`. */
  readonly src: string;
  /** Raw source for `<canvas>` consumers, which cannot use the image pipeline. */
  readonly rawSrc: string;
  readonly width: number;
  readonly height: number;
};

/**
 * The hero portrait, derived from the supplied `public/images/formal.png`:
 * matted off its near-black studio ground, edge-decontaminated, and regraded to
 * a light-key editorial print so it sits on the `hero-from → hero-to` backdrop.
 * Generation is documented in docs/code.md § Asset rules.
 */
export const HERO_PORTRAIT: ImageAsset = {
  src: "/images/hero/portrait-base.png",
  rawSrc: "/images/hero/portrait-base.webp",
  width: 941,
  height: 1360,
};

/** Untouched original, kept as the archival source for future re-derivations. */
export const PORTRAIT_SOURCE = "/images/formal.png" as const;
