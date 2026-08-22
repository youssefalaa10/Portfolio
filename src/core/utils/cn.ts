type ClassValue = string | number | false | null | undefined;

/**
 * Minimal class joiner. Deliberately not `clsx` + `tailwind-merge`: this project
 * composes classes rather than overriding them, so conflict resolution has no
 * job to do and two dependencies would earn nothing.
 * See docs/code.md § Dependency rules.
 */
export function cn(...classes: ClassValue[]): string {
  let result = "";

  for (const value of classes) {
    if (!value) continue;
    result = result ? `${result} ${value}` : String(value);
  }

  return result;
}
