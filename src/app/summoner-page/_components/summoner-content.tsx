"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { queries } from "@/lib/queryKey";

import { JandiBox, TierBox, UserInfoBox } from "./";

export const SummonerContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const tag = searchParams.get("tag") ?? "";

  const { error, isLoading } = useQuery(queries.userInfo.detail({ id, tag }));

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
