import React from "react";
import Mejais from "@/app/summoner-page/mejais";

export default function Jandi() {
  return (
    <div className="flex m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 mb-1 flex flex-col justify-between">
        <span>월</span>
        <span>화</span>
        <span>수</span>
        <span>목</span>
        <span>금</span>
        <span>토</span>
        <span>일</span>
      </div>
      <div className="grid grid-flow-col auto-cols-max grid-rows-7 overflow-x-auto">
        {Array.from({ length: 365 }).map((_, index) => (
          <Mejais key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
