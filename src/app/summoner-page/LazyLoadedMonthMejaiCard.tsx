import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MonthMejaiCard from "@/app/summoner-page/monthMejaiCard";

interface LazyLoadedMonthMejaiCardProps {
  month: number;
}
export default function LazyLoadedMonthMejaiCard({
  month,
}: LazyLoadedMonthMejaiCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} style={{ minHeight: "100px" }}>
      {isVisible ? (
        <Card>
          <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
            <MonthMejaiCard month={month} />
            <span className="text-2xl font-semibold mt-4">{month}월</span>
          </CardContent>
        </Card>
      ) : (
        <div className="flex justify-center items-center w-[320px] h-[320px]">
          Loading...
        </div>
      )}
    </div>
  );
}
