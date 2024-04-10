"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // API 요청 실패시 재시도 하는 옵션 (설정값 만큼 재시도)
    },
  },
});
export default function reactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={client}>
      {/*<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />*/}
      {children}
    </QueryClientProvider>
  );
}
