import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import React from "react";
import Footer from "@/app/footer";
import NavBar from "@/app/navBar";
import { QueryClientProvider } from "@tanstack/react-query";
import ReactQueryProvider from "@/components/reactQueryProvider";

export const metadata: Metadata = {
  title: "mejai.gg",
  description: "mejai.gg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex-grow">
                <div className="flex justify-center h-full">
                  <div className="w-full max-w-[1300px] px-4">{children}</div>
                </div>
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
