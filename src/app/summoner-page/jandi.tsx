import MejaiBox from "@/app/summoner-page/mejai-box";
import dayjs from "dayjs";
// interface MatchData {
//     [date: string]: number;
// }
// async function fetchMatchData() {
//     let mockup = {
//         "2024-01-02" : 3,
//         "2024-01-03" : 2,
//         "2024-01-06" : 3,
//         "2024-01-08" : 3,
//     }
//     return mockup;
// }
let mockup = {
  "2024-01-02": 3,
  "2024-01-03": 2,
  "2024-01-06": 3,
  "2024-01-08": 3,
};
export default function Jandi() {
  const startOfDay = dayjs("2024-01-01");
  const endOfDay = dayjs("2024-12-31");
  let currentDate = startOfDay;
  const dateMap = new Map<string, number>();

  // while (
  //   currentDate.isBefore(endOfDay) ||
  //   currentDate.isSame(endOfDay, "day")
  // ) {
  //   const dateString = currentDate.format("YYYY-MM-DD");
  //   dateMap.set(dateString, numberForDate);
  //   currentDate = currentDate.add(1, "day");
  // }
  return (
    <div className="flex m-6 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col overflow-x-auto">
        <div className="grid grid-flow-col auto-cols-max grid-rows-7">
          {/*여기서 fetch해서 받은 object array로 .map돌려야겠다*/}
          {Array.from({ length: 365 }).map((_, index) => (
            <MejaiBox key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
