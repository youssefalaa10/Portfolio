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
