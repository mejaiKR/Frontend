import { RankInfo } from "@/types";

export type RankingUserData = {
  totalGameCount: string;
  summonerName: string;
  tagLine: string;
};

export type RankingData = {
  ranking: RankingUserData[];
};

export type UserData = {
  flexRank: RankInfo;
  lastUpdatedAt: string;
  level: string;
  profileIcon: string;
  soloRank: RankInfo;
  summonerName: string;
  tagLine: string;
};

export type SummonerId = {
  id: string;
  tag: string;
};
