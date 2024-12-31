"use client";

import { Spinner } from "@/components";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSummonerNavigation } from "@/hooks/useSummonerNavigation";
import { useLeaderBoardQuery } from "@/queries";
import { RankingUserData } from "@/types";

type Props = Readonly<{
  year: number;
  month: number;
}>;

export const LeaderBoardUnit = ({ year, month }: Props) => {
  const { data, error, isLoading } = useLeaderBoardQuery(year, month);
  const { moveToSummonerPage } = useSummonerNavigation();

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  if (error || data === undefined) return <div>Error</div>;

  return (
    <Table className="mt-4">
      <TableCaption>{month}월 탑 게이머</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">순위</TableHead>
          <TableHead>소환사명</TableHead>
          <TableHead className="text-right">게임 수</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.ranking?.map((userData: RankingUserData, idx: number) => (
          <TableRow key={`${userData.summonerName}${userData.tagLine}`}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>
              <button
                type="button"
                className="cursor-pointer"
                onClick={() =>
                  moveToSummonerPage(userData.summonerName, userData.tagLine)
                }
              >
                {userData.summonerName}#{userData.tagLine}
              </button>
            </TableCell>
            <TableCell className="text-right">
              {userData.totalGameCount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
