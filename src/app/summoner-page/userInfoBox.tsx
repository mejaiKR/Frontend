"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
    `http://localhost:8080/users/profile?id=${id}&tag=${tag}`,
  );
  return response.data;
};

export default function UserInfoBox() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const tag = params.get("tag");

  const { data, isLoading, error } = useQuery({
    queryKey: ["userInfo", { id, tag }],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 15, // 15분으로 staletime 설정
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
      <Image
        src={data.profileIcon}
        alt="Profile Icon"
        draggable={false}
        width={100}
        height={100}
      />
      <div className="w-60 h-full flex flex-col justify-center ml-4">
        <h1 className="font-bold text-2xl">{data.userName}</h1>
        <h2>{data.level}</h2>
        <h3>{data.tier} I</h3>
      </div>
      {/*<button*/}
      {/*  type="button"*/}
      {/*  className="h-10 w-30 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"*/}
      {/*>*/}
      {/*  전적 갱신*/}
      {/*</button>*/}
      {/*<button*/}
      {/*  type="button"*/}
      {/*  className="h-10 w-30 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-800"*/}
      {/*>*/}
      {/*  공유하기*/}
      {/*</button>*/}
    </div>
  );
}
