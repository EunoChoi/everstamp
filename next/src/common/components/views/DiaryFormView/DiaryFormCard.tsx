import type { ReactNode } from 'react';
import { inputCardClass } from "../constants";

interface DiaryFormCardProps {
  children: ReactNode;
}

export const DiaryFormCard = ({ children }: DiaryFormCardProps) => {
  return (
    <div className={inputCardClass}>
      {children}
    </div>
  );
};
