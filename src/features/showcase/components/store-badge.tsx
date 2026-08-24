import { cn } from "@/core/utils/cn";

type StoreBadgeProps = {
  href: string;
  /** Small line above the store name, e.g. "Download on the". */
  kicker: string;
  /** The store's name. */
  name: string;
  store: "apple" | "google";
  className?: string;
};

/**
 * App store badge.
 *
 * The marks are drawn as inline paths rather than pulled from Apple's and
 * Google's official badge images: those are trademark assets with strict usage
 * rules about size, clear space and alteration, and bundling them would put a
 * licensing question in the repo. A simple glyph plus the store's name carries
 * the same meaning and is ours to style.
 */
export function StoreBadge({
  href,
  kicker,
  name,
  store,
  className,
}: StoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "group inline-flex items-center gap-3 rounded-pill bg-ink px-5 py-3 text-white transition-transform hover:scale-[1.03]",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-6 shrink-0"
        fill="currentColor"
      >
        {store === "apple" ? (
          <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.7-1.8-3.3-1.8-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.9-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.6 2.3 2.8 2.2 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.6-.9.9-1.4 1.3-2.4-2.3-.9-2.8-3-2.8-3.6ZM14.4 5.6c.6-.8 1-1.8.9-2.9-.9.1-2 .6-2.7 1.4-.6.7-1 1.8-.9 2.8 1 .1 2-.5 2.7-1.3Z" />
        ) : (
          <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l9-9.7-9-9.7Zm10.1 8.5 2.6-2.8-8.4-4.7c-.5-.3-1-.3-1.4-.1l7.2 7.6Zm0 2.4-7.2 7.6c.4.2.9.2 1.4-.1l8.4-4.7-2.6-2.8Zm3.7-1.2 2.4-1.4c.7-.4.7-1.4 0-1.8l-2.4-1.3-3 3.2 3 3.3Z" />
        )}
      </svg>

      <span className="flex flex-col items-start leading-tight">
        <span className="text-2xs text-white/65">{kicker}</span>
        <span className="text-base font-medium">{name}</span>
      </span>
    </a>
  );
}
