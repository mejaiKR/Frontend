"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { removeSearchHistory } from "@/lib/search-history-func";

function getSearchHistories(): string[] {
  const searchHistoryString = localStorage.getItem("searchHistory");
  return searchHistoryString ? JSON.parse(searchHistoryString) : [];
}

export default function SearchHistoryBox() {
  const [searchHistoryArr, setSearchHistoryArr] =
    useState(getSearchHistories());
  return (
    <ScrollArea className="h-29 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 flex justify-center font-medium leading-none">
          검색기록
        </h4>
        {searchHistoryArr.map((searchHistoryId, idx) => {
          const [id, key] = searchHistoryId.split("#");
          return (
            <div key={idx}>
              <Separator className="my-1" />
              <div className="flex justify-between items-center w-full">
                <Link href={`/summoner-page?id=${id}&tag=${key}`}>
                  <div className=" text-xs w-full h-10 flex justify-center items-center">
                    {searchHistoryId}
                  </div>
                </Link>
                <button
                  onClick={() => {
                    removeSearchHistory(searchHistoryId);
                    setSearchHistoryArr(getSearchHistories());
                  }}
                  className="text-xs"
                >
                  x
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
