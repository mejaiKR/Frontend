import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import LazyLoadedMonthMejaiCard from "@/app/summoner-page/_components/jandi-box/lazy-loaded-month-mejai-card";

export default function JandiBox() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  return (
    <div className="flex justify-center flex-col items-center">
      <Carousel
        opts={{ align: "center", loop: true, startIndex: currentMonth - 1 }}
        className="w-full max-w-x flex flex-col"
      >
        <CarouselPrevious className="absolute top-12 left-14 z-10" />
        <CarouselNext className="absolute top-12 right-14 z-10" />
        <CarouselContent>
          {Array.from({ length: currentMonth }).map((_, index) => (
            <CarouselItem key={index}>
              <LazyLoadedMonthMejaiCard month={index + 1} year={currentYear} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
