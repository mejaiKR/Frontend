import { useState, useCallback } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { SERVER_URL } from '@/lib/utils';
import { QueryObserverResult } from '@tanstack/react-query';

interface RefreshDataParams {
  id: string;
  tag: string;
  endpoint: string;
  checkEndpoint: string;
  additionalParams?: Record<string, string | number>;
  refetchFn: () => Promise<QueryObserverResult>;
  lastUpdatedAt?: string;
}

export function useRefreshData({
  id,
  tag,
  endpoint,
  checkEndpoint,
  additionalParams = {},
  refetchFn,
  lastUpdatedAt,
}: RefreshDataParams) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const checkUpdateStatus = useCallback(async () => {
    try {
      const params = new URLSearchParams({ id, tag, ...additionalParams });
      const response = await axios.get<{ lastUpdatedAt: string }>(
        `${SERVER_URL}${checkEndpoint}?${params}`
      );
      const lastUpdateAt = dayjs(response.data.lastUpdatedAt);
      const lastUpdatedAtDate = dayjs(lastUpdatedAt);

      if (lastUpdateAt.isAfter(lastUpdatedAtDate)) {
        await refetchFn();
        setIsRefreshing(false);
        setUpdateMessage("업데이트가 완료되었습니다.");
        setTimeout(() => setUpdateMessage(null), 5000);
      } else {
        setTimeout(checkUpdateStatus, 2000);
      }
    } catch (error) {
      console.error("업데이트 상태 확인 실패:", error);
      setIsRefreshing(false);
      setUpdateMessage("업데이트 상태 확인에 실패했습니다. 다시 시도해주세요.");
    }
  }, [id, tag, checkEndpoint, additionalParams, refetchFn, lastUpdatedAt]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setUpdateMessage("업데이트 중...");
    try {
      await axios.post(`${SERVER_URL}${endpoint}`, {
        id,
        tag,
        ...additionalParams,
      });
      checkUpdateStatus();
    } catch (error) {
      console.error("데이터 새로고침 실패:", error);
      setIsRefreshing(false);
      setUpdateMessage("업데이트 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return { isRefreshing, updateMessage, handleRefresh };
}
