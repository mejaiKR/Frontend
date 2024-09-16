export default function WeekDayBar() {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className="w-full grid grid-cols-7 gap-1 text-xl">
      {days.map((day) => (
        <div key={day} className="flex justify-center">
          {day}
        </div>
      ))}
    </div>
  );
}
