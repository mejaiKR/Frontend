import axios from "axios";
import { SERVER_URL } from "@/lib/utils";
import { DayGameData } from "@/app/summoner-page/monthMejaiCard";
import { QueryFunctionContext, QueryKey } from "@tanstack/react-query";

export const fetchUserInfo = async ({
  queryKey,
}: {
  queryKey: [string, { id: string; tag: string }];
}) => {
  const [_key, { id, tag }] = queryKey;
  // if (!id) return null;
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
  // queryKey에서 필요한 값을 안전하게 추출
  const [_key, { id, tag, year, month }] = queryKey as JandiQueryKey;

  const response = await axios.get<DayGameData[]>(
    `${SERVER_URL}/users/streak?id=${id}&tag=${tag}&year=${year}&month=${month}`,
  );
  return response.data;
};
