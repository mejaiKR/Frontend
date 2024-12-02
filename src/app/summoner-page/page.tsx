"use client";

import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { Spinner } from "@/components/ui";

import { ErrorPage, SummonerContent } from "./_components";

export default function SummonerPage({
  searchParams,
}: {
  searchParams: { id?: string; tag?: string };
}) {
  const id = searchParams.id ?? "";
  const tag = searchParams.tag ?? "";

  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Suspense
        fallback={
          <div className="flex h-96 w-full items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <SummonerContent id={id} tag={tag} />
      </Suspense>
    </ErrorBoundary>
  );
}
