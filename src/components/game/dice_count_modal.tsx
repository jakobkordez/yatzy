import { Button } from '../button';
import { useModalState } from '../modal';

interface DiceCountModalProps {
  player: string;
  fieldName: string;
  onComplete: (count: number | null) => void;
}

export function DiceCountModal({
  player,
  fieldName: dice,
  onComplete,
}: DiceCountModalProps) {
  const closeModal = useModalState().close;

  function clearValue() {
    onComplete(null);
    closeModal();
  }

  function setCount(c: number) {
    onComplete(c);
    closeModal();
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col text-center text-xl">
        <div>
          <strong>{dice}</strong>
        </div>
        <div>for</div>
        <div>
          <strong>{player}</strong>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-3">
        {new Array(6).fill(null).map((_, i) => (
          <button
            key={i}
            onClick={() => setCount(i)}
            className="flex w-auto flex-col items-center rounded bg-gray-200 px-5 py-2 hover:bg-gray-300"
          >
            <span className="text-lg font-medium">{i}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-row justify-center gap-2">
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={clearValue}>Clear</Button>
      </div>
    </div>
  );
}
