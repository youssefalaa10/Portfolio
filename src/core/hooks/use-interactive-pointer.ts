"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(hover: hover) and (pointer: fine)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** The server cannot know the pointer; enhancements attach after hydration. */
function getServerSnapshot() {
  return false;
}

/**
 * True only where a precise, hovering pointer exists.
 *
 * Pointer-driven enhancements gate on this rather than on a width breakpoint, so
 * a touch device never depends on hover — a large tablet is still touch.
 * Subscribing through `useSyncExternalStore` keeps the media query as what it
 * is: an external source of truth, not state to mirror in an effect.
 */
export function useInteractivePointer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
