"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export const ThemeProvider = ({
  children,
  ...props
}: Readonly<ThemeProviderProps>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
