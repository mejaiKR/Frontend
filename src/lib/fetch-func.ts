"use client";

import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";
import axios from "axios";

import { API_ENDPOINTS } from "@/lib/endpoint";
import { JandiData, UserData } from "@/types";

export const fetchUserInfo = async ({
  queryKey,
}: {
  queryKey: [string, { id: string; tag: string }];
}) => {
  try {
    const [_key, { id, tag }] = queryKey;
    const response = await axios.get<UserData>(`${API_ENDPOINTS.PROFILE}`, {
      params: { id, tag },
    });
    return response.data;
  } catch (error) {
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }
};

type JandiQueryKey = [
  string,
  {
    id: string;
    tag: string;
    year: number;
    month: number;
  },
];

export const fetchJandi = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  try {
    const [_key, { id, tag, year, month }] = queryKey as JandiQueryKey;
    const response = await axios.get<JandiData>(`${API_ENDPOINTS.STREAK}`, {
      params: { id, tag, year, month },
    });
    return response.data ?? undefined;
  } catch (error) {
    throw new Error("잔디 데이터를 가져오는데 실패했습니다.");
  }
};

type LeaderBoardQueryKey = [
  string,
  {
    year: number;
    month: number;
  },
];

export const fetchLeaderBoard = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>) => {
  try {
    const [_key, { year, month }] = queryKey as LeaderBoardQueryKey;
    const response = await axios.get<UserData[]>(`${API_ENDPOINTS.RANKING}`, {
      params: { year, month },
    });
    return response.data;
  } catch (error) {
    throw new Error("리더보드 데이터를 가져오는데 실패했습니다.");
  }
};
