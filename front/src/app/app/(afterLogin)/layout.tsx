'use client'

import { redirect, usePathname } from 'next/navigation'
import { ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//function
import IsMobile from "@/function/IsMobile";
import { getCurrentUser } from "@/function/fetch/user";

import MobileLayout from "@/component/layout/MobileLayout";
import DesktopLayout from "@/component/layout/DesktopLayout";
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

