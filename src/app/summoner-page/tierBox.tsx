"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/app/summoner-page/fetchFunc";

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
        <span className="text-xl font-[NETMARBLE-Bold]"></span>
      </div>
    );
  }
  return (
    <div className="h-32 flex m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center">
        <Image
          src={data.tierIcon}
          alt="Profile Icon"
          draggable={false}
          width={100}
          height={100}
        />
      </div>
      <div className="w-60 h-full flex flex-col justify-center ml-4">
        <h1 className="font-bold text-2xl">
          {data.tier} {data.rank}
        </h1>
        <h4>{data.leaguePoints}LP</h4>
        <h5 className="font-light text-gray-500">
          {data.wins}승 {data.losses}패
        </h5>
      </div>
    </div>
  );
}
