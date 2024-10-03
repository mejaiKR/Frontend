"use client";

import BookMarkButton from "@/app/summoner-page/_components/user-info-box/book-mark-button";
import CloseSvgIcon from "@/components/ui/close-svg-icon";
import { useSummonerNavigation } from "@/hooks/useSummonerNavigation";
import { removeSearchHistory } from "@/lib/search-history-func";
import { useEffect, useState } from "react";

function getSearchHistories(): string[] {
  if (typeof window !== "undefined") {
    const searchHistoryString = localStorage.getItem("searchHistory");
    return searchHistoryString ? JSON.parse(searchHistoryString) : [];
  }
  return [];
}

export default function SearchHistoryBox() {
  const [searchHistoryArr, setSearchHistoryArr] = useState<string[] | null>(null);
  const { moveToSummonerPage } = useSummonerNavigation();

  useEffect(() => {
    setSearchHistoryArr(getSearchHistories());
  }, []);

  return (
    <div className="w-full rounded-md px-2 pb-2">
      {searchHistoryArr?.map((searchHistoryId, idx) => {
        const [id, key] = searchHistoryId.split("#");
        return (
          <div key={idx} className="LocalStatusBoxUnit">
            <div className="flex justify-between items-center w-full">
              <div>
                <div
                  className="cursor-pointer text-xs w-full h-10 flex justify-center items-center"
                  onClick={() => moveToSummonerPage(id, key)}
                >
                  {searchHistoryId}
                </div>
              </div>
              <div className="flex gap-4">
                <BookMarkButton id={id} tag={key} />
                <button
                  onClick={() => {
                    removeSearchHistory(searchHistoryId);
                    setSearchHistoryArr(getSearchHistories());
                  }}
                >
                  <CloseSvgIcon />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
