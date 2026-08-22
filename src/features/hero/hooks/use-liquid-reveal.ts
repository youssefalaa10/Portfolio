"use client";

import { useEffect, useRef, useState } from "react";

import { useInteractivePointer } from "@/core/hooks/use-interactive-pointer";

import {
  PORTRAIT_OBJECT_POSITION,
  REVEAL,
  REVEAL_GRADE,
} from "../constants";

type LiquidRevealOptions = {
  /** Raw image URL. Must bypass the image pipeline so `<canvas>` can read pixels. */
  src: string;
};

type LiquidRevealResult = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** True once the effect is actually running, for the "move your cursor" hint. */
  active: boolean;
};

/** Builds the 256-entry tone curve once; the tint is per-pixel. */
function buildToneCurve(): Uint8ClampedArray {
  const curve = new Uint8ClampedArray(256);
  for (let i = 0; i < 256; i += 1) {
    const value = (i / 255) ** REVEAL_GRADE.gamma * REVEAL_GRADE.gain;
    curve[i] = Math.round(Math.min(1, Math.max(0, value)) * 255);
  }
  return curve;
}

/**
 * Applies the reveal relight to an image, once, at its natural resolution.
 * Resizes then only have to `drawImage` this result, so a window drag never
 * re-walks a megapixel of image data.
 */
function gradeToOffscreen(image: HTMLImageElement): HTMLCanvasElement | null {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;

  context.drawImage(image, 0, 0);

  const frame = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = frame.data;
  const curve = buildToneCurve();
  const [ar, ag, ab] = REVEAL_GRADE.accent;
  const [lr, lg, lb] = REVEAL_GRADE.luma;

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) continue;

    const r = curve[pixels[i]] / 255;
    const g = curve[pixels[i + 1]] / 255;
    const b = curve[pixels[i + 2]] / 255;

    const luma = r * lr + g * lg + b * lb;
    const weight = (1 - luma) * REVEAL_GRADE.warm;
    const tint = 0.35 + 0.65 * luma;

    pixels[i] = (r * (1 - weight) + ar * tint * weight) * 255;
    pixels[i + 1] = (g * (1 - weight) + ag * tint * weight) * 255;
    pixels[i + 2] = (b * (1 - weight) + ab * tint * weight) * 255;
  }

  context.putImageData(frame, 0, 0);
  return canvas;
}

/**
 * Cursor-driven liquid reveal.
 *
 * The base portrait is a plain `<img>` underneath — it is the LCP element and
 * always visible. This hook paints a warmer relight of the same portrait along
 * a soft brush trail on the canvas above it, so moving the pointer reads as
 * light falling across the subject.
 *
 * It opts out entirely, leaving the static portrait, when the pointer is coarse
 * or `prefers-reduced-motion` is set. Nothing downloads in that case.
 */
export function useLiquidReveal({ src }: LiquidRevealOptions): LiquidRevealResult {
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

    // Brush stamp: a soft radial falloff, masked to the graded pixels beneath it.
    const brush = document.createElement("canvas");
    brush.width = diameter;
    brush.height = diameter;
    const brushContext = brush.getContext("2d");

    // The graded portrait, drawn to fill the canvas exactly as CSS `object-cover`
    // lays out the `<img>` below.
    const cover = document.createElement("canvas");
    const coverContext = cover.getContext("2d");

    if (!brushContext || !coverContext) return;

    let graded: HTMLCanvasElement | null = null;
    let frame = 0;
    let idle = 0;
    let disposed = false;
    let last: { x: number; y: number } | null = null;
    const queue: { x: number; y: number }[] = [];

    const paintCover = () => {
      if (!graded || cover.width === 0 || cover.height === 0) return;

      const scale = Math.max(
        cover.width / graded.width,
        cover.height / graded.height,
      );
      const width = graded.width * scale;
      const height = graded.height * scale;

      coverContext.clearRect(0, 0, cover.width, cover.height);
      coverContext.drawImage(
        graded,
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

      // Keep only the graded pixels that fall under the soft brush.
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
      if (!graded) return;

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
        graded = gradeToOffscreen(image);
        if (!graded) return;

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
