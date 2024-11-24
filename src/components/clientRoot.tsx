"use client";

import { ReactQueryProvider, RecoilWrapper, ThemeProvider } from "@/provider";

export const ClientRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilWrapper>
      <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ReactQueryProvider>
    </RecoilWrapper>
  );
};
