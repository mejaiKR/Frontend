"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { LoadingButton, RefreshButton, Spinner } from "@/components";
import { useRefreshData, useTimeAgo } from "@/hooks";
import { queries } from "@/lib/queryKey";
import { DayGameData, ViewType } from "@/types";

import { updateGameCountForMonth } from "./utils/updateGameCountForMonth";

import { EmptyBlocks, GameCountChart, MejaiBox, WeekDayBar } from ".";

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
  const viewType = (params?.get("viewType") as ViewType) ?? "mejai";
  const { data, isLoading, refetch, isFetching } = useQuery(
    queries.jandi.detail({ id, tag, year, month }),
  );

  const { isRefreshing, handleRefresh, isRefreshDisabled } = useRefreshData({
    id,
    tag,
    month,
    year,
    refreshTarget: "streak",
    additionalParams: { year, month },
    refetchFn: () => refetch(),
    lastUpdatedAt: data?.lastUpdatedAt,
  });

  const timeAgo = useTimeAgo(data?.lastUpdatedAt);

  useEffect(() => {
    if (data) {
      const updatedData = updateGameCountForMonth(
        data.userGameCounts,
        year,
        month,
        setSumOfGameCount,
      );
      setMonthData(updatedData);
    } else {
      setMonthData([]);
    }
  }, [data, year, month, isFetching]);

  if (isLoading)
    return (
      <div className="flex size-full items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="mt-1 flex w-full flex-col items-center">
      {isRefreshing ? (
        <LoadingButton title="스트릭 갱신 중..." />
      ) : (
        <RefreshButton
          title="스트릭 갱신"
          onClick={handleRefresh}
          disabled={isRefreshDisabled}
        />
      )}
      <div className="mt-2 flex h-1 w-full justify-center">
        <div className="text-xs text-gray-500">{timeAgo}</div>
      </div>
      <span className="mb-4 mt-4 text-2xl font-semibold">
        {year}년 {month}월
      </span>
      <span className="mb-2">총 {sumOfGameCount}게임</span>
      {viewType === "chart" ? (
        <GameCountChart data={monthData} />
      ) : (
        <>
          <WeekDayBar />
          <div className="grid w-full grid-cols-7 gap-1">
            <EmptyBlocks year={year} month={month} />
            {monthData.map((day) => (
              <div
                key={`${day.date}-${day.gameCount}`}
                className="aspect-w-1 aspect-h-1"
              >
                <MejaiBox
                  date={day.date}
                  gameCount={day.gameCount}
                  imageUrl={day.imageUrl}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
