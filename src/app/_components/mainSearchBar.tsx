"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";
import createSubmitHandler from "@/app/_components/createSubmitHandler";
import axios from "axios";
import LocalStatusBox from "@/app/_components/localStatusBox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MainSearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [curInputValue, setCurInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [_, startTransition] = useTransition();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = createSubmitHandler(inputRef, router);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (curInputValue) {
        startTransition(() => {
          // TODO: 백엔드 완성되면 교체 필요
          axios
            .get(`/api/search`, {
              params: {
                nickname: curInputValue,
              },
            })
            .then((res) => {
              setSearchResults(res.data);
              console.log(res.data);
            })
            .catch((err) => {
              console.error(err.response?.data || err);
            });
        });
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [curInputValue]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
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
            onChange={(e) => setCurInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <Button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </Button>
        </div>
      </form>
      {isFocused && (
        <div className="absolute w-full mt-1 bg-gray-50 dark:bg-gray-700 border rounded-l-md shadow-xl z-10 max-h-60 overflow-y-auto">
          {searchResults.map((item, idx) => (
            <button
              key={idx}
              className="w-full px-4 py-2 text-left hover:bg-accent focus:bg-accent focus:outline-none"
            >
              {item}
            </button>
          ))}
          {curInputValue.length === 0 && <LocalStatusBox />}
        </div>
      )}
      {
        /*{isPending && <Spinner />}*/
        //TODO: 이거 너무 찰나라서 주석처리함 배포해보고 볼 것
      }
    </div>
  );
}
