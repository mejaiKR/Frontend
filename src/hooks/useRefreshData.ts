import { useCallback, useMemo } from "react";

import {
  QueryObserverResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

import { API_ENDPOINTS } from "@/lib/endpoint";

type RefreshDataParams = {
  id: string;
  tag: string;
  month?: number;
  year?: number;
  refreshTarget: "profile" | "streak";
  additionalParams?: Record<string, string | number>;
  refetchFn: () => Promise<QueryObserverResult>;
  lastUpdatedAt?: string;
};

export const useRefreshData = ({
  id,
  tag,
  month,
  year,
  refreshTarget,
  additionalParams = {},
  refetchFn,
  lastUpdatedAt,
}: RefreshDataParams) => {
  const endpoint =
    API_ENDPOINTS.UPDATE_STATUS + "/" + refreshTarget + "/renewal";

  // 업데이트 상태 확인을 위한 쿼리
  const { refetch: refetchStatus } = useQuery({
    // 쿼리 키에 year, month를 추가하여 캐시 키를 구분(userInfo의 경우 undefined)
    queryKey: ["updateStatus", { id, tag, refreshTarget, month, year }],
    queryFn: async () => {
      const params = new URLSearchParams({ id, tag, ...additionalParams });
      const response = await axios.get<{ lastUpdatedAt: string }>(
        `${endpoint}?${params}`,
      );
      return response.data;
    },
    enabled: false, // 수동으로 실행하기 위해 비활성화
    retry: 3,
    retryDelay: 2000,
  });

  // 업데이트 상태 확인 함수
  const checkUpdateStatus = useCallback(async () => {
    const result = await refetchStatus();
    if (!result.data) return false;

    const lastUpdateAt = dayjs(result.data.lastUpdatedAt);
    const lastUpdatedAtDate = dayjs(lastUpdatedAt);

    if (lastUpdateAt.isAfter(lastUpdatedAtDate)) {
      await refetchFn();
      return true;
    }
    return false;
  }, [refetchStatus, refetchFn, lastUpdatedAt]);

  // 데이터 갱신을 위한 mutation
  const { mutate: handleRefresh, isPending: isRefreshing } = useMutation({
    mutationFn: async () => {
      await axios.post(endpoint, {
        id,
        tag,
        ...additionalParams,
      });
    },
    mutationKey: ["refreshData", { id, tag, refreshTarget, month, year }],
    onSuccess: async () => {
      const poll = async (retries = 30, interval = 2000): Promise<void> => {
        if (retries === 0) {
          throw new Error("업데이트 시간 초과");
        }

        const isUpdated = await checkUpdateStatus();
        if (!isUpdated) {
          await new Promise((resolve) => setTimeout(resolve, interval));
          return poll(retries - 1, interval);
        }
      };

      try {
        await poll();
      } catch (error) {
        console.error("업데이트 실패:", error);
      }
    },
  });

  const isRefreshDisabled = useMemo(() => {
    if (!lastUpdatedAt) return false;

    // 마이크로초 형식 처리
    const formattedDate = lastUpdatedAt.includes(".")
      ? lastUpdatedAt.split(".")[0] + "Z"
      : lastUpdatedAt;

    const now = dayjs().format();
    const diffMinutes = dayjs(now).diff(dayjs(formattedDate), "minute");
    const diffHours = Math.floor(diffMinutes / 60);

    return diffHours < 2;
  }, [lastUpdatedAt]);

  return {
    isRefreshing,
    handleRefresh,
    isRefreshDisabled,
  };
};
