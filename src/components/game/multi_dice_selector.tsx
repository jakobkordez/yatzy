import { useState } from 'react';
import { Dice } from '../dice';
import { Button } from '../button';

interface MultiDiceSelectorProps {
  values: (number | null)[];
  onChange?: (dice: (number | null)[]) => void;
}

export function MultiDiceSelector({
  values,
  onChange,
}: MultiDiceSelectorProps) {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-wrap items-center justify-center gap-2">
        {values.map((v, i) => (
          <Dice
            key={i}
            num={v ?? 0}
            className={`min-w-[32px] flex-1 ${
              selected === i ? 'border border-sky-600' : ''
            }`}
            onClick={() => setSelected(i)}
          />
        ))}

        <Button onClick={() => onChange && onChange(values.fill(null))}>
          Clear
        </Button>
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-2">
        {new Array(6).fill(null).map((_, i) => (
          <Dice
            key={i + 1}
            num={i + 1}
            className="h-12 w-12"
            onClick={() => {
              const nv = [...values];
              nv[selected] = i + 1;
              if (onChange) onChange(nv);

              let fi = nv.indexOf(null, selected);
              if (fi === -1) fi = nv.indexOf(null);
              if (fi === -1) fi = (selected + 1) % values.length;
              setSelected(fi);
            }}
          />
        ))}
      </div>
    </div>
  );
}
