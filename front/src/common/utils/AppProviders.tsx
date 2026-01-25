'use client';

import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import StyledComponentsRegistry from "../../../lib/registry";
import { GlobalEffectInjection } from "./GlobalEffectInjection";
import RQProvider from "./reactQueryProvider";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import { SettingsProvider } from "./settingsContext/SettingsProvider";
import CustomSnackbarProvider from "./snackBar/CustomSnackbarProvider";

interface AppProvidersProps {
  children: ReactNode;
  dehydratedState?: DehydratedState | null;
}

export const AppProviders = ({ children, dehydratedState }: AppProvidersProps) => {

  return (<SessionProvider> {/*nextauth*/}
    <StyledComponentsRegistry> {/*styled-components*/}
      <RQProvider> {/*reactQuery*/}
        <CustomSnackbarProvider> {/*snackBar*/}
          <HydrationBoundary state={dehydratedState}>
            <SettingsProvider> {/*settings - themeColor, fontSize*/}
              <ServiceWorkerRegister /> {/*service worker*/}
              <GlobalEffectInjection />
              {children}
            </SettingsProvider>
          </HydrationBoundary>
        </CustomSnackbarProvider>
      </RQProvider>
    </StyledComponentsRegistry>
  </SessionProvider>);
}