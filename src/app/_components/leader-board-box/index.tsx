"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderBoardUnit from "@/app/_components/leader-board-box/leader-board-unit";

export default function LeaderBoardBox() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  return (
    <Tabs defaultValue="currentMonth" className="w-full pt-8">
      <TabsList>
        <TabsTrigger value="currentMonth">이번 달</TabsTrigger>
        <TabsTrigger value="lastMonth">지난 달</TabsTrigger>
      </TabsList>
      <TabsContent value="currentMonth">
        <LeaderBoardUnit year={currentYear} month={currentMonth} />
      </TabsContent>
      <TabsContent value="lastMonth">
        <LeaderBoardUnit year={currentYear} month={currentMonth - 1} />
      </TabsContent>
    </Tabs>
  );
}
