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

function updateGameCountForMonth(inputData: DayGameData[], month: number) {
  const year = 2024;

  // 해당 월의 첫 날과 마지막 날을 dayjs 객체로 생성
  const startOfMonth = dayjs(new Date(year, month - 1, 1));
  const endOfMonth = dayjs(new Date(year, month, 0));

  // 해당 월의 모든 날짜를 포함하는 배열 생성
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

  const { data, error, isLoading } = useQuery<DayGameData[]>({
    queryKey: ["jandi", { id, tag, year: 2024, month: month }],
    queryFn: fetchJandi,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
  });

  // useQuery의 결과가 변경될 때마다 monthData 상태를 업데이트합니다.
  useEffect(() => {
    if (data) {
      const updatedData = updateGameCountForMonth(data, month);
      setMonthData(updatedData);
      console.log(updatedData);
    }
  }, [data]); // data가 변경될 때마다 이 useEffect를 재실행합니다.

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[200px] w-[200px]">
        Loading...
      </div>
    );
  if (error instanceof AxiosError) return <div>Error...</div>;

  return (
    <div className="grid grid-cols-7 gap-1">
      {monthData.map((day, index) => (
        <MejaiBox key={index} date={day.date} gameCount={day.gameCount} />
      ))}
    </div>
  );
}
