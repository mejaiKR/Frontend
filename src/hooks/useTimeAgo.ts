import dayjs from "dayjs";

export const useTimeAgo = (lastUpdatedAt: string | undefined) => {
  if (!lastUpdatedAt) return "업데이트 정보 없음";

  const now = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const diffMinutes = dayjs(now).diff(dayjs(lastUpdatedAt), "minute");
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays}일 전`;
  }
  if (diffHours > 0) {
    return `${diffHours}시간 전`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes}분 전`;
  }
  return "방금 전";
};
