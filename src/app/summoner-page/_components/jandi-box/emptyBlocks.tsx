import dayjs from "dayjs";

type Props = Readonly<{
  year: number;
  month: number;
}>;

export const EmptyBlocks = ({ year, month }: Props) => {
  const startOfMonth = dayjs(new Date(year, month - 1, 1));
  const dayOfWeek = startOfMonth.day(); // 일요일은 0, 토요일은 6

  return Array.from({ length: dayOfWeek }, (_, i) => (
    <div key={`empty-${i}`} className="w-full"></div>
  ));
};
