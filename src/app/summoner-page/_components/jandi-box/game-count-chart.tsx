"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DayGameData } from "@/types";

import { chartConfig } from "./const/chartConfig";

type Props = {
  data: DayGameData[];
  sumOfGameCount: number;
};

export const GameCountChart = ({ data, sumOfGameCount }: Props) => {
  const chartData = [
    { day: "월요일", gameCount: 0, fill: "hsl(var(--chart-1))" },
    { day: "화요일", gameCount: 0, fill: "hsl(var(--chart-2))" },
    { day: "수요일", gameCount: 0, fill: "hsl(var(--chart-3))" },
    { day: "목요일", gameCount: 0, fill: "hsl(var(--chart-4))" },
    { day: "금요일", gameCount: 0, fill: "hsl(var(--chart-5))" },
    { day: "토요일", gameCount: 0, fill: "hsl(var(--chart-6))" },
    { day: "일요일", gameCount: 0, fill: "hsl(var(--chart-7))" },
  ];

  data.forEach((game) => {
    const dayIndex = new Date(game.date).getDay();
    chartData[dayIndex].gameCount += game.gameCount;
  });

  chartData.sort((a, b) => {
    return b.gameCount - a.gameCount;
  });

  return (
    <div className="mx-auto w-full max-w-md">
      <ChartContainer
        config={chartConfig}
        className="aspect-square h-[300px] w-full"
      >
        <PieChart width={300} height={300}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="gameCount"
            nameKey="day"
            innerRadius={60}
            outerRadius={100}
            strokeWidth={5}
            isAnimationActive={false}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {sumOfGameCount}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy ?? 0) + 24}
                        className="fill-muted-foreground"
                      >
                        게임
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
};
