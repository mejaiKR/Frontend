"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { removeBookmarkId } from "@/lib/book-mark-func";
import { useState } from "react";
import { useDropdown } from "@/components/provider/dropdown-provider";

function getBookmarks(): string[] {
  const bookmarkString = localStorage.getItem("bookmark");
  return bookmarkString ? JSON.parse(bookmarkString) : [];
}

export default function BookMarkBox() {
  const [bookmarkArr, setBookmarkArr] = useState(getBookmarks());
  const { setIsDropdownVisible } = useDropdown();
  return (
    <div className="h-22 w-full rounded-md border p-4">
      {bookmarkArr.map((bookmark, idx) => {
        const [id, key] = bookmark.split("#");
        return (
          <div key={idx}>
            <div className="flex justify-between items-center w-full">
              <Link
                href={`/summoner-page?id=${id}&tag=${key}`}
                onClick={() => setIsDropdownVisible(false)}
              >
                <div className=" text-xs w-full h-10 flex justify-center items-center">
                  {bookmark}
                </div>
              </Link>
              <button
                onClick={() => {
                  removeBookmarkId(bookmark);
                  setBookmarkArr(getBookmarks());
                }}
                className="text-xs"
              >
                x
              </button>
            </div>
            <Separator className="my-1" />
          </div>
        );
      })}
    </div>
  );
}
