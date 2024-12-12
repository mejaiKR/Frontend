"use client";

import { MonthMejaiCard } from "@/app/summoner-page/_components";
import { Card, CardContent } from "@/components";
import { useIntersectionObserver } from "@/hooks";

import { MonthMejaiCardSkeleton } from "./jandi-box-skeleton";

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
    <div ref={ref}>
      {isVisible ? (
        <Card>
          <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
            <MonthMejaiCard month={month} year={year} />
          </CardContent>
        </Card>
      ) : (
        <MonthMejaiCardSkeleton />
      )}
    </div>
  );
};
