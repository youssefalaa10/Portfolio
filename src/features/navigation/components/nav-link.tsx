"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { HoverLift } from "@/components/ui/hover-lift";
import { PRIMARY_NAV, type NavItem } from "@/core/config/site";
import { localeHref, type Locale } from "@/core/i18n/config";
import { useRequestModal } from "@/features/contact/components/request-modal-provider";

export type NavLabels = Record<NavItem["key"], string>;

type NavLinkProps = {
  item: NavItem;
  locale: Locale;
  /** The visual content. Callers compose their own so one surface can add an index. */
  children: ReactNode;
  className?: string;
  /** Called after activation, so an overlay can close itself. */
  onNavigate?: () => void;
};

/**
 * One navigation destination, rendered from its `kind`.
 *
 * Every surface that shows navigation goes through this, so "what does Contact
 * do" is answered in one place. A modal item is a `<button>` because it performs
 * an action; the others are links, because they change the URL.
 */
export function NavLink({
  item,
  locale,
  children,
  className,
  onNavigate,
}: NavLinkProps) {
  const { open } = useRequestModal();

  if (item.kind === "modal") {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          onNavigate?.();
          open();
        }}
      >
        {children}
      </button>
    );
  }

  const href = localeHref(locale, item.path);

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}

/** Header nav list. Hidden below `lg`, where the overlay menu takes over. */
export function PrimaryNav({
  locale,
  labels,
}: {
  locale: Locale;
  labels: NavLabels;
}) {
  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-8 text-sm font-medium text-foreground">
        {PRIMARY_NAV.map((item) => (
          <li key={item.key}>
            <NavLink item={item} locale={locale} className="rounded-control">
              <HoverLift from={0.75} spring="lift" className="inline-flex">
                {labels[item.key]}
              </HoverLift>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
