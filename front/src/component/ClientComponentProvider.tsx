'use client';

import { getCurrentUser } from "@/function/fetch/user";
import NProgressStyles from "@/style/nProgressStyles";
import { useQuery } from "@tanstack/react-query";
import { MaterialDesignContent, SnackbarProvider } from "notistack";
import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import { CustomRouter } from "@/function/customRouter";

type Props = {
  children: ReactNode;
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


//client component provider - theme, nprogress, notistack component
const ClientComponentProvider = ({ children }: Props) => {
  const { data = { themeColor: '' }, failureCount } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: "always",

    staleTime: 0,
    gcTime: 0,
    retry: 3,
    retryDelay: 1000,
  })

  const theme = {
    point: data?.themeColor ? data?.themeColor : ''
  }
  return (
    <ThemeProvider theme={theme}>
      {/* <NetworkStatus /> */}
      <ServiceWorkerRegister />
      <CustomRouter />
      <NProgressStyles barColor={theme?.point ? theme?.point : '#979FC7'} />
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
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default ClientComponentProvider;