"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getServerUrl } from "@/lib/utils";

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

const fetchUserInfo = async ({ queryKey }) => {
  const [_key, { id, tag }] = queryKey;
  // if (!id) return null;
  const response = await axios.get(
    `${getServerUrl()}/users/profile?id=${id}&tag=${tag}`,
  );
  return response.data;
};

export default function TierBox() {
  const params = useSearchParams(); // useRouter 훅 사용
  const id = params.get("id"); // router.query에서 id와 tag 추출
  const tag = params.get("tag");

  const { data, isLoading, error } = useQuery({
    queryKey: ["userInfo", { id, tag }],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 15, // 15분으로 staletime 설정
    cacheTime: 1000 * 60 * 15,
  });

  if (isLoading)
    return (
      <div className="h-32 flex m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <ImageSkeleton />
        <div className="w-60 h-full flex flex-col justify-center ml-4"></div>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  console.log(data);
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
