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
            <span className="text-4xl font-semibold mb-5">{month}월</span>
            {/* 실제 컴포넌트 로딩 */}
            <MonthMejaiCard month={month} />
          </CardContent>
        </Card>
      ) : (
        <div className="flex justify-center items-center w-[320px] h-[320px]">
          Loading...
        </div> // 여기에 스피너 컴포넌트를 넣을 수 있습니다.
      )}
    </div>
  );
}
