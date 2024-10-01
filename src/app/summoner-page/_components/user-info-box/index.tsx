"use client";

import BookMarkButton from "@/app/summoner-page/_components/user-info-box/book-mark-button";
import { LoadingButton } from "@/components/loadingButton";
import { RefreshButton } from "@/components/refreshButton";
import ShareButton from "@/components/ui/share-button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserInfo } from "@/lib/fetch-func";
import { SERVER_URL } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import { useCallback, useState } from "react";

function ImageSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-24 w-24 full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
interface TierBoxProps {
  id: string;
  tag: string;
}

export default function UserInfoBox({ id, tag }: TierBoxProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["userInfo", { id, tag }],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 15, // 15분으로 staletime 설정
    gcTime: 1000 * 60 * 15,
  });

  const checkUpdateStatus = useCallback(async () => {
    try {
      const response = await axios.get<{ lastUpdatedAt: string }>(
        `${SERVER_URL}/renewal-status/profile?id=${id}&tag=${tag}`
      );
      const lastUpdateAt = dayjs(response.data.lastUpdatedAt);
      const lastUpdatedAt = dayjs(data?.lastUpdatedAt);

      if (lastUpdateAt.isAfter(lastUpdatedAt)) {
        await refetch();
        setIsRefreshing(false);
        setUpdateMessage("프로필이 업데이트되었습니다.");
        setTimeout(() => setUpdateMessage(null), 5000);
      } else {
        setTimeout(checkUpdateStatus, 2000);
      }
    } catch (error) {
      console.error("프로필 업데이트 상태 확인 실패:", error);
      setIsRefreshing(false);
      setUpdateMessage(
        "프로필 업데이트 상태 확인에 실패했습니다. 다시 시도해주세요."
      );
    }
  }, [id, tag, data, refetch]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setUpdateMessage("프로필 업데이트 중...");
    try {
      await axios.post(`${SERVER_URL}/users/renewal/profile`, { id, tag });
      checkUpdateStatus();
    } catch (error) {
      console.error("프로필 새로고침 실패:", error);
      setIsRefreshing(false);
      setUpdateMessage(
        "프로필 업데이트 요청에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  if (isLoading)
    return (
      <div className="h-32 flex m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ImageSkeleton />
        <div className="w-60 h-full flex flex-col justify-center ml-4"></div>
      </div>
    );
  if (error instanceof AxiosError) {
    return (
      <div className="h-32 flex justify-center items-center m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <span className="text-xl font-netmarbleBold text-blue-600">
          {error.response?.status === 404
            ? "소환사를 찾을 수 없습니다"
            : error.message}
        </span>
      </div>
    );
  }
  return (
    <div className=" h-40 flex m-4 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className=" flex flex-col justify-center items-center relative">
        <Image
          src={data.profileIcon}
          alt="Profile Icon"
          draggable={false}
          width={140}
          height={140}
          className="rounded-2xl"
        />
        <span className="transform -translate-x-1/2 -translate-y-5 bg-gray-900 text-white px-2 rounded-full text-xs absolute top-full left-1/2">
          {data.level}
        </span>
      </div>
      <div className="w-full h-full flex flex-col justify-center ml-4">
        <div className="font-bold text-xl w-full flex flex-col gap-2">
          <div>
            {data.summonerName}
            <span className="font-medium text-gray-500 mb-2">
              {" "}
              #{data.tagLine}
            </span>
          </div>
          <div className="flex gap-2">
            <BookMarkButton id={id} tag={tag} />
            <ShareButton />
          </div>
          <div className="w-full flex gap-4 items-center">
            {isRefreshing ? (
              <LoadingButton title="프로필 갱신 중..." />
            ) : (
              <RefreshButton title="프로필 갱신" onClick={handleRefresh} />
            )}
            {updateMessage && (
              <div className="text-sm text-blue-500">{updateMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
