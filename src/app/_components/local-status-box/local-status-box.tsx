"use client";

import { BookMarkBox, SearchHistoryBox } from "@/app/_components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const LocalStatusBox = () => {
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
};
