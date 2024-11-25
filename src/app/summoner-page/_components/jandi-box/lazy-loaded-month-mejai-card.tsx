"use client";

import { useEffect, useRef, useState } from "react";

import { MonthMejaiCard } from "@/app/summoner-page/_components";
import { Card, CardContent } from "@/components/ui/card";

interface LazyLoadedMonthMejaiCardProps {
  month: number;
  year: number;
}

export default function LazyLoadedMonthMejaiCard({
  month,
  year,
}: LazyLoadedMonthMejaiCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} style={{ minHeight: "100px" }}>
      {isVisible ? (
        <Card>
          <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
            <MonthMejaiCard month={month} year={year} />
          </CardContent>
        </Card>
      ) : (
        <div className="flex h-[320px] w-[320px] items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
}
