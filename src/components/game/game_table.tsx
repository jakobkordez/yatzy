import { YatzyBasicField } from '@/logic/yatzy_field';
import { useYatzyGameState } from '@/logic/game_state';
import { useDiceState } from '@/logic/dice_state';

export function GameTable() {
  const [game, setField] = useYatzyGameState((s) => [s.game!, s.setField]);
  // const openModal = useModalState().open;
  const [selectedP, dice, erase, clearDice] = useDiceState((s) => [
    s.player,
    s.dice,
    s.erase,
    s.clear,
  ]);

  function handleClick(fieldI: number, playerI: number): void {
    const field = game.fields[fieldI] as YatzyBasicField;
    // const fieldName = game.fieldNames[fieldI];
    // const player = game.players[playerI];

    if (erase) setField(playerI, fieldI, null);
    else if (playerI !== selectedP) return;
    else
      setField(
        playerI,
        fieldI,
        field.getScore(dice.filter((v) => v !== null) as number[]),
      );

    clearDice();
    return;

    // if (field instanceof YatzyFieldSingle)
    //   return openModal(
    //     <DiceCountModal
    //       player={game.players[playerI]}
    //       fieldName={fieldName}
    //       onComplete={(count) => {
    //         if (count !== null) count *= field.num;
    //         setField(playerI, fieldI, count);
    //       }}
    //     />
    //   );

    // if (field instanceof YatzyFieldOnePair)
    //   return openModal(
    //     <DiceSelectorModal
    //       player={player}
    //       fieldName={fieldName}
    //       labels={['Select dice of pair']}
    //       onComplete={(dice) => {
    //         if (!dice) return setField(playerI, fieldI, null);
    //         setField(playerI, fieldI, dice[0] * 2);
    //       }}
    //     />
    //   );

    // if (field instanceof YatzyFieldTwoPairs)
    //   return openModal(
    //     <DiceSelectorModal
    //       player={player}
    //       fieldName={fieldName}
    //       labels={['Select dice of first pair', 'Select dice of second pair']}
    //       onComplete={(dice) => {
    //         if (!dice) return setField(playerI, fieldI, null);
    //         setField(playerI, fieldI, (dice[0] + dice[1]) * 2);
    //       }}
    //     />
    //   );

    // if (field instanceof YatzyFieldNumOAK)
    //   return openModal(
    //     <DiceSelectorModal
    //       player={player}
    //       fieldName={fieldName}
    //       labels={['Select dice']}
    //       onComplete={(dice) => {
    //         if (!dice) return setField(playerI, fieldI, null);
    //         setField(playerI, fieldI, dice[0] * field.num);
    //       }}
    //     />
    //   );

    // if (field instanceof YatzyFieldStraight)
    //   return openModal(
    //     <DiceSelectorModal
    //       player={player}
    //       fieldName={fieldName}
    //       labels={['From dice', 'To dice']}
    //       onComplete={(dice) => {
    //         if (!dice) return setField(playerI, fieldI, null);
    //         dice.sort();
    //         const a = dice[0];
    //         const b = dice[1] - a + 1;
    //         setField(playerI, fieldI, b * a + (b * (b - 1)) / 2);
    //       }}
    //     />
    //   );

    // if (field instanceof YatzyFieldFullHouse)
    //   return openModal(
    //     <DiceSelectorModal
    //       player={player}
    //       fieldName={fieldName}
    //       labels={['Select dice of 3', 'Select dice of 2']}
    //       onComplete={(dice) => {
    //         if (!dice) return setField(playerI, fieldI, null);
    //         setField(playerI, fieldI, dice[0] * 3 + dice[1] * 2);
    //       }}
    //     />
    //   );

    // if (field instanceof YatzyFieldChance)
    //   return openModal(
    //     <DiceSelectorModal
    //       player={player}
    //       fieldName={fieldName}
    //       labels={new Array(5).fill(null)}
    //       unique={false}
    //       onComplete={(dice) => {
    //         if (!dice) return setField(playerI, fieldI, null);
    //         setField(
    //           playerI,
    //           fieldI,
    //           dice.reduce((p, c) => p + c)
    //         );
    //       }}
    //     />
    //   );

    // if (field instanceof YatzyFieldYatzy)
    //   return openModal(
    //     <DiceSelectorModal
    //       player={player}
    //       fieldName={fieldName}
    //       labels={['Select dice for Yatzy']}
    //       onComplete={(dice) => {
    //         if (!dice) return setField(playerI, fieldI, null);
    //         setField(
    //           playerI,
    //           fieldI,
    //           field.getScore(new Array(5).fill(dice[0]))
    //         );
    //       }}
    //     />
    //   );
  }

  return (
    <table className="mx-auto table overflow-clip rounded-xl border bg-white text-center shadow-lg">
      <thead>
        <tr>
          <th></th>
          {game.players.map((p) => (
            <th key={p} className="w-16 border-l py-2">
              {p}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {game.fields.map((field, fieldI) => (
          <tr
            key={fieldI}
            className={`${
              field instanceof YatzyBasicField ? '' : 'bg-gray-100'
            }`}
          >
            <th className="border-t px-4 py-2 text-left">
              {game.fieldNames[fieldI]}
            </th>

            {game.scores.map((col, playrI) => (
              <td key={playrI} className="border-l border-t">
                {field instanceof YatzyBasicField ? (
                  <button
                    onClick={() => handleClick(fieldI, playrI)}
                    className="h-full w-full py-2 hover:bg-gray-200"
                  >
                    {col[fieldI] ??
                      (playrI === selectedP ? (
                        <span className="font-medium text-sky-500">
                          {field.getScore(
                            dice.filter((v) => v !== null) as number[],
                          ) || '_'}
                        </span>
                      ) : (
                        '_'
                      ))}
                  </button>
                ) : (
                  col[fieldI] ?? ''
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
