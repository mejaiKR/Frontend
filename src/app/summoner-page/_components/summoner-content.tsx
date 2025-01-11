"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { fetchUserInfo } from "@/lib/fetch-func";
import { QUERY_KEY } from "@/lib/queryKey";

import { JandiBox, TierBox, UserInfoBox } from "./";

export const SummonerContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const { error, isLoading } = useQuery({
    queryKey: [QUERY_KEY.userInfo, { id, tag }],
    queryFn: fetchUserInfo,
  });

  if (error) {
    throw error;
  }

  return (
    <>
      <UserInfoBox id={id} tag={tag} />
      <TierBox id={id} tag={tag} />
      {!isLoading && <JandiBox />}
    </>
  );
};
