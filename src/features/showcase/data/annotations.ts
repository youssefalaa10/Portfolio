import type { ComponentType, SVGProps } from "react";

import {
  Flutter,
  Gauge,
  Layers,
  Plug,
  Smartphone,
  Wrench,
} from "@/components/ui/icons";

export type AnnotationKey =
  | "development"
  | "maintenance"
  | "flutter"
  | "mobile"
  | "api"
  | "performance";

export type Annotation = {
  readonly key: AnnotationKey;
  readonly Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Which side of the phone the label sits on. */
  readonly side: "start" | "end";
  /**
   * Vertical placement as a percentage of the stage, and the label's inline
   * offset from the stage edge. Percentages rather than fixed offsets so the
   * arrangement holds as the stage scales with the viewport.
   */
  readonly top: number;
  readonly inset: number;
  /**
   * The connector, as an SVG path in a 0 0 100 100 viewBox local to the label's
   * gap. Hairline curves that lead the eye toward the device.
   */
  readonly path: string;
  /** Hidden below `lg`, where there is no room for a connector. */
  readonly secondary?: boolean;
};

/**
 * The workflow labels arranged around the device.
 *
 * Six is the most the stage holds without turning into an infographic — three
 * per side, alternating so no two connectors cross. `secondary` marks the two
 * that drop out first on narrow viewports.
 */
export const ANNOTATIONS: readonly Annotation[] = [
  {
    key: "flutter",
    Icon: Flutter,
    side: "start",
    top: 34,
    inset: 2,
    path: "M2 22 C 38 26, 62 46, 98 52",
  },
  {
    key: "development",
    Icon: Layers,
    side: "end",
    top: 26,
    inset: 0,
    path: "M98 20 C 62 26, 38 44, 2 50",
  },
  {
    key: "mobile",
    Icon: Smartphone,
    side: "start",
    top: 52,
    inset: 8,
    path: "M2 50 C 34 50, 66 50, 98 50",
  },
  {
    key: "maintenance",
    Icon: Wrench,
    side: "end",
    top: 62,
    inset: 4,
    path: "M98 48 C 66 50, 34 52, 2 54",
  },
  {
    key: "api",
    Icon: Plug,
    side: "start",
    top: 76,
    inset: 1,
    path: "M2 74 C 38 70, 62 56, 98 48",
    secondary: true,
  },
  {
    key: "performance",
    Icon: Gauge,
    side: "end",
    top: 84,
    inset: 6,
    path: "M98 78 C 62 72, 38 58, 2 50",
    secondary: true,
  },
];
