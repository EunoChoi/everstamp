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
import { MaterialDesignContent, SnackbarProvider, useSnackbar } from 'notistack';
import styled, { ThemeProvider } from "styled-components";

interface Props {
  children: ReactNode;
  isMobile?: boolean;
  modal: ReactNode;
}

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-default': {
    backgroundColor: 'whitesmoke',
    color: 'rgb(88, 88, 88)',
    fontWeight: '500'
  },
  '&.notistack-MuiContent-info': {
    backgroundColor: '#8EBCDB',
    fontWeight: '500'
  },
  '&.notistack-MuiContent-success': {
    backgroundColor: '#83c6b6',
    fontWeight: '500'
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: '#dc7889',
    fontWeight: '500'
  },
}));


const AppLayout = ({ children, modal }: Props) => {

  const router = useCustomRouter();
  router.setup();

  const isMobile = IsMobile()
  const { data, failureCount } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    // refetchOnWindowFocus: "always",
    // staleTime: 0,
    // gcTime: 0,
    // retry: 3,
    // retryDelay: 1000,


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
      <SnackbarProvider
        Components={{
          default: StyledMaterialDesignContent,
          info: StyledMaterialDesignContent,
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
        anchorOrigin={{
          // vertical: `${isMobile ? 'bottom' : 'top'}`,
          vertical: 'top',
          horizontal: 'right',
        }}
        maxSnack={1}
        autoHideDuration={2000}
        preventDuplicate={true}
      >
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
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default AppLayout;

