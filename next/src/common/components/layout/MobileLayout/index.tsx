'use client';

import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface Props {
  children: ReactNode;
  modal?: ReactNode;
}

const mobileLayoutClass = "flex w-[100dvw] flex-col items-center justify-start";

const MobileLayout = ({ modal, children }: Props) => {
  return (
    <div className={mobileLayoutClass}>
      {modal}
      {children}
      <BottomNav />
    </div>
  );
};

export default MobileLayout;
