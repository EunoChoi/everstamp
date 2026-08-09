import type { ReactNode } from 'react';
import { inputCardClass } from '../constants';

interface HabitFormCardProps {
  children: ReactNode;
}

export const HabitFormCard = ({ children }: HabitFormCardProps) => {
  return (
    <div className={inputCardClass}>
      {children}
    </div>
  );
};
