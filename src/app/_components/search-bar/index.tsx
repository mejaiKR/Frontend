"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";
import createSubmitHandler from "@/app/_components/create-submit-handler";
import axios from "axios";
import LocalStatusBox from "@/app/_components/local-status-box";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ReadingGlassSvgIcon from "@/components/ui/reading-glass-svg-icon";
import RecommendedNicknameList from "@/app/_components/search-bar/recommended-nickname-list";

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default function SearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [curInputValue, setCurInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [_, startTransition] = useTransition();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSubmit = createSubmitHandler(inputRef, router);

  // 외부 클릭이 감지되면 드롭다운 닫기
  useClickOutside(searchBarRef, () => {
    setIsDropdownVisible(false);
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (curInputValue) {
        startTransition(() => {
          // TODO: 백엔드 완성되면 엔드포인트 교체 필요
          axios
            .get(`/api/search`, {
              params: {
                nickname: curInputValue,
              },
            })
            .then((res) => {
              setSearchResults(res.data);
            })
            .catch((err) => {
              console.error(err.response?.data || err);
              setSearchResults([]);
            });
        });
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [curInputValue]);

  const handleInputFocus = () => {
    setIsDropdownVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurInputValue(e.target.value);
    setIsDropdownVisible(true);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchBarRef}>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="relative">
          <Input
            type="search"
            id="default-search"
            maxLength={22}
            ref={inputRef}
            className="w-full pl-10 pr-28 h-12 block p-4 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="소환사명#태그"
            required
            value={curInputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <ReadingGlassSvgIcon />
          </div>
          <Button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </Button>
        </div>
      </form>
      {isDropdownVisible && (
        <div className="absolute w-full mt-1 bg-gray-50 dark:bg-gray-700 border rounded-lg shadow-xl z-20 max-h-120 overflow-y-auto">
          {searchResults.length > 0 ? (
            <RecommendedNicknameList searchResults={searchResults} />
          ) : curInputValue ? (
            <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
              검색 결과가 없습니다.
            </div>
          ) : (
            <LocalStatusBox />
          )}
        </div>
      )}
    </div>
  );
}
