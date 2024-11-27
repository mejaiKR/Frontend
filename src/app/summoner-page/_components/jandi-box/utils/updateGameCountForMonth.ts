import dayjs from "dayjs";

import { DayGameData } from "@/types";

export const updateGameCountForMonth = (
  inputData: DayGameData[],
  year: number,
  month: number,
  setSumOfGameCount: (value: number) => void,
) => {
  const startOfMonth = dayjs(new Date(year, month - 1, 1));
  const endOfMonth = dayjs(new Date(year, month, 0));

  let sumOfGameCount = 0;
  let daysArray: DayGameData[] = [];
  let day = startOfMonth;

  while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day")) {
    daysArray.push({
      date: day.format("YYYY-MM-DD"),
      gameCount: 0,
      imageUrl: "",
    });
    day = day.add(1, "day");
  }

  // 입력 데이터로 gameCount 업데이트
  inputData.forEach((data: DayGameData) => {
    const index = daysArray.findIndex((day) => day.date === data.date);
    if (index !== -1) {
      daysArray[index].gameCount = data.gameCount;
      sumOfGameCount += data.gameCount;
      daysArray[index].imageUrl = data.imageUrl;
    }
  });
  setSumOfGameCount(sumOfGameCount);
  return daysArray;
};
