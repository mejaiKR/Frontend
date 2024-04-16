"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import createSubmitHandler from "@/app/createSubmitHandler";

export default function NavSearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null); // 입력 필드 참조 생성
  const handleSubmit = createSubmitHandler(inputRef, router); // 이벤트 핸들러 함수 생성

  return (
    <div className="w-full flex justify-center">
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="relative pl-4 pr-4">
          <div className="absolute inset-y-0 start-4 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
          <input
            type="search"
            id="default-search"
            maxLength={22}
            ref={inputRef}
            className="block w-full p-2 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="소환사명#태그"
            required
          />
        </div>
      </form>
    </div>
  );
}
