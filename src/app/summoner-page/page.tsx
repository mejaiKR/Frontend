"use client";

import { Suspense } from "react";

import { useSearchParams } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import { Spinner } from "@/components/ui";

import { ErrorPage, SummonerContent } from "./_components";

export default function SummonerPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const tag = searchParams.get("tag");

  return (
    <ErrorBoundary FallbackComponent={ErrorPage} key={`${id}-${tag}`}>
      <Suspense
        fallback={
          <div className="flex h-96 w-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <SummonerContent />
      </Suspense>
    </ErrorBoundary>
  );
}
