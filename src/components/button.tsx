import { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: string;
}

export function Button({ children, onClick, className, style }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-center font-medium ${
        className ?? ''
      } ${style ?? 'bg-sky-500 text-white hover:bg-sky-600'}`}
    >
      {children}
    </button>
  );
}
