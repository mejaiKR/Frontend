"use client";

import MejaiBox from "@/app/summoner-page/_components/jandi-box/mejaiBox";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchJandi } from "@/lib/fetchFunc";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import Spinner from "@/components/ui/spinner";
import Image from "next/image";
export interface DayGameData {
  date: string;
  gameCount: number;
  imageUrl: string;
}

function updateGameCountForMonth(
  inputData: DayGameData[],
  year: number,
  month: number,
  setSumOfGameCount: (value: number) => void,
) {
  const startOfMonth = dayjs(new Date(year, month - 1, 1));
  const endOfMonth = dayjs(new Date(year, month, 0));
  let sumOfGameCount = 0;

  let daysArray: DayGameData[] = [];
  let day = startOfMonth;

  while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day")) {
    daysArray.push({
      date: day.format("YYYY-MM-DD"),
      gameCount: 0,
      imageUrl: "",
    });
    day = day.add(1, "day");
  }

  // 입력 데이터로 gameCount 업데이트
  inputData.forEach((data: DayGameData) => {
    const index = daysArray.findIndex((day) => day.date === data.date);
    if (index !== -1) {
      daysArray[index].gameCount = data.gameCount;
      sumOfGameCount += data.gameCount;
      daysArray[index].imageUrl = data.imageUrl;
    }
  });
  setSumOfGameCount(sumOfGameCount);
  return daysArray;
}

interface MonthMejaiCardProps {
  month: number;
}

const WeekDays = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className="w-full grid grid-cols-7 gap-1 text-xl">
      {days.map((day) => (
        <div key={day} className="flex justify-center">
          {day}
        </div>
      ))}
    </div>
  );
};

export default function MonthMejaiCard({ month }: MonthMejaiCardProps) {
  const [monthData, setMonthData] = useState<DayGameData[]>([]);
  const params = useSearchParams();
  const id = params?.get("id") || "";
  const tag = params?.get("tag") || "";
  let year = 2024;
  const [sumOfGameCount, setSumOfGameCount] = useState(0);

  const { data, error, isLoading } = useQuery<DayGameData[]>({
    queryKey: ["jandi", { id, tag, year: 2024, month: month }],
    queryFn: fetchJandi,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
  });

  useEffect(() => {
    if (data) {
      const updatedData = updateGameCountForMonth(
        data,
        year,
        month,
        setSumOfGameCount,
      );
      setMonthData(updatedData);
    }
  }, [data]);

  // 빈 블록을 계산
  const emptyBlocks = [];
  const startOfMonth = dayjs(new Date(year, month - 1, 1));
  const dayOfWeek = startOfMonth.day(); // 일요일은 0, 토요일은 6

  for (let i = 0; i < dayOfWeek; i++) {
    emptyBlocks.push(<div key={`empty-${i}`} className="w-full"></div>);
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-48 w-48">
        <Spinner />
      </div>
    );
  if (error instanceof AxiosError)
    return (
      <div className="text-red-500 text-center mx-auto">
        <Image
          src={"https://" + process.env.NEXT_PUBLIC_S3_URL + "/poppyError.png"}
          alt="Error.."
          width={1000}
          height={1000}
        />
        현재 서버에 너무 많은 요청이 있어요... 잠시 후 다시 시도해주세요.
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-between w-full">
      <span className="text-2xl font-semibold mt-4 mb-4">
        {year}년 {month}월
      </span>
      <span className="mb-2">총 {sumOfGameCount}게임</span>
      <WeekDays />
      <div className="grid grid-cols-7 gap-1 w-full">
        {emptyBlocks}
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
