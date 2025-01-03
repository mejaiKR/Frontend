export const WeekDayBar = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="grid w-full grid-cols-7 gap-1 text-xl">
      {days.map((day) => (
        <div key={day} className="flex justify-center">
          {day}
        </div>
      ))}
    </div>
  );
};
