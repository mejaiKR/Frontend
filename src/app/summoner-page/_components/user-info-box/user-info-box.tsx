"use client";

import { useEffect, useMemo } from "react";

import { AxiosError } from "axios";
import dayjs from "dayjs";
import Image from "next/image";

import { BookMarkButton } from "@/app/summoner-page/_components";
import {
  ImageSkeleton,
  LoadingButton,
  RefreshButton,
  ShareButton,
} from "@/components";
import { useRefreshData, useTimeAgo } from "@/hooks";
import { useUserInfoQuery } from "@/queries";

type Props = Readonly<{
  id: string;
  tag: string;
}>;

export const UserInfoBox = ({ id, tag }: Props) => {
  const { data, isLoading, error, refetch } = useUserInfoQuery(id, tag);

  const isRefreshDisabled = useMemo(() => {
    if (!data?.lastUpdatedAt) return false;
    const lastUpdated = dayjs(data.lastUpdatedAt);
    const now = dayjs();
    return now.diff(lastUpdated, "hour") < 2;
  }, [data?.lastUpdatedAt]);

  const { isRefreshing, handleRefresh } = useRefreshData({
    id,
    tag,
    refreshTarget: "profile",
    refetchFn: () => refetch(),
    lastUpdatedAt: data?.lastUpdatedAt,
  });

  const timeAgo = useTimeAgo(data?.lastUpdatedAt);

  useEffect(() => {
    document.title = `${id}#${tag} - mejai.kr`;
  }, [id, tag]);

  if (isLoading || data === undefined)
    return (
      <div className="m-6 flex h-32 rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
        <ImageSkeleton />
        <div className="ml-4 flex h-full w-60 flex-col justify-center"></div>
      </div>
    );
  if (error instanceof AxiosError) {
    return (
      <div className="m-6 flex h-32 items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
        <span className="font-netmarbleBold text-xl text-blue-600">
          {error.response?.status === 404
            ? "소환사를 찾을 수 없습니다"
            : error.message}
        </span>
      </div>
    );
  }
  return (
    <div className="m-4 flex h-40 rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="relative flex flex-col items-center justify-center">
        <Image
          src={data.profileIcon}
          alt="Profile Icon"
          draggable={false}
          width={140}
          height={140}
          className="rounded-2xl"
        />
        <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-5 transform rounded-full bg-gray-900 px-2 text-xs text-white">
          {data.level}
        </span>
      </div>
      <div className="ml-4 flex h-full w-full flex-col justify-center">
        <div className="flex w-full flex-col gap-2 text-xl font-bold">
          <div>
            {data.summonerName}
            <span className="mb-2 font-medium text-gray-500">
              {" "}
              #{data.tagLine}
            </span>
          </div>
          <div className="flex gap-2">
            <BookMarkButton id={id} tag={tag} />
            <ShareButton />
          </div>
          <div className="flex w-full gap-4">
            {isRefreshing ? (
              <LoadingButton title="프로필 갱신 중..." />
            ) : (
              <RefreshButton
                title="프로필 갱신"
                onClick={handleRefresh}
                disabled={isRefreshDisabled}
              />
            )}
            <div className="flex flex-col justify-center gap-2">
              <div className="text-xs text-gray-500">{timeAgo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
