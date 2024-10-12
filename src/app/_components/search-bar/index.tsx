"use client";

import LocalStatusBox from "@/app/_components/local-status-box";
import RecommendedNicknameList from "@/app/_components/search-bar/recommended-nickname-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReadingGlassSvgIcon from "@/components/ui/reading-glass-svg-icon";
import useClickOutside from "@/hooks/useClickOutside";
import { useSummonerNavigation } from "@/hooks/useSummonerNavigation";
import { isVisibleDropdownState } from "@/lib/recoil/atoms";
import { SERVER_URL } from "@/lib/utils";
import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";
import { useRecoilState } from "recoil";

export default function SearchBar() {
  const searchBarRef = React.useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [_, startTransition] = useTransition();
  const [isVisibleDropdown, setIsVisibleDropdown] = useRecoilState(
    isVisibleDropdownState
  );
  const { inputRef, searchInputValue, setSearchInputValue, handleSubmit } =
    useSummonerNavigation();

  // 외부 클릭이 감지되면 드롭다운 닫기
  useClickOutside(searchBarRef, () => {
    setIsVisibleDropdown(false);
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchInputValue) {
        startTransition(() => {
          axios
            .get(`${SERVER_URL}/users/search`, {
              params: {
                id: searchInputValue,
                count: 5,
              },
            })
            .then((res) => {
              setSearchResults(
                res.data.map((user: any) => `${user.id}#${user.tag}`)
              );
            })
            .catch((err) => {
              console.error(err.response?.data || err);
              setSearchResults([]);
            });
        });
      } else {
        setSearchResults([]);
      }
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInputValue]);

  const handleInputFocus = () => {
    setIsVisibleDropdown(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
    setIsVisibleDropdown(true);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchBarRef}>
      <form className="mx-4" onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            type="search"
            id="default-search"
            maxLength={22}
            ref={inputRef}
            className="w-full pl-10 pr-28 h-12 block p-4 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="소환사명#태그"
            required
            value={searchInputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <ReadingGlassSvgIcon />
          </div>
          <Button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 text-white end-2.5 bottom-2.5  focus:ring-4 focus:outline-none  font-medium rounded-lg px-4 py-2"
          >
            Search
          </Button>
        </div>
      </form>
      {isVisibleDropdown && (
        <div className="absolute w-full mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-xl z-20 max-h-120 overflow-y-auto flex flex-col">
          {searchResults.length > 0 ? (
            <RecommendedNicknameList
              searchResults={searchResults}
              setIsVisibleDropdown={setIsVisibleDropdown}
            />
          ) : searchInputValue ? (
            <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
              소환사를 찾을 수 없습니다.
            </div>
          ) : (
            <LocalStatusBox />
          )}
        </div>
      )}
    </div>
  );
}
