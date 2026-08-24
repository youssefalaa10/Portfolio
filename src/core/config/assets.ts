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

/** Services page ambient background video. */
export const SERVICES_VIDEO = {
  src: "/enter_vd.mp4",
  type: "video/mp4",
} as const;
