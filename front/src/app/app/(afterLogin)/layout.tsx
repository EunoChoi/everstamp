'use client'

import { redirect, usePathname } from 'next/navigation'
import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//function
import IsMobile from "@/common/function/IsMobile";
import { getCurrentUser } from "@/common/function/fetch/user";


import { useSnackbar } from 'notistack';
import DesktopLayout from '@/common/component/layout/DesktopLayout';
import MobileLayout from '@/common/component/layout/MobileLayout';

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

