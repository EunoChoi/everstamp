'use client'

import { ReactNode } from "react";

//function
import IsMobile from "@/common/functions/IsMobile";


import DesktopLayout from '@/common/components/layout/DesktopLayout';
import MobileLayout from '@/common/components/layout/MobileLayout';
import LoadingView from "@/common/components/views/LoadingView";


interface Props {
  children: ReactNode;
  modal: ReactNode;
}

const AppLayout = ({ children, modal }: Props) => {
  const isMobile = IsMobile()

  if (isMobile === null) {
    return (<LoadingView />);
  }
  return (
    <>
      {isMobile ?
        <MobileLayout>
          {modal}
          {children}
        </MobileLayout>
        :
        <DesktopLayout>
          {modal}
          {children}
        </DesktopLayout>}
    </>);
}

export default AppLayout;
