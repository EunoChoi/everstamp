'use client'


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};


/**
 * [Client] reactQuery provider component
 */
function RQProvider({ children }: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {  // react-query 전역 설정
      queries: {
        refetchOnWindowFocus: true,
        retryOnMount: true,
        refetchOnReconnect: true,
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Devtools /> */}
      {children}
    </QueryClientProvider>
  );
}

export default RQProvider;