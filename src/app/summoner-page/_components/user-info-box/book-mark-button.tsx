"use client";

import { useEffect, useState } from "react";

import BookMarkStar from "@/components/ui/book-mark-star";
import {
  addBookmarkId,
  isLocalStorageBookmarked,
  removeBookmarkId,
} from "@/lib/book-mark-func";

interface BookMarkStarButtonProps {
  id: string;
  tag: string;
}

export function toggleBookMark(
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
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);

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

  useEffect(() => {
    setIsBookMarked(isLocalStorageBookmarked(`${id}#${tag}`));
  }, []);

  return (
    <button
      onClick={() => {
        toggleBookMark(isBookMarked, setIsBookMarked, id, tag);
      }}
      className="h-fit w-fit"
    >
      <BookMarkStar isFilled={isBookMarked} />
    </button>
  );
}
