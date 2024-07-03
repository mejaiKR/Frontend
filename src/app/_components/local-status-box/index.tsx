"use client";

import SearchHistoryBox from "@/app/_components/local-status-box/search-history-box";
import BookMarkBox from "@/app/_components/local-status-box/book-mark-box";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LocalStatusBoxProps {
  setIsDropdownVisible: (value: boolean) => void;
}

export default function LocalStatusBox({
  setIsDropdownVisible,
}: LocalStatusBoxProps) {
  //todo: 이거 북마크 변경됐을때 검색 하단 뷰 사라지게 해야함
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
        <SearchHistoryBox setIsDropdownVisible={setIsDropdownVisible} />
      </TabsContent>
      <TabsContent value="bookMarkBox">
        <BookMarkBox setIsDropdownVisible={setIsDropdownVisible} />
      </TabsContent>
    </Tabs>
  );
}
