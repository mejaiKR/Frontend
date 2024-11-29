import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { fetchJandi, fetchUserInfo } from "@/lib/fetch-func";
import { QUERY_KEY } from "@/lib/queryKey";
import { JandiData, UserData } from "@/types";

export const useUserInfoQuery = (
  id: string,
  tag: string,
): UseQueryResult<UserData> => {
  return useQuery({
    queryKey: [QUERY_KEY.userInfo, { id, tag }],
    queryFn: fetchUserInfo,
  });
};

export const useJandiQuery = (
  id: string,
  tag: string,
  year: number,
  month: number,
): UseQueryResult<JandiData> => {
  return useQuery({
    queryKey: [QUERY_KEY.jandi, { id, tag, year, month }],
    queryFn: fetchJandi,
  });
};
