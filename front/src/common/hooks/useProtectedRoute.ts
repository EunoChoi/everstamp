'use client';

import { getCurrentUser } from '@/common/fetchers/user';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useProtectedRoute() {
  const router = useRouter();

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,

    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        return false;
      }
      return failureCount < 2;
    },
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!isLoading && isError) {
      console.error("🚨 인증되지 않은 사용자, 로그인 페이지로 리다이렉트합니다.", error);
      router.replace('/login');
    }
  }, [isLoading, isError, router, error]);

  return { user, isLoading };
}