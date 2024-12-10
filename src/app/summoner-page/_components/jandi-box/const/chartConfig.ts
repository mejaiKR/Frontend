import { ChartConfig } from "@/components";

export const chartConfig = {
  gameCount: {
    label: "게임 수",
    color: "hsl(var(--chart-1))",
  },
  monday: {
    label: "월요일",
    color: "hsl(var(--chart-1))",
  },
  tuesday: {
    label: "화요일",
    color: "hsl(var(--chart-2))",
  },
  wednesday: {
    label: "수요일",
    color: "hsl(var(--chart-3))",
  },
  thursday: {
    label: "목요일",
    color: "hsl(var(--chart-4))",
  },
  friday: {
    label: "금요일",
    color: "hsl(var(--chart-5))",
  },
  saturday: {
    label: "토요일",
    color: "hsl(var(--chart-6))",
  },
  sunday: {
    label: "일요일",
    color: "hsl(var(--chart-7))",
  },
} satisfies ChartConfig;
