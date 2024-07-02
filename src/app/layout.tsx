import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import React from "react";
import Footer from "@/app/_components/footer";
import NavBar from "@/app/_components/navBar";
import ReactQueryProvider from "@/components/reactQueryProvider";
import GoogleAd from "@/components/googleAd";
import dynamic from "next/dynamic";
import SearchBar from "@/app/_components/searchBar";
const LeaderBoardBox = dynamic(
  () => import("@/app/_components/leaderBoardBox"),
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
      </body>
      <GoogleAd />
    </html>
  );
}
