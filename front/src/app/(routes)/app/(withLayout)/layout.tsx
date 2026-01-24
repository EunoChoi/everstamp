'use client'

import { ReactNode } from "react";

import IsMobile from "@/common/functions/IsMobile";
import DesktopLayout from '@/common/components/layout/DesktopLayout';
import MobileLayout from '@/common/components/layout/MobileLayout';
import LoadingScreen from '@/common/components/ui/LoadingScreen';
import { useProtectedRoute } from "@/common/hooks/useProtectedRoute";

interface Props {
  children: ReactNode;
  modal: ReactNode;
}

const AppLayout = ({ children, modal }: Props) => {
  const isMobile = IsMobile();
  const { user, isLoading } = useProtectedRoute();

  // 첫 방문일 때만 로딩
  if (isMobile === null && isLoading) {
    return <LoadingScreen message="loading..." />;
  }

  // 비로그인이면 리다이렉트됨 (useProtectedRoute에서 처리)
  if (!isLoading && !user) {
    return <LoadingScreen message="" showImage={false} />;
  }

  // 페이지 전환 중에는 빈 화면 (거의 안보임)
  if (isMobile === null || isLoading) {
    return null;
  }

  const Layout = isMobile ? MobileLayout : DesktopLayout;
  
  return (
    <Layout>
      {modal}
      {children}
    </Layout>
  );
}

export default AppLayout;