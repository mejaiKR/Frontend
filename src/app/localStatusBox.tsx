"use client";

import SearchHistoryBox from "@/app/searchHistoryBox";
import BookMarkBox from "@/app/bookMarkBox";

export default function LocalStatusBox() {
  return (
    <div className="pt-10 h-100 w-full flex">
      <div className="w-1/2">
        <BookMarkBox />
      </div>
      <div className="w-1/2">
        <SearchHistoryBox />
      </div>
    </div>
  );
}
