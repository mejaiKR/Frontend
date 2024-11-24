"use client";

import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserInfo } from "@/lib/fetch-func";

function ImageSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="full h-24 w-24" />
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

type RankType = "soloRank" | "flexRank";

interface Props {
  rankInfo: RankInfo;
  rankType: RankType;
}

const TierUnit = ({ rankInfo, rankType }: Props) => {
  return (
    <div className="flex w-1/2 flex-col items-center justify-center">
      <span>{rankType === "soloRank" ? "솔로랭크" : "자유랭크"}</span>
      <Image
        src={rankInfo.tierIcon}
        alt="Profile Icon"
        draggable={false}
        width={90}
        height={90}
        priority={true} // lazy loading에서 제외
      />
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-sm font-bold">
          {rankInfo.tier} {rankInfo.rank}
        </h1>
        <h4 className="mt-1 text-xs">{rankInfo.leaguePoints}LP</h4>
        <h5 className="mt-1 text-xs font-light text-gray-500">
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
}
