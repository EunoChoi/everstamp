import { ReactNode } from "react";

type TopButtonSize = 'auto' | 'default';

interface Props {
  'aria-label'?: string;
  children: ReactNode;
  onClick: () => void;
  size?: TopButtonSize;
}

const TopButton = ({ 'aria-label': ariaLabel, children, onClick, size = 'default' }: Props) => (
  <button
    aria-label={ariaLabel}
    className={`shadow-theme-action flex h-8 items-center justify-center rounded-full bg-theme-accent text-sm font-medium text-theme-text-on-accent ${size === 'auto' ? 'w-auto px-2.5' : 'w-16'}`}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default TopButton;
