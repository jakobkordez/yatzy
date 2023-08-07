'use client';

import { useYatzyGameState } from '@/logic/game_state';
import { Button } from '../button';
import { GameTable } from './game_table';
import { MultiDiceSelector } from './multi_dice_selector';
import { useDiceState } from '@/logic/dice_state';

export function GameView() {
  const [game, exitGame] = useYatzyGameState((s) => [s.game!, s.exitGame]);
  const [dice, setDice, selectedP, setSelectedP, erase, toggleErase] =
    useDiceState((s) => [
      s.dice,
      s.setDice,
      s.player,
      s.setPlayer,
      s.erase,
      s.toggleErase,
    ]);

  return (
    <div className="container flex flex-col gap-10 px-4 md:flex-row md:items-start">
      <div className="flex flex-col gap-10">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 rounded-lg bg-white p-6 shadow md:flex-col">
          <div className="flex flex-row gap-1">
            <button
              className={`button flex-1 ${erase ? 'button-outline' : ''}`}
              onClick={toggleErase}
            >
              Set field
            </button>
            <button
              className={`button is-pink flex-1 ${
                erase ? '' : 'button-outline'
              }`}
              onClick={toggleErase}
            >
              Erase field
            </button>
          </div>

          <div className="relative flex flex-col gap-5">
            <div className="relative flex flex-col gap-1 text-center">
              <label>Select player</label>
              <div className="flex flex-row flex-wrap gap-2 text-lg">
                {game.players.map((v, i) => (
                  <Button
                    key={v}
                    className={`box-border flex-1 border-2 !bg-gray-100 !text-black shadow ${
                      i === selectedP ? 'border-sky-600' : 'border-transparent'
                    }`}
                    onClick={() =>
                      setSelectedP(i === selectedP ? undefined : i)
                    }
                  >
                    {v}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 text-center">
              <label>Select dice</label>
              <MultiDiceSelector values={dice} onChange={setDice} />
            </div>

            <div
              className={`absolute -inset-2 rounded bg-white/50 ${
                erase ? '' : 'hidden'
              }`}
            />
          </div>
        </div>

        <button onClick={exitGame} className="button is-red">
          Quit game
        </button>
      </div>

      <GameTable />
    </div>
  );
}
