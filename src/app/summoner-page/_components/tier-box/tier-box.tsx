"use client";

import { nanoid } from "nanoid";

import { ImageSkeleton } from "@/components/ui";
import { useUserInfoQuery } from "@/queries";

import { TierUnit } from "./tier-unit";

type Props = {
  id: string;
  tag: string;
};

export const TierBox = ({ id, tag }: Props) => {
  const { data, isLoading, error } = useUserInfoQuery(id, tag);

  if (isLoading || data === undefined)
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
