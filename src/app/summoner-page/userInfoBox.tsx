"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/app/summoner-page/fetchFunc";
import { AxiosError } from "axios";
import ShareButton from "@/app/summoner-page/shareButton";
import BookMarkButton from "@/app/summoner-page/bookMarkButton";

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
  if (error instanceof AxiosError) {
    return (
      <div className="h-32 flex justify-center items-center m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <span className="text-xl font-[NETMARBLE-Bold] text-blue-600">
          {error.response?.status === 404
            ? "소환사를 찾을 수 없습니다"
            : error.message}
        </span>
      </div>
    );
  }
  return (
    <div className=" h-32 flex m-4 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className=" flex flex-col justify-center items-center relative">
        <Image
          src={data.profileIcon}
          alt="Profile Icon"
          draggable={false}
          width={90}
          height={90}
          className="rounded-2xl"
        />
        <span className="transform -translate-x-1/2 -translate-y-2 bg-gray-900 text-white px-2 rounded-full text-xs absolute top-full left-1/2">
          {data.level}
        </span>
      </div>
      <div className="w-60 h-full flex flex-col justify-center ml-4">
        <h1 className="font-bold text-xl">
          {data.userName}
          <span className="font-medium text-gray-500"> #{data.tagLine}</span>
        </h1>
        <div className="flex items-center">
          <ShareButton />
          <BookMarkButton id={id} tag={tag} />
        </div>
      </div>
    </div>
  );
}
