"use client";

import EmptyBlocks from "@/app/summoner-page/_components/jandi-box/emptyBlocks";
import MejaiBox from "@/app/summoner-page/_components/jandi-box/mejai-box";
import updateGameCountForMonth from "@/app/summoner-page/_components/jandi-box/utils/updateGameCountForMonth";
import WeekDayBar from "@/app/summoner-page/_components/jandi-box/weekDayBar";
import { LoadingButton } from "@/components/loadingButton";
import { RefreshButton } from "@/components/refreshButton";
import Spinner from "@/components/ui/spinner";
import { fetchJandi } from "@/lib/fetch-func";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

export interface DayGameData {
  date: string;
  gameCount: number;
  imageUrl: string;
}

export interface JandiData {
  userGameCount: DayGameData[];
  lastUpdatedAt: string;
}

interface UpdateStatus {
  lastUpdatedAt: string;
}

interface MonthMejaiCardProps {
  month: number;
  year: number;
}

import { useRefreshData } from "@/hooks/useRefreshData";

export default function MonthMejaiCard({ month, year }: MonthMejaiCardProps) {
  const [monthData, setMonthData] = useState<DayGameData[]>([]);
  const params = useSearchParams();
  const id = params?.get("id") || "";
  const tag = params?.get("tag") || "";
  const [sumOfGameCount, setSumOfGameCount] = useState(0);

  const { data, isLoading, refetch, isFetching } = useQuery<JandiData>({
    queryKey: ["jandi", { id, tag, year, month }],
    queryFn: fetchJandi,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
  });

  const isRefreshDisabled = useMemo(() => {
    if (!data?.lastUpdatedAt) return false;
    const lastUpdated = dayjs(data.lastUpdatedAt);
    const now = dayjs();
    return now.diff(lastUpdated, 'hour') < 2;
  }, [data?.lastUpdatedAt]);

  const { isRefreshing, updateMessage, handleRefresh } = useRefreshData({
    id,
    tag,
    endpoint: "/users/renewal/streak",
    checkEndpoint: "/renewal-status/streak",
    additionalParams: { year, month },
    refetchFn: () => refetch(),
    lastUpdatedAt: data?.lastUpdatedAt,
  });

  useEffect(() => {
    if (data) {
      const updatedData = updateGameCountForMonth(
        data.userGameCount,
        year,
        month,
        setSumOfGameCount
      );
      setMonthData(updatedData);
    }
  }, [data, year, month, isFetching]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-48 w-48">
        <Spinner />
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-between w-full">
      {isRefreshing ? (
        <LoadingButton title="스트릭 갱신 중..." />
      ) : (
        <RefreshButton
          title="스트릭 갱신"
          onClick={handleRefresh}
          disabled={isRefreshDisabled}
        />
      )}
      {updateMessage && (
        <div className="mt-2 text-sm text-blue-500">{updateMessage}</div>
      )}
      {isRefreshDisabled && (
        <div className="mt-2 text-sm text-gray-500">2시간 후에 다시 갱신할 수 있습니다.</div>
      )}
      <span className="text-2xl font-semibold mt-4 mb-4">
        {year}년 {month}월
      </span>
      <span className="mb-2">총 {sumOfGameCount}게임</span>
      <WeekDayBar />
      <div className="grid grid-cols-7 gap-1 w-full">
        <EmptyBlocks year={year} month={month} />
        {monthData.map((day, index) => (
          <div key={index} className="aspect-w-1 aspect-h-1">
            <MejaiBox
              date={day.date}
              gameCount={day.gameCount}
              imageUrl={day.imageUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
