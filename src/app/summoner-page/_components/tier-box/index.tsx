"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/lib/fetch-func";

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

interface RankInfo {
  leaguePoints: number;
  losses: number;
  queueType: string;
  rank: string;
  tier: string;
  tierIcon: string;
  wins: number;
}

interface TierUnitProps {
  rankInfo: RankInfo;
}

const TierUnit = ({ rankInfo }: TierUnitProps) => {
  return (
    <div className="w-1/2 flex flex-col justify-center items-center">
      <span>
        {rankInfo.queueType === "RANKED_SOLO_5x5" ? "솔로랭크" : "자유랭크"}
      </span>
      <Image
        src={rankInfo.tierIcon}
        alt="Profile Icon"
        draggable={false}
        width={90}
        height={90}
        priority={true} // lazy loading에서 제외
      />
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className="font-bold text-sm">
          {rankInfo.tier} {rankInfo.rank}
        </h1>
        <h4 className="text-xs mt-1">{rankInfo.leaguePoints}LP</h4>
        <h5 className="text-xs mt-1 font-light text-gray-500">
          {rankInfo.wins}승 {rankInfo.losses}패
        </h5>
      </div>
    </div>
  );
};

interface TierBoxProps {
  id: string;
  tag: string;
}

export default function TierBox({ id, tag }: TierBoxProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["userInfo", { id, tag }],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 15, // 15분으로 staletime 설정
    gcTime: 1000 * 60 * 15,
  });
  if (isLoading)
    return (
      <div className="h-32 flex m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ImageSkeleton />
        <div className="w-60 h-full flex flex-col justify-center ml-4"></div>
      </div>
    );
  if (error) {
    return (
      <div className="h-32 flex justify-center items-center m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <span className="text-lg font-[NETMARBLE-Bold]">error</span>
      </div>
    );
  }
  return (
    <div className=" flex m-4 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {data.rank.map((rankInfo: RankInfo, index: number) => (
        <TierUnit key={index} rankInfo={rankInfo} />
      ))}
    </div>
  );
}
