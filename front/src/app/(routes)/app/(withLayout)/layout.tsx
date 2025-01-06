'use client'

import { useQuery } from "@tanstack/react-query";
import { redirect, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from "react";

//function
import { getCurrentUser } from "@/common/fetchers/user";
import IsMobile from "@/common/functions/IsMobile";


import DesktopLayout from '@/common/components/layout/DesktopLayout';
import MobileLayout from '@/common/components/layout/MobileLayout';
import { useSnackbar } from 'notistack';

interface Props {
  children: ReactNode;
  isMobile?: boolean;
  modal: ReactNode;
}

/**
 * [Client] afterLogin pages layout
 */
const AppLayout = ({ children, modal }: Props) => {

  const isMobile = IsMobile()
  const { failureCount } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: "always",

    staleTime: 0,
    gcTime: 0,
    retry: 3,
    retryDelay: 1000,
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
        </DesktopLayout>
      }
    </>
  );
}

export default AppLayout;

