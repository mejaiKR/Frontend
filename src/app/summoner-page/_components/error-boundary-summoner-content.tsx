"use client";

import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorPage, SummonerContent } from ".";

export const ErrorBoundarySummonerContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const tag = searchParams.get("tag");

  return (
    <ErrorBoundary FallbackComponent={ErrorPage} key={`${id}-${tag}`}>
      <SummonerContent />
    </ErrorBoundary>
  );
};
