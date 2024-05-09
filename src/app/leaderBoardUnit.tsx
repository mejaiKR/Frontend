import axios from "axios";
import { SERVER_URL } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface LeaderBoardProps {
  year: number;
  month: number;
}

interface RankingData {
  topRanking: {
    summonerName: string;
    tagLine: string;
    totalGameCount: number;
  }[];
}

export default async function LeaderBoardUnit({
  year,
  month,
}: LeaderBoardProps) {
  let rankingData: RankingData | undefined =
    (await axios
      .get(`${SERVER_URL}/ranking?year=${year}&month=${month}`)
      .then((res) => res.data)) || undefined;
  if (rankingData === undefined) return <></>;

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
        {rankingData.topRanking.map((data, idx) => (
          <TableRow key={idx}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>
              <Link
                href={`/summoner-page?id=${data.summonerName}&tag=${data.tagLine}`}
              >
                {data.summonerName}#{data.tagLine}
              </Link>
            </TableCell>
            <TableCell className="text-right">{data.totalGameCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
