import { createQueryKeyStore } from "@lukemorales/query-key-factory";

import { fetchJandi, fetchLeaderBoard, fetchUserInfo } from "./fetch-func";

export const queries = createQueryKeyStore({
  userInfo: {
    detail: (params: { id: string; tag: string }) => ({
      queryKey: [params],
      queryFn: () => fetchUserInfo(params),
    }),
  },
  jandi: {
    detail: (params: {
      id: string;
      tag: string;
      year: number;
      month: number;
    }) => ({
      queryKey: [params],
      queryFn: () => fetchJandi(params),
    }),
  },
  leaderboard: {
    detail: (params: { year: number; month: number }) => ({
      queryKey: [params],
      queryFn: () => fetchLeaderBoard(params),
    }),
  },
});
