"use client";

import { LeaderBoardUnit } from "@/app/_components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const LeaderBoardBox = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastYear = currentMonth === 1 ? currentYear - 1 : currentYear;

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
        <LeaderBoardUnit year={lastYear} month={lastMonth} />
      </TabsContent>
    </Tabs>
  );
};
