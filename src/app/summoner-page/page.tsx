"use client";

import React, { Suspense } from "react";
import UserInfoBox from "@/app/summoner-page/_components/user-info-box";
import TierBox from "@/app/summoner-page/_components/tier-box";
import { useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/lib/fetch-func";
import ErrorPage from "@/app/summoner-page/_components/error-page";
import JandiBox from "@/app/summoner-page/_components/jandi-box";
import Spinner from "@/components/ui/spinner";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function AwaitPage() {
  const params = useSearchParams();
  const id = params?.get("id") || "";
  const tag = params?.get("tag") || "";

  const { error, isFetching } = useSuspenseQuery({
    queryKey: ["userInfo", { id, tag }],
    queryFn: fetchUserInfo,
    staleTime: 1000 * 60 * 15,
    gcTime: 1000 * 60 * 15,
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

function ErrorFallback({ error }: FallbackProps) {
  return <ErrorPage error={error} />;
}

export default function SummonerPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<Spinner />}>
        <AwaitPage />
      </Suspense>
    </ErrorBoundary>
  );
}
