'use client';

import { useYatzyGameState } from '@/logic/game_state';
import { useState } from 'react';
import { Button } from './button';

export default function NewGame() {
  const [addPlayerValue, setAddPlayerValue] = useState<string>('');
  const [players, setPlayers] = useState<string[]>(['Jakob', 'Ana']);

  function addPlayer(): void {
    if (!addPlayerValue) return;
    setAddPlayerValue('');
    setPlayers([...players, addPlayerValue]);
  }

  const createGame = useYatzyGameState((s) => s.createGame);

  return (
    <div className="flex flex-col gap-5 rounded-md bg-white p-6 shadow-md">
      <h1 className="text-3xl font-medium">New game</h1>

      <div className="flex flex-col gap-1">
        <div className="text-center">Add player</div>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-md border p-2"
            type="text"
            onChange={(e) => setAddPlayerValue(e.target.value)}
            value={addPlayerValue}
            onKeyDown={(e) => {
              if (e.key == 'Enter') addPlayer();
            }}
          />
          <Button className="text-lg leading-3" onClick={addPlayer}>
            +
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-center">Players</div>
        <div className="flex flex-col gap-2">
          {players.map((player, i) => (
            <div
              key={player}
              className="flex flex-row items-center gap-2 rounded bg-gray-100 px-4 py-2"
            >
              {/* <span>#</span> */}
              <span className="flex-1">{player}</span>
              <button
                onClick={() => {
                  const nPlayers = [...players];
                  nPlayers.splice(i, 1);
                  setPlayers(nPlayers);
                }}
                className="h-8 w-8 rounded-full bg-transparent leading-3 text-gray-500 hover:bg-gray-200"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {players.length > 0 && (
        <div className="flex flex-row justify-end gap-2">
          <Button onClick={() => setPlayers([])}>Clear</Button>
          <Button onClick={() => createGame(players)}>Start</Button>
        </div>
      )}
    </div>
  );
}
