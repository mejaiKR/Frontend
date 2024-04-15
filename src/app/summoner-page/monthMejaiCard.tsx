"use client";

import MejaiBox from "@/app/summoner-page/mejaiBox";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchJandi } from "@/app/summoner-page/fetchFunc";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
export interface DayGameData {
  date: string;
  gameCount: number;
}

function updateGameCountForMonth(
  inputData: DayGameData[],
  year: number,
  month: number,
) {
  const startOfMonth = dayjs(new Date(year, month - 1, 1));
  const endOfMonth = dayjs(new Date(year, month, 0));

  let daysArray: DayGameData[] = [];
  let day = startOfMonth;

  while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day")) {
    daysArray.push({
      date: day.format("YYYY-MM-DD"),
      gameCount: 0,
    });
    day = day.add(1, "day");
  }

  // 입력 데이터로 gameCount 업데이트
  inputData.forEach((data: DayGameData) => {
    const index = daysArray.findIndex((day) => day.date === data.date);
    if (index !== -1) {
      daysArray[index].gameCount = data.gameCount;
    }
  });

  return daysArray;
}

interface MonthMejaiCardProps {
  month: number;
}

export default function MonthMejaiCard({ month }: MonthMejaiCardProps) {
  const [monthData, setMonthData] = useState<DayGameData[]>([]);
  const params = useSearchParams();
  const id = params.get("id") || "";
  const tag = params.get("tag") || "";
  let year = 2024;

  const { data, error, isLoading } = useQuery<DayGameData[]>({
    queryKey: ["jandi", { id, tag, year: 2024, month: month }],
    queryFn: fetchJandi,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
  });

  useEffect(() => {
    if (data) {
      const updatedData = updateGameCountForMonth(data, year, month);
      setMonthData(updatedData);
      console.log(updatedData);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[200px] w-[200px]">
        Loading...
      </div>
    );
  if (error instanceof AxiosError) return <div>Error...</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-7 gap-1">
        {monthData.map((day, index) => (
          <MejaiBox key={index} date={day.date} gameCount={day.gameCount} />
        ))}
      </div>
      <span className="text-2xl font-semibold mt-4">
        {year}년 {month}월
      </span>
    </div>
  );
}
