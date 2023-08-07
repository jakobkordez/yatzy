'use client';

import { GameView } from '@/components/game/game_view';
import NewGame from '@/components/new_game';
import { useYatzyGameState } from '@/logic/game_state';

export function YatzyGameApp() {
  const game = useYatzyGameState((s) => s.game);

  return game ? <GameView /> : <NewGame />;
}
