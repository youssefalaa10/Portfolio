import { HeroPortrait } from "./hero-portrait";
import { HeroWatermark } from "./hero-watermark";

type HeroVisualProps = {
  portraitAlt: string;
  lensLabel: string;
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
 *
 * The portrait is deliberately large — a little over half the width on desktop,
 * nearly the full width on mobile — because the reference hero is a full-bleed
 * photograph. A smaller figure leaves a dead light field beside the headline and
 * stops reading as a hero at all.
 */
export function HeroVisual({
  portraitAlt,
  lensLabel,
  watermark,
}: HeroVisualProps) {
  return (
    <div className="absolute inset-0 z-0">
      <div className="hero-backdrop absolute inset-0" />

      <HeroWatermark>{watermark}</HeroWatermark>

      {/* The portrait box owns the geometry that the image, the relight canvas
          and the cursor lens all fill. It sits on the bottom edge so the subject
          is always cropped by the frame rather than floating, at every width. */}
      {/* On phones the headline has to run across the portrait, so the portrait
          steps back to being a backdrop. At `sm` and up the columns separate and
          it comes forward as the subject again. */}
      <HeroPortrait
        alt={portraitAlt}
        lensLabel={lensLabel}
        className="portrait-fade absolute bottom-0 end-0 h-full w-[92%] opacity-55 sm:w-[70%] sm:opacity-100 lg:w-[56%] xl:w-[52%]"
      />

      <div aria-hidden className="hero-scrim absolute inset-0" />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/25"
      />
    </div>
  );
}
