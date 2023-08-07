'use client';

import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
  modal?: ReactNode;
  close: () => void;
  open: (modal: ReactNode) => void;
}

export const useModalState = create<ModalState>((set) => ({
  modal: undefined,
  close: () => set({ modal: undefined }),
  open: (modal: ReactNode) => set({ modal }),
}));

export function Modal() {
  const [modal, close] = useModalState((s) => [s.modal, s.close]);

  if (!modal) return <></>;

  return (
    <div className="fixed inset-0 flex items-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={close} />

      <div className="relative m-auto w-full max-w-lg rounded-2xl bg-white p-6">
        {modal}
      </div>
    </div>
  );
}
