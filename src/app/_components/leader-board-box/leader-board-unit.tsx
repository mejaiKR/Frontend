"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { fetchLeaderBoard } from "@/lib/fetch-func";
import { useSummonerNavigation } from "@/hooks/useSummonerNavigation";

interface LeaderBoardProps {
  year: number;
  month: number;
}
export interface UserData {
  summonerName: string;
  tagLine: string;
  totalGameCount: number;
}

export interface RankingData {
  topRanking: UserData[];
}

export default function LeaderBoardUnit({ year, month }: LeaderBoardProps) {
  const { data, error, isLoading } = useQuery<UserData[]>({
    queryKey: ["leaderboard", { year: year, month: month }],
    queryFn: fetchLeaderBoard,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
  });
  const { moveToSummonerPage } = useSummonerNavigation();

  if (isLoading) return <div>Loading...</div>;
  if (error || data === undefined) return <div>Error</div>;

  return (
    <Table className="mt-4">
      <TableCaption>{month}월 탑 컨트리뷰터</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">순위</TableHead>
          <TableHead>소환사명</TableHead>
          <TableHead className="text-right">게임 수</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((userData: UserData, idx: number) => (
          <TableRow key={idx}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>
              <div
                className="cursor-pointer"
                onClick={() =>
                  moveToSummonerPage(userData.summonerName, userData.tagLine)
                }
              >
                {userData.summonerName}#{userData.tagLine}
              </div>
            </TableCell>
            <TableCell className="text-right">
              {userData.totalGameCount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
