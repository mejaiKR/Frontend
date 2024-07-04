"use client";

import { useState } from "react";
import Link from "next/link";
import { removeSearchHistory } from "@/lib/search-history-func";
import { useDropdown } from "@/components/provider/dropdown-provider";
import BookMarkButton from "@/app/summoner-page/_components/user-info-box/book-mark-button";
import CloseSvgIcon from "@/components/ui/close-svg-icon";

function getSearchHistories(): string[] {
  const searchHistoryString = localStorage.getItem("searchHistory");
  return searchHistoryString ? JSON.parse(searchHistoryString) : [];
}

export default function SearchHistoryBox() {
  const [searchHistoryArr, setSearchHistoryArr] =
    useState(getSearchHistories());
  const { setIsDropdownVisible } = useDropdown();

  return (
    <div className="w-full rounded-md px-2 pb-2">
      {searchHistoryArr.map((searchHistoryId, idx) => {
        const [id, key] = searchHistoryId.split("#");
        return (
          <div key={idx} className="LocalStatusBoxUnit">
            <div className="flex justify-between items-center w-full">
              <Link
                href={`/summoner-page?id=${id}&tag=${key}`}
                onClick={() => setIsDropdownVisible(false)}
              >
                <div className=" text-xs w-full h-10 flex justify-center items-center">
                  {searchHistoryId}
                </div>
              </Link>
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
