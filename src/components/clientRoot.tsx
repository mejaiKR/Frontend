"use client";

import { PropsWithChildren } from "react";

import { ReactQueryProvider, RecoilWrapper, ThemeProvider } from "@/provider";

export const ClientRoot = ({ children }: PropsWithChildren) => {
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
