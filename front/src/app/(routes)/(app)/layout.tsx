'use client'

import { ReactNode } from "react";

import DesktopLayout from '@/common/components/layout/DesktopLayout';
import MobileLayout from '@/common/components/layout/MobileLayout';
import LoadingScreen from '@/common/components/ui/LoadingScreen';
import useIsMobile from "@/common/functions/useIsMobile";
import { useProtectedRoute } from "@/common/hooks/useProtectedRoute";
import { ScrollProvider } from "@/common/hooks/useScrollContext";

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

const AppLayout = ({ children, modal }: Props) => {
  const isMobile = useIsMobile();
  const { user, isLoading } = useProtectedRoute();

  // 로딩 중 (유저 확인 또는 모바일 체크)
  if (isLoading || isMobile === null) {
    return <LoadingScreen />;
  }

  // 비로그인이면 리다이렉트됨 (useProtectedRoute에서 처리)
  if (!user) {
    return <LoadingScreen showLogo={false} />;
  }

  const Layout = isMobile ? MobileLayout : DesktopLayout;

  return (
    <ScrollProvider>
      <Layout>
        {modal}
        {children}
      </Layout>
    </ScrollProvider>
  );
}

export default AppLayout;