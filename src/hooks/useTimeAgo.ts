import dayjs from "dayjs";

export const useTimeAgo = (lastUpdatedAt: string | undefined) => {
  if (!lastUpdatedAt || lastUpdatedAt === "1900-01-01T00:00:00.000Z")
    return "업데이트 정보 없음";

  const now = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  const diffMinutes = dayjs(now).diff(dayjs(lastUpdatedAt), "minute");
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `최근 업데이트: ${diffDays}일 전`;
  }
  if (diffHours > 0) {
    return `최근 업데이트: ${diffHours}시간 전`;
  }
  if (diffMinutes > 0) {
    return `최근 업데이트: ${diffMinutes}분 전`;
  }
  return "최근 업데이트: 방금 전";
};
