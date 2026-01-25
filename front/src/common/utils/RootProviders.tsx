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

interface Props {
  children: ReactNode;
  dehydratedState?: DehydratedState | null;
}

/**
 * 전역 Provider 모음
 * - SessionProvider: 인증 (next-auth)
 * - StyledComponentsRegistry: SSR 스타일 처리
 * - RQProvider: React Query 상태 관리
 * - CustomSnackbarProvider: 토스트 알림
 * - HydrationBoundary: 서버 데이터 hydration
 * - SettingsProvider: 테마/폰트 설정
 */
export const RootProviders = ({ children, dehydratedState }: Props) => {
  return (
    <SessionProvider>
      <StyledComponentsRegistry>
        <RQProvider>
          <CustomSnackbarProvider>
            <HydrationBoundary state={dehydratedState}>
              <SettingsProvider>
                <ServiceWorkerRegister />
                <GlobalEffectInjection />
                {children}
              </SettingsProvider>
            </HydrationBoundary>
          </CustomSnackbarProvider>
        </RQProvider>
      </StyledComponentsRegistry>
    </SessionProvider>
  );
}