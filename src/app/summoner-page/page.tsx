"use client";

import React, { useState } from "react";
import Image from "next/image";
import Jandi from "@/app/summoner-page/jandi";
import { Skeleton } from "@/components/ui/skeleton";

export function ImageSkeleton() {
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

export default function SummonerPage() {
  const [loading, setLoading] = useState(true);
  // state를 분기로 return 두개 해둔
  if (loading) {
    return (
      <>
        <div className="w-[1300px]">
          <div className="h-32 flex m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {/*<Image*/}
            {/*  src="/profileIcon6271.png"*/}
            {/*  alt="Profile Icon"*/}
            {/*  width={100}*/}
            {/*  height={100}*/}
            {/*/>*/}
            <ImageSkeleton />
            <div className="w-60 h-full flex flex-col justify-center ml-4">
              {/*<h1 className="font-bold text-2xl">hide on bush#KR1</h1>*/}
              {/*<h2>999LV</h2>*/}
              {/*<h3>CHALLENGER I</h3>*/}
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
          <Jandi />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-[1300px]">
          <div className="h-32 flex m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {/*<Image*/}
            {/*  src="/profileIcon6271.png"*/}
            {/*  alt="Profile Icon"*/}
            {/*  width={100}*/}
            {/*  height={100}*/}
            {/*/>*/}
            <div className="w-60 h-full flex flex-col justify-center ml-4">
              {/*<h1 className="font-bold text-2xl">hide on bush#KR1</h1>*/}
              {/*<h2>999LV</h2>*/}
              {/*<h3>CHALLENGER I</h3>*/}
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
          <Jandi />
        </div>
      </>
    );
  }
}
