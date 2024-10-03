"use client";

import CloseSvgIcon from "@/components/ui/close-svg-icon";
import { useSummonerNavigation } from "@/hooks/useSummonerNavigation";
import { removeBookmarkId } from "@/lib/book-mark-func";
import { useEffect, useState } from "react";

function getBookmarks(): string[] {
  const bookmarkString = localStorage.getItem("bookmark");
  return bookmarkString ? JSON.parse(bookmarkString) : [];
}

export default function BookMarkBox() {
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
          <div key={idx} className="LocalStatusBoxUnit">
            <div className="flex justify-between items-center w-full">
              <div>
                <div
                  className="cursor-pointer text-xs w-full h-10 flex justify-center items-center"
                  onClick={() => moveToSummonerPage(id, key)}
                >
                  {bookmark}
                </div>
              </div>
              <button
                onClick={() => {
                  removeBookmarkId(bookmark);
                  setBookmarkArr(getBookmarks());
                }}
              >
                <CloseSvgIcon />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
