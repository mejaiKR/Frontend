"use client";

import React, { Suspense } from "react";
import UserInfoBox from "@/app/summoner-page/_components/user-info-box";
import TierBox from "@/app/summoner-page/_components/tier-box";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/lib/fetch-func";
import ErrorPage from "@/app/summoner-page/_components/error-page";
import JandiBox from "@/app/summoner-page/_components/jandi-box";
import Spinner from "@/components/ui/spinner";
import { AxiosError } from "axios";

function AwaitPage() {
  const params = useSearchParams();
  const id = params?.get("id") || "";
  const tag = params?.get("tag") || "";
  const { error, isLoading } = useQuery({
    queryKey: ["userInfo", { id, tag }],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 15, // 15분으로 staletime 설정
    gcTime: 1000 * 60 * 15,
  });

  if (error) {
    return <ErrorPage error={error as AxiosError} />;
  }
  if (isLoading) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <UserInfoBox id={id} tag={tag} />
      <TierBox id={id} tag={tag} />
      <JandiBox />
    </>
  );
}
export default function SummonerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AwaitPage />
    </Suspense>
  );
}
