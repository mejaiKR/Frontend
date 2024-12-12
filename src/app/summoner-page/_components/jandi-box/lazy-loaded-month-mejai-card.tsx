"use client";

import { MonthMejaiCard } from "@/app/summoner-page/_components";
import { Card, CardContent, Skeleton } from "@/components";
import { useIntersectionObserver } from "@/hooks";

type Props = Readonly<{
  month: number;
  year: number;
}>;

export const LazyLoadedMonthMejaiCard = ({ month, year }: Props) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0,
    freezeOnceVisible: true,
  });

  return (
    <div ref={ref} style={{ minHeight: "100px" }}>
      {isVisible ? (
        <Card>
          <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
            <MonthMejaiCard month={month} year={year} />
          </CardContent>
        </Card>
      ) : (
        <div className="flex size-full items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      )}
    </div>
  );
};
