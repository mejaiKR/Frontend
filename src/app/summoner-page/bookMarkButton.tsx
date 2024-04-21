"use client";

import BookMarkStar from "@/components/ui/bookMarkStar";
import { useEffect, useState } from "react";

interface BookMarkStarButtonProps {
  id: string;
  tag: string;
}

function addBookmarkId(id: string) {
  const bookmarkString = localStorage.getItem("bookmark");
  const bookmarks: string[] = bookmarkString ? JSON.parse(bookmarkString) : [];
  if (!bookmarks.includes(id)) {
    bookmarks.push(id);
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
  }
}

function removeBookmarkId(id: string) {
  const bookmarkString = localStorage.getItem("bookmark");
  const bookmarks: string[] = bookmarkString ? JSON.parse(bookmarkString) : [];
  const filteredBookmarks = bookmarks.filter((bookmarkId) => bookmarkId !== id);
  localStorage.setItem("bookmark", JSON.stringify(filteredBookmarks));
}

function isLocalStorageBookmarked(id: string): boolean {
  const bookmarkString = localStorage.getItem("bookmark");
  const bookmarks: string[] = bookmarkString ? JSON.parse(bookmarkString) : [];
  return bookmarks.includes(id);
}

function toggleBookMark(
  isBookMarked: boolean,
  setIsBookMarked: Function,
  id: string,
  tag: string,
) {
  // 북마크 상태를 토글하는 함수

  if (isBookMarked) {
    // 북마크를 해제하는 경우
    removeBookmarkId(`${id}#${tag}`);
  } else {
    // 북마크를 추가하는 경우
    addBookmarkId(`${id}#${tag}`);
  }
  setIsBookMarked(!isBookMarked);
}

export default function BookMarkButton({ id, tag }: BookMarkStarButtonProps) {
  const [isBookMarked, setIsBookMarked] = useState(
    isLocalStorageBookmarked(`${id}#${tag}`),
  );

  useEffect(() => {
    // 다른 탭에서 북마크를 추가하거나 삭제한 경우 북마크 상태를 업데이트
    function updateBookmarkStatus() {
      setIsBookMarked(isLocalStorageBookmarked(`${id}#${tag}`));
    }
    window.addEventListener("storage", updateBookmarkStatus);
    return () => {
      window.removeEventListener("storage", updateBookmarkStatus);
    };
  }, [id, tag]);

  return (
    <button
      onClick={() => {
        toggleBookMark(isBookMarked, setIsBookMarked, id, tag);
      }}
      className="w-fit h-fit ml-2"
    >
      <BookMarkStar isFilled={isBookMarked} />
    </button>
  );
}
