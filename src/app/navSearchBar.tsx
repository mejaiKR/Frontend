"use client";

import React, { FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import createSubmitHandler from "@/app/createSubmitHandler";

export default function NavSearchBar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null); // 입력 필드 참조 생성
  const handleSubmit = createSubmitHandler(inputRef, router); // 이벤트 핸들러 함수 생성

  return (
    <form className="w-1/2" onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
          ref={inputRef}
          className="block w-full p-2 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="소환사명#태그"
          required
        />
      </div>
    </form>
  );
}
