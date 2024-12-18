"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { DayGameData } from "@/types";

import { chartConfig } from "./const/chartConfig";

type Props = {
  data: DayGameData[];
};

export const GameCountChart = ({ data }: Props) => {
  const chartData = [
    { day: "월", gameCount: 0, fill: "hsl(var(--chart-1))" },
    { day: "화", gameCount: 0, fill: "hsl(var(--chart-2))" },
    { day: "수", gameCount: 0, fill: "hsl(var(--chart-3))" },
    { day: "목", gameCount: 0, fill: "hsl(var(--chart-4))" },
    { day: "금", gameCount: 0, fill: "hsl(var(--chart-5))" },
    { day: "토", gameCount: 0, fill: "hsl(var(--chart-6))" },
    { day: "일", gameCount: 0, fill: "hsl(var(--chart-7))" },
  ];

  data.forEach((game) => {
    const dayIndex = new Date(game.date).getDay();
    chartData[dayIndex].gameCount += game.gameCount;
  });

  return (
    <div className="mx-auto mt-8 w-full max-w-md">
      <ChartContainer
        config={chartConfig}
        className="aspect-square h-[300px] w-full"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis width={30} />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="gameCount"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
