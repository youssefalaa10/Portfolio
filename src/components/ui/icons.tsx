import type { SVGProps } from "react";

/**
 * Icon system. Every icon is sized `1em` and painted with `currentColor`.
 */

type IconProps = SVGProps<SVGSVGElement>;

const BASE: IconProps = {
  width: "1em",
  height: "1em",
  "aria-hidden": true,
  focusable: false,
};

const STROKE: IconProps = {
  ...BASE,
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/** Brand mark: a four-point spark. */
export function LogoMark(props: IconProps) {
  return (
    <svg {...BASE} viewBox="0 0 48 48" fill="currentColor" {...props}>
      <path d="M24 2c2.2 13.8 7.9 19.6 22 22-14.1 2.4-19.8 8.2-22 22-2.2-13.8-7.9-19.6-22-22 14.1-2.4 19.8-8.2 22-22Z" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg {...BASE} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
    </svg>
  );
}

export function CircleDot(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.6} {...props}>
      <circle cx={12} cy={12} r={9} />
      <circle cx={12} cy={12} r={3.2} fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}

export function Download(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
    </svg>
  );
}

export function MenuGrid(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function Terminal(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export function Sliders(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function Cpu(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

export function Lightbulb(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.8 1.6 5.2 4 6.3V18h6v-2.7c2.4-1.1 4-3.5 4-6.3a7 7 0 0 0-7-7z" />
    </svg>
  );
}

export function Layout(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

export function Smartphone(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

export function Monitor(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

export function Database(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.8} {...props}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

export function CheckCircle(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={2} {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function DotFilled(props: IconProps) {
  return (
    <svg {...BASE} viewBox="0 0 15 15" fill="currentColor" {...props}>
      <path d="M9.875 7.5a2.375 2.375 0 1 1-4.75 0 2.375 2.375 0 0 1 4.75 0Z" />
    </svg>
  );
}

/** Flutter's folded-sheet mark, drawn flat in a single colour. */
export function Flutter(props: IconProps) {
  return (
    <svg {...BASE} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.3 1.5 4.2 11.6l3.1 3.1L20.5 1.5h-6.2Zm0 9.9L8.6 17.1l5.7 5.7h6.2l-5.7-5.7 5.7-5.7h-6.2Z" />
    </svg>
  );
}

export function Wrench(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.6} {...props}>
      <path d="M15.5 6.5a3.5 3.5 0 0 0 4.6 4.6l-8.6 8.6a2.6 2.6 0 0 1-3.7-3.7l8.6-8.6a3.5 3.5 0 0 1-.9-.9Z" />
      <path d="M18.5 3.5 21 6l-2.5 2.5" />
    </svg>
  );
}

export function Layers(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.6} {...props}>
      <path d="M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5" />
    </svg>
  );
}

export function Plug(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.6} {...props}>
      <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4" />
    </svg>
  );
}

export function Gauge(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.6} {...props}>
      <path d="M3.5 17a9 9 0 1 1 17 0" />
      <path d="M12 13.5 16 9.5" />
      <circle cx={12} cy={17} r={1.6} fill="currentColor" stroke="none" />
    </svg>
  );
}

/** WhatsApp glyph, flat single-colour — used by the floating button and CTA. */
export function WhatsApp(props: IconProps) {
  return (
    <svg {...BASE} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.86 9.86 0 0 0 4.62 1.15h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.51 2 12.04 2Zm5.8 14.08c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.02.24-3.43-.75-2.9-1.2-4.74-4.12-4.88-4.31-.14-.19-1.17-1.56-1.17-2.98 0-1.42.74-2.11 1-2.4.25-.28.55-.35.74-.35.19 0 .37 0 .53.01.17.01.4-.06.62.48.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.92 1.05.95 1.94 1.25 2.22 1.39.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.24.63-.14.26.09 1.64.78 1.92.92.28.14.47.21.53.33.07.12.07.68-.17 1.35Z" />
    </svg>
  );
}

/** Envelope, for mail links next to the WhatsApp channel. */
export function Mail(props: IconProps) {
  return (
    <svg {...STROKE} viewBox="0 0 24 24" strokeWidth={1.6} {...props}>
      <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </svg>
  );
}

/** LinkedIn glyph, flat single-colour — the standard simplified "in" mark. */
export function LinkedIn(props: IconProps) {
  return (
    <svg {...BASE} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

/** GitHub glyph, flat single-colour — the standard simplified octocat mark. */
export function GitHub(props: IconProps) {
  return (
    <svg {...BASE} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.07.78 2.16v3.2c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

/**
 * Brand mark from `public/images/logo.svg`, recoloured to `currentColor` (the
 * source file hardcodes black) so it works on both the light header and the
 * dark footer. Non-square on purpose — the mark's own proportions, not the
 * square-icon convention the rest of this module uses, so width is set
 * explicitly rather than left at `1em` like every other icon here.
 *
 * `viewBox` is cropped tightly to the mark itself rather than the source
 * file's full `0 0 720 266` canvas — that canvas is mostly empty margin
 * around a mark occupying only its centre, which read as a small, faint
 * logo at any font size. Cropping to its real bounding box (with a small
 * margin) makes it fill its box instead, so the same font size now reads as
 * a noticeably bigger mark. `width` is retuned to the crop's own aspect
 * ratio so it isn't stretched or letterboxed at `1em` height.
 */
export function BrandMark(props: IconProps) {
  return (
    <svg
      {...BASE}
      width="0.93em"
      viewBox="271 40 185 199"
      fill="currentColor"
      {...props}
    >
      <g transform="translate(0,266) scale(0.1,-0.1)">
        <path d="M2957 2022 c-70 -70 -127 -131 -127 -135 0 -4 7 -7 16 -7 9 0 69 -27 133 -61 258 -135 383 -260 426 -424 19 -75 19 -141 -1 -263 -24 -145 -15 -274 25 -382 18 -47 35 -88 39 -92 4 -4 8 74 8 175 1 182 1 182 43 342 23 88 47 178 53 200 5 22 8 81 5 130 -6 101 -30 173 -93 277 -46 75 -204 236 -294 299 -112 79 -90 85 -233 -59z" />
        <path d="M4024 2029 c-45 -9 -119 -29 -165 -44 -82 -27 -253 -107 -262 -122 -5 -8 82 -236 95 -248 3 -4 24 17 46 47 91 123 233 257 371 352 49 33 52 36 25 34 -16 -1 -66 -10 -110 -19z" />
        <path d="M4350 2033 c-198 -128 -234 -156 -350 -273 -69 -69 -146 -156 -172 -195 -95 -142 -176 -332 -214 -500 -22 -101 -27 -367 -8 -478 19 -117 45 -192 64 -191 12 1 234 155 263 183 4 4 -9 47 -29 96 -129 319 -64 670 184 993 67 88 201 217 283 273 l60 40 -18 31 c-22 38 -31 41 -63 21z" />
      </g>
    </svg>
  );
}
