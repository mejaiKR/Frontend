import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import React from "react";
import Footer from "@/app/_components/footer";
import NavBar from "@/app/_components/nav-bar";
import ReactQueryProvider from "@/components/provider/react-query-provider";
import GoogleAd from "@/components/google-ad";
import dynamic from "next/dynamic";
import SearchBar from "@/app/_components/search-bar";
import { DropdownProvider } from "@/components/provider/dropdown-provider";
import RecoilWrapper from "@/lib/recoil/recoil-wrapper";
const LeaderBoardBox = dynamic(
  () => import("./_components/leader-board-box/index"),
  {
    ssr: false,
  },
);
export const metadata: Metadata = {
  title: "mejai.kr",
  description: "mejai.kr",
  keywords: "mejai.kr",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="flex justify-center">
        <RecoilWrapper>
          <DropdownProvider>
            <ReactQueryProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <div className="w-full max-w-[550px] min-w-[340px] flex flex-col min-h-screen">
                  <NavBar />
                  <SearchBar />
                  <div className="flex-grow">
                    <div className="flex justify-center h-full">
                      <div className="w-full ">{children}</div>
                    </div>
                  </div>
                  <LeaderBoardBox />
                  <Footer />
                </div>
              </ThemeProvider>
            </ReactQueryProvider>
          </DropdownProvider>
        </RecoilWrapper>
      </body>
      <GoogleAd />
    </html>
  );
}
