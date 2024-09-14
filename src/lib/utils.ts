import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SERVER_URL =
  process.env.NODE_ENV !== "development"
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : process.env.NEXT_PUBLIC_DEV_SERVER_URL;
export const S3_URL = process.env.NEXT_PUBLIC_S3_URL;
