"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

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
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
