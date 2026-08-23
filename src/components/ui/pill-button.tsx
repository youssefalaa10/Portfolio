"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { SPRING } from "@/core/motion/springs";
import { cn } from "@/core/utils/cn";

const MotionLink = motion.create(Link);

type Variant = "dark" | "light" | "outline";
type Arrow = "right" | "up-right";

type PillButtonBaseProps = {
  children: ReactNode;
  variant?: Variant;
  /** Appends the circular arrow badge and switches to the inset padding. */
  arrow?: Arrow;
  className?: string;
};

/**
 * A pill is exactly one of three things, and the type system says so: a link, an
 * action, or a form submit. There is no shape where it is ambiguous.
 */
type PillButtonProps = PillButtonBaseProps &
  (
    | {
        href: string;
        /** Save the target instead of navigating to it. */
        download?: string | boolean;
        onClick?: never;
        type?: never;
      }
    | { href?: never; download?: never; onClick: () => void; type?: "button" }
    | { href?: never; download?: never; onClick?: never; type: "submit" }
  );

const SURFACE: Record<Variant, string> = {
  dark: "bg-ink text-white",
  light: "bg-surface text-foreground",
  outline: "border border-line bg-transparent text-foreground",
};

const BADGE: Record<Variant, string> = {
  dark: "bg-white text-ink",
  light: "bg-ink text-white",
  outline: "bg-ink text-white",
};

/** True for `mailto:`, `tel:` and absolute URLs — anything that is not an app route. */
function isExternalHref(href: string): boolean {
  return !href.startsWith("/") && !href.startsWith("#");
}

/** Only http(s) links get a new tab; `mailto:` must stay in place. */
function opensInNewTab(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/**
 * The project's only button shape.
 *
 * Hover is driven by a variant label on the root, so the pill's scale and the
 * arrow's nudge share one gesture rather than two pieces of hover state — and
 * both are skipped on touch, where `whileHover` never fires.
 *
 * Renders `<Link>`, `<a>` or `<button>` from the props it is given: navigation
 * is never a click handler, and an action is never a link.
 */
export function PillButton(props: PillButtonProps) {
  const { children, variant = "dark", arrow, className } = props;

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-3 rounded-pill text-sm font-medium",
        SURFACE[variant],
        arrow ? "py-1.5 pe-1.5 ps-6" : "px-7 py-3.5",
      )}
    >
      {children}
      {arrow ? (
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-pill text-base",
            BADGE[variant],
          )}
        >
          {/* The RTL flip mirrors the glyph *and* the nudge's coordinate space,
              so the arrow always travels along the inline axis. */}
          <span className="inline-flex rtl:-scale-x-100">
            <motion.span
              className="inline-flex"
              variants={{
                rest: { x: 0, y: 0 },
                hover: arrow === "right" ? { x: 3, y: 0 } : { x: 2, y: -2 },
              }}
              transition={SPRING.hover}
            >
              {arrow === "right" ? <ArrowRight /> : <ArrowUpRight />}
            </motion.span>
          </span>
        </span>
      ) : null}
    </span>
  );

  const gesture = {
    className: cn("inline-block rounded-pill", className),
    initial: "rest",
    animate: "rest",
    whileHover: "hover",
    whileFocus: "hover",
    variants: { rest: { scale: 1 }, hover: { scale: 1.04 } },
    transition: SPRING.hover,
  };

  if (props.href !== undefined) {
    // A download must be a plain anchor: routing a file through the client
    // router would navigate to it rather than save it.
    if (props.download !== undefined || isExternalHref(props.href)) {
      return (
        <motion.a
          {...gesture}
          href={props.href}
          download={props.download}
          {...(opensInNewTab(props.href) && props.download === undefined
            ? { target: "_blank", rel: "noreferrer noopener" }
            : null)}
        >
          {content}
        </motion.a>
      );
    }

    return (
      <MotionLink {...gesture} href={props.href}>
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      {...gesture}
      type={props.type ?? "button"}
      onClick={props.onClick}
    >
      {content}
    </motion.button>
  );
}
