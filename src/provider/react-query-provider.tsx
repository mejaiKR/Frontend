"use client";

import { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
      gcTime: 1000 * 60 * 30, // 30분
      staleTime: 1000 * 60 * 15, // 15분
      refetchOnWindowFocus: false, // 윈도우 포커스시 자동 리페치 비활성화
      refetchOnReconnect: true, // 네트워크 재연결시 리페치 활성화
    },
    mutations: {
      retry: 1, // mutation 실패시 재시도 횟수
      networkMode: "always", // 오프라인에서도 mutation 시도
    },
  },
});

export const ReactQueryProvider = ({
  children,
}: Readonly<PropsWithChildren>) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
