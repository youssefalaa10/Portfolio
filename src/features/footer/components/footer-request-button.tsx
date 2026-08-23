"use client";

import { PillButton } from "@/components/ui/pill-button";
import { useRequestModal } from "@/features/contact/components/request-modal-provider";

/**
 * Thin client wrapper so the footer can stay a server component while its call
 * to action opens the shared request dialog.
 */
export function FooterRequestButton({ label }: { label: string }) {
  const { open } = useRequestModal();

  return (
    <PillButton onClick={open} variant="light" arrow="up-right">
      {label}
    </PillButton>
  );
}
