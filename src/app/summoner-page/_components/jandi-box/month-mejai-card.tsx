"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { LoadingButton, RefreshButton, Spinner } from "@/components";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useRefreshData, useTimeAgo } from "@/hooks";
import { useJandiQuery } from "@/queries";
import { DayGameData } from "@/types";

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

  const { data, isLoading, refetch, isFetching } = useJandiQuery(
    id,
    tag,
    year,
    month,
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
    <div className="mt-1 flex w-full flex-col items-center justify-between">
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
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <span className="mb-2 cursor-pointer underline decoration-dotted transition-colors hover:text-primary">
            총 {sumOfGameCount}게임
          </span>
        </HoverCardTrigger>
        <HoverCardContent
          className="w-fit border bg-background/80 backdrop-blur-sm"
          side="bottom"
          align="center"
        >
          <GameCountChart data={monthData} sumOfGameCount={sumOfGameCount} />
        </HoverCardContent>
      </HoverCard>
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
    </div>
  );
};
