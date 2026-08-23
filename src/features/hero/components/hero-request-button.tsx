"use client";

import { PillButton } from "@/components/ui/pill-button";
import { useRequestModal } from "@/features/contact/components/request-modal-provider";

/**
 * Thin client wrapper so the hero can stay a server component while its primary
 * call to action opens the shared request dialog.
 */
export function HeroRequestButton({ label }: { label: string }) {
  const { open } = useRequestModal();

  return (
    <PillButton onClick={open} variant="dark" arrow="up-right">
      {label}
    </PillButton>
  );
}
