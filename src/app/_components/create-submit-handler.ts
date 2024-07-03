import React, { FormEvent } from "react";
import { addSearchHistory } from "@/lib/search-history-func";

export default function createSubmitHandler(
  inputRef: React.RefObject<HTMLInputElement>,
  router: any, // router 타입이 업데이트시 변경 예정
) {
  // 실제 이벤트 핸들러 함수 반환
  return (event: FormEvent) => {
    event.preventDefault();
    let searchTerm = inputRef.current?.value;
    let id, tag;

    if (!searchTerm) return;
    if (searchTerm.includes("#")) {
      [id, tag] = searchTerm.split("#");
    } else {
      id = searchTerm;
      tag = "KR1";
    }

    if (searchTerm) {
      router.push(`/summoner-page?id=${id}&tag=${tag}`);
      addSearchHistory(`${id}#${tag}`);
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.blur();
      }
    }
  };
}
