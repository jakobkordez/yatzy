import { create } from 'zustand';

interface DiceState {
  player?: number;
  dice: (number | null)[];
  erase: boolean;
  clear: () => void;
  toggleErase: () => void;
  setPlayer: (player?: number) => void;
  setDice: (dice: (number | null)[]) => void;
}

export const useDiceState = create<DiceState>((set, get) => ({
  dice: new Array(5).fill(null),
  erase: false,
  clear: () =>
    set({ player: undefined, dice: new Array(5).fill(null), erase: false }),
  toggleErase: () => set({ erase: !get().erase }),
  setPlayer: (player?: number) => set({ player }),
  setDice: (dice: (number | null)[]) => set({ dice }),
}));
