import axios from "axios";
import { SERVER_URL } from "@/lib/utils";

export const fetchUserInfo = async ({
  queryKey,
}: {
  queryKey: [string, { id: string; tag: string }];
}) => {
  const [_key, { id, tag }] = queryKey;
  // if (!id) return null;
  const response = await axios.get(
    `${SERVER_URL}/users/profile?id=${id}&tag=${tag}`,
  );
  return response.data;
};

export const fetchJandi = async ({
  queryKey,
}: {
  queryKey: [string, { id: string; tag: string; year: number; month: number }];
}) => {
  console.log(queryKey);
  const [_key, { id, tag, year, month }] = queryKey;
  // if (!id) return null;
  const response = await axios.get(
    `${SERVER_URL}/users/streak?id=${id}&tag=${tag}&year=${year}&month=${month}`,
  );
  return response.data;
};
