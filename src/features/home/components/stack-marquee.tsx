import { CircleDot } from "@/components/ui/icons";
import { Marquee } from "@/core/components/marquee";
import { STACK } from "@/core/config/site";

/**
 * Infinite ticker of the toolchain.
 *
 * A server component with a CSS-driven loop, so the whole band costs no
 * JavaScript. It replaces the reference's client-logo grid: a portfolio has a
 * stack, not a client roster, and a marquee gives the page a moving band between
 * two still sections.
 */
export function StackMarquee({ label }: { label: string }) {
  return (
    <section className="border-y border-line bg-surface/40 py-6">
      <h2 className="sr-only">{label}</h2>

      <Marquee>
        {STACK.map((item) => (
          <span
            key={item}
            className="flex shrink-0 items-center gap-3 px-6 text-lg font-medium text-foreground/55 sm:text-xl"
          >
            <CircleDot aria-hidden className="text-sm text-accent/70" />
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
