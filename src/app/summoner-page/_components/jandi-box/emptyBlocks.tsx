import dayjs from "dayjs";

interface EmptyBlocksProps {
  year: number;
  month: number;
}

export default function EmptyBlocks({ year, month }: EmptyBlocksProps) {
  const emptyBlocks = [];
  const startOfMonth = dayjs(new Date(year, month - 1, 1));
  const dayOfWeek = startOfMonth.day(); // 일요일은 0, 토요일은 6

  for (let i = 0; i < dayOfWeek; i++) {
    emptyBlocks.push(<div key={`empty-${i}`} className="w-full"></div>);
  }
  return emptyBlocks;
}
