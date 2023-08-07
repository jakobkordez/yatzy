'use client';

import { useState } from 'react';
import { Button } from '../button';
import { Dice } from '../dice';
import { useModalState } from '../modal';

interface DiceSelectorModalProps {
  player: string;
  fieldName: string;
  onComplete: (dice: number[] | null) => void;
  labels?: (string | null)[];
  unique?: boolean;
}

export function DiceSelectorModal({
  player,
  fieldName,
  onComplete,
  labels = [null],
  unique = true,
}: DiceSelectorModalProps) {
  const [values, setValues] = useState<(number | null)[]>(
    new Array(labels.length).fill(null)
  );

  function setValueAt(i: number, v: number | null): void {
    const nw = [...values];
    nw.splice(i, 1, v);
    setValues(nw);
  }

  const closeModal = useModalState().close;

  function clearValue(): void {
    onComplete(null);
    closeModal();
  }

  function canComplete(): boolean {
    return values.every((v) => v !== null);
  }

  function submit(): void {
    if (!canComplete()) return;
    onComplete(values as number[]);
    closeModal();
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col text-center text-xl">
        <div>
          <strong>{fieldName}</strong>
        </div>
        <div>for</div>
        <div>
          <strong>{player}</strong>
        </div>
      </div>

      {labels.map((label, inputI) => (
        <div key={inputI} className="flex flex-col items-center gap-1">
          <label className="text-gray-700">{label}</label>
          <div className="flex w-full flex-row justify-center gap-3">
            {new Array(6).fill(null).map((_, i) => (
              <Dice
                key={i}
                num={i + 1}
                onClick={() =>
                  setValueAt(inputI, values[inputI] === i + 1 ? null : i + 1)
                }
                disabled={
                  unique && values[inputI] !== i + 1 && values.includes(i + 1)
                }
                className={`flex-1 ${
                  values[inputI] === i + 1
                    ? 'border border-sky-600 !bg-sky-100'
                    : undefined
                }`}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-row justify-center gap-2">
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={clearValue}>Clear</Button>
        {canComplete() && <Button onClick={submit}>Confirm</Button>}
      </div>
    </div>
  );
}
