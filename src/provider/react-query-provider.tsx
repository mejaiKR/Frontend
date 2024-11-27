"use client";

import { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
    },
  },
});
export const ReactQueryProvider = ({
  children,
}: Readonly<PropsWithChildren>) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
