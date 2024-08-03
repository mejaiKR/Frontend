import localFont from "next/font/local";

export const gmarketMedium = localFont({
  src: "./../../public/fonts/GmarketSansTTFMedium.ttf",
  variable: "--font-gmarket-medium",
  display: "swap",
  preload: true,
});

export const gmarketBold = localFont({
  src: "./../../public/fonts/GmarketSansTTFBold.ttf",
  variable: "--font-gmarket-bold",
  display: "swap",
  preload: true,
});

export const netmarbleBold = localFont({
  src: "./../../public/fonts/netmarbleB.ttf",
  variable: "--font-netmarble-bold",
  display: "swap",
  preload: true,
});
