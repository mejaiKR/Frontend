import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { fetchLeaderBoard } from "@/lib/fetch-func";
import { QUERY_KEY } from "@/lib/queryKey";
import { RankingData } from "@/types";

export const useLeaderBoardQuery = (
  year: number,
  month: number,
): UseQueryResult<RankingData> => {
  return useQuery({
    queryKey: [QUERY_KEY.leaderboard, { year, month }],
    queryFn: fetchLeaderBoard,
  });
};
