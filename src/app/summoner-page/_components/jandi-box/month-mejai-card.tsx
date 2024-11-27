"use client";

import { useEffect, useMemo, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";

import { LoadingButton } from "@/components/loadingButton";
import { RefreshButton } from "@/components/refreshButton";
import { Spinner } from "@/components/ui";
import { useRefreshData } from "@/hooks/useRefreshData";
import { fetchJandi } from "@/lib/fetch-func";
import { DayGameData, JandiData } from "@/types";

import { updateGameCountForMonth } from "./utils/updateGameCountForMonth";

import { EmptyBlocks, MejaiBox, WeekDayBar } from ".";

type Props = Readonly<{
  month: number;
  year: number;
}>;

export const MonthMejaiCard = ({ month, year }: Props) => {
  const [monthData, setMonthData] = useState<DayGameData[]>([]);
  const params = useSearchParams();
  const id = params?.get("id") ?? "";
  const tag = params?.get("tag") ?? "";
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
    return now.diff(lastUpdated, "hour") < 2;
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
        setSumOfGameCount,
      );
      setMonthData(updatedData);
    }
  }, [data, year, month, isFetching]);

  if (isLoading)
    return (
      <div className="flex h-48 w-48 items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="flex w-full flex-col items-center justify-between">
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
        <div className="mt-2 text-xs text-blue-500">{updateMessage}</div>
      )}
      {isRefreshDisabled && (
        <div className="mt-2 text-xs text-gray-500">
          2시간 후에 다시 갱신할 수 있습니다.
        </div>
      )}
      <span className="mb-4 mt-4 text-2xl font-semibold">
        {year}년 {month}월
      </span>
      <span className="mb-2">총 {sumOfGameCount}게임</span>
      <WeekDayBar />
      <div className="grid w-full grid-cols-7 gap-1">
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
};
