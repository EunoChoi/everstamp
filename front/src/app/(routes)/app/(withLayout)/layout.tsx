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
import NProgressStyles from "@/common/styles/nProgressStyles";
import { useSnackbar } from 'notistack';
import { ThemeProvider } from "styled-components";

interface Props {
  children: ReactNode;
  isMobile?: boolean;
  modal: ReactNode;
}

const AppLayout = ({ children, modal }: Props) => {

  const router = useCustomRouter();
  router.setup();

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

  if (isMobile === null) return <></>;
  return (
    <ThemeProvider theme={data.theme}>
      <ServiceWorkerRegister />
      <ScrollProvider>
        <NProgressStyles barColor={data.theme?.point ? data.theme?.point : '#979FC7'} />
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

