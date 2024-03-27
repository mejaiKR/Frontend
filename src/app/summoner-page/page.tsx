import React from "react";
import Jandi from "@/app/summoner-page/jandi";
import UserInfoBox from "@/app/summoner-page/user-info-box";

export default function SummonerPage() {
  // react query 사용해서 동적으로 렌더링 해주자
  return (
    <>
      <UserInfoBox />
      <Jandi />
    </>
  );
}
