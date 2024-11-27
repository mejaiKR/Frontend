"use client";

import { Suspense } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

import {
  ErrorPage,
  JandiBox,
  TierBox,
  UserInfoBox,
} from "@/app/summoner-page/_components";
import { Spinner } from "@/components/ui";
import { fetchUserInfo } from "@/lib/fetch-func";

function AwaitPage() {
  const params = useSearchParams();
  const id = params?.get("id") ?? "";
  const tag = params?.get("tag") ?? "";

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

function ErrorFallback({ error }: Readonly<FallbackProps>) {
  return <ErrorPage error={error} />;
}

export default function SummonerPage() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={
          <div className="flex h-96 w-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <AwaitPage />
      </Suspense>
    </ErrorBoundary>
  );
}
