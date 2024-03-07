import Mejais from "@/app/summoner-page/mejais";
import MonthBar from "@/app/summoner-page/monthBar";
import OneWeekBar from "@/app/summoner-page/oneWeekBar";

export default function Jandi() {
  return (
    <div className="flex m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* <OneWeekBar /> */}
      <div className="flex flex-col overflow-x-auto">
        <MonthBar />
        <div className="grid grid-flow-col auto-cols-max grid-rows-7">
          {Array.from({ length: 365 }).map((_, index) => (
            <Mejais key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
