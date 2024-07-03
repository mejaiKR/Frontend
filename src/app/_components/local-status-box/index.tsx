"use client";

import SearchHistoryBox from "@/app/_components/local-status-box/search-history-box";
import BookMarkBox from "@/app/_components/local-status-box/book-mark-box";

export default function LocalStatusBox() {
  return (
    <div className="h-100 w-full flex">
      <div className="w-1/2">
        <BookMarkBox />
      </div>
      <div className="w-1/2">
        <SearchHistoryBox />
      </div>
    </div>
  );
}
