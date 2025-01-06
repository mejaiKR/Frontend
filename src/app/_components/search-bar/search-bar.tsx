"use client";

import React, { useEffect, useRef, useState, useTransition } from "react";

import axios from "axios";
import { useRecoilState } from "recoil";

import SearchIcon from "@/../public/search.svg";

import { LocalStatusBox, RecommendedNicknameList } from "@/app/_components";
import { Button, Input } from "@/components/ui";
import { useClickOutside, useSummonerNavigation } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/endpoint";
import { isVisibleDropdownState } from "@/lib/recoil/atoms";
import { SummonerId } from "@/types";

export const SearchBar = () => {
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [_, startTransition] = useTransition();
  const [isVisibleDropdown, setIsVisibleDropdown] = useRecoilState(
    isVisibleDropdownState,
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
            .get(API_ENDPOINTS.SEARCH, {
              params: {
                id: searchInputValue,
                count: 5,
              },
            })
            .then((res) => {
              setSearchResults(
                res.data.profiles.map(
                  (user: SummonerId) => `${user.id}#${user.tag}`,
                ),
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
    <div className="relative mx-auto w-full max-w-2xl" ref={searchBarRef}>
      <form className="mx-4" onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            type="search"
            id="default-search"
            maxLength={22}
            ref={inputRef}
            className="block h-12 w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 pr-28 ps-10 text-[16px] text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="소환사명#태그"
            required
            value={searchInputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <SearchIcon className="text-gray-500 dark:text-gray-400" />
          </div>
          <Button
            type="submit"
            className="absolute bottom-2.5 end-2.5 right-1 top-1/2 h-10 -translate-y-1/2 transform rounded-lg px-4 py-2 font-medium text-white focus:outline-none focus:ring-4"
          >
            Search
          </Button>
        </div>
      </form>
      {isVisibleDropdown && (
        <div className="max-h-120 absolute z-20 mt-2 flex w-full flex-col overflow-y-auto rounded-lg bg-gray-50 shadow-xl dark:bg-gray-700">
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
};
