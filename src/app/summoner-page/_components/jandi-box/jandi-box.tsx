"use client";

import { useState } from "react";

import dayjs from "dayjs";
import { useRecoilState } from "recoil";

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
import { viewTypeState } from "@/lib/recoil/atoms";
import { ViewType } from "@/types";

import { LazyLoadedMonthMejaiCard } from "./lazy-loaded-month-mejai-card";

export const JandiBox = () => {
  const [currentDate] = useState(() => dayjs());
  const [selectedYear, setSelectedYear] = useState(() => currentDate.year());
  const [selectedMonth, setSelectedMonth] = useState(
    () => currentDate.month() + 1,
  );
  const [viewType, setViewType] = useRecoilState(viewTypeState);

  // 현재 년도인 경우 현재 월까지만, 이전 년도는 12월까지 표시
  const months = Array.from(
    {
      length:
        selectedYear === currentDate.year() ? currentDate.month() + 1 : 12,
    },
    (_, i) => i + 1,
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex w-full justify-end gap-2 pr-4">
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
              (_, i) => currentDate.year() - i,
            ).map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}년
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={viewType}
          onValueChange={(value) => {
            setViewType(value as ViewType);
          }}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="보기 타입" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="mejai" value="mejai">
              메자이
            </SelectItem>
            <SelectItem key="chart" value="chart">
              차트
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Carousel
        opts={{ align: "center", startIndex: selectedMonth - 1 }}
        className="max-w-x flex w-full flex-col"
      >
        <CarouselPrevious className="absolute left-14 top-28 z-10" />
        <CarouselNext className="absolute right-14 top-28 z-10" />
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
};
