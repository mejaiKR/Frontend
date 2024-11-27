import { AxiosError } from "axios";
import Image from "next/image";

import { S3_URL } from "@/lib/utils";

type Props = Readonly<{
  error: AxiosError;
}>;

export const ErrorPage = ({ error }: Props) => {
  if (error.response?.status === 500) {
    return (
      <div>
        <Image
          draggable={false}
          src={`${S3_URL}/poppyError.png`}
          alt="poppy error"
          width={90}
          height={90}
          className="h-full w-full"
        />
      </div>
    );
  }
  // 404 에러일 경우 소환사를 찾을 수 없습니다 표시
  return (
    <div className="flex h-56 w-full items-end justify-center">
      <span className="text-xl text-gray-600">소환사를 찾을 수 없습니다</span>
    </div>
  );
};
