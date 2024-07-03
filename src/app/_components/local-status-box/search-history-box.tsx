"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { removeSearchHistory } from "@/lib/search-history-func";
import { useDropdown } from "@/components/provider/dropdown-provider";

function getSearchHistories(): string[] {
  const searchHistoryString = localStorage.getItem("searchHistory");
  return searchHistoryString ? JSON.parse(searchHistoryString) : [];
}

export default function SearchHistoryBox() {
  const [searchHistoryArr, setSearchHistoryArr] =
    useState(getSearchHistories());
  const { setIsDropdownVisible } = useDropdown();

  return (
    <ScrollArea className="h-29 w-full rounded-md border">
      <div className="p-4">
        {searchHistoryArr.map((searchHistoryId, idx) => {
          const [id, key] = searchHistoryId.split("#");
          return (
            <div key={idx}>
              <div className="flex justify-between items-center w-full">
                <Link
                  href={`/summoner-page?id=${id}&tag=${key}`}
                  onClick={() => setIsDropdownVisible(false)}
                >
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
              <Separator className="my-1" />
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
