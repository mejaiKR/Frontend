import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { fetchLeaderBoard } from "@/lib/fetch-func";
import { QUERY_KEY } from "@/lib/queryKey";
import { RankingUserData } from "@/types";

export const useLeaderBoardQuery = (
  year: number,
  month: number,
): UseQueryResult<RankingUserData[]> => {
  return useQuery({
    queryKey: [QUERY_KEY.leaderboard, { year, month }],
    queryFn: fetchLeaderBoard,
  });
};
