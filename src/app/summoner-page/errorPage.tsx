import Image from "next/image";
import { SERVER_URL } from "@/lib/utils";
import { AxiosError } from "axios";

interface ErrorPageProps {
  error: AxiosError;
}

export default function ErrorPage({ error }: ErrorPageProps) {
  if (error.response?.status === 500) {
    return (
      <div>
        <Image
          draggable={false}
          src={`${SERVER_URL}/poppyError.png`}
          alt="poppy error"
          width={90}
          height={90}
          className="w-full h-full"
        />
      </div>
    );
  }
  // 404 에러일 경우 소환사를 찾을 수 없습니다 표시
  return (
    <div className="w-full h-56 flex justify-center items-end">
      <span className="text-xl text-gray-600">소환사를 찾을 수 없습니다</span>
    </div>
  );
}
