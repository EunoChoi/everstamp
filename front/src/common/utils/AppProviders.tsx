'use client';

import { HydrationBoundary } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import StyledComponentsRegistry from "../../../lib/registry";
import { DynamicThemeProvider } from "./DynamicThemeProvider";
import { GlobalEffectInjection } from "./GlobalEffectInjection";
import RQProvider from "./ReactQueryProvider";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import CustomSnackbarProvider from "./snackBar/CustomSnackbarProvider";

interface AppProvidersProps {
  children: ReactNode;
  dehydratedState: unknown;
}

export const AppProviders = ({ children, dehydratedState }: AppProvidersProps) => {

  return (<SessionProvider> {/*nextauth*/}
    <StyledComponentsRegistry> {/*styled-components*/}
      <RQProvider> {/*reactQuery*/}
        <CustomSnackbarProvider> {/*snackBar*/}
          <HydrationBoundary state={dehydratedState}>
            <DynamicThemeProvider> {/*theme*/}
              <ServiceWorkerRegister /> {/*service worker*/}
              <GlobalEffectInjection />
              {children}
            </DynamicThemeProvider>
          </HydrationBoundary>
        </CustomSnackbarProvider>
      </RQProvider>
    </StyledComponentsRegistry>
  </SessionProvider>);
}