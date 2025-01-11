"use client";

import axios from "axios";

import { API_ENDPOINTS } from "@/lib/endpoint";
import {
  JandiData,
  JandiParams,
  LeaderBoardParams,
  RankingUserData,
  UserData,
  UserInfoParams,
} from "@/types";

export const fetchUserInfo = async ({
  id,
  tag,
}: UserInfoParams): Promise<UserData> => {
  try {
    const response = await axios.get<UserData>(API_ENDPOINTS.PROFILE, {
      params: { id, tag },
    });
    return response.data;
  } catch (error) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }
};

export const fetchJandi = async ({
  id,
  tag,
  year,
  month,
}: JandiParams): Promise<JandiData> => {
  try {
    const response = await axios.get<JandiData>(API_ENDPOINTS.STREAK, {
      params: { id, tag, year, month },
    });
    return response.data;
  } catch (error) {
    throw new Error("잔디 데이터를 가져오는데 실패했습니다.");
  }
};

export const fetchLeaderBoard = async ({
  year,
  month,
}: LeaderBoardParams): Promise<{ ranking: RankingUserData[] }> => {
  try {
    const response = await axios.get<{ ranking: RankingUserData[] }>(
      API_ENDPOINTS.RANKING,
      {
        params: { year, month },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error("리더보드 데이터를 가져오는데 실패했습니다.");
  }
};
