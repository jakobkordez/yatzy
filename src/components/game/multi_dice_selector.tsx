import { Dice } from '../dice';
import { useDiceState } from '@/logic/dice_state';

export function MultiDiceSelector() {
  const [dice, setDice, selected, setSelected] = useDiceState((s) => [
    s.dice,
    s.setDice,
    s.selectedDice,
    s.setSelectedDice,
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap items-center justify-center gap-2">
        {dice.map((v, i) => (
          <Dice
            key={i}
            num={v ?? 0}
            className={`min-w-[32px] flex-1 ${
              selected === i ? 'border border-sky-600' : ''
            }`}
            onClick={() => setSelected(i)}
          />
        ))}

        <button
          className="button"
          onClick={() => {
            setDice(new Array(dice.length).fill(null));
            setSelected(0);
          }}
        >
          Clear
        </button>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-2">
        {new Array(6).fill(null).map((_, i) => (
          <Dice
            key={i + 1}
            num={i + 1}
            className="h-12 w-12"
            onClick={() => {
              const nv = [...dice];
              nv[selected] = i + 1;
              setDice(nv);

              let fi = nv.indexOf(null, selected);
              if (fi === -1) fi = nv.indexOf(null);
              if (fi === -1) fi = (selected + 1) % dice.length;
              setSelected(fi);
            }}
          />
        ))}
      </div>
    </div>
  );
}
