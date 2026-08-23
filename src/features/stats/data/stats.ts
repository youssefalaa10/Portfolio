import { SITE } from "@/core/config/site";
import { PROJECTS } from "@/features/work/data/projects";

/**
 * The numbers. Facts, so they live here rather than in `messages` — only the
 * labels are translated, keyed by `key`.
 *
 * Two of the four are derived rather than typed in, so they cannot go stale:
 * adding a project or letting a year pass updates the panel on its own.
 */
export type StatKey = "projects" | "years" | "platforms" | "commitment";

export type Stat = {
  readonly key: StatKey;
  readonly value: number;
  /** Appended verbatim. */
  readonly suffix: string;
};

/**
 * Derived from `SITE.workingSince`. Uses the build year, which is the honest
 * granularity for "years of experience" — it does not need to change mid-year,
 * and reading the clock at render time would make the page non-deterministic.
 */
const YEARS_OF_CRAFT = new Date().getFullYear() - SITE.workingSince;

export const STATS: readonly Stat[] = [
  { key: "projects", value: PROJECTS.length, suffix: "" },
  { key: "years", value: YEARS_OF_CRAFT, suffix: "+" },
  { key: "platforms", value: 3, suffix: "" },
  { key: "commitment", value: 100, suffix: "%" },
];
