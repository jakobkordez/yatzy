import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { YatzyGame } from './yatzy_game';

interface YatzyGameState {
  game?: YatzyGame;
  // history? ...
  createGame: (players: string[]) => void;
  exitGame: () => void;
  setField: (playerI: number, fieldI: number, value: number | null) => void;
}

export const useYatzyGameState = create(
  persist<YatzyGameState>(
    (set, get) => ({
      game: undefined,
      createGame: (players: string[]) => set({ game: new YatzyGame(players) }),
      exitGame: () => set({ game: undefined }),
      setField: (playerI: number, fieldI: number, value: number | null) => {
        get().game?._setField(playerI, fieldI, value);
        set({});
      },
    }),
    {
      name: 'game-state',
      // Default storage: JsonStorage in localStorage
      storage: {
        setItem(name, value) {
          localStorage.setItem(name, JSON.stringify(value));
        },
        getItem(name) {
          const item = JSON.parse(localStorage.getItem(name) ?? '');
          const state = item['state'];
          return {
            ...item,
            state: {
              ...state,
              game: YatzyGame.fromJSON(state['game']),
            },
          };
        },
        removeItem(name) {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);
