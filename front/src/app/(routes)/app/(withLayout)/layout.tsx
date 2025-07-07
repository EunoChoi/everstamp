'use client'

import { ReactNode, useEffect } from "react";

//function
import IsMobile from "@/common/functions/IsMobile";


import DesktopLayout from '@/common/components/layout/DesktopLayout';
import MobileLayout from '@/common/components/layout/MobileLayout';
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { useProtectedRoute } from "@/common/hooks/useProtectedRoute";
import styled from "styled-components";

import Image from "next/image";
import emotion2 from '/public/img/emotion/emotion2.png';

interface Props {
  children: ReactNode;
  isMobile?: boolean;
  modal: ReactNode;
}

const AppLayout = ({ children, modal }: Props) => {
  const isMobile = IsMobile()
  const { user, isLoading } = useProtectedRoute();
  const { storedValue: fontSize } = useLocalStorage('fontSize', '15px');

  useEffect(() => {
    console.log('font size : ', fontSize)
    document.documentElement.style.setProperty('--font-size-base', fontSize);
  }, [fontSize])

  if (isMobile === null) return (<></>);
  if (isLoading || !user) {
    return (<NoUser>
      <Image src={emotion2} alt='loading' width={128} height={128} />
      <span>loading...</span>
    </NoUser>);
  }
  else return (
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
    </>
  );
}

export default AppLayout;

const NoUser = styled.div`
  width: 100dvw;
  height: 100dvh;

  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  gap: 24px;
  span{
    font-size: 24px;
    text-transform: uppercase;
  }
`