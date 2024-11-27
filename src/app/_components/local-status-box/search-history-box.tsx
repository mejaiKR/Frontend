"use client";

import { useEffect, useState } from "react";

import CloseIcon from "@/../public/close.svg";

import { BookMarkButton } from "@/app/summoner-page/_components";
import { useSummonerNavigation } from "@/hooks/useSummonerNavigation";
import { removeSearchHistory } from "@/lib/search-history-func";

function getSearchHistories(): string[] {
  if (typeof window !== "undefined") {
    const searchHistoryString = localStorage.getItem("searchHistory");
    return searchHistoryString ? JSON.parse(searchHistoryString) : [];
  }
  return [];
}

export const SearchHistoryBox = () => {
  const [searchHistoryArr, setSearchHistoryArr] = useState<string[] | null>(
    null,
  );
  const { moveToSummonerPage } = useSummonerNavigation();

  useEffect(() => {
    setSearchHistoryArr(getSearchHistories());
  }, []);

  return (
    <div className="w-full rounded-md px-2 pb-2">
      {searchHistoryArr?.map((searchHistoryId, idx) => {
        const [id, key] = searchHistoryId.split("#");
        return (
          <div key={`${id}${key}`} className="LocalStatusBoxUnit">
            <div className="flex w-full items-center justify-between">
              <div>
                <button
                  className="flex h-10 w-full cursor-pointer items-center justify-center text-xs"
                  onClick={() => moveToSummonerPage(id, key)}
                >
                  {searchHistoryId}
                </button>
              </div>
              <div className="flex gap-4">
                <BookMarkButton id={id} tag={key} />
                <button
                  onClick={() => {
                    removeSearchHistory(searchHistoryId);
                    setSearchHistoryArr(getSearchHistories());
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
