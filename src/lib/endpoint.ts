import { SERVER_URL } from "@/lib/utils";

export const API_ENDPOINTS = {
  PROFILE: `${SERVER_URL}/users/profile`,
  STREAK: `${SERVER_URL}/users/streak`,
  RANKING: `${SERVER_URL}/ranking`,
} as const;
