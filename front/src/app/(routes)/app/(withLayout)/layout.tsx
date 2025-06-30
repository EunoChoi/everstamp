'use client'

import { useQuery } from "@tanstack/react-query";
import { redirect, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from "react";

//function
import { getCurrentUser } from "@/common/fetchers/user";
import IsMobile from "@/common/functions/IsMobile";


import DesktopLayout from '@/common/components/layout/DesktopLayout';
import MobileLayout from '@/common/components/layout/MobileLayout';
import { ScrollProvider } from "@/common/components/util/ScrollProvider";
import ServiceWorkerRegister from "@/common/components/util/ServiceWorkerRegister";
import useCustomRouter from "@/common/hooks/useCustomRouter";
import { useSnackbar } from 'notistack';
import { createGlobalStyle, ThemeProvider } from "styled-components";

interface Props {
  children: ReactNode;
  isMobile?: boolean;
  modal: ReactNode;
}

const AppLayout = ({ children, modal }: Props) => {

  useCustomRouter();

  const isMobile = IsMobile()
  const { data, failureCount } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: 30000,
    gcTime: 1800000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: true,
    refetchOnMount: true,

    select: (data) => {
      return {
        ...data,
        theme: {
          point: data?.themeColor
        }
      }
    }
  })

  const pathname = usePathname();
  const { closeSnackbar } = useSnackbar();

  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') ?? '15px';
    console.log('font size : ', savedFontSize);
    document.documentElement.style.setProperty('--font-size-base', savedFontSize);
  }, []);

  useEffect(() => {
    if (pathname) {
      closeSnackbar();
    }
  }, [pathname, closeSnackbar]);

  useEffect(() => {
    console.log('get user info failureCount : ', failureCount);
    if (failureCount >= 2) {
      redirect('/app');
    }
  }, [failureCount]);

  if (isMobile === null || !data) return <></>;
  return (
    <ThemeProvider theme={data?.theme ?? {}}>
      <ServiceWorkerRegister />
      <ScrollProvider>
        <NProgressStyles barColor={data?.theme?.point ? data?.theme?.point : '#979FC7'} />
        {isMobile ?
          <MobileLayout>
            {modal}
            {children}
          </MobileLayout>
          :
          <DesktopLayout>
            {modal}
            {children}
          </DesktopLayout>
        }
      </ScrollProvider>
    </ThemeProvider>
  );
}

export default AppLayout;

const NProgressStyles = createGlobalStyle<{ barColor: string }>`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${props => props.barColor};
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100dvw;
   
    @media (max-width: 479px) { //mobile port
      top: auto;
      bottom: 0;
      height: 6px;
    }
    @media (min-width:480px) and (max-width:1024px) { //mobild land + tablet
      height: 4px;
    }
    @media (min-width:1025px) { //desktop
      height: 8px;
    }
  }

  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 40%;
    right: 50%;
    transform: translate(50%, 0);
  }

  #nprogress .spinner-icon {
    width: 64px;
    height: 64px;
    box-sizing: border-box;
    border: solid 6px transparent;
    border-top-color: ${props => props.barColor};
    border-left-color: ${props => props.barColor};
    border-radius: 50%;
    animation: nprogress-spinner 350ms ease-in-out infinite;
  }

  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;