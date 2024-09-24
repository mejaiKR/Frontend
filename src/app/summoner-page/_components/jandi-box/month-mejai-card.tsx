"use client";

import EmptyBlocks from "@/app/summoner-page/_components/jandi-box/emptyBlocks";
import MejaiBox from "@/app/summoner-page/_components/jandi-box/mejai-box";
import updateGameCountForMonth from "@/app/summoner-page/_components/jandi-box/utils/updateGameCountForMonth";
import WeekDayBar from "@/app/summoner-page/_components/jandi-box/weekDayBar";
import { LoadingButton } from "@/components/loadingButton";
import { RefreshButton } from "@/components/refreshButton";
import Spinner from "@/components/ui/spinner";
import { fetchJandi } from "@/lib/fetch-func";
import { SERVER_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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

export default function MonthMejaiCard({ month, year }: MonthMejaiCardProps) {
  const [monthData, setMonthData] = useState<DayGameData[]>([]);
  const params = useSearchParams();
  const id = params?.get("id") || "";
  const tag = params?.get("tag") || "";
  const [sumOfGameCount, setSumOfGameCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const { data, error, isLoading, refetch, isFetching } = useQuery<JandiData>({
    queryKey: ["jandi", { id, tag, year, month }],
    queryFn: fetchJandi,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
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

  const checkUpdateStatus = useCallback(async () => {
    try {
      const response = await axios.get<UpdateStatus>(
        `${SERVER_URL}/renewal-status/streak?id=${id}&tag=${tag}&year=${year}&month=${month}`
      );
      const lastUpdateAt = dayjs(response.data.lastUpdatedAt);
      const lastUpdatedAt = dayjs(data?.lastUpdatedAt);
      console.log(
        "lastUpdateAt",
        lastUpdateAt.format("YYYY-MM-DD"),
        "lastUpdatedAt",
        lastUpdatedAt.format("YYYY-MM-DD")
      );

      if (lastUpdateAt.isAfter(lastUpdatedAt)) {
        console.log("dddd");
        await refetch();
        setIsRefreshing(false);
        setUpdateMessage("업데이트가 완료되었습니다.");
        setTimeout(() => setUpdateMessage(null), 5000);
      } else {
        setTimeout(checkUpdateStatus, 2000); // 2초 후 다시 확인
      }
    } catch (error) {
      console.error("Failed to check update status:", error);
      setIsRefreshing(false);
      setUpdateMessage(
        "renewal-status 업데이트 상태 확인에 실패했습니다. 다시 시도해주세요."
      );
    }
  }, [id, tag, data, refetch]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setUpdateMessage("업데이트 중...");
    try {
      await axios.post(`${SERVER_URL}/users/renewal/streak`, {
        id,
        tag,
        year,
        month,
      });
      checkUpdateStatus();
    } catch (error) {
      console.error("Failed to refresh data:", error);
      setIsRefreshing(false);
      setUpdateMessage("업데이트 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-48 w-48">
        <Spinner />
      </div>
    );
  // if (error instanceof AxiosError)
  //   return (
  //     <div className="flex flex-col items-center justify-between w-full">
  //       {isRefreshing ? (
  //         <LoadingButton title="스트릭 갱신 중..." />
  //       ) : (
  //         <RefreshButton title="스트릭 갱신" onClick={handleRefresh} />
  //       )}
  //       {updateMessage && (
  //         <div className="mt-2 text-sm text-blue-500">{updateMessage}</div>
  //       )}
  //       <span className="text-2xl font-semibold mt-4 mb-4">
  //         {year}년 {month}월
  //       </span>
  //       <Image
  //         src={process.env.NEXT_PUBLIC_S3_URL + "/poppyError.png"}
  //         alt="Error.."
  //         width={1000}
  //         height={1000}
  //       />
  //       전적 최신화 필요
  //     </div>
  //   );
  return (
    <div className="flex flex-col items-center justify-between w-full">
      {isRefreshing ? (
        <LoadingButton title="스트릭 갱신 중..." />
      ) : (
        <RefreshButton title="스트릭 갱신" onClick={handleRefresh} />
      )}
      {updateMessage && (
        <div className="mt-2 text-sm text-blue-500">{updateMessage}</div>
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
