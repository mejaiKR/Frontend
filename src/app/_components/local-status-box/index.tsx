"use client";

import SearchHistoryBox from "@/app/_components/local-status-box/search-history-box";
import BookMarkBox from "@/app/_components/local-status-box/book-mark-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderBoardUnit from "@/app/_components/leader-board-box/leader-board-unit";
import { Search } from "lucide-react";

export default function LocalStatusBox() {
  return (
    <Tabs defaultValue="bookMarkBox" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="bookMarkBox" className="w-1/2">
          이번 달
        </TabsTrigger>
        <TabsTrigger value="SearchHistoryBox" className="w-1/2">
          지난 달
        </TabsTrigger>
      </TabsList>
      <TabsContent value="bookMarkBox">
        <BookMarkBox />
      </TabsContent>
      <TabsContent value="SearchHistoryBox">
        <SearchHistoryBox />
      </TabsContent>
    </Tabs>
  );
}
