"use client";

import { PillButton } from "@/components/ui/pill-button";
import { useRequestModal } from "@/features/contact/components/request-modal-provider";

/**
 * Fallback call to action for the app band, shown while no store URLs exist.
 * `light` variant, because the band's ground is the accent at full strength.
 */
export function AppBandRequestButton({ label }: { label: string }) {
  const { open } = useRequestModal();

  return (
    <PillButton onClick={open} variant="light" arrow="up-right">
      {label}
    </PillButton>
  );
}
