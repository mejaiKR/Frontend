import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import React from "react";
import Footer from "@/app/footer";
import NavBar from "@/app/navBar";
import ReactQueryProvider from "@/components/reactQueryProvider";
import NavSearchBar from "@/app/navSearchBar";

export const metadata: Metadata = {
  title: "mejai.kr",
  description: "mejai.kr",
  keywords: "mejai.kr",
  goo,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex justify-center">
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="w-full max-w-[550px] min-w-[340px] flex flex-col min-h-screen">
              <NavBar />
              <NavSearchBar />
              <div className="flex-grow">
                <div className="flex justify-center h-full">
                  <div className="w-full ">{children}</div>
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
