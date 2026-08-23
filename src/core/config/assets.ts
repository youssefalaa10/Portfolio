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
 * The hero portrait.
 *
 * Derived from `public/images/formal.png`: matted off its near-black studio
 * ground, edge-decontaminated, and given a light-key *editorial* grade — the
 * suit keeps its ink weight so the figure reads as a photograph against the
 * light backdrop rather than as a washed-out cutout.
 *
 * Kept at the original 941×1360 rather than using `formal-2.png` (415×601),
 * which is the same cutout at 2.3× less resolution than the hero needs.
 * Generation is documented in docs/code.md § Asset rules.
 */
export const HERO_PORTRAIT: ImageAsset = {
  src: "/images/hero/portrait.png",
  rawSrc: "/images/hero/portrait.webp",
  width: 941,
  height: 1360,
};

/** Untouched original, kept as the archival source for future re-derivations. */
export const PORTRAIT_SOURCE = "/images/formal.png" as const;

/** Downloadable CV. */
export const CV_ASSET = {
  href: "/Youssef_Alaa_Flutter-CV.pdf",
  /** Filename the browser saves it as. */
  downloadAs: "Youssef-Alaa-CV.pdf",
} as const;
