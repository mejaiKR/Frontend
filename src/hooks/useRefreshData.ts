import { useCallback } from "react";

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
  refreshTarget: "profile" | "streak";
  additionalParams?: Record<string, string | number>;
  refetchFn: () => Promise<QueryObserverResult>;
  lastUpdatedAt?: string;
};

export const useRefreshData = ({
  id,
  tag,
  refreshTarget,
  additionalParams = {},
  refetchFn,
  lastUpdatedAt,
}: RefreshDataParams) => {
  const checkEndpoint = API_ENDPOINTS.UPDATE_STATUS + refreshTarget;
  const endpoint = API_ENDPOINTS.PROFILE_UPDATE + refreshTarget;

  // 업데이트 상태 확인을 위한 쿼리
  const { data: statusData, refetch: refetchStatus } = useQuery({
    queryKey: ["updateStatus", { id, tag, refreshTarget }],
    queryFn: async () => {
      const params = new URLSearchParams({ id, tag, ...additionalParams });
      const response = await axios.get<{ lastUpdatedAt: string }>(
        `${checkEndpoint}?${params}`,
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

  const updateMessage = (() => {
    if (isRefreshing) return "업데이트 중...";
    if (statusData?.lastUpdatedAt) return "업데이트가 완료되었습니다.";
    return null;
  })();

  return {
    isRefreshing,
    updateMessage,
    handleRefresh,
  };
};
