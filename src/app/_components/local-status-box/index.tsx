"use client";

import SearchHistoryBox from "@/app/_components/local-status-box/search-history-box";
import BookMarkBox from "@/app/_components/local-status-box/book-mark-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderBoardUnit from "@/app/_components/leader-board-box/leader-board-unit";
import { Search } from "lucide-react";

export default function LocalStatusBox() {
  return (
    <Tabs defaultValue="SearchHistoryBox" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="SearchHistoryBox" className="w-1/2">
          최근 검색
        </TabsTrigger>
        <TabsTrigger value="bookMarkBox" className="w-1/2">
          즐겨찾기
        </TabsTrigger>
      </TabsList>
      <TabsContent value="SearchHistoryBox">
        <SearchHistoryBox />
      </TabsContent>
      <TabsContent value="bookMarkBox">
        <BookMarkBox />
      </TabsContent>
    </Tabs>
  );
}
