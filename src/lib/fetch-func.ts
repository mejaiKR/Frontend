"use client";

import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";
import axios from "axios";

import { UserData } from "@/app/_components/leader-board-box/leader-board-unit";
import { JandiData } from "@/app/summoner-page/_components/jandi-box/month-mejai-card";
import { SERVER_URL } from "@/lib/utils";

export const fetchUserInfo = async ({
  queryKey,
}: {
  queryKey: [string, { id: string; tag: string }];
}) => {
  const [_key, { id, tag }] = queryKey;
  const response = await axios.get(
    `${SERVER_URL}/users/profile?id=${id}&tag=${tag}`,
  );
  return response.data;
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
  const [_key, { id, tag, year, month }] = queryKey as JandiQueryKey;

  const response = await axios.get<JandiData>(
    `${SERVER_URL}/users/streak?id=${id}&tag=${tag}&year=${year}&month=${month}`,
  );
  return response.data || undefined;
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
  const [_key, { year, month }] = queryKey as LeaderBoardQueryKey;

  const response = await axios.get<UserData[]>(
    `${SERVER_URL}/ranking?year=${year}&month=${month}`,
  );
  return response.data;
};
