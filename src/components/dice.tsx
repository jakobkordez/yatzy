interface DiceProps {
  num: number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function Dice({ num, onClick, className, disabled }: DiceProps) {
  className = `m-auto relative box-content aspect-square rounded-[10%] max-w-[60px] border border-gray-300 bg-gray-50 shadow ${
    className ?? ''
  }`;

  const child =
    num < 1 ? (
      <></>
    ) : (
      <>
        {num % 2 === 1 && (
          <div className="absolute left-1/2 top-1/2 h-1/6 w-1/6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500" />
        )}
        {num !== 1 && (
          <>
            <div className="absolute right-[15%] top-[15%] h-1/6 w-1/6 rounded-full bg-gray-500" />
            <div className="absolute bottom-[15%] left-[15%] h-1/6 w-1/6 rounded-full bg-gray-500" />
          </>
        )}
        {num > 3 && (
          <>
            <div className="absolute left-[15%] top-[15%] h-1/6 w-1/6 rounded-full bg-gray-500" />
            <div className="absolute bottom-[15%] right-[15%] h-1/6 w-1/6 rounded-full bg-gray-500" />
          </>
        )}
        {num === 6 && (
          <>
            <div className="absolute left-1/2 top-[15%] h-1/6 w-1/6 -translate-x-1/2 rounded-full bg-gray-500" />
            <div className="absolute bottom-[15%] left-1/2 h-1/6 w-1/6 -translate-x-1/2 rounded-full bg-gray-500" />
          </>
        )}
      </>
    );

  return onClick ? (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-40 ${className}`}
    >
      {child}
    </button>
  ) : (
    <div className={className}>{child}</div>
  );
}
