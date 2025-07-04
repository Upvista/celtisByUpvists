"use client";
import React, { createContext, useContext, useState } from "react";

// Modal context for global modal state
export type ModalContextType = { modalOpen: boolean; setModalOpen: (open: boolean) => void };
const ModalContext = createContext<ModalContextType>({ modalOpen: false, setModalOpen: () => {} });
export const useModal = () => useContext(ModalContext);

export default function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
} 