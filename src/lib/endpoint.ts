import { SERVER_URL } from "@/lib/utils";

export const API_ENDPOINTS = {
  PROFILE: `${SERVER_URL}/users/profile`,
  STREAK: `${SERVER_URL}/users/streak`,
  RANKING: `${SERVER_URL}/ranking`,
  UPDATE_STATUS: `${SERVER_URL}/renewal-status/`,
  PROFILE_UPDATE: `${SERVER_URL}/users/renewal/`,
} as const;
