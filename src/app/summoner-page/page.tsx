"use client";

import { Suspense } from "react";

import { Spinner } from "@/components/ui";

import { ErrorBoundarySummonerContent } from "./_components";

export default function SummonerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-96 w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundarySummonerContent />
    </Suspense>
  );
}
