"use client";

import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import { queries } from "@/lib/queryKey";

import { TierBoxSkeleton } from "./tier-box-skeleton";
import { TierUnit } from "./tier-unit";
type Props = {
  id: string;
  tag: string;
};

export const TierBox = ({ id, tag }: Props) => {
  const { data, isLoading, error } = useQuery(
    queries.userInfo.detail({ id, tag }),
  );

  if (isLoading || data === undefined)
    return (
      <div className="m-4 flex h-[208px] rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
        <TierBoxSkeleton />
      </div>
    );
  if (error) {
    return (
      <div className="m-4 flex rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800">
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
