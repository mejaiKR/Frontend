import React, { FormEvent } from "react";
import { NextRouter } from "next/navigation";

export default function createSubmitHandler(
  inputRef: React.RefObject<HTMLInputElement>,
  router: NextRouter,
) {
  // 실제 이벤트 핸들러 함수 반환
  return (event: FormEvent) => {
    event.preventDefault();
    let searchTerm = inputRef.current?.value;
    let id, tag;

    if (!searchTerm) {
      return;
    }

    if (searchTerm.includes("#") && searchTerm.split("#").length !== 2) {
      return;
    }

    if (searchTerm.includes("#")) {
      [id, tag] = searchTerm.split("#");
    } else {
      id = searchTerm;
      tag = "KR1";
    }

    if (searchTerm) {
      router.push(`/summoner-page?id=${id}&tag=${tag}`);
      inputRef.current.value = "";
      inputRef.current.blur();
    }
  };
}
