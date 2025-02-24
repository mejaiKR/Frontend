import { PropsWithChildren } from "react";

import { GoogleAnalytics } from "@next/third-parties/google";

import { Footer, LeaderBoardBox, NavBar, SearchBar } from "@/app/_components";
import { ClientRoot, GoogleAd } from "@/components";

import { gmarketBold, gmarketMedium, netmarbleBold } from "./fonts";

import type { Metadata, Viewport } from "next";

import "./globals.css";

export const viewport: Viewport = {
  initialScale: 1.0,
  maximumScale: 1,
  width: "device-width",
  userScalable: false,
};

export const metadata: Metadata = {
  title: "mejai.kr",
  description: "mejai.kr",
  keywords: "mejai.kr",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html
      lang="ko"
      className={`${gmarketMedium.variable} ${gmarketBold.variable} ${netmarbleBold.variable}`}
      suppressHydrationWarning
    >
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
      <body className="flex justify-center">
        <ClientRoot>
          <div className="flex min-h-screen w-full min-w-[340px] max-w-[550px] flex-col">
            <NavBar />
            <SearchBar />
            <div className="flex-grow">
              <div className="flex h-full justify-center">
                <div className="w-full">{children}</div>
              </div>
            </div>
            <LeaderBoardBox />
            <Footer />
          </div>
        </ClientRoot>
        <GoogleAd />
      </body>
    </html>
  );
}
