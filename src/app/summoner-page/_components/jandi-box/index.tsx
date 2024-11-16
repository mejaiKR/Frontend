"use client";

import LazyLoadedMonthMejaiCard from "@/app/summoner-page/_components/jandi-box/lazy-loaded-month-mejai-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import { useState } from "react";

export default function JandiBox() {
  const [currentDate] = useState(() => dayjs());
  const [selectedYear, setSelectedYear] = useState(() => currentDate.year());
  const [selectedMonth, setSelectedMonth] = useState(
    () => currentDate.month() + 1
  );

  // 현재 년도인 경우 현재 월까지만, 이전 년도는 12월까지 표시
  const months = Array.from(
    {
      length:
        selectedYear === currentDate.year() ? currentDate.month() + 1 : 12,
    },
    (_, i) => i + 1
  );

  return (
    <div className="flex justify-center flex-col items-center gap-4">
      <div className="w-full flex justify-end pr-4">
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => {
            setSelectedYear(Number(value));
            setSelectedMonth(1);
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="연도" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(
              { length: currentDate.year() - 2023 + 1 },
              (_, i) => currentDate.year() - i
            ).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}년
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Carousel
        opts={{ align: "center", startIndex: selectedMonth - 1 }}
        className="w-full max-w-x flex flex-col"
      >
        <CarouselPrevious className="absolute top-12 left-14 z-10" />
        <CarouselNext className="absolute top-12 right-14 z-10" />
        <CarouselContent>
          {months.map((month) => (
            <CarouselItem key={month}>
              <LazyLoadedMonthMejaiCard month={month} year={selectedYear} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
