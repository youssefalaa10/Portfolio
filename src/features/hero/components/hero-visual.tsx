import { HeroWatermark } from "./hero-watermark";
import { LiquidReveal } from "./liquid-reveal";

type HeroVisualProps = {
  portraitAlt: string;
  revealHint: string;
  watermark: string;
};

/**
 * The hero's full-bleed ground, layered back to front:
 *
 *   1. the light-key backdrop
 *   2. the name, oversized
 *   3. the portrait — which occludes the name where the subject is opaque, so
 *      the two read as depth rather than as two flat overlays
 *   4. a scrim under the headline, and a vignette for overall legibility
 *
 * The backdrop is CSS, not an image: it reproduces the gradient the portrait was
 * graded against, so the composite reads as one photograph while costing nothing
 * to download and staying sharp at any size.
 */
export function HeroVisual({
  portraitAlt,
  revealHint,
  watermark,
}: HeroVisualProps) {
  return (
    <div className="absolute inset-0 z-0">
      <div className="hero-backdrop absolute inset-0" />

      <HeroWatermark>{watermark}</HeroWatermark>

      {/* The portrait box owns the geometry that both the image and the reveal
          canvas fill. It sits on the bottom edge so the subject is always cropped
          by the frame rather than floating, at every width. */}
      <LiquidReveal
        alt={portraitAlt}
        hint={revealHint}
        className="portrait-fade absolute bottom-0 end-0 h-full w-[86%] sm:w-[64%] lg:w-[48%] xl:w-[44%]"
      />

      <div aria-hidden className="hero-scrim absolute inset-0" />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/30"
      />
    </div>
  );
}
