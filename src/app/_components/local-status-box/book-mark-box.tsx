"use client";

import { useEffect, useState } from "react";

import CloseIcon from "@/../public/close.svg";

import { useSummonerNavigation } from "@/hooks/useSummonerNavigation";
import { removeBookmarkId } from "@/lib/book-mark-func";

function getBookmarks(): string[] {
  if (typeof window !== "undefined") {
    const bookmarkString = localStorage.getItem("bookmark");
    return bookmarkString ? JSON.parse(bookmarkString) : [];
  }
  return [];
}

export const BookMarkBox = () => {
  const [bookmarkArr, setBookmarkArr] = useState<string[] | null>(null);
  const { moveToSummonerPage } = useSummonerNavigation();

  useEffect(() => {
    setBookmarkArr(getBookmarks());
  }, []);

  return (
    <div className="w-full rounded-md px-2 pb-2">
      {bookmarkArr?.map((bookmark, idx) => {
        const [id, key] = bookmark.split("#");
        return (
          <div key={`${id}${key}`} className="LocalStatusBoxUnit">
            <div className="flex w-full items-center justify-between">
              <div>
                <button
                  type="button"
                  className="flex h-10 w-full cursor-pointer items-center justify-center text-xs"
                  onClick={() => moveToSummonerPage(id, key)}
                >
                  {bookmark}
                </button>
              </div>
              <button
                onClick={() => {
                  removeBookmarkId(bookmark);
                  setBookmarkArr(getBookmarks());
                }}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
