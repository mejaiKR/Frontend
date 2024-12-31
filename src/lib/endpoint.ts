import { SERVER_URL } from "@/lib/utils";

export const API_ENDPOINTS = {
  PROFILE: `${SERVER_URL}/summoner/profile`,
  STREAK: `${SERVER_URL}/summoner/streak`,
  RANKING: `${SERVER_URL}/summoner/ranking`,
  UPDATE_STATUS: `${SERVER_URL}/summoner`,
  PROFILE_UPDATE: `${SERVER_URL}/summoner`,
  SEARCH: `${SERVER_URL}/summoner/search`,
} as const;
