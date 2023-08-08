'use client';

import { useYatzyGameState } from '@/logic/game_state';
import { GameTable } from './game_table';
import { MultiDiceSelector } from './multi_dice_selector';
import { useDiceState } from '@/logic/dice_state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEraser,
  faPen,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export function GameView() {
  const [game, exitGame] = useYatzyGameState((s) => [s.game!, s.exitGame]);
  const [selectedP, setSelectedP, erase, toggleErase] = useDiceState((s) => [
    s.player,
    s.setPlayer,
    s.erase,
    s.toggleErase,
  ]);

  return (
    <div className="flex flex-col gap-10 md:flex-row md:items-start">
      <div className="flex flex-col gap-10">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 rounded-lg bg-white p-6 shadow md:flex-col">
          <div className="flex flex-row gap-1">
            <button
              className={`button flex-1 ${erase ? 'button-outline' : ''}`}
              onClick={toggleErase}
            >
              <FontAwesomeIcon icon={faPen} className="icon" />
              Set field
            </button>
            <button
              className={`button is-pink flex-1 ${
                erase ? '' : 'button-outline'
              }`}
              onClick={toggleErase}
            >
              <FontAwesomeIcon icon={faEraser} className="icon" />
              <span>Erase field</span>
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1 text-center">
              <label>Select player</label>
              <div className="flex flex-row flex-wrap gap-2 text-lg">
                {game.players.map((v, i) => (
                  <button
                    key={v}
                    className={`button is-light box-border flex-1 border-2 ${
                      i === selectedP ? 'border-sky-600' : 'border-transparent'
                    }`}
                    onClick={() =>
                      setSelectedP(i === selectedP ? undefined : i)
                    }
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col gap-1 text-center">
              <label>Select dice</label>
              <MultiDiceSelector />

              <div
                className={`absolute -inset-2 rounded bg-white/50 ${
                  erase ? '' : 'hidden'
                }`}
              />
            </div>
          </div>
        </div>

        <button onClick={exitGame} className="button is-red">
          <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
          <span>Quit game</span>
        </button>
      </div>

      <GameTable />
    </div>
  );
}
