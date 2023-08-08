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

  // function handleClick(fieldI: number, playerI: number): void {
  //   const field = game.fields[fieldI] as YatzyBasicField;
  //   const fieldName = game.fieldNames[fieldI];
  //   const player = game.players[playerI];

  //   if (field instanceof YatzyFieldSingle)
  //     return openModal(
  //       <DiceCountModal
  //         player={game.players[playerI]}
  //         fieldName={fieldName}
  //         onComplete={(count) => {
  //           if (count !== null) count *= field.num;
  //           setField(playerI, fieldI, count);
  //         }}
  //       />
  //     );

  //   if (field instanceof YatzyFieldOnePair)
  //     return openModal(
  //       <DiceSelectorModal
  //         player={player}
  //         fieldName={fieldName}
  //         labels={['Select dice of pair']}
  //         onComplete={(dice) => {
  //           if (!dice) return setField(playerI, fieldI, null);
  //           setField(playerI, fieldI, dice[0] * 2);
  //         }}
  //       />
  //     );

  //   if (field instanceof YatzyFieldTwoPairs)
  //     return openModal(
  //       <DiceSelectorModal
  //         player={player}
  //         fieldName={fieldName}
  //         labels={['Select dice of first pair', 'Select dice of second pair']}
  //         onComplete={(dice) => {
  //           if (!dice) return setField(playerI, fieldI, null);
  //           setField(playerI, fieldI, (dice[0] + dice[1]) * 2);
  //         }}
  //       />
  //     );

  //   if (field instanceof YatzyFieldNumOAK)
  //     return openModal(
  //       <DiceSelectorModal
  //         player={player}
  //         fieldName={fieldName}
  //         labels={['Select dice']}
  //         onComplete={(dice) => {
  //           if (!dice) return setField(playerI, fieldI, null);
  //           setField(playerI, fieldI, dice[0] * field.num);
  //         }}
  //       />
  //     );

  //   if (field instanceof YatzyFieldStraight)
  //     return openModal(
  //       <DiceSelectorModal
  //         player={player}
  //         fieldName={fieldName}
  //         labels={['From dice', 'To dice']}
  //         onComplete={(dice) => {
  //           if (!dice) return setField(playerI, fieldI, null);
  //           dice.sort();
  //           const a = dice[0];
  //           const b = dice[1] - a + 1;
  //           setField(playerI, fieldI, b * a + (b * (b - 1)) / 2);
  //         }}
  //       />
  //     );

  //   if (field instanceof YatzyFieldFullHouse)
  //     return openModal(
  //       <DiceSelectorModal
  //         player={player}
  //         fieldName={fieldName}
  //         labels={['Select dice of 3', 'Select dice of 2']}
  //         onComplete={(dice) => {
  //           if (!dice) return setField(playerI, fieldI, null);
  //           setField(playerI, fieldI, dice[0] * 3 + dice[1] * 2);
  //         }}
  //       />
  //     );

  //   if (field instanceof YatzyFieldChance)
  //     return openModal(
  //       <DiceSelectorModal
  //         player={player}
  //         fieldName={fieldName}
  //         labels={new Array(5).fill(null)}
  //         unique={false}
  //         onComplete={(dice) => {
  //           if (!dice) return setField(playerI, fieldI, null);
  //           setField(
  //             playerI,
  //             fieldI,
  //             dice.reduce((p, c) => p + c)
  //           );
  //         }}
  //       />
  //     );

  //   if (field instanceof YatzyFieldYatzy)
  //     return openModal(
  //       <DiceSelectorModal
  //         player={player}
  //         fieldName={fieldName}
  //         labels={['Select dice for Yatzy']}
  //         onComplete={(dice) => {
  //           if (!dice) return setField(playerI, fieldI, null);
  //           setField(
  //             playerI,
  //             fieldI,
  //             field.getScore(new Array(5).fill(dice[0]))
  //           );
  //         }}
  //       />
  //     );
  // }

  function buildCell(fieldI: number, playerI: number) {
    const field = game.fields[fieldI];
    const col = game.scores[playerI];

    if (!(field instanceof YatzyBasicField) || playerI !== selectedP)
      return col[fieldI] ?? <div className="py-2">&nbsp;</div>;

    if (erase !== (col[fieldI] !== null)) {
      return col[fieldI] ?? '';
    }

    if (erase) {
      return (
        <button
          className="h-full w-full bg-pink-50 py-2 font-medium text-pink-500 hover:bg-pink-100"
          onClick={() => setField(playerI, fieldI, null)}
        >
          {col[fieldI] ?? ''}
        </button>
      );
    }

    const score = field.getScore(dice.filter((v) => v !== null) as number[]);
    return (
      <button
        className={`h-full w-full py-2 font-medium text-sky-500 hover:bg-sky-200 ${
          score ? 'bg-sky-50' : ''
        }`}
        onClick={() => {
          setField(playerI, fieldI, score);
          clearDice();
        }}
      >
        {score || '_'}
      </button>
    );
  }

  return (
    <table className="table select-none overflow-clip rounded-xl border bg-white text-center shadow-lg md:mx-auto">
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

            {game.scores.map((_, playrI) => (
              <td key={playrI} className="border-l border-t">
                {buildCell(fieldI, playrI)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
