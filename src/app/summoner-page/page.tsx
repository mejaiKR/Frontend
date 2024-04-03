"use client";

import React from "react";
import Jandi from "@/app/summoner-page/jandi";
import UserInfoBox from "@/app/summoner-page/userInfoBox";
import TierBox from "@/app/summoner-page/tierBox";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/app/summoner-page/fetchFunc";
import ErrorPage from "@/app/summoner-page/errorPage";

export default function SummonerPage() {
  const params = useSearchParams(); // useRouter 훅 사용
  const id = params.get("id") || ""; // router.query에서 id와 tag 추출
  const tag = params.get("tag") || "";
  const { error } = useQuery({
    queryKey: ["userInfo", { id, tag }],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 15, // 15분으로 staletime 설정
    cacheTime: 1000 * 60 * 15,
  });

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <UserInfoBox id={id} tag={tag} />
      <TierBox id={id} tag={tag} />
      <Jandi />
    </>
  );
}
