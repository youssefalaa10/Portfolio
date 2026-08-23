"use client";

import { useEffect, useRef, useState } from "react";

import { useInteractivePointer } from "@/core/hooks/use-interactive-pointer";

import { PORTRAIT_OBJECT_POSITION, REVEAL } from "../constants";

type CursorRelightOptions = {
  /** Raw image URL. Must bypass the image pipeline so `<canvas>` can read it. */
  src: string;
};

type CursorRelightResult = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** True once the effect is actually running, for the lens. */
  active: boolean;
};

/**
 * Cursor-driven colour reveal.
 *
 * The portrait underneath is a plain `<img>` — the LCP element, server-rendered,
 * never dependent on JavaScript — shown **desaturated** by a CSS filter. This
 * hook paints the *same* photograph, in full colour, along the pointer's trail.
 * Moving the cursor brings the colour back.
 *
 * Two earlier attempts are worth recording, because both produced the artefact
 * this replaces:
 *
 *   1. Painting a *regraded copy* of the portrait. The two layers differed in
 *      warmth, so the brush's soft circular edge was visible as a blob sliding
 *      over the image — the glassy lens.
 *   2. Painting warm *light* and blending it. `lighter` accumulation clips the
 *      red and green channels to 255 while blue lags around 179, so a heavily
 *      overlapped trail turned olive-green with magenta fringes. Measured, not
 *      guessed.
 *
 * A saturation reveal has neither failure mode: the layers are pixel-identical
 * in geometry *and* hue, differing only in chroma, so the brush edge reads as
 * colour blooming rather than as an object with an outline. There is no channel
 * arithmetic to blow out.
 *
 * Trail mechanics (radius, decay, interpolation, idle clear) follow the design
 * reference. The effect opts out entirely — downloading nothing — when the
 * pointer is coarse or `prefers-reduced-motion` is set.
 */
export function useCursorRelight({
  src,
}: CursorRelightOptions): CursorRelightResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  const interactive = useInteractivePointer();

  useEffect(() => {
    if (!interactive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, REVEAL.maxDpr);
    const radius = REVEAL.brushRadius * dpr;
    const diameter = Math.ceil(radius * 2);
    const half = diameter / 2;

    /** Scratch for one stamp: a soft disc masked to the colour beneath it. */
    const brush = document.createElement("canvas");
    brush.width = diameter;
    brush.height = diameter;
    const brushContext = brush.getContext("2d");

    /**
     * The full-colour portrait laid out exactly as CSS lays out the `<img>`
     * below. Rebuilt only on resize, never per frame.
     */
    const cover = document.createElement("canvas");
    const coverContext = cover.getContext("2d");

    if (!brushContext || !coverContext) return;

    let portrait: HTMLImageElement | null = null;
    let frame = 0;
    let idle = 0;
    let disposed = false;
    let last: { x: number; y: number } | null = null;
    const queue: { x: number; y: number }[] = [];

    const paintCover = () => {
      if (!portrait || cover.width === 0 || cover.height === 0) return;

      const scale = Math.max(
        cover.width / portrait.naturalWidth,
        cover.height / portrait.naturalHeight,
      );
      const width = portrait.naturalWidth * scale;
      const height = portrait.naturalHeight * scale;

      coverContext.clearRect(0, 0, cover.width, cover.height);
      coverContext.drawImage(
        portrait,
        (cover.width - width) * PORTRAIT_OBJECT_POSITION.x,
        (cover.height - height) * PORTRAIT_OBJECT_POSITION.y,
        width,
        height,
      );
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width === width && canvas.height === height) return;

      canvas.width = width;
      canvas.height = height;
      cover.width = width;
      cover.height = height;

      queue.length = 0;
      last = null;
      paintCover();
    };

    const stamp = (x: number, y: number) => {
      brushContext.globalCompositeOperation = "source-over";
      brushContext.clearRect(0, 0, diameter, diameter);

      const gradient = brushContext.createRadialGradient(
        half,
        half,
        0,
        half,
        half,
        half,
      );
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.55, "rgba(255,255,255,0.82)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      brushContext.fillStyle = gradient;
      brushContext.fillRect(0, 0, diameter, diameter);

      // Keep only the colour pixels that fall under the soft disc. Because the
      // portrait is a cut-out, this also clips the trail to his silhouette for
      // free — colour never lands on the backdrop.
      brushContext.globalCompositeOperation = "source-in";
      brushContext.drawImage(
        cover,
        x - half,
        y - half,
        diameter,
        diameter,
        0,
        0,
        diameter,
        diameter,
      );

      context.globalCompositeOperation = "source-over";
      context.drawImage(brush, x - half, y - half);
    };

    const tick = () => {
      if (disposed) return;
      frame = requestAnimationFrame(tick);

      const drawing = queue.length > 0;
      if (drawing) {
        idle = 0;
      } else {
        idle += 1;
        if (idle > REVEAL.idleFrames) return;
      }

      const fade = drawing
        ? REVEAL.decay
        : Math.min(REVEAL.decay + idle * REVEAL.idleFadeStep, REVEAL.maxFade);

      context.globalCompositeOperation = "destination-out";
      context.fillStyle = `rgba(0,0,0,${fade})`;
      context.fillRect(0, 0, canvas.width, canvas.height);

      if (drawing) {
        for (const point of queue) stamp(point.x, point.y);
        queue.length = 0;
      } else if (idle === REVEAL.idleFrames) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!portrait) return;

      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) * dpr;
      const y = (event.clientY - rect.top) * dpr;

      // A pointer well outside the portrait breaks the trail rather than
      // dragging a straight line across it on re-entry.
      if (
        x < -radius ||
        y < -radius ||
        x > canvas.width + radius ||
        y > canvas.height + radius
      ) {
        last = null;
        return;
      }

      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const distance = Math.hypot(dx, dy);
        const step = Math.max(radius * REVEAL.stepRatio, 1);
        const count = Math.min(
          Math.ceil(distance / step),
          REVEAL.maxInterpolatedPoints,
        );

        for (let i = 1; i < count; i += 1) {
          queue.push({
            x: last.x + (dx * i) / count,
            y: last.y + (dy * i) / count,
          });
        }
      }

      queue.push({ x, y });
      last = { x, y };
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const image = new Image();
    image.decoding = "async";
    image.src = src;

    image
      .decode()
      .then(() => {
        if (disposed) return;
        portrait = image;

        resize();
        paintCover();
        setActive(true);

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        frame = requestAnimationFrame(tick);
      })
      .catch(() => {
        // A failed decode leaves the static portrait in place, which is the
        // correct fallback — nothing to report.
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [interactive, src]);

  return { containerRef, canvasRef, active };
}
