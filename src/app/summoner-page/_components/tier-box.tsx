"use client";

import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import { TierUnit } from "@/app/summoner-page/_components";
import { ImageSkeleton } from "@/components/ui";
import { fetchUserInfo } from "@/lib/fetch-func";

type Props = {
  id: string;
  tag: string;
};

export const TierBox = ({ id, tag }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userInfo", { id, tag }],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 15, // 15분으로 staletime 설정
    gcTime: 1000 * 60 * 15,
  });
  if (isLoading)
    return (
      <div className="m-6 flex h-32 rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
        <ImageSkeleton />
        <div className="ml-4 flex h-full w-60 flex-col justify-center"></div>
      </div>
    );
  if (error) {
    return (
      <div className="m-6 flex h-32 items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
        <span className="font-netmarbleBold text-lg">error</span>
      </div>
    );
  }
  return (
    <div className="m-4 flex rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
      <TierUnit key={nanoid()} rankInfo={data.soloRank} rankType="soloRank" />
      <TierUnit key={nanoid()} rankInfo={data.flexRank} rankType="flexRank" />
    </div>
  );
};
