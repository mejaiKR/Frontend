"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchUserInfo } from "@/lib/fetch-func";
import { QUERY_KEY } from "@/lib/queryKey";

import { JandiBox, TierBox, UserInfoBox } from "./";

export function SummonerContent({ id, tag }: { id: string; tag: string }) {
  const { error, isFetching } = useSuspenseQuery({
    queryKey: [QUERY_KEY.userInfo, { id, tag }],
    queryFn: fetchUserInfo,
  });

  if (error && !isFetching) {
    throw error;
  }

  return (
    <>
      <UserInfoBox id={id} tag={tag} />
      <TierBox id={id} tag={tag} />
      <JandiBox />
    </>
  );
}
