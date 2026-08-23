"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

import { RequestModal, type RequestModalCopy } from "./request-modal";

type RequestModalContextValue = {
  open: () => void;
};

const RequestModalContext = createContext<RequestModalContextValue | null>(null);

/**
 * Owns the single request dialog for the whole page.
 *
 * The header, the hero and the footer all offer to start a project; one dialog
 * shared through context is the alternative to three copies with three pieces of
 * state, and it means only one thing can ever have focus trapped.
 *
 * Children are server-rendered and passed through untouched — wrapping the tree
 * in a client provider does not make the tree client-side.
 */
export function RequestModalProvider({
  children,
  copy,
}: {
  children: ReactNode;
  copy: RequestModalCopy;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <RequestModalContext.Provider value={{ open }}>
      {children}
      <RequestModal open={isOpen} onClose={close} copy={copy} />
    </RequestModalContext.Provider>
  );
}

export function useRequestModal(): RequestModalContextValue {
  const context = useContext(RequestModalContext);

  if (!context) {
    throw new Error(
      "useRequestModal must be used inside <RequestModalProvider>.",
    );
  }

  return context;
}
