"use client";

import { Suspense } from "react";

import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import { Spinner } from "@/components/ui";

import { ErrorPage, SummonerContent } from "./_components";

const ErrorBoundaryWithKey = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const tag = searchParams.get("tag");

  return (
    <ErrorBoundary FallbackComponent={ErrorPage} key={`${id}-${tag}`}>
      <SummonerContent />
    </ErrorBoundary>
  );
};

export default function SummonerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundaryWithKey />
    </Suspense>
  );
}
